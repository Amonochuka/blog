# Supabase setup and migrations

The site uses Supabase for story submissions, inquiries, newsletter signups, and the featured-book setting. All database access goes through the Next.js server using `SUPABASE_SECRET_KEY`; browser clients do not access these tables directly.

## Database tables

| Table | Contents |
| --- | --- |
| `stories` | Pending, published, and rejected story submissions |
| `contact_messages` | Contact, volunteer, church partnership, organisation partnership, and project support inquiries, grouped by `inquiry_type` |
| `newsletter_subscribers` | Email addresses and consent |
| `site_settings` | The admin-selected featured book |

Three tables store form submissions. `site_settings` stores site configuration, not form data.

## New Supabase project

In the Supabase SQL Editor, run these files in order:

1. [`schema.sql`](schema.sql)
2. [`story-attachments.sql`](story-attachments.sql)

The second script creates the private `story-submissions` Storage bucket for optional story documents and photos.

## Existing Supabase project

Do not rerun `schema.sql` as a substitute for migrations. Run the migration matching the feature that is missing:

| Migration | Use when |
| --- | --- |
| [`support-project-inquiry-migration.sql`](support-project-inquiry-migration.sql) | The `contact_messages` constraint does not yet allow `support_project` inquiries |
| [`featured-book-setting-migration.sql`](featured-book-setting-migration.sql) | The `site_settings` table or featured-book setting is missing |
| [`story-images-migration.sql`](story-images-migration.sql) | Enabling optional submitter photos; adds `image_path`, removes the image default for pending stories, and allows image types in Storage |
| [`story-editorial-metadata-migration.sql`](story-editorial-metadata-migration.sql) | Enabling admin editing for subtitle, tags, related stories, featured flag, and SEO fields |
| [`story-attachments.sql`](story-attachments.sql) | The `attachment_path` column or private story upload bucket has not been created |

[`inquiry-types-migration.sql`](inquiry-types-migration.sql) and [`story-publication-permission-migration.sql`](story-publication-permission-migration.sql) are older migrations. Run them only if the corresponding inquiry categories or story permission columns are absent. The main schema already includes those features for new projects.

## Story review and photos

Story submissions are inserted with `status = 'pending'`. Admins can review the text, preview a private uploaded photo, and publish or reject the story. Only published stories are returned by public story queries. A photo is optional; when none is supplied, no app image is assigned. Uploaded photos stay in private Storage while pending and are served by the site only after publication.

Accepted photo formats are JPG, PNG, and WebP, up to 10 MB. Optional document attachments accept PDF, DOC, and DOCX, up to 10 MB.

## Story editing

Apply `story-editorial-metadata-migration.sql` to an existing project before using the story editor in `/admin`. Admin can update story copy, author, category, display date, tags, related-story links, and SEO fields. The featured flag is editorial metadata only; it does not add a homepage featured-story block.

## Where to check setup

- Tables: **Supabase Dashboard → Table Editor → public**
- Upload bucket: **Supabase Dashboard → Storage → story-submissions**
- Server credentials: project URL and secret key in the local `.env.local` and deployment environment; never expose the secret key in a `NEXT_PUBLIC_` variable
