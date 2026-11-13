import { BaseLayout } from "@/components/BaseLayout";

export default function PrivacyPage() {
  return (
    <BaseLayout>
      <section className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-be-900">
        <article className="mx-auto max-w-3xl px-6 text-be-700 dark:text-zinc-300">
          <h1 className="mb-6 text-4xl font-bold text-be-900 dark:text-white">Privacy</h1>
          <p className="mb-4">Once Supabase is configured, story submissions, contact messages, and newsletter addresses are stored in the site’s database. Story submissions remain private until an administrator approves them for publication.</p>
          <p className="mb-4">Contact messages and newsletter addresses are visible to the site administrator. Newsletter addresses are stored for future updates; email delivery must be configured separately.</p>
          <p>Avoid including sensitive personal information in a story or message. Social links take you to external services with their own privacy practices.</p>
        </article>
      </section>
    </BaseLayout>
  );
}
