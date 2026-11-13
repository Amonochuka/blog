import { NextResponse } from "next/server";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  if (!getSupabaseConfig()) return NextResponse.json({ error: "Newsletter signup is not configured yet." }, { status: 503 });

  try {
    const body = await request.json();
    if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ success: true }, { status: 201 });
    const email = String(body.email || "").trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email) || body.consent !== true) {
      return NextResponse.json({ error: "Enter a valid email and agree to receive updates." }, { status: 400 });
    }

    await supabaseRest<unknown>("newsletter_subscribers?on_conflict=email", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ email, consent: true }),
    });
    return NextResponse.json({ success: true, message: "Your email is on the newsletter list." }, { status: 201 });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return NextResponse.json({ error: "We could not save your signup. Please try again." }, { status: 502 });
  }
}
