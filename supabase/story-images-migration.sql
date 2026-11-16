alter table public.stories
  add column if not exists image_path text;

alter table public.stories
  alter column image_url drop default,
  alter column image_url drop not null;

update public.stories
set image_url = null
where status = 'pending' and image_url like '/images/%';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'story-submissions',
  'story-submissions',
  false,
  10485760,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
