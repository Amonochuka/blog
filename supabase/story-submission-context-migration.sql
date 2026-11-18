alter table public.stories
  add column if not exists location text,
  add column if not exists social_contact text;

alter table public.stories
  drop constraint if exists stories_location_length_check,
  add constraint stories_location_length_check check (location is null or char_length(location) <= 160),
  drop constraint if exists stories_social_contact_length_check,
  add constraint stories_social_contact_length_check check (social_contact is null or char_length(social_contact) <= 200);
