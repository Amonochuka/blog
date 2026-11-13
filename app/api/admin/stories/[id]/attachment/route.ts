import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { supabaseRest } from "@/lib/supabase-rest";
import { createStoryAttachmentUrl } from "@/lib/supabase-storage";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid story." }, { status: 400 });

  try {
    const rows = await supabaseRest<Array<{ attachment_path: string | null }>>(
      `stories?select=attachment_path&id=eq.${id}&limit=1`
    );
    const path = rows[0]?.attachment_path;
    if (!path) return NextResponse.json({ error: "This story has no attachment." }, { status: 404 });
    return NextResponse.redirect(await createStoryAttachmentUrl(path));
  } catch {
    return NextResponse.json({ error: "Could not open this attachment." }, { status: 502 });
  }
}
