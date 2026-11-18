import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { isSameOriginRequest } from "@/lib/same-origin-request";
import { uploadBookMedia } from "@/lib/supabase-storage";

const types: Record<string, { mime: string; valid: (bytes: Uint8Array) => boolean }> = {
  jpg: { mime: "image/jpeg", valid: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  jpeg: { mime: "image/jpeg", valid: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  png: { mime: "image/png", valid: (bytes) => bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 && bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a },
  webp: { mime: "image/webp", valid: (bytes) => String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP" },
};

export async function POST(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File) || !file.size) return NextResponse.json({ error: "Choose an image to insert." }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Images must be 10 MB or smaller." }, { status: 400 });
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    const type = types[extension];
    const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    if (!type || (file.type && file.type !== type.mime) || !type.valid(bytes)) return NextResponse.json({ error: "Upload a valid JPG, PNG, or WebP image." }, { status: 400 });
    const path = `editorial/${randomUUID()}.${extension === "jpeg" ? "jpg" : extension}`;
    const imageUrl = await uploadBookMedia(path, file, type.mime);
    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not upload image. Check the book-media Storage setup in Supabase." }, { status: 502 });
  }
}
