import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { supabaseRest } from "@/lib/supabase-rest";

export async function GET() {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const messages = await supabaseRest<Array<{ id: string; name: string; email: string; subject: string; message: string; created_at: string; read_at: string | null }>>(
      "contact_messages?select=*&order=created_at.desc"
    );
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Could not load messages." }, { status: 502 });
  }
}
