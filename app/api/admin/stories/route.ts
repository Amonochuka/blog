import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { supabaseRest } from "@/lib/supabase-rest";

type StoryAdminRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  author_email: string;
  status: string;
  created_at: string;
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
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  const { id, status } = await request.json().catch(() => ({}));
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id) || !["published", "rejected", "pending"].includes(status)) {
    return NextResponse.json({ error: "Invalid story update." }, { status: 400 });
  }

  try {
    await supabaseRest<unknown>(`stories?id=eq.${id}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status, published_at: status === "published" ? new Date().toISOString() : null }),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not update this story." }, { status: 502 });
  }
}
