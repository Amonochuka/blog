"use client";

import { useEffect, useState } from "react";
import { STORY_CATEGORIES } from "@/lib/content-categories";
import { RichTextEditor, toRichHtml } from "@/components/RichTextEditor";
import { ContentHistoryControls } from "@/components/ContentHistoryControls";
import { EditorialPreview } from "@/components/EditorialPreview";

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
  scheduled_at?: string | null;
  status?: string;
  image_path?: string | null;
  image_url: string | null;
};

export function AdminStoryEditor({ story, availableStories, onSaved }: { story: EditableStory; availableStories: Array<{ slug: string; title: string }>; onSaved: () => void }) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [historyVersion, setHistoryVersion] = useState(0);
  const [showStoryPreview, setShowStoryPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(story.image_url || (story.image_path ? `/api/admin/stories/${story.id}/image` : null));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [fields, setFields] = useState({
    title: story.title,
    subtitle: story.subtitle || "",
    excerpt: story.excerpt,
    content: story.content,
    category: story.category,
    author_name: story.author_name,
    tags: (story.tags || []).join(", "),
    related_story_slugs: story.related_story_slugs || [],
    featured: Boolean(story.featured),
    seo_title: story.seo_title || "",
    seo_description: story.seo_description || "",
    published_at: story.published_at ? story.published_at.slice(0, 10) : "",
    scheduled_at: story.scheduled_at ? toLocalDateTime(story.scheduled_at) : "",
    status: story.status || "pending",
  });

  function update<Key extends keyof typeof fields>(name: Key, value: (typeof fields)[Key]) {
    setFields((current) => ({ ...current, [name]: value }));
  }

  function restore(snapshot: Record<string, unknown>) {
    const recovered = { ...snapshot } as Record<string, unknown>;
    if (Array.isArray(recovered.tags)) recovered.tags = recovered.tags.join(", ");
    if (recovered.published_at == null) recovered.published_at = "";
    if (recovered.scheduled_at == null) recovered.scheduled_at = "";
    if (typeof recovered.published_at === "string") recovered.published_at = recovered.published_at.slice(0, 10);
    if (typeof recovered.scheduled_at === "string" && recovered.scheduled_at) recovered.scheduled_at = toLocalDateTime(recovered.scheduled_at);
    setFields((current) => ({ ...current, ...recovered }));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const form = new FormData();
      form.set("id", story.id);
      form.set("editorial", JSON.stringify({
        ...fields,
        content: toRichHtml(fields.content),
        tags: fields.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        published_at: fields.published_at,
        scheduled_at: fields.scheduled_at ? new Date(fields.scheduled_at).toISOString() : "",
      }));
      if (imageFile) form.set("image", imageFile);
      form.set("remove_image", String(removeImage));
      const response = await fetch("/api/admin/stories", {
        method: "PATCH",
        body: form,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save this story.");
      setMessage("Story saved.");
      setHistoryVersion((version) => version + 1);
      setImageFile(null);
      setRemoveImage(false);
      onSaved();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save this story.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full rounded-md bg-be-50 px-3 py-2 text-sm text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white";

  function togglePreview() {
    if (showStoryPreview) {
      setShowStoryPreview(false);
      return;
    }
    if (imageFile) setPreviewImage(URL.createObjectURL(imageFile));
    else setPreviewImage(story.image_url || (story.image_path ? `/api/admin/stories/${story.id}/image` : null));
    setShowStoryPreview(true);
  }

  useEffect(() => () => {
    if (previewImage?.startsWith("blob:")) URL.revokeObjectURL(previewImage);
  }, [previewImage]);

function toLocalDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

  return (
    <details onToggle={(event) => setEditorOpen(event.currentTarget.open)} className="mt-5 rounded-xl border border-[color:var(--color-be-200)] p-4 dark:border-[color:var(--color-be-700)]">
      <summary className="cursor-pointer font-semibold text-be-800 dark:text-zinc-200">Edit story and publishing details</summary>
      {editorOpen && <>
      <p className="mt-2 text-sm text-be-600 dark:text-zinc-400">SEO title and description are for Google and other search previews. They do not control the site&apos;s own search box or guarantee ranking.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {(["title", "subtitle", "author_name", "seo_title", "published_at"] as const).map((name) => (
          <label key={name} className="space-y-1 text-xs font-semibold capitalize text-be-600 dark:text-zinc-300">
            {name === "published_at" ? "Publication date" : name === "seo_title" ? "SEO title (search result title)" : name.replaceAll("_", " ")}
            <input type={name === "published_at" ? "date" : "text"} className={inputClass} value={fields[name]} onChange={(event) => update(name, event.target.value)} />
          </label>
        ))}
        <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300">Category
          <select className={inputClass} value={fields.category} onChange={(event) => update("category", event.target.value)}>
            {!STORY_CATEGORIES.includes(fields.category as (typeof STORY_CATEGORIES)[number]) && <option value={fields.category}>{fields.category} (existing category)</option>}
            {STORY_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
        <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300">Publishing status
          <select className={inputClass} value={fields.status} onChange={(event) => update("status", event.target.value)}>
            {!["pending", "draft", "scheduled", "published", "rejected"].includes(fields.status) && <option value={fields.status}>{fields.status}</option>}
            <option value="pending">Pending review</option><option value="draft">Draft</option><option value="scheduled">Scheduled</option><option value="published">Published</option><option value="rejected">Rejected</option>
          </select>
        </label>
        {fields.status === "scheduled" && <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300">Publish at (your local time)
          <input type="datetime-local" className={inputClass} value={fields.scheduled_at} onChange={(event) => update("scheduled_at", event.target.value)} />
        </label>}
        <div className="space-y-2 text-xs font-semibold text-be-600 dark:text-zinc-300 sm:col-span-2">
          <label className="block space-y-1">Featured image (optional)
            <input type="file" accept="image/jpeg,image/png,image/webp" className={inputClass} onChange={(event) => { setImageFile(event.target.files?.[0] ?? null); setRemoveImage(false); }} />
          </label>
          <span className="block font-normal">Choose a JPG, PNG, or WebP image up to 10 MB. Leave empty to keep the current photo.</span>
          {(story.image_path || story.image_url) && <a className="inline-block underline" href={story.image_url || `/api/admin/stories/${story.id}/image`} target="_blank" rel="noreferrer">View current image</a>}
          {imageFile && <span className="block font-normal">Selected: {imageFile.name}</span>}
          {(story.image_path || story.image_url) && <label className="flex items-center gap-2 font-normal"><input type="checkbox" checked={removeImage} onChange={(event) => { setRemoveImage(event.target.checked); if (event.target.checked) setImageFile(null); }} />Remove current photo</label>}
        </div>
        <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300 sm:col-span-2">
          Excerpt
          <textarea className={inputClass} rows={2} value={fields.excerpt} onChange={(event) => update("excerpt", event.target.value)} />
        </label>
        <div className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300 sm:col-span-2">
          <span className="block">Story body</span>
          <RichTextEditor value={fields.content} onChange={(content) => update("content", content)} minHeight={320} />
          <ContentHistoryControls key={historyVersion} type="story" id={story.id} snapshot={fields} onRestore={restore} />
        </div>
        <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300">
          Tags (comma separated)
          <input className={inputClass} value={fields.tags} onChange={(event) => update("tags", event.target.value)} />
        </label>
        <fieldset className="space-y-2 rounded-lg border border-[color:var(--color-be-200)] p-3 text-xs text-be-700 dark:border-[color:var(--color-be-700)] dark:text-zinc-300 sm:col-span-2">
          <legend className="px-1 font-semibold">Related stories</legend>
          <p>Select up to three published stories to link at the bottom of this article. This does not create a category or group.</p>
          {availableStories.length ? <div className="grid gap-2 sm:grid-cols-2">{availableStories.map((relatedStory) => {
            const checked = fields.related_story_slugs.includes(relatedStory.slug);
            return <label key={relatedStory.slug} className="flex items-start gap-2"><input type="checkbox" checked={checked} disabled={!checked && fields.related_story_slugs.length >= 3} onChange={(event) => update("related_story_slugs", event.target.checked ? [...fields.related_story_slugs, relatedStory.slug] : fields.related_story_slugs.filter((slug) => slug !== relatedStory.slug))} /><span>{relatedStory.title}</span></label>;
          })}</div> : <p>No other published stories are available yet.</p>}
        </fieldset>
        <label className="space-y-1 text-xs font-semibold text-be-600 dark:text-zinc-300 sm:col-span-2">
          SEO description <span className="font-normal">(short search-result summary)</span>
          <textarea className={inputClass} rows={2} value={fields.seo_description} onChange={(event) => update("seo_description", event.target.value)} />
        </label>
        <label className="flex items-center gap-2 text-sm text-be-700 dark:text-zinc-200 sm:col-span-2">
          <input type="checkbox" checked={fields.featured} onChange={(event) => update("featured", event.target.checked)} />
          Mark as featured (editorial flag; no homepage feature block)
        </label>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button type="button" disabled={saving} onClick={() => void save()} className="rounded-full bg-be-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{saving ? "Saving…" : "Save story"}</button>
        <button type="button" onClick={togglePreview} className="rounded-full border border-be-300 px-4 py-2 text-sm font-medium text-be-800 dark:border-be-600 dark:text-zinc-100">{showStoryPreview ? "Hide preview" : "Preview story"}</button>
        {message && <p role="status" className="text-sm text-be-600 dark:text-zinc-300">{message}</p>}
      </div>
      {showStoryPreview && <div className="mt-5"><EditorialPreview category={fields.category} title={fields.title} subtitle={fields.subtitle} author={fields.author_name} date={fields.published_at} image={previewImage} content={fields.content} /></div>}
      </>}
    </details>
  );
}
