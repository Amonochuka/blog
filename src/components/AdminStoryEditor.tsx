"use client";

import { useState } from "react";

export type EditableStory = {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  tags: string[];
  related_story_slugs: string[];
  featured: boolean;
  seo_title: string;
  seo_description: string;
  published_at: string | null;
};

export function AdminStoryEditor({ story, onSaved }: { story: EditableStory; onSaved: () => void }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [fields, setFields] = useState({
    title: story.title,
    subtitle: story.subtitle || "",
    excerpt: story.excerpt,
    content: story.content,
    category: story.category,
    author_name: story.author_name,
    tags: (story.tags || []).join(", "),
    related_story_slugs: (story.related_story_slugs || []).join(", "),
    featured: Boolean(story.featured),
    seo_title: story.seo_title || "",
    seo_description: story.seo_description || "",
    published_at: story.published_at ? story.published_at.slice(0, 10) : "",
  });

  function update(name: keyof typeof fields, value: string | boolean) {
    setFields((current) => ({ ...current, [name]: value }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/stories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: story.id,
          editorial: {
            ...fields,
            tags: fields.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
            related_story_slugs: fields.related_story_slugs.split(",").map((slug) => slug.trim()).filter(Boolean),
            published_at: fields.published_at,
          },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save this story.");
      setMessage("Story saved.");
      onSaved();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save this story.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full rounded-md bg-be-50 px-3 py-2 text-sm text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white";

  return (
    <details className="mt-5 rounded-xl border border-be-200 p-4 dark:border-be-700">
      <summary className="cursor-pointer font-semibold text-be-800 dark:text-zinc-200">Edit story and publishing details</summary>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {(["title", "subtitle", "author_name", "category", "seo_title", "published_at"] as const).map((name) => (
          <label key={name} className="space-y-1 text-xs font-semibold capitalize text-be-600 dark:text-zinc-300">
            {name.replaceAll("_", " ")}
            <input type={name === "published_at" ? "date" : "text"} className={inputClass} value={fields[name]} onChange={(event) => update(name, event.target.value)} />
          </label>
        ))}
        <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300 sm:col-span-2">
          Excerpt
          <textarea className={inputClass} rows={2} value={fields.excerpt} onChange={(event) => update("excerpt", event.target.value)} />
        </label>
        <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300 sm:col-span-2">
          Story body
          <textarea className={inputClass} rows={12} value={fields.content} onChange={(event) => update("content", event.target.value)} />
        </label>
        <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300">
          Tags (comma separated)
          <input className={inputClass} value={fields.tags} onChange={(event) => update("tags", event.target.value)} />
        </label>
        <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300">
          Related story slugs (comma separated)
          <input className={inputClass} value={fields.related_story_slugs} onChange={(event) => update("related_story_slugs", event.target.value)} />
        </label>
        <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300 sm:col-span-2">
          SEO description
          <textarea className={inputClass} rows={2} value={fields.seo_description} onChange={(event) => update("seo_description", event.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm text-be-700 dark:text-zinc-200 sm:col-span-2">
          <input type="checkbox" checked={fields.featured} onChange={(event) => update("featured", event.target.checked)} />
          Mark as featured (editorial flag; no homepage feature block)
        </label>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button type="button" disabled={saving} onClick={() => void save()} className="rounded-full bg-be-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{saving ? "Saving…" : "Save story"}</button>
        {message && <p role="status" className="text-sm text-be-600 dark:text-zinc-300">{message}</p>}
      </div>
    </details>
  );
}
