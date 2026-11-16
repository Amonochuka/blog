import { NextResponse } from "next/server";
import { downloadStoryImage } from "@/lib/supabase-storage";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!getSupabaseConfig()) return NextResponse.json({ error: "Story images are not configured." }, { status: 503 });
  const { slug } = await params;

  try {
    const stories = await supabaseRest<Array<{ image_path: string | null }>>(
      `stories?select=image_path&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`
    );
    const imagePath = stories[0]?.image_path;
    if (!imagePath) return NextResponse.json({ error: "This story has no published image." }, { status: 404 });

    const imageResponse = await downloadStoryImage(imagePath);
    if (!imageResponse.ok) return NextResponse.json({ error: "Could not load this story image." }, { status: 502 });
    const contentType = imageResponse.headers.get("content-type")?.split(";")[0] ?? "";
    if (!allowedImageTypes.has(contentType)) return NextResponse.json({ error: "Unsupported story image type." }, { status: 415 });

    return new Response(imageResponse.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Could not load this story image." }, { status: 502 });
  }
}
