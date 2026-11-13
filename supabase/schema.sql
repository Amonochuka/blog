create extension if not exists pgcrypto;

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null check (char_length(title) between 3 and 160),
  excerpt text not null default '',
  content text not null check (char_length(content) between 20 and 30000),
  category text not null default 'Community',
  author_name text not null,
  author_email text not null,
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  image_url text not null default '/images/story-1.jpg',
  attachment_path text,
  created_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.stories add column if not exists attachment_path text;

create index if not exists stories_status_created_at_idx on public.stories (status, created_at desc);

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
  created_at timestamptz not null default now(),
  read_at timestamptz
);

alter table public.stories enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;

revoke all on public.stories from anon, authenticated;
revoke all on public.newsletter_subscribers from anon, authenticated;
revoke all on public.contact_messages from anon, authenticated;

grant select, insert, update, delete on public.stories to service_role;
grant select, insert, update, delete on public.newsletter_subscribers to service_role;
grant select, insert, update, delete on public.contact_messages to service_role;

-- All reads and writes go through the Next.js server, which holds the Supabase secret key.
