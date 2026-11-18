"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type FormEvent } from "react";

type ProjectRecord = {
  id: string;
  slug: string;
  name: string;
  location: string;
  year: string | null;
  description: string;
  why: string;
  story: string;
  image: string;
  photos: string[];
  people: string[];
  outcomes: string;
  featured: boolean;
  position: number;
};

type ProjectFields = Omit<ProjectRecord, "id" | "people" | "image" | "year"> & { people: string; year: string };

const inputClass = "w-full rounded-md bg-be-50 px-3 py-2.5 text-sm text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white";
const blankProject: ProjectFields = {
  slug: "", name: "", location: "", year: "", description: "", why: "", story: "",
  photos: [], people: "", outcomes: "", featured: false, position: 0,
};

export function AdminProjectsManager() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [fields, setFields] = useState<ProjectFields>(blankProject);
  const [editingId, setEditingId] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/projects", { signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load projects.");
      setProjects(data.projects || []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  function edit(project?: ProjectRecord) {
    setFormOpen(true);
    setEditingId(project?.id || "");
    setFields(project ? {
      slug: project.slug,
      name: project.name,
      location: project.location,
      year: project.year || "",
      description: project.description,
      why: project.why,
      story: project.story,
      photos: [...project.photos],
      people: project.people.join("\n"),
      outcomes: project.outcomes,
      featured: project.featured,
      position: project.position,
    } : { ...blankProject });
    setFiles([]);
    setError("");
    setMessage("");
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId("");
    setFields({ ...blankProject });
    setFiles([]);
  }

  function set<K extends keyof ProjectFields>(key: K, value: ProjectFields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  function removePhoto(index: number) {
    set("photos", fields.photos.filter((_, photoIndex) => photoIndex !== index));
  }

  function makePrimary(index: number) {
    set("photos", [fields.photos[index], ...fields.photos.filter((_, photoIndex) => photoIndex !== index)]);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    try {
      if (fields.photos.length + files.length > 12) throw new Error("A project can have up to 12 photos.");
      const newPhotos: string[] = [];
      for (const file of files) {
        const form = new FormData();
        form.set("image", file);
        form.set("purpose", "project");
        const response = await fetch("/api/admin/books/media", { method: "POST", body: form });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || `Could not upload ${file.name}.`);
        newPhotos.push(data.imageUrl);
      }
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project: {
          ...fields,
          id: editingId || undefined,
          year: fields.year || null,
          photos: [...fields.photos, ...newPhotos],
          people: fields.people.split("\n").map((person) => person.trim()).filter(Boolean),
        } }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save the project.");
      setMessage(editingId ? "Project updated." : "Project added.");
      closeForm();
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save the project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-be-900 dark:text-white">Projects</h2>
          <p className="mt-1 text-sm text-be-600 dark:text-zinc-400">Manage the project stories and photos shown on the website.</p>
        </div>
        <button type="button" onClick={() => edit()} className="rounded-full bg-be-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-be-900">Add project</button>
      </header>

      {loading ? <p role="status" className="rounded-xl bg-white p-5 text-sm text-be-600 dark:bg-be-800 dark:text-zinc-300">Loading projects…</p> : (
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="flex items-center gap-4 rounded-xl bg-white p-4 dark:bg-be-800">
              {project.image && <Image src={project.image} alt="" width={96} height={72} unoptimized className="h-18 w-24 rounded-lg object-cover" />}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-be-900 dark:text-white">{project.name}</h3>
                <p className="text-sm text-be-600 dark:text-zinc-400">{project.location}{project.year ? ` · ${project.year}` : ""}</p>
                <p className="text-xs text-be-500 dark:text-zinc-400">{project.photos.length} {project.photos.length === 1 ? "photo" : "photos"}{project.featured ? " · Featured" : ""}</p>
              </div>
              <button type="button" onClick={() => edit(project)} className="rounded-full border border-be-300 px-4 py-2 text-sm font-medium text-be-800 hover:bg-be-50 dark:border-be-600 dark:text-zinc-100 dark:hover:bg-be-700">Edit</button>
            </article>
          ))}
          {!projects.length && <p className="rounded-xl bg-white p-5 text-sm text-be-600 dark:bg-be-800 dark:text-zinc-300">No projects yet. Add the first project using the button above.</p>}
        </div>
      )}

      {formOpen && (
        <form onSubmit={(event) => void save(event)} className="space-y-5 rounded-2xl bg-white p-6 dark:bg-be-800">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-be-900 dark:text-white">{editingId ? `Edit ${fields.name}` : "Add a project"}</h3>
            <button type="button" onClick={closeForm} className="text-sm text-be-600 underline dark:text-zinc-300">Cancel</button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Project name<input required maxLength={180} className={inputClass} value={fields.name} onChange={(event) => { const name = event.target.value; const currentSlug = fields.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); const nextSlug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); setFields((current) => ({ ...current, name, slug: !editingId && (!current.slug || current.slug === currentSlug) ? nextSlug : current.slug })); }} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">URL slug<input required disabled={Boolean(editingId)} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" className={inputClass} value={fields.slug} onChange={(event) => set("slug", event.target.value)} placeholder="hospital-reading-corners" /><span className="block text-xs text-be-500">Lowercase letters and hyphens. The slug cannot be changed after saving because stories may link to it.</span></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Location<input maxLength={160} className={inputClass} value={fields.location} onChange={(event) => set("location", event.target.value)} placeholder="Nairobi, Kenya" /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Year or date<input maxLength={20} className={inputClass} value={fields.year} onChange={(event) => set("year", event.target.value)} placeholder="2026" /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">Short description<textarea required rows={2} maxLength={3000} className={inputClass} value={fields.description} onChange={(event) => set("description", event.target.value)} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">Why it matters<textarea rows={2} maxLength={2000} className={inputClass} value={fields.why} onChange={(event) => set("why", event.target.value)} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">Story behind the project<textarea rows={4} maxLength={10000} className={inputClass} value={fields.story} onChange={(event) => set("story", event.target.value)} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">People involved <span className="font-normal">(one per line)</span><textarea rows={2} className={inputClass} value={fields.people} onChange={(event) => set("people", event.target.value)} placeholder={"Volunteers\nCommunity members"} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">Outcomes and impact<textarea rows={3} maxLength={3000} className={inputClass} value={fields.outcomes} onChange={(event) => set("outcomes", event.target.value)} /></label>
            <fieldset className="space-y-3 sm:col-span-2">
              <legend className="text-sm font-medium text-be-700 dark:text-zinc-300">Project photos</legend>
              <p className="text-xs text-be-500 dark:text-zinc-400">Choose JPG, PNG, or WebP files up to 10 MB each. The first photo is used on the project card.</p>
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple className={inputClass} onChange={(event) => setFiles(Array.from(event.target.files || []))} />
              {files.length > 0 && <p className="text-xs text-be-600 dark:text-zinc-300">Selected: {files.map((file) => file.name).join(", ")}</p>}
              {fields.photos.length > 0 && <div className="grid gap-3 sm:grid-cols-2">{fields.photos.map((photo, index) => <div key={`${photo}-${index}`} className="flex items-center gap-3 rounded-lg border border-be-100 p-2 dark:border-be-700"><Image src={photo} alt={`Project photo ${index + 1}`} width={88} height={64} unoptimized className="h-16 w-22 rounded object-cover" /><span className="min-w-0 flex-1 truncate text-xs text-be-600 dark:text-zinc-300">Photo {index + 1}{index === 0 ? " · card image" : ""}</span>{index > 0 && <button type="button" onClick={() => makePrimary(index)} className="text-xs text-be-700 underline dark:text-be-200">Make first</button>}<button type="button" onClick={() => removePhoto(index)} className="text-xs text-red-700 underline">Remove</button></div>)}</div>}
            </fieldset>
            <label className="flex items-center gap-2 text-sm text-be-700 dark:text-zinc-300"><input type="checkbox" checked={fields.featured} onChange={(event) => set("featured", event.target.checked)} />Mark as featured project</label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Display order<input type="number" min="0" max="10000" className={inputClass} value={fields.position} onChange={(event) => set("position", Number(event.target.value))} /></label>
          </div>
          <p className="rounded-lg bg-be-50 p-3 text-xs leading-5 text-be-600 dark:bg-be-900 dark:text-zinc-300">To show a published story under this project, edit that story and add the tag <code>project:{fields.slug || "project-slug"}</code>.</p>
          <button disabled={saving} className="rounded-full bg-be-700 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Saving project…" : editingId ? "Save project" : "Add project"}</button>
        </form>
      )}
      {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      {message && <p role="status" className="text-sm text-green-700 dark:text-green-300">{message}</p>}
    </div>
  );
}
