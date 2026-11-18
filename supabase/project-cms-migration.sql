create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 2 and 180),
  location text not null default '',
  year text,
  description text not null default '',
  why text not null default '',
  story text not null default '',
  image text not null default '',
  photos text[] not null default '{}',
  people text[] not null default '{}',
  outcomes text not null default '',
  featured boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_position_name_idx on public.projects (position, name);
alter table public.projects enable row level security;
revoke all on public.projects from anon, authenticated;
grant select, insert, update, delete on public.projects to service_role;

insert into public.projects (slug, name, location, year, description, why, story, image, photos, people, outcomes, featured, position)
values
  ('hospital-reading-corners', 'Hospital Reading Corners', 'Nairobi, Kenya', '2024', 'Small reading corners in hospital wards where volunteers read with patients and families.', 'Healing is not only medical. Stories and presence restore dignity.', 'A small idea with a big heart: place books and people in hospital wards, and let presence do the healing.', '/images/hospital-reading-corners.jpeg', array['/images/hospital-reading-corners.jpeg'], array['Volunteers', 'Nurses', 'Patients'], 'Three reading corners established. Over 120 reading sessions held.', true, 0),
  ('childrens-home', 'Children''s Home', 'Kenya', null, 'Community visits and shared activities at children''s homes.', 'Children thrive when caring communities make time to listen, learn, and be present.', '', '/images/childrens-home-community.jpeg', array['/images/childrens-home-community.jpeg'], '{}', '', false, 1),
  ('community-care', 'Community Care', 'Kenya', null, 'Community gatherings that create space for neighbors to connect and support one another.', 'Strong relationships make it easier for people to care for one another.', '', '/images/kenya-community-gathering-2.jpg', array['/images/kenya-community-gathering-2.jpg', '/images/kenya-community-gathering.jpg'], '{}', '', false, 2)
on conflict (slug) do nothing;
