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

alter table public.book_chapters add column if not exists image_url text not null default '';

create index if not exists book_chapters_publication_idx
  on public.book_chapters (book_slug, status, scheduled_at, position);

-- Keep the existing demonstration book and chapters when migrating an established site.
insert into public.books (slug, title, author, tagline, description, cover, total_chapters, status, position)
values (
  'the-100-day-heartbeat', 'The 100-Day Heartbeat', 'Roy Ochuka',
  '100 days. 100 reflections. One journey of becoming.',
  'Preparing my soul for 40. One hundred days. One hundred reflections. One journey of becoming.',
  '/images/family-reading-story.jpg', 100, 'serializing', 0
)
on conflict (slug) do nothing;

insert into public.book_chapters (book_slug, number, title, content, status, published_at, is_free, position)
values
  ('the-100-day-heartbeat', 1, 'Day 1 — The Quiet Beginning', 'Take a breath. Notice the ordinary. God is already here.', 'published', now(), true, 1),
  ('the-100-day-heartbeat', 2, 'Day 2 — Listening Again', 'Learning to listen — to God, to others, to the quiet whispers of the heart.\n\nIn the busyness of life, we often miss the still, small voice that guides us back to purpose.\n\nContinue the journey.', 'published', now(), true, 2),
  ('the-100-day-heartbeat', 3, 'Day 3 — Growing Where You Are Planted', 'Bloom where God has planted you. Your season of waiting is not wasted.\n\nEven the smallest seed, given soil and light, grows into something beautiful.\n\nContinue reading.', 'published', now(), true, 3)
on conflict (book_slug, number) do nothing;

alter table public.books enable row level security;
alter table public.book_chapters enable row level security;
revoke all on public.books from anon, authenticated;
revoke all on public.book_chapters from anon, authenticated;
grant select, insert, update, delete on public.books to service_role;
grant select, insert, update, delete on public.book_chapters to service_role;
