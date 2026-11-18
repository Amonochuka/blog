import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { isSameOriginRequest } from "@/lib/same-origin-request";
import { supabaseRest } from "@/lib/supabase-rest";

const validId = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f-]{36}$/i.test(value);
const validType = (value: unknown): value is "story" | "chapter" => value === "story" || value === "chapter";

export async function GET(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const params = new URL(request.url).searchParams;
  const type = params.get("type");
  const id = params.get("id");
  if (!validType(type) || !validId(id)) return NextResponse.json({ error: "Invalid content history request." }, { status: 400 });
  try {
    const [revisions, autosaves] = await Promise.all([
      supabaseRest<Array<{ id: string; snapshot: Record<string, unknown>; created_at: string }>>(`content_revisions?select=id,snapshot,created_at&content_type=eq.${type}&content_id=eq.${id}&order=created_at.desc&limit=20`),
      supabaseRest<Array<{ snapshot: Record<string, unknown>; updated_at: string }>>(`content_autosaves?select=snapshot,updated_at&content_type=eq.${type}&content_id=eq.${id}&limit=1`),
    ]);
    return NextResponse.json({ revisions, autosave: autosaves[0] ?? null });
  } catch {
    return NextResponse.json({ error: "Editor history is not configured. Apply supabase/content-workflow-migration.sql." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || !validType(body.type) || !validId(body.id) || !body.snapshot || typeof body.snapshot !== "object") {
    return NextResponse.json({ error: "Invalid editor autosave." }, { status: 400 });
  }
  const serialized = JSON.stringify(body.snapshot);
  if (serialized.length > 120_000) return NextResponse.json({ error: "This editor draft is too large to autosave." }, { status: 413 });
  try {
    await supabaseRest<unknown>("content_autosaves?on_conflict=content_type,content_id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ content_type: body.type, content_id: body.id, snapshot: body.snapshot, updated_at: new Date().toISOString() }),
    });
    return NextResponse.json({ success: true, saved_at: new Date().toISOString() });
  } catch {
    return NextResponse.json({ error: "Could not autosave. Apply supabase/content-workflow-migration.sql." }, { status: 502 });
  }
}
