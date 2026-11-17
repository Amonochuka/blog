import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { isSameOriginRequest } from "@/lib/same-origin-request";
import { supabaseRest } from "@/lib/supabase-rest";

type CommentRow = {
  id: string;
  story_slug: string;
  author_name: string;
  author_email: string;
  content: string;
  status: "pending" | "published" | "rejected";
  created_at: string;
};

export async function GET() {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const comments = await supabaseRest<CommentRow[]>("story_comments?select=*&order=created_at.desc");
    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ error: "Comments are not configured. Apply the story comments migration in Supabase." }, { status: 502 });
  }
}

export async function PATCH(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const { id, status } = await request.json().catch(() => ({}));
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id) || !["pending", "published", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid comment update." }, { status: 400 });
  }
  try {
    await supabaseRest<unknown>(`story_comments?id=eq.${id}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status }),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not update this comment." }, { status: 502 });
  }
}
