This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Blog submissions and publishing

The site uses Supabase for story submissions, contact messages, and newsletter signups. Submitted stories are stored as `pending` until an administrator approves them.

1. Create a Supabase project.
2. Open the Supabase SQL Editor and run [`supabase/schema.sql`](supabase/schema.sql).
3. Copy `.env.example` to `.env.local`. Fill in `SUPABASE_URL` and `SUPABASE_SECRET_KEY` from the project’s API settings. Keep the secret key server-side; never use a `NEXT_PUBLIC_` variable for it.
4. Set a long random value for `BLOG_ADMIN_PASSWORD` and a different long random value for `BLOG_ADMIN_SECRET`.
5. Start the site and visit `/admin` to review submissions and see contact messages and newsletter signups.
6. Add the same environment variables to the deployment provider before deploying. Vercel deployments are detected automatically; for other hosts, set `NEXT_PUBLIC_BASE_URL` to the canonical site URL.

Newsletter signups are stored with consent in Supabase. Sending newsletter campaigns still requires connecting an email delivery provider. Story submissions and contact messages are saved in the admin inbox without requiring an email app.

### Story document attachments

To enable optional PDF/DOC/DOCX attachments on story submissions, run [`supabase/story-attachments.sql`](supabase/story-attachments.sql) in the Supabase SQL Editor. It adds a private Storage bucket (10 MB per file) and the attachment path column. Only signed-in admins can open submitted files through `/admin`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
