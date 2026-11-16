alter table public.stories
  add column if not exists publication_permission boolean not null default false;

alter table public.stories
  add column if not exists publication_permission_at timestamptz;

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
