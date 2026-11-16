update public.contact_messages
set inquiry_type = 'support_project'
where inquiry_type = 'general' and lower(subject) = 'support a project';

alter table public.contact_messages
  drop constraint if exists contact_messages_inquiry_type_check;

alter table public.contact_messages
  add constraint contact_messages_inquiry_type_check
  check (inquiry_type in ('general', 'volunteer', 'church_partnership', 'organisation_partnership', 'support_project'));
