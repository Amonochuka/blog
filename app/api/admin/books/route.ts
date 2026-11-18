import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { isSameOriginRequest } from "@/lib/same-origin-request";
import { supabaseRest } from "@/lib/supabase-rest";
import { clearContentAutosave, saveContentRevision } from "@/lib/content-history";
import { sanitizeRichContent } from "@/lib/rich-content";

type BookRow = {
  id: string;
  slug: string;
  title: string;
  author: string;
  tagline: string;
  description: string;
  cover: string;
  status: string;
  total_chapters: number;
  position: number;
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
  position: number;
};

export async function GET() {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const [books, chapters] = await Promise.all([
      supabaseRest<BookRow[]>("books?select=*&order=position.asc,title.asc"),
      supabaseRest<ChapterRow[]>("book_chapters?select=*&order=book_slug.asc,position.asc,number.asc"),
    ]);
    return NextResponse.json({ books: books.map((book) => ({ ...book, chapters: chapters.filter((chapter) => chapter.book_slug === book.slug) })) });
  } catch {
    return NextResponse.json({ error: "Book management is not configured. Apply the book CMS migration in Supabase, then try again." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid book or chapter." }, { status: 400 });

  try {
    if (body.kind === "book") {
      const item = body.book ?? {};
      const slug = typeof item.slug === "string" ? item.slug.trim().toLowerCase() : "";
      const title = typeof item.title === "string" ? item.title.trim() : "";
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || title.length < 2 || title.length > 180) {
        return NextResponse.json({ error: "Use a short lowercase book slug and a title." }, { status: 400 });
      }
      const status = ["serializing", "coming_soon", "completed"].includes(item.status) ? item.status : "coming_soon";
      const cover = typeof item.cover === "string" ? item.cover.trim() : "";
      if (!(cover.startsWith("/") || cover.startsWith("https://"))) {
        return NextResponse.json({ error: "Add a cover image path starting with / or an HTTPS image URL." }, { status: 400 });
      }
      const values = {
        slug,
        title,
        author: typeof item.author === "string" ? item.author.trim().slice(0, 120) : "",
        tagline: typeof item.tagline === "string" ? item.tagline.trim().slice(0, 300) : "",
        description: typeof item.description === "string" ? item.description.trim().slice(0, 3000) : "",
        cover: cover.slice(0, 500),
        status,
        total_chapters: Number.isInteger(item.total_chapters) ? Math.max(0, Math.min(10000, item.total_chapters)) : 0,
        position: Number.isInteger(item.position) ? item.position : 0,
        updated_at: new Date().toISOString(),
      };
      if (typeof item.id === "string" && /^[0-9a-f-]{36}$/i.test(item.id)) {
        await supabaseRest<unknown>(`books?id=eq.${item.id}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(values) });
      } else {
        await supabaseRest<unknown>("books", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(values) });
      }
      return NextResponse.json({ success: true });
    }

    if (body.kind === "chapter") {
      const item = body.chapter ?? {};
      const bookSlug = typeof item.book_slug === "string" ? item.book_slug.trim() : "";
      const number = Number(item.number);
      const title = typeof item.title === "string" ? item.title.trim() : "";
      const content = typeof item.content === "string" ? sanitizeRichContent(item.content.trim()) : "";
      const imageUrl = typeof item.image_url === "string" ? item.image_url.trim() : "";
      const status = ["draft", "scheduled", "published"].includes(item.status) ? item.status : "draft";
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(bookSlug) || !Number.isInteger(number) || number < 1 || title.length < 2 || content.length < 1 || content.length > 100000) {
        return NextResponse.json({ error: "Choose a book and enter a valid chapter number, title, and content." }, { status: 400 });
      }
      const scheduledAt = typeof item.scheduled_at === "string" && item.scheduled_at ? new Date(item.scheduled_at) : null;
      if (status === "scheduled" && (!scheduledAt || Number.isNaN(scheduledAt.getTime()))) {
        return NextResponse.json({ error: "Choose a valid scheduled publication date and time." }, { status: 400 });
      }
      const values = {
        book_slug: bookSlug,
        number,
        title,
        content,
        image_url: imageUrl.startsWith("/") || imageUrl.startsWith("https://") ? imageUrl.slice(0, 500) : "",
        status,
        scheduled_at: status === "scheduled" ? scheduledAt?.toISOString() : null,
        published_at: status === "published" ? (typeof item.published_at === "string" && !Number.isNaN(Date.parse(item.published_at)) ? new Date(item.published_at).toISOString() : new Date().toISOString()) : null,
        is_free: item.is_free !== false,
        position: Number.isInteger(item.position) ? item.position : number,
        updated_at: new Date().toISOString(),
      };
      if (typeof item.id === "string" && /^[0-9a-f-]{36}$/i.test(item.id)) {
        const previous = await supabaseRest<Array<{ book_slug: string; number: number; title: string; content: string; image_url: string; status: string; scheduled_at: string | null; published_at: string | null; is_free: boolean; position: number }>>(
          `book_chapters?select=book_slug,number,title,content,image_url,status,scheduled_at,published_at,is_free,position&id=eq.${item.id}&limit=1`
        );
        if (previous[0]) await saveContentRevision("chapter", item.id, previous[0]);
        await supabaseRest<unknown>(`book_chapters?id=eq.${item.id}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(values) });
        await clearContentAutosave("chapter", item.id).catch((error) => console.error("Could not remove saved chapter draft:", error));
      } else {
        await supabaseRest<unknown>("book_chapters", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(values) });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown publishing item." }, { status: 400 });
  } catch (error) {
    console.error("Admin book save failed:", error);
    return NextResponse.json({ error: "Could not save this publishing item. Check the book CMS migration and unique chapter number." }, { status: 502 });
  }
}
