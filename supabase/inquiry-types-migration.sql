alter table public.contact_messages
  add column if not exists inquiry_type text not null default 'general';

update public.contact_messages
set inquiry_type = case lower(subject)
  when 'volunteer interest' then 'volunteer'
  when 'church partnership' then 'church_partnership'
  when 'organisation partnership' then 'organisation_partnership'
  else inquiry_type
end
where inquiry_type = 'general';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'contact_messages_inquiry_type_check'
      and conrelid = 'public.contact_messages'::regclass
  ) then
    alter table public.contact_messages
      add constraint contact_messages_inquiry_type_check
      check (inquiry_type in ('general', 'volunteer', 'church_partnership', 'organisation_partnership'));
  end if;
end $$;

create index if not exists contact_messages_type_created_at_idx
  on public.contact_messages (inquiry_type, created_at desc);
