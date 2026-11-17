"use client";

import { useState, type FormEvent } from "react";

const fieldClass = "w-full rounded-md bg-be-50 px-3 py-2 text-sm text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white";

export function AdminNewStoryForm({ onCreated }: { onCreated: () => void }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setMessage("");
    const formData = new FormData(form);
    const tags = String(formData.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean);
    try {
      const response = await fetch("/api/admin/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          subtitle: formData.get("subtitle"),
          author_name: formData.get("author_name"),
          author_email: formData.get("author_email"),
          category: formData.get("category"),
          excerpt: formData.get("excerpt"),
          image_url: formData.get("image_url"),
          content: formData.get("content"),
          tags,
          seo_title: formData.get("seo_title"),
          seo_description: formData.get("seo_description"),
          featured: formData.get("featured") === "on",
          status: formData.get("status"),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not create story.");
      form.reset();
      setMessage("Story created.");
      onCreated();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not create story.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <details className="rounded-2xl bg-white p-6 dark:bg-be-800">
      <summary className="cursor-pointer text-lg font-bold text-be-900 dark:text-white">Write a story</summary>
      <p className="mt-2 text-sm text-be-600 dark:text-zinc-400">Create original editorial content here. You can save it as a draft or publish it now.</p>
      <p className="mt-2 text-sm text-be-600 dark:text-zinc-400">SEO title and description help Google and other search engines describe a published story. They do not control the site&apos;s own search box or guarantee ranking.</p>
      <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Title<input name="title" required minLength={3} maxLength={160} className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Subtitle<input name="subtitle" maxLength={240} className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Author<input name="author_name" required minLength={2} maxLength={100} className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Author email (optional)<input type="email" name="author_email" className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Category<input name="category" defaultValue="Personal Reflections" maxLength={80} className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Featured image path or HTTPS URL (optional)<input name="image_url" className={fieldClass} placeholder="/images/story.jpg" /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Tags (comma separated)<input name="tags" className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">Excerpt<textarea name="excerpt" rows={2} maxLength={500} className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">Story body<textarea name="content" required minLength={20} maxLength={30000} rows={12} className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">SEO title<input name="seo_title" maxLength={160} className={fieldClass} /><span className="block text-xs font-normal text-be-500">The title search engines may show. It can be different from your visible story headline. Example: “A Father’s Journey Toward Hope | Beard &amp; Diapers”.</span></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">SEO description<textarea name="seo_description" maxLength={320} rows={2} className={fieldClass} /><span className="block text-xs font-normal text-be-500">A 1–2 sentence search preview that summarizes the article. Example: “A father reflects on finding hope and purpose in everyday family life.”</span></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Publish state<select name="status" className={fieldClass}><option value="draft">Save draft</option><option value="published">Publish now</option></select></label>
        <label className="flex items-center gap-2 text-sm text-be-700 dark:text-zinc-300"><input name="featured" type="checkbox" />Mark as featured (editorial flag only)</label>
        <div className="flex items-center gap-3 sm:col-span-2">
          <button disabled={busy} className="rounded-full bg-be-700 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">{busy ? "Saving…" : "Create story"}</button>
          {message && <p role="status" className="text-sm text-be-700 dark:text-zinc-300">{message}</p>}
        </div>
      </form>
    </details>
  );
}
