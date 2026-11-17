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

alter table public.story_comments enable row level security;
revoke all on public.story_comments from anon, authenticated;
grant select, insert, update, delete on public.story_comments to service_role;
