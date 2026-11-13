import { NextResponse } from "next/server";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  if (!getSupabaseConfig()) return NextResponse.json({ error: "Contact messages are not configured yet." }, { status: 503 });

  try {
    const body = await request.json();
    if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ success: true }, { status: 201 });
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.length < 2 || name.length > 100 || !emailPattern.test(email) || subject.length < 2 || subject.length > 160 || message.length < 5 || message.length > 10000) {
      return NextResponse.json({ error: "Please complete each field. Messages must be under 10,000 characters." }, { status: 400 });
    }

    await supabaseRest<unknown>("contact_messages", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ name, email, subject, message }),
    });
    return NextResponse.json({ success: true, message: "Your message was received." }, { status: 201 });
  } catch (error) {
    console.error("Contact message failed:", error);
    return NextResponse.json({ error: "We could not save your message. Please try again." }, { status: 502 });
  }
}
