-- Story scheduling, editor autosaves, and revision history.
alter table public.stories add column if not exists scheduled_at timestamptz;
alter table public.stories drop constraint if exists stories_status_check;
alter table public.stories add constraint stories_status_check
  check (status in ('pending', 'draft', 'scheduled', 'published', 'rejected'));
alter table public.stories drop constraint if exists stories_content_check;
alter table public.stories drop constraint if exists stories_content_length_check;
alter table public.stories add constraint stories_content_length_check
  check (char_length(content) between 20 and 100000);

create table if not exists public.content_autosaves (
  content_type text not null check (content_type in ('story', 'chapter')),
  content_id uuid not null,
  snapshot jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (content_type, content_id)
);

create table if not exists public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('story', 'chapter')),
  content_id uuid not null,
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists content_revisions_lookup_idx
  on public.content_revisions (content_type, content_id, created_at desc);

alter table public.content_autosaves enable row level security;
alter table public.content_revisions enable row level security;
revoke all on public.content_autosaves from anon, authenticated;
revoke all on public.content_revisions from anon, authenticated;
grant select, insert, update, delete on public.content_autosaves to service_role;
grant select, insert, update, delete on public.content_revisions to service_role;
