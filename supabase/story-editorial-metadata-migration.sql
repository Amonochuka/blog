-- Editorial fields for admin-managed story editing.
alter table public.stories add column if not exists subtitle text not null default '';
alter table public.stories add column if not exists tags text[] not null default '{}';
alter table public.stories add column if not exists related_story_slugs text[] not null default '{}';
alter table public.stories add column if not exists featured boolean not null default false;
alter table public.stories add column if not exists seo_title text not null default '';
alter table public.stories add column if not exists seo_description text not null default '';
alter table public.stories alter column author_email drop not null;
alter table public.stories drop constraint if exists stories_status_check;
alter table public.stories add constraint stories_status_check
  check (status in ('pending', 'draft', 'published', 'rejected'));

create index if not exists stories_featured_published_idx
  on public.stories (featured, published_at desc)
  where status = 'published';
