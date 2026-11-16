# Beard & Diapers

The Beard & Diapers website shares community stories, books, projects, and ways to get involved. It is built with Next.js and uses Supabase for public form submissions, story moderation, and the admin-selected featured book.

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

For a new project, run [`supabase/schema.sql`](supabase/schema.sql), then [`supabase/story-attachments.sql`](supabase/story-attachments.sql) in the Supabase SQL Editor. Existing projects should apply only the migrations needed for their current schema; see [`supabase/README.md`](supabase/README.md).

## How submissions appear

- Contact, volunteer, church and organisation partnership, and project support inquiries appear in separate admin inbox tabs.
- Newsletter signups appear in the admin inbox. Sending newsletter campaigns requires a separate email delivery provider.
- Submitted stories remain private as `pending` until an admin publishes them. Published stories appear in chronological order, with the newest at the end of the list.
- A story photo is optional. Uploaded photos remain private while a story is pending; published story photos are served only for published stories. Stories without a photo have no app-provided image.
- The admin chooses the homepage featured book from the available book catalog.

## Useful commands

```bash
npm run dev
npm run lint
npm run build
```
