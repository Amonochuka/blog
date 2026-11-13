import { NextResponse } from "next/server";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!getSupabaseConfig()) return NextResponse.json({ error: "Story storage is not configured." }, { status: 503 });
  const { slug } = await params;

  try {
    const stories = await supabaseRest<Array<{ id: string; slug: string; title: string; excerpt: string; content: string; category: string; author_name: string; image_url: string; published_at: string | null }>>(
      `stories?select=id,slug,title,excerpt,content,category,author_name,image_url,published_at&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`
    );
    if (!stories[0]) return NextResponse.json({ error: "Story not found." }, { status: 404 });
    return NextResponse.json({ story: stories[0] });
  } catch {
    return NextResponse.json({ error: "Could not load this story." }, { status: 502 });
  }
}
