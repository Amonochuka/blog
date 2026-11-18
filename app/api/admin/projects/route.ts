import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { isSameOriginRequest } from "@/lib/same-origin-request";
import { supabaseRest } from "@/lib/supabase-rest";

export const dynamic = "force-dynamic";

type ProjectRow = {
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

export async function GET() {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const projects = await supabaseRest<ProjectRow[]>("projects?select=*&order=featured.desc,position.asc,name.asc");
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ error: "Project management is not configured. Apply the project CMS migration in Supabase, then try again." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  const body = await request.json().catch(() => null);
  const item = body?.project;
  if (!item || typeof item !== "object") return NextResponse.json({ error: "Invalid project details." }, { status: 400 });

  const id = typeof item.id === "string" && /^[0-9a-f-]{36}$/i.test(item.id) ? item.id : null;
  const slug = typeof item.slug === "string" ? item.slug.trim().toLowerCase() : "";
  const name = typeof item.name === "string" ? item.name.trim() : "";
  const location = typeof item.location === "string" ? item.location.trim() : "";
  const year = typeof item.year === "string" ? item.year.trim() : "";
  const description = typeof item.description === "string" ? item.description.trim() : "";
  const why = typeof item.why === "string" ? item.why.trim() : "";
  const story = typeof item.story === "string" ? item.story.trim() : "";
  const outcomes = typeof item.outcomes === "string" ? item.outcomes.trim() : "";
  const photos: string[] = Array.isArray(item.photos) ? (item.photos as unknown[]).filter((value): value is string => typeof value === "string").map((value) => value.trim()).filter(Boolean).slice(0, 12) : [];
  const people: string[] = Array.isArray(item.people) ? (item.people as unknown[]).filter((value): value is string => typeof value === "string").map((value) => value.trim()).filter(Boolean).slice(0, 20) : [];

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || name.length < 2 || name.length > 180 || location.length > 160 || year.length > 20 || description.length > 3000 || why.length > 2000 || story.length > 10000 || outcomes.length > 3000 || photos.length === 0 || photos.some((photo) => !(photo.startsWith("/") && !photo.startsWith("//")) && !photo.startsWith("https://")) || people.some((person) => person.length > 100)) {
    return NextResponse.json({ error: "Check the project fields and add at least one valid project photo." }, { status: 400 });
  }

  try {
    if (id) {
      const previous = await supabaseRest<Array<{ slug: string }>>(`projects?select=slug&id=eq.${id}&limit=1`);
      if (!previous[0]) return NextResponse.json({ error: "That project no longer exists. Refresh the project list." }, { status: 404 });
      if (previous[0].slug !== slug) return NextResponse.json({ error: "A saved project’s URL slug cannot be changed because published stories may be linked to it." }, { status: 400 });
    }

    const values = {
      slug,
      name,
      location,
      year: year || null,
      description,
      why,
      story,
      image: photos[0],
      photos,
      people,
      outcomes,
      featured: item.featured === true,
      position: Number.isInteger(item.position) ? Math.max(0, Math.min(10000, item.position)) : 0,
      updated_at: new Date().toISOString(),
    };
    if (id) {
      await supabaseRest<unknown>(`projects?id=eq.${id}`, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(values) });
    } else {
      await supabaseRest<unknown>("projects", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(values) });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin project save failed:", error);
    return NextResponse.json({ error: "Could not save this project. Check the project CMS migration and make sure its slug is unique." }, { status: 502 });
  }
}
