import { NextResponse } from "next/server";
import { adminCookieName, createAdminSessionToken, hasAdminSession, validateAdminPassword } from "@/lib/admin-session";

export async function GET() {
  return NextResponse.json({ authenticated: await hasAdminSession() });
}

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: "" }));
  if (typeof password !== "string" || !validateAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect admin password." }, { status: 401 });
  }

  try {
    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(adminCookieName, createAdminSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(adminCookieName, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
