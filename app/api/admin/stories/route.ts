import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { isSameOriginRequest } from "@/lib/same-origin-request";
import { supabaseRest } from "@/lib/supabase-rest";
import { randomUUID } from "node:crypto";

type StoryAdminRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  author_email: string;
  image_path: string | null;
  status: string;
  publication_permission: boolean;
  publication_permission_at: string | null;
  created_at: string;
  subtitle: string;
  tags: string[];
  related_story_slugs: string[];
  featured: boolean;
  seo_title: string;
  seo_description: string;
};

export async function GET() {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const stories = await supabaseRest<StoryAdminRow[]>("stories?select=*&order=created_at.desc");
    return NextResponse.json({ stories });
  } catch {
    return NextResponse.json({ error: "Could not load stories. Check Supabase setup." }, { status: 502 });
  }
}

export async function PATCH(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  const { id, status, editorial } = await request.json().catch(() => ({}));
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid story update." }, { status: 400 });
  }

  try {
    if (editorial && typeof editorial === "object") {
      const cleanString = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : null;
      const title = cleanString(editorial.title, 160);
      const author_name = cleanString(editorial.author_name, 100);
      const content = cleanString(editorial.content, 30000);
      const tags = Array.isArray(editorial.tags) ? editorial.tags.filter((tag: unknown) => typeof tag === "string").map((tag: string) => tag.trim()).filter(Boolean).slice(0, 20) : [];
      const related_story_slugs = Array.isArray(editorial.related_story_slugs) ? editorial.related_story_slugs.filter((slug: unknown) => typeof slug === "string").map((slug: string) => slug.trim()).filter((slug: string) => /^[a-z0-9-]{1,120}$/.test(slug)).slice(0, 10) : [];
      if (!title || title.length < 3 || !author_name || author_name.length < 2 || !content || content.length < 20) {
        return NextResponse.json({ error: "Title, author, and a story body of at least 20 characters are required." }, { status: 400 });
      }
      await supabaseRest<unknown>(`stories?id=eq.${id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({
          title,
          subtitle: cleanString(editorial.subtitle, 240) ?? "",
          excerpt: cleanString(editorial.excerpt, 500) ?? "",
          content,
          category: cleanString(editorial.category, 80) ?? "Community",
          author_name,
          tags,
          related_story_slugs,
          featured: editorial.featured === true,
          seo_title: cleanString(editorial.seo_title, 160) ?? "",
          seo_description: cleanString(editorial.seo_description, 320) ?? "",
          image_url: typeof editorial.image_url === "string" && ((editorial.image_url.startsWith("/") && !editorial.image_url.startsWith("//")) || editorial.image_url.startsWith("https://"))
            ? editorial.image_url.trim().slice(0, 500)
            : null,
          published_at: typeof editorial.published_at === "string" && /^\d{4}-\d{2}-\d{2}$/.test(editorial.published_at)
            ? `${editorial.published_at}T12:00:00.000Z`
            : null,
        }),
      });
      return NextResponse.json({ success: true });
    }
    if (!["published", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid story update." }, { status: 400 });
    }
    await supabaseRest<unknown>(`stories?id=eq.${id}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status, published_at: status === "published" ? new Date().toISOString() : null }),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not update this story. For editorial edits, apply the story editorial metadata migration in Supabase." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid story." }, { status: 400 });

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const author = typeof body.author_name === "string" ? body.author_name.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const requestedExcerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
  const excerpt = requestedExcerpt || content.replace(/\s+/g, " ").slice(0, 220);
  const category = typeof body.category === "string" ? body.category.trim() : "Community";
  const imageUrl = typeof body.image_url === "string" ? body.image_url.trim() : "";
  const status = body.status === "published" ? "published" : "draft";
  if (title.length < 3 || title.length > 160 || author.length < 2 || author.length > 100 || content.length < 20 || content.length > 30000 || excerpt.length > 500 || category.length > 80) {
    return NextResponse.json({ error: "Enter a title, author, category, excerpt, and story body within the stated limits." }, { status: 400 });
  }
  const tags = Array.isArray(body.tags) ? body.tags.filter((tag: unknown) => typeof tag === "string").map((tag: string) => tag.trim()).filter(Boolean).slice(0, 20) : [];
  const slugBase = title.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90) || "story";
  const slug = `${slugBase}-${randomUUID().slice(0, 8)}`;
  try {
    const [story] = await supabaseRest<Array<{ id: string; slug: string }>>("stories", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        slug,
        title,
        subtitle: typeof body.subtitle === "string" ? body.subtitle.trim().slice(0, 240) : "",
        excerpt,
        content,
        category,
        author_name: author,
        author_email: typeof body.author_email === "string" && body.author_email.includes("@") ? body.author_email.trim().slice(0, 254) : null,
        image_url: (imageUrl.startsWith("/") && !imageUrl.startsWith("//")) || imageUrl.startsWith("https://") ? imageUrl.slice(0, 500) : null,
        tags,
        related_story_slugs: [],
        featured: body.featured === true,
        seo_title: typeof body.seo_title === "string" ? body.seo_title.trim().slice(0, 160) : "",
        seo_description: typeof body.seo_description === "string" ? body.seo_description.trim().slice(0, 320) : "",
        status,
        publication_permission: false,
        published_at: status === "published" ? new Date().toISOString() : null,
      }),
    });
    return NextResponse.json({ success: true, story }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not create this story. Apply the story editorial metadata migration in Supabase, then try again." }, { status: 502 });
  }
}
