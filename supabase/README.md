# Supabase setup and migrations

The site uses Supabase for story submissions, inquiries, newsletter signups, project management, the featured-book setting, editorial story fields, and book/chapter publishing. All database access goes through the Next.js server using `SUPABASE_SECRET_KEY`; browser clients do not access these tables directly.

## Database tables

| Table | Contents |
| --- | --- |
| `stories` | Pending submissions, admin drafts, published stories, and rejected submissions, with editorial and SEO metadata |
| `contact_messages` | Contact, volunteer, partnership, project support, community initiative, and prayer support inquiries, grouped by `inquiry_type` |
| `newsletter_subscribers` | Email addresses and consent |
| `site_settings` | The admin-selected featured book |
| `books` | Book catalog managed in the admin |
| `book_chapters` | Chapter content, order, and publication state |
| `projects` | Project descriptions, images, people, outcomes, and display order managed in Admin |
| `content_autosaves` | Recoverable in-progress admin edits for existing stories and chapters |
| `content_revisions` | Previous saved versions of stories and chapters |

Three tables store form submissions. `site_settings` stores site configuration, not form data.

## New Supabase project

In the Supabase SQL Editor, run these files in order:

1. [`schema.sql`](schema.sql)
2. [`story-attachments.sql`](story-attachments.sql)
3. [`book-media-storage-migration.sql`](book-media-storage-migration.sql)
4. [`content-workflow-migration.sql`](content-workflow-migration.sql)
5. [`project-cms-migration.sql`](project-cms-migration.sql) (creates and seeds the project catalog)

The second script creates the private `story-submissions` Storage bucket for optional story documents and photos. Admins can upload story photos directly when creating or editing stories; the third creates the public `book-media` bucket for book covers and optional chapter images uploaded by admins.

`schema.sql` creates the current complete database schema, including the book CMS tables and story editorial fields. It seeds the current demo book and its three existing chapters without overwriting matching records.

## Existing Supabase project

Do not rerun `schema.sql` as a substitute for migrations. Run the migration matching the feature that is missing:

| Migration | Use when |
| --- | --- |
| [`support-project-inquiry-migration.sql`](support-project-inquiry-migration.sql) | The `contact_messages` constraint does not yet allow `support_project` inquiries |
| [`community-pathway-inquiries-migration.sql`](community-pathway-inquiries-migration.sql) | Enabling admin inbox categories for community initiative and prayer support inquiries |
| [`featured-book-setting-migration.sql`](featured-book-setting-migration.sql) | The `site_settings` table or featured-book setting is missing |
| [`story-images-migration.sql`](story-images-migration.sql) | Enabling optional submitter photos; adds `image_path`, removes the image default for pending stories, and allows image types in Storage |
| [`story-editorial-metadata-migration.sql`](story-editorial-metadata-migration.sql) | Enabling admin editing for subtitle, tags, related stories, featured flag, and SEO fields |
| [`content-workflow-migration.sql`](content-workflow-migration.sql) | Enabling scheduled stories, admin editor autosaves, and saved story/chapter versions |
| [`book-cms-migration.sql`](book-cms-migration.sql) | Enabling admin-managed books and chapters, drafts, scheduling, and publication status |
| [`book-media-storage-migration.sql`](book-media-storage-migration.sql) | Enabling admin uploads for book covers and chapter images |
| [`story-comments-migration.sql`](story-comments-migration.sql) | Enabling moderated public comments on stories |
| [`story-attachments.sql`](story-attachments.sql) | The `attachment_path` column or private story upload bucket has not been created |
| [`story-submission-context-migration.sql`](story-submission-context-migration.sql) | Adding submitter location and private optional social/contact details to story submissions |
| [`project-cms-migration.sql`](project-cms-migration.sql) | Enabling Admin project management and seeding the existing project entries |

[`inquiry-types-migration.sql`](inquiry-types-migration.sql) and [`story-publication-permission-migration.sql`](story-publication-permission-migration.sql) are older migrations. Run them only if the corresponding inquiry categories or story permission columns are absent. The main schema already includes those features for new projects.

## Story review and photos

Story submissions are inserted with `status = 'pending'`. Admins can review the text, preview a private uploaded photo, and publish or reject the story. Only published stories are returned by public story queries. A photo is optional; when none is supplied, no app image is assigned. Uploaded photos stay in private Storage while pending or in draft and are served publicly by the site only after publication.

Accepted photo formats are JPG, PNG, and WebP, up to 10 MB. Optional document attachments accept PDF, DOC, and DOCX, up to 10 MB.

## Story editing

Apply `story-editorial-metadata-migration.sql` and `content-workflow-migration.sql` to an existing project before using the complete story editor in `/admin`. The editor supports headings, emphasis, lists, quotes, links, uploaded inline images, and a preview. Inline images are uploaded individually into the public `book-media` bucket; the admin does not get a shared media library. It autosaves existing story and chapter edits separately from the published copy, and records the previous saved version when Save is pressed. New stories can be saved as drafts, published immediately, or scheduled. Scheduled stories are promoted when a public story page or story listing is requested after the scheduled time; without public traffic, their state changes on the next request rather than at the exact second.

Story categories are selected from the fixed list in the admin. Existing older category values remain available when editing those stories so a save does not silently recategorize them. The featured flag is editorial metadata only; it does not add a homepage featured-story block.

Apply `story-comments-migration.sql` to enable moderated comments. New comments remain pending until an admin approves them in the Comments tab. Email addresses are visible only in admin; public comments show the author's name and comment text.

## Book and chapter publishing

Apply `book-cms-migration.sql`, `book-media-storage-migration.sql`, and `content-workflow-migration.sql` before using book management in `/admin`. They create the book catalog and chapter tables, seed the current demonstration book and its three published chapters without overwriting matching entries, and create image storage for admin uploads. Admin can add and edit books and chapters, upload covers and optional chapter images, reorder chapters by number, publish immediately, save drafts, or schedule publication. Scheduled chapters become public when their scheduled time arrives. Chapter editing uses the same rich text tools and saves versions for existing chapters. Premium access is not enforced; the free flag is editorial metadata for future use.

## Project management

Apply `project-cms-migration.sql` to an existing project before using **Admin → Projects**. It creates the project catalog and seeds the current entries without overwriting matching projects. Project photo uploads use the public `book-media` Storage bucket, so apply `book-media-storage-migration.sql` as well if that bucket is not already available. Admin can add and edit project details and upload multiple photos; the first photo is used on the project card. To connect a published story, add `project:<slug>` to its tags in the story editor.

## Where to check setup

- Tables: **Supabase Dashboard → Table Editor → public**
- Upload bucket: **Supabase Dashboard → Storage → story-submissions**
- Server credentials: project URL and secret key in the local `.env.local` and deployment environment; never expose the secret key in a `NEXT_PUBLIC_` variable
