"use client";

import { useCallback, useEffect, useState } from "react";
import { RichTextEditor, toRichHtml } from "@/components/RichTextEditor";
import { ContentHistoryControls } from "@/components/ContentHistoryControls";

type ChapterRecord = {
  id: string;
  book_slug: string;
  number: number;
  title: string;
  content: string;
  image_url: string;
  status: "draft" | "scheduled" | "published";
  scheduled_at: string | null;
  published_at: string | null;
  is_free: boolean;
  position: number;
};

type BookRecord = {
  id: string;
  slug: string;
  title: string;
  author: string;
  tagline: string;
  description: string;
  cover: string;
  status: "serializing" | "coming_soon" | "completed";
  total_chapters: number;
  position: number;
  chapters: ChapterRecord[];
};

const inputClass = "w-full rounded-md bg-be-50 px-3 py-2 text-sm text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white";
const blankBook = { slug: "", title: "", author: "", tagline: "", description: "", cover: "", status: "coming_soon" as BookRecord["status"], total_chapters: 0, position: 0 };
const blankChapter = { book_slug: "", number: 1, title: "", content: "", image_url: "", status: "draft" as ChapterRecord["status"], scheduled_at: "", is_free: true, position: 1 };

function toLocalDateTime(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

export function AdminBooksManager() {
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [historyVersion, setHistoryVersion] = useState(0);
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState(blankBook);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [chapterId, setChapterId] = useState("");
  const [chapter, setChapter] = useState(blankChapter);
  const [chapterImageFile, setChapterImageFile] = useState<File | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/books", { signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load books.");
      const rows = (data.books || []) as BookRecord[];
      setBooks(rows);
      if (!chapter.book_slug && rows[0]) setChapter((current) => ({ ...current, book_slug: rows[0].slug }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load books.");
    } finally {
      setLoading(false);
    }
  }, [chapter.book_slug]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  function selectBook(id: string) {
    setBookId(id);
    setCoverFile(null);
    const selected = books.find((item) => item.id === id);
    setBook(selected ? {
      slug: selected.slug,
      title: selected.title,
      author: selected.author,
      tagline: selected.tagline,
      description: selected.description,
      cover: selected.cover,
      status: selected.status,
      total_chapters: selected.total_chapters,
      position: selected.position,
    } : blankBook);
  }

  function selectChapter(id: string) {
    setChapterId(id);
    setChapterImageFile(null);
    const selected = books.flatMap((item) => item.chapters).find((item) => item.id === id);
    setChapter(selected ? {
      book_slug: selected.book_slug,
      number: selected.number,
      title: selected.title,
      content: selected.content,
      image_url: selected.image_url || "",
      status: selected.status,
      scheduled_at: toLocalDateTime(selected.scheduled_at),
      is_free: selected.is_free,
      position: selected.position,
    } : { ...blankChapter, book_slug: chapter.book_slug });
  }

  function restoreChapter(snapshot: Record<string, unknown>) {
    const restored = { ...snapshot } as Partial<typeof chapter>;
    if (restored.scheduled_at == null) restored.scheduled_at = "";
    if (typeof restored.scheduled_at === "string" && restored.scheduled_at) restored.scheduled_at = toLocalDateTime(restored.scheduled_at);
    setChapter((current) => ({ ...current, ...restored }));
  }

  async function save(kind: "book" | "chapter") {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      let cover = book.cover;
      let chapterImage = chapter.image_url;
      const imageToUpload = kind === "book" ? coverFile : chapterImageFile;
      if (kind === "book" && !imageToUpload && !book.cover) {
        throw new Error("Choose a cover image from your device before adding a book.");
      }
      if (imageToUpload) {
        const uploadData = new FormData();
        uploadData.set("image", imageToUpload);
        uploadData.set("purpose", kind === "book" ? "cover" : "chapter");
        const uploadResponse = await fetch("/api/admin/books/media", { method: "POST", body: uploadData });
        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadResult.error || "Could not upload this image.");
        if (kind === "book") cover = uploadResult.imageUrl;
        else chapterImage = uploadResult.imageUrl;
      }
      const payload = kind === "book"
        ? { kind, book: { ...book, cover, id: bookId || undefined } }
        : { kind, chapter: { ...chapter, content: toRichHtml(chapter.content), image_url: chapterImage, id: chapterId || undefined, scheduled_at: chapter.scheduled_at ? new Date(chapter.scheduled_at).toISOString() : "" } };
      const response = await fetch("/api/admin/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save publishing content.");
      setMessage(kind === "book" ? "Book saved." : "Chapter saved.");
      if (kind === "chapter" && chapterId) setHistoryVersion((version) => version + 1);
      if (kind === "book") { setBookId(""); setBook(blankBook); setCoverFile(null); }
      else { setChapterId(""); setChapter({ ...blankChapter, book_slug: chapter.book_slug, number: chapter.number + 1, position: chapter.position + 1 }); setChapterImageFile(null); }
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save publishing content.");
    } finally {
      setSaving(false);
    }
  }

  const selectedBook = books.find((item) => item.slug === chapter.book_slug);
  const availableChapters = selectedBook?.chapters ?? [];

  return (
    <div className="mt-8 space-y-8">
      <div className="rounded-2xl bg-white p-6 dark:bg-be-800">
        <h3 className="text-xl font-bold text-be-900 dark:text-white">Books</h3>
        <p className="mt-1 text-sm text-be-600 dark:text-zinc-400">Add a book to the catalog or choose one to edit. Upload its cover image directly from your device.</p>
        {loading ? <p role="status" className="mt-4 text-sm">Loading book catalog…</p> : <>
          {books.length > 0 && <label className="mt-4 block space-y-1 text-sm font-medium text-be-700 dark:text-zinc-300">Edit a book
            <select className={inputClass} value={bookId} onChange={(event) => selectBook(event.target.value)}><option value="">Add a new book</option>{books.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select>
          </label>}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Title<input className={inputClass} value={book.title} onChange={(event) => setBook({ ...book, title: event.target.value })} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Slug<input className={inputClass} value={book.slug} onChange={(event) => setBook({ ...book, slug: event.target.value })} placeholder="lowercase-words" /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Author<input className={inputClass} value={book.author} onChange={(event) => setBook({ ...book, author: event.target.value })} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Tagline<input className={inputClass} value={book.tagline} onChange={(event) => setBook({ ...book, tagline: event.target.value })} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">Description<textarea className={inputClass} rows={3} value={book.description} onChange={(event) => setBook({ ...book, description: event.target.value })} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Book cover image<input required={!bookId && !book.cover} type="file" accept="image/jpeg,image/png,image/webp" className={inputClass} onChange={(event) => setCoverFile(event.target.files?.[0] ?? null)} /><span className="block text-xs font-normal text-be-500">JPG, PNG, or WebP up to 10 MB. {book.cover && !coverFile && <a href={book.cover} target="_blank" rel="noreferrer" className="underline">View current cover</a>}</span>{coverFile && <span className="block text-xs">Selected: {coverFile.name}</span>}</label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Book status<select className={inputClass} value={book.status} onChange={(event) => setBook({ ...book, status: event.target.value as BookRecord["status"] })}><option value="serializing">Currently Serializing</option><option value="coming_soon">Coming Soon</option><option value="completed">Completed</option></select></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Total chapters in the book<input type="number" min="0" className={inputClass} value={book.total_chapters} onChange={(event) => setBook({ ...book, total_chapters: Number(event.target.value) })} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Catalog order<input type="number" className={inputClass} value={book.position} onChange={(event) => setBook({ ...book, position: Number(event.target.value) })} /></label>
          </div>
          <button disabled={saving} onClick={() => void save("book")} className="mt-4 rounded-full bg-be-700 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">{saving ? "Saving…" : bookId ? "Save book" : "Add book"}</button>
        </>}
      </div>

      <div className="rounded-2xl bg-white p-6 dark:bg-be-800">
        <h3 className="text-xl font-bold text-be-900 dark:text-white">Chapters</h3>
        <p className="mt-1 text-sm text-be-600 dark:text-zinc-400">Save a draft, publish now, or schedule a chapter. Number controls reading order; scheduled chapters appear automatically when their date arrives. You can also upload an optional chapter image.</p>
        {books.length === 0 ? (
          <p className="mt-4 rounded-xl border border-be-200 bg-be-50 p-4 text-sm text-be-700 dark:border-be-700 dark:bg-be-900 dark:text-zinc-300">
            Add a book in the Books section above before adding chapters. Once it is in the catalog, you can create and manage its chapters here.
          </p>
        ) : <>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Book<select className={inputClass} value={chapter.book_slug} onChange={(event) => { setChapterId(""); setChapter({ ...blankChapter, book_slug: event.target.value, number: (books.find((item) => item.slug === event.target.value)?.chapters.length ?? 0) + 1 }); }}>
              {books.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
            </select></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Edit existing chapter<select className={inputClass} value={chapterId} onChange={(event) => selectChapter(event.target.value)}><option value="">Add a chapter</option>{availableChapters.map((item) => <option key={item.id} value={item.id}>Day {item.number}: {item.title} ({item.status})</option>)}</select></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Chapter number / order<input type="number" min="1" className={inputClass} value={chapter.number} onChange={(event) => setChapter({ ...chapter, number: Number(event.target.value), position: Number(event.target.value) })} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Title<input className={inputClass} value={chapter.title} onChange={(event) => setChapter({ ...chapter, title: event.target.value })} /></label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">Chapter image (optional)<input type="file" accept="image/jpeg,image/png,image/webp" className={inputClass} onChange={(event) => setChapterImageFile(event.target.files?.[0] ?? null)} /><span className="block text-xs font-normal text-be-500">JPG, PNG, or WebP up to 10 MB. {chapter.image_url && !chapterImageFile && <a href={chapter.image_url} target="_blank" rel="noreferrer" className="underline">View current image</a>}</span>{chapterImageFile && <span className="block text-xs">Selected: {chapterImageFile.name}</span>}</label>
            <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Publication state<select className={inputClass} value={chapter.status} onChange={(event) => setChapter({ ...chapter, status: event.target.value as ChapterRecord["status"] })}><option value="draft">Draft</option><option value="published">Publish immediately</option><option value="scheduled">Schedule publication</option></select></label>
            {chapter.status === "scheduled" && <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Publish at (your local time)<input type="datetime-local" className={inputClass} value={chapter.scheduled_at} onChange={(event) => setChapter({ ...chapter, scheduled_at: event.target.value })} /></label>}
            <label className="flex items-center gap-2 text-sm text-be-700 dark:text-zinc-300"><input type="checkbox" checked={chapter.is_free} onChange={(event) => setChapter({ ...chapter, is_free: event.target.checked })} />Free chapter (premium access is not enabled)</label>
            <div className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2"><span className="block">Chapter content</span><RichTextEditor key={chapterId || "new-chapter"} value={chapter.content} onChange={(content) => setChapter((current) => ({ ...current, content }))} minHeight={320} />{chapterId && <ContentHistoryControls key={historyVersion} type="chapter" id={chapterId} snapshot={chapter} onRestore={restoreChapter} />}</div>
          </div>
          <button disabled={saving} onClick={() => void save("chapter")} className="mt-4 rounded-full bg-be-700 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">{saving ? "Saving…" : chapterId ? "Save chapter" : "Add chapter"}</button>
        </>}
      </div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      {message && <p role="status" className="text-sm text-green-700 dark:text-green-300">{message}</p>}
    </div>
  );
}
