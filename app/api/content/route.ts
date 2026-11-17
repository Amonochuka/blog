import { NextResponse } from "next/server";
import { getPublicContent } from "@/lib/public-content";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getPublicContent());
}
