import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { createStoryImageUrl } from "@/lib/supabase-storage";
import { supabaseRest } from "@/lib/supabase-rest";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid story." }, { status: 400 });

  try {
    const rows = await supabaseRest<Array<{ image_path: string | null }>>(
      `stories?select=image_path&id=eq.${id}&limit=1`
    );
    const path = rows[0]?.image_path;
    if (!path) return NextResponse.json({ error: "This story has no image." }, { status: 404 });
    return NextResponse.redirect(await createStoryImageUrl(path));
  } catch {
    return NextResponse.json({ error: "Could not open this story image." }, { status: 502 });
  }
}
