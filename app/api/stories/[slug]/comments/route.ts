import { NextResponse } from "next/server";
import { isSameOriginRequest } from "@/lib/same-origin-request";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!getSupabaseConfig()) return NextResponse.json({ error: "Comments are not configured yet." }, { status: 503 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const { slug } = await params;
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  if (typeof body?.website === "string" && body.website.trim()) {
    return NextResponse.json({ success: true, message: "Thanks. Your comment is waiting for review." }, { status: 201 });
  }
  if (!/^[a-z0-9-]{1,120}$/.test(slug) || name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || content.length < 3 || content.length > 2000) {
    return NextResponse.json({ error: "Enter your name, a valid email, and a comment between 3 and 2,000 characters." }, { status: 400 });
  }

  try {
    const stories = await supabaseRest<Array<{ slug: string }>>(`stories?select=slug&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`);
    if (!stories[0]) return NextResponse.json({ error: "Story not found." }, { status: 404 });
    await supabaseRest<unknown>("story_comments", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ story_slug: slug, author_name: name, author_email: email, content, status: "pending" }),
    });
    return NextResponse.json({ success: true, message: "Thanks. Your comment is waiting for review." }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Comments are not enabled yet. Apply the story comments migration in Supabase, then try again." }, { status: 502 });
  }
}
