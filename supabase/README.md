# Supabase setup

## App tables

The app creates **three tables** in the `public` schema:

| Table | Stores |
| --- | --- |
| `stories` | Submitted stories and approved blog posts |
| `contact_messages` | Contact, volunteer, church partnership, organisation partnership, and project support inquiries; categorized by `inquiry_type` |
| `newsletter_subscribers` | Newsletter email addresses and consent |

The story attachment feature also uses a private Storage bucket named `story-submissions`. A bucket is not an app table; Supabase manages its storage tables separately.

## Which SQL file to run

- **New Supabase project:** run `schema.sql` once, then `story-attachments.sql` to create the private upload bucket.
- **Existing project already using this schema:** run only `support-project-inquiry-migration.sql` to enable the new project support inquiry category. It changes a constraint on `contact_messages`; it does not create a table.
- `inquiry-types-migration.sql` and `story-publication-permission-migration.sql` are earlier incremental updates. They do not create tables and do not need to be rerun if those features are already working.

In Supabase, the three app tables appear under **Table Editor → public**. The upload bucket appears under **Storage**.
