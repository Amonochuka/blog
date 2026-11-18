create extension if not exists pgcrypto;

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null check (char_length(title) between 3 and 160),
  subtitle text not null default '',
  excerpt text not null default '',
  content text not null check (char_length(content) between 20 and 30000),
  category text not null default 'Community',
  tags text[] not null default '{}',
  related_story_slugs text[] not null default '{}',
  featured boolean not null default false,
  seo_title text not null default '',
  seo_description text not null default '',
  author_name text not null,
  author_email text,
  location text check (location is null or char_length(location) <= 160),
  social_contact text check (social_contact is null or char_length(social_contact) <= 200),
  status text not null default 'pending' check (status in ('pending', 'draft', 'published', 'rejected')),
  publication_permission boolean not null default false,
  publication_permission_at timestamptz,
  image_url text,
  image_path text,
  attachment_path text,
  created_at timestamptz not null default now(),
  published_at timestamptz,
  constraint stories_publication_permission_check
    check (not publication_permission or publication_permission_at is not null)
);

alter table public.stories add column if not exists attachment_path text;
alter table public.stories add column if not exists image_path text;
alter table public.stories add column if not exists publication_permission boolean not null default false;
alter table public.stories add column if not exists publication_permission_at timestamptz;
alter table public.stories alter column image_url drop default;
alter table public.stories alter column image_url drop not null;

update public.stories
set publication_permission_at = created_at
where publication_permission and publication_permission_at is null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'stories_publication_permission_check'
      and conrelid = 'public.stories'::regclass
  ) then
    alter table public.stories
      add constraint stories_publication_permission_check
      check (not publication_permission or publication_permission_at is not null);
  end if;
end $$;

create index if not exists stories_status_created_at_idx on public.stories (status, created_at desc);
create index if not exists stories_featured_published_idx on public.stories (featured, published_at desc) where status = 'published';

create table if not exists public.story_comments (
  id uuid primary key default gen_random_uuid(),
  story_slug text not null references public.stories(slug) on update cascade on delete cascade,
  author_name text not null check (char_length(author_name) between 2 and 100),
  author_email text not null,
  content text not null check (char_length(content) between 3 and 2000),
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists story_comments_review_idx on public.story_comments (status, created_at desc);
create index if not exists story_comments_public_idx on public.story_comments (story_slug, status, created_at asc);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  consent boolean not null default false check (consent),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null check (char_length(message) between 5 and 10000),
  inquiry_type text not null default 'general' check (inquiry_type in ('general', 'volunteer', 'church_partnership', 'organisation_partnership', 'support_project', 'community_initiative', 'prayer_support')),
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value)
values ('featured_book_slug', '"the-100-day-heartbeat"'::jsonb)
on conflict (key) do nothing;

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  author text not null default '',
  tagline text not null default '',
  description text not null default '',
  cover text not null default '',
  total_chapters integer not null default 0,
  status text not null default 'serializing' check (status in ('serializing', 'coming_soon', 'completed')),
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.book_chapters (
  id uuid primary key default gen_random_uuid(),
  book_slug text not null references public.books(slug) on update cascade on delete cascade,
  number integer not null check (number > 0),
  title text not null,
  content text not null default '',
  image_url text not null default '',
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published')),
  scheduled_at timestamptz,
  published_at timestamptz,
  is_free boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (book_slug, number)
);

create index if not exists book_chapters_publication_idx on public.book_chapters (book_slug, status, scheduled_at, position);

insert into public.books (slug, title, author, tagline, description, cover, total_chapters, status, position)
values ('the-100-day-heartbeat', 'The 100-Day Heartbeat', 'Roy Ochuka', '100 days. 100 reflections. One journey of becoming.', 'Preparing my soul for 40. One hundred days. One hundred reflections. One journey of becoming.', '/images/family-reading-story.jpg', 100, 'serializing', 0)
on conflict (slug) do nothing;

insert into public.book_chapters (book_slug, number, title, content, status, published_at, is_free, position)
values
  ('the-100-day-heartbeat', 1, 'Day 1 — The Quiet Beginning', 'Take a breath. Notice the ordinary. God is already here.', 'published', now(), true, 1),
  ('the-100-day-heartbeat', 2, 'Day 2 — Listening Again', 'Learning to listen — to God, to others, to the quiet whispers of the heart.\n\nIn the busyness of life, we often miss the still, small voice that guides us back to purpose.\n\nContinue the journey.', 'published', now(), true, 2),
  ('the-100-day-heartbeat', 3, 'Day 3 — Growing Where You Are Planted', 'Bloom where God has planted you. Your season of waiting is not wasted.\n\nEven the smallest seed, given soil and light, grows into something beautiful.\n\nContinue reading.', 'published', now(), true, 3)
on conflict (book_slug, number) do nothing;

alter table public.contact_messages add column if not exists inquiry_type text not null default 'general';

update public.contact_messages
set inquiry_type = case lower(subject)
  when 'volunteer interest' then 'volunteer'
  when 'church partnership' then 'church_partnership'
  when 'organisation partnership' then 'organisation_partnership'
  when 'support a project' then 'support_project'
  else inquiry_type
end
where inquiry_type = 'general';

alter table public.contact_messages
  drop constraint if exists contact_messages_inquiry_type_check;

alter table public.contact_messages
  add constraint contact_messages_inquiry_type_check
  check (inquiry_type in ('general', 'volunteer', 'church_partnership', 'organisation_partnership', 'support_project', 'community_initiative', 'prayer_support'));

create index if not exists contact_messages_type_created_at_idx
  on public.contact_messages (inquiry_type, created_at desc);

alter table public.stories enable row level security;
alter table public.story_comments enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;
alter table public.books enable row level security;
alter table public.book_chapters enable row level security;

revoke all on public.stories from anon, authenticated;
revoke all on public.story_comments from anon, authenticated;
revoke all on public.newsletter_subscribers from anon, authenticated;
revoke all on public.contact_messages from anon, authenticated;
revoke all on public.site_settings from anon, authenticated;
revoke all on public.books from anon, authenticated;
revoke all on public.book_chapters from anon, authenticated;

grant select, insert, update, delete on public.stories to service_role;
grant select, insert, update, delete on public.story_comments to service_role;
grant select, insert, update, delete on public.newsletter_subscribers to service_role;
grant select, insert, update, delete on public.contact_messages to service_role;
grant select, insert, update, delete on public.site_settings to service_role;
grant select, insert, update, delete on public.books to service_role;
grant select, insert, update, delete on public.book_chapters to service_role;

-- All reads and writes go through the Next.js server, which holds the Supabase secret key.
