import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { supabaseRest } from "@/lib/supabase-rest";

export async function GET() {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const subscribers = await supabaseRest<Array<{ email: string; created_at: string }>>(
      "newsletter_subscribers?select=email,created_at&order=created_at.desc"
    );
    return NextResponse.json({ subscribers });
  } catch {
    return NextResponse.json({ error: "Could not load subscribers." }, { status: 502 });
  }
}
