# Beard & Diapers

The Beard & Diapers website shares community stories, books, projects, and ways to get involved. It is built with Next.js and uses Supabase for submissions, story publishing, book and chapter management, and the admin-selected featured book.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set the values in `.env.local` before using forms or the admin page. The required server-only values are:

- `SUPABASE_URL` and `SUPABASE_SECRET_KEY` for database and private Storage access
- `BLOG_ADMIN_PASSWORD` and `BLOG_ADMIN_SECRET` for `/admin`

Keep Supabase secret keys and admin credentials on the server. Do not prefix them with `NEXT_PUBLIC_`. `NEXT_PUBLIC_BASE_URL` is optional for deployments where `VERCEL_URL` is not available.

## Supabase setup

For a new project, run [`supabase/schema.sql`](supabase/schema.sql), [`supabase/story-attachments.sql`](supabase/story-attachments.sql), and [`supabase/book-media-storage-migration.sql`](supabase/book-media-storage-migration.sql) in the Supabase SQL Editor. Existing projects should apply only the migrations needed for their current schema; see [`supabase/README.md`](supabase/README.md).

## Product roadmap

Ideas from the brief that are deferred to later phases are tracked in [`docs/FUTURE-REQUESTS.md`](docs/FUTURE-REQUESTS.md).

## How submissions appear

- Contact, volunteer, church and organisation partnership, and project support inquiries appear in separate admin inbox tabs.
- Newsletter signups appear in the admin inbox. Sending newsletter campaigns requires a separate email delivery provider.
- Submitted stories remain private as `pending` until an admin publishes them. Published stories appear in chronological order, with the newest at the end of the list.
- A story photo is optional. Uploaded photos remain private while a story is pending; published story photos are served only for published stories. Stories without a photo have no app-provided image.
- The admin chooses the homepage featured book from the available book catalog.
- Admin can write stories as drafts or publish them immediately, edit story editorial metadata, and manage books and chapters. Chapters can be saved as drafts, published immediately, or scheduled; scheduled chapters are published automatically when their date arrives.
- The admin story and chapter editors support rich text formatting, an in-place preview, recoverable autosaves, and saved versions. Story publishing also supports drafts, immediate publication, and scheduling. Scheduled stories become public on the next public story request after their scheduled time.
- Story categories are chosen from a fixed list in the admin. Existing legacy categories are retained when editing older stories.
- Story comments are optional and moderated in the admin before they appear publicly.
- Reading progress is saved in the reader's browser on that device. It is not synced between browsers or devices.

## Useful commands

```bash
npm run dev
npm run lint
npm run build
```
