import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { isSameOriginRequest } from "@/lib/same-origin-request";
import { uploadBookMedia } from "@/lib/supabase-storage";

const imageTypes: Record<string, { mime: string; valid: (bytes: Uint8Array) => boolean }> = {
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
    const candidate = form.get("image");
    if (!(candidate instanceof File) || candidate.size === 0) {
      return NextResponse.json({ error: "Choose a JPG, PNG, or WebP image to upload." }, { status: 400 });
    }
    if (candidate.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Images must be 10 MB or smaller." }, { status: 400 });
    }

    const extension = candidate.name.split(".").pop()?.toLowerCase() || "";
    const imageType = imageTypes[extension];
    const signature = new Uint8Array(await candidate.slice(0, 12).arrayBuffer());
    if (!imageType || (candidate.type && candidate.type !== imageType.mime) || !imageType.valid(signature)) {
      return NextResponse.json({ error: "Upload a valid JPG, PNG, or WebP image." }, { status: 400 });
    }

    const requestedPurpose = form.get("purpose");
    const purpose = requestedPurpose === "chapter" ? "chapters" : requestedPurpose === "project" ? "projects" : "covers";
    const path = `${purpose}/${randomUUID()}.${extension === "jpeg" ? "jpg" : extension}`;
    const imageUrl = await uploadBookMedia(path, candidate, imageType.mime);
    return NextResponse.json({ success: true, imageUrl }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not upload the image. Apply the book media Storage migration in Supabase, then try again." }, { status: 502 });
  }
}
