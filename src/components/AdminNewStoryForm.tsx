"use client";

import { useEffect, useState, type FormEvent } from "react";
import { STORY_CATEGORIES } from "@/lib/content-categories";
import { RichTextEditor } from "@/components/RichTextEditor";
import { EditorialPreview } from "@/components/EditorialPreview";

type NewStoryPreview = { title: string; subtitle: string; category: string; author: string; date: string; image: string | null; content: string };

const fieldClass = "w-full rounded-md bg-be-50 px-3 py-2 text-sm text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white";

export function AdminNewStoryForm({ onCreated }: { onCreated: () => void }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [browserDraft, setBrowserDraft] = useState("");
  const [storageReady, setStorageReady] = useState(false);
  const [preview, setPreview] = useState<NewStoryPreview | null>(null);

  useEffect(() => () => {
    if (preview?.image?.startsWith("blob:")) URL.revokeObjectURL(preview.image);
  }, [preview]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBrowserDraft(window.localStorage.getItem("admin-new-story-body") || "");
      setStorageReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!storageReady || browserDraft) return;
    const timer = window.setTimeout(() => {
      if (content) window.localStorage.setItem("admin-new-story-body", content);
      else window.localStorage.removeItem("admin-new-story-body");
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [browserDraft, content, storageReady]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setMessage("");
    const formData = new FormData(form);
    const plainContent = content.replace(/<[^>]*>/g, " ").trim();
    if (plainContent.length < 20) {
      setBusy(false);
      setMessage("Write at least 20 characters in the story body.");
      return;
    }
    formData.set("content", content);
    if (status === "scheduled") {
      const scheduledAt = String(formData.get("scheduled_at") || "");
      if (!scheduledAt || Number.isNaN(Date.parse(scheduledAt)) || Date.parse(scheduledAt) <= Date.now()) {
        setBusy(false);
        setMessage("Choose a future date and time to schedule this story.");
        return;
      }
      formData.set("scheduled_at", new Date(scheduledAt).toISOString());
    }
    const tags = String(formData.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean);
    formData.set("tags", tags.join(","));
    try {
      const response = await fetch("/api/admin/stories", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not create story.");
      form.reset();
      setContent("");
      setStatus("draft");
      setPreview(null);
      window.localStorage.removeItem("admin-new-story-body");
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
        {browserDraft && <div className="rounded-lg bg-be-50 p-3 text-sm text-be-700 dark:bg-be-900 dark:text-zinc-200 sm:col-span-2"><p>A previous unsaved story body is saved in this browser.</p><div className="mt-2 flex gap-4"><button type="button" className="font-semibold underline" onClick={() => { setContent(browserDraft); setBrowserDraft(""); }}>Recover it</button><button type="button" className="underline" onClick={() => { setBrowserDraft(""); window.localStorage.removeItem("admin-new-story-body"); }}>Discard it</button></div></div>}
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Title<input name="title" required minLength={3} maxLength={160} className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Subtitle<input name="subtitle" maxLength={240} className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Author<input name="author_name" required minLength={2} maxLength={100} className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Author email (optional)<input type="email" name="author_email" className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Category<select name="category" defaultValue="Personal Reflections" className={fieldClass}>{STORY_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Featured image (optional)<input type="file" name="image" accept="image/jpeg,image/png,image/webp" className={fieldClass} /><span className="block text-xs font-normal text-be-500">Choose a JPG, PNG, or WebP image up to 10 MB. Leave empty to publish without a photo.</span></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Tags (comma separated)<input name="tags" className={fieldClass} /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">Excerpt<textarea name="excerpt" rows={2} maxLength={500} className={fieldClass} /></label>
        <div className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2"><span className="block">Story body</span><input type="hidden" name="content" value={content} /><RichTextEditor value={content} onChange={setContent} minHeight={300} /></div>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">SEO title<input name="seo_title" maxLength={160} className={fieldClass} /><span className="block text-xs font-normal text-be-500">The title search engines may show. It can be different from your visible story headline. Example: “A Father’s Journey Toward Hope | Beard &amp; Diapers”.</span></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">SEO description<textarea name="seo_description" maxLength={320} rows={2} className={fieldClass} /><span className="block text-xs font-normal text-be-500">A 1–2 sentence search preview that summarizes the article. Example: “A father reflects on finding hope and purpose in everyday family life.”</span></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Publish state<select name="status" value={status} onChange={(event) => setStatus(event.target.value)} className={fieldClass}><option value="draft">Save draft</option><option value="published">Publish now</option><option value="scheduled">Schedule publication</option></select></label>
        {status === "scheduled" && <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Publish at (your local time)<input type="datetime-local" name="scheduled_at" required className={fieldClass} /></label>}
        <label className="flex items-center gap-2 text-sm text-be-700 dark:text-zinc-300"><input name="featured" type="checkbox" />Mark as featured (editorial flag only)</label>
        <div className="flex items-center gap-3 sm:col-span-2">
          <button disabled={busy} className="rounded-full bg-be-700 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">{busy ? "Saving…" : "Create story"}</button>
          <button type="button" disabled={busy} onClick={(event) => {
            const form = event.currentTarget.form;
            if (!form) return;
            const values = new FormData(form);
            const selectedImage = values.get("image");
            const image = selectedImage instanceof File && selectedImage.size ? URL.createObjectURL(selectedImage) : null;
            setPreview({
              title: String(values.get("title") || ""),
              subtitle: String(values.get("subtitle") || ""),
              category: String(values.get("category") || ""),
              author: String(values.get("author_name") || ""),
              date: status === "scheduled" ? String(values.get("scheduled_at") || "Scheduled publication") : new Date().toLocaleDateString(),
              image,
              content,
            });
          }} className="rounded-full border border-be-300 px-5 py-2.5 text-sm font-medium text-be-800 dark:border-be-600 dark:text-zinc-100">Preview story</button>
          {message && <p role="status" className="text-sm text-be-700 dark:text-zinc-300">{message}</p>}
        </div>
      </form>
      {preview && <div className="mt-5"><EditorialPreview {...preview} /></div>}
    </details>
  );
}
