import { NextResponse } from "next/server";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";
import { getPublishedStoryImageUrl } from "@/lib/story-image";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!getSupabaseConfig()) return NextResponse.json({ error: "Story storage is not configured." }, { status: 503 });
  const { slug } = await params;

  try {
    const stories = await supabaseRest<Array<{ id: string; slug: string; title: string; excerpt: string; content: string; category: string; author_name: string; image_path: string | null; image_url: string | null; published_at: string | null }>>(
      `stories?select=id,slug,title,excerpt,content,category,author_name,image_path,image_url,published_at&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`
    );
    if (!stories[0]) return NextResponse.json({ error: "Story not found." }, { status: 404 });
    const { image_path, ...story } = stories[0];
    return NextResponse.json({
      story: {
        ...story,
        image_url: getPublishedStoryImageUrl(story.slug, image_path, story.image_url),
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not load this story." }, { status: 502 });
  }
}
