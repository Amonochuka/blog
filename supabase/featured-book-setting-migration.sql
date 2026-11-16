create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value)
values ('featured_book_slug', '"the-100-day-heartbeat"'::jsonb)
on conflict (key) do nothing;

alter table public.site_settings enable row level security;

revoke all on public.site_settings from anon, authenticated;
grant select, insert, update, delete on public.site_settings to service_role;
