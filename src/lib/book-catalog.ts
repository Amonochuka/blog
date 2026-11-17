import { books as staticBooks } from "@/content/books";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";

export type BookChapter = {
  id?: string;
  number: number;
  title: string;
  content?: string;
  image_url?: string;
  free: boolean;
  status?: "draft" | "scheduled" | "published";
  scheduled_at?: string | null;
  published_at?: string | null;
};

export type CatalogBook = {
  id: string;
  slug: string;
  title: string;
  author: string;
  tagline: string;
  description: string;
  cover: string;
  status: "serializing" | "coming_soon" | "completed";
  totalDays: number;
  chapters: BookChapter[];
};

type BookRow = {
  id: string;
  slug: string;
  title: string;
  author: string;
  tagline: string;
  description: string;
  cover: string;
  status: CatalogBook["status"];
  total_chapters: number;
};

type ChapterRow = {
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
};

export function staticBookCatalog(): CatalogBook[] {
  return staticBooks.map((book) => ({
    id: book.id,
    slug: book.slug,
    title: book.title,
    author: book.author,
    tagline: book.tagline,
    description: book.description,
    cover: book.cover,
    status: book.status as CatalogBook["status"],
    totalDays: book.totalDays,
    chapters: book.chapters.map((chapter) => ({ ...chapter })),
  }));
}

export async function getBookCatalog(options: { includeUnpublished?: boolean } = {}): Promise<CatalogBook[]> {
  if (!getSupabaseConfig()) return staticBookCatalog();
  try {
    const [bookRows, chapterRows] = await Promise.all([
      supabaseRest<BookRow[]>("books?select=*&order=position.asc,title.asc"),
      supabaseRest<ChapterRow[]>("book_chapters?select=*&order=book_slug.asc,position.asc,number.asc"),
    ]);
    const now = Date.now();
    return bookRows.map((book) => ({
      id: book.id,
      slug: book.slug,
      title: book.title,
      author: book.author,
      tagline: book.tagline,
      description: book.description,
      cover: book.cover,
      status: book.status,
      totalDays: book.total_chapters || chapterRows.filter((row) => row.book_slug === book.slug).length,
      chapters: chapterRows
        .filter((row) => row.book_slug === book.slug)
        .filter((row) => options.includeUnpublished || row.status === "published" || (row.status === "scheduled" && row.scheduled_at && Date.parse(row.scheduled_at) <= now))
        .map((row) => ({
          id: row.id,
          number: row.number,
          title: row.title,
          content: row.content,
          image_url: row.image_url,
          free: row.is_free,
          status: row.status,
          scheduled_at: row.scheduled_at,
          published_at: row.published_at,
        })),
    }));
  } catch (error) {
    console.error("Could not load the database book catalog:", error);
    return staticBookCatalog();
  }
}

export async function getPublishedChapter(slug: string, number: number) {
  if (!getSupabaseConfig()) return null;
  try {
    const rows = await supabaseRest<ChapterRow[]>(
      `book_chapters?select=*&book_slug=eq.${encodeURIComponent(slug)}&number=eq.${number}&limit=1`
    );
    const row = rows[0];
    if (!row) return null;
    const isPublic = row.status === "published" || (row.status === "scheduled" && row.scheduled_at && Date.parse(row.scheduled_at) <= Date.now());
    if (!isPublic) return null;
    return { title: row.title, content: row.content, free: row.is_free, image_url: row.image_url };
  } catch (error) {
    console.error("Could not load the database chapter:", error);
    return null;
  }
}
