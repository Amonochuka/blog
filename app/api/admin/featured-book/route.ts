import { NextResponse } from "next/server";
import { books } from "@/content/books";
import { hasAdminSession } from "@/lib/admin-session";
import { isSameOriginRequest } from "@/lib/same-origin-request";
import { supabaseRest } from "@/lib/supabase-rest";

export async function GET() {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const settings = await supabaseRest<Array<{ value: string }>>(
      "site_settings?select=value&key=eq.featured_book_slug&limit=1"
    );
    const selectedSlug = settings[0]?.value;
    const featuredBookSlug = books.some((book) => book.slug === selectedSlug)
      ? selectedSlug
      : books[0]?.slug ?? "";

    return NextResponse.json({
      books: books.map(({ slug, title }) => ({ slug, title })),
      featuredBookSlug,
    });
  } catch {
    return NextResponse.json({ error: "Could not load featured book settings. Run the featured book migration in Supabase, then try again." }, { status: 502 });
  }
}

export async function PATCH(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  const { slug } = await request.json().catch(() => ({}));
  if (typeof slug !== "string" || !books.some((book) => book.slug === slug)) {
    return NextResponse.json({ error: "Choose a book from the list." }, { status: 400 });
  }

  try {
    await supabaseRest<unknown>("site_settings?on_conflict=key", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        key: "featured_book_slug",
        value: slug,
        updated_at: new Date().toISOString(),
      }),
    });
    return NextResponse.json({ success: true, featuredBookSlug: slug });
  } catch {
    return NextResponse.json({ error: "Could not save the featured book. Check that the featured book migration has been run in Supabase." }, { status: 502 });
  }
}
