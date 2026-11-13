import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";
import { removeStoryAttachment, uploadStoryAttachment } from "@/lib/supabase-storage";

type StoryRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  author_email: string;
  status: "pending" | "published" | "rejected";
  image_url: string;
  created_at: string;
  published_at: string | null;
};

export async function GET() {
  if (!getSupabaseConfig()) {
    return NextResponse.json({ error: "Story publishing is not configured yet." }, { status: 503 });
  }

  try {
    const stories = await supabaseRest<StoryRow[]>(
      "stories?select=id,slug,title,excerpt,content,category,author_name,image_url,published_at&status=eq.published&order=published_at.desc"
    );
    return NextResponse.json({ stories });
  } catch {
    return NextResponse.json({ error: "Could not load published stories." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!getSupabaseConfig()) {
    return NextResponse.json({ error: "Story submissions are not configured yet. Please try again later." }, { status: 503 });
  }

  let attachmentPath: string | null = null;
  let uploadedAttachment = false;
  try {
    const body = await request.formData();
    if (String(body.get("website") || "").trim()) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const title = String(body.get("title") || "").trim();
    const name = String(body.get("name") || "").trim();
    const email = String(body.get("email") || "").trim().toLowerCase();
    const category = String(body.get("category") || "Community").trim();
    const content = String(body.get("story") || "").trim();
    const permission = body.get("permission") === "on";
    const candidate = body.get("attachment");
    const attachment = candidate instanceof File && candidate.size > 0 ? candidate : null;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (title.length < 3 || title.length > 160 || name.length < 2 || name.length > 100 || !emailPattern.test(email) || category.length > 80 || content.length < 20 || content.length > 30000 || !permission) {
      return NextResponse.json({ error: "Please complete all fields and check the permission box. Stories must be between 20 and 30,000 characters." }, { status: 400 });
    }

    if (candidate && !(candidate instanceof File)) {
      return NextResponse.json({ error: "Choose a valid PDF, DOC, or DOCX attachment." }, { status: 400 });
    }
    if (attachment) {
      const extension = attachment.name.split(".").pop()?.toLowerCase();
      const allowedMimeTypes: Record<string, string[]> = {
        pdf: ["application/pdf"],
        doc: ["application/msword"],
        docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
      };
      if (!extension || !allowedMimeTypes[extension] || (attachment.type && !allowedMimeTypes[extension].includes(attachment.type))) {
        return NextResponse.json({ error: "Attachments must be PDF, DOC, or DOCX files." }, { status: 400 });
      }
      if (attachment.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "Attachments must be 10 MB or smaller." }, { status: 400 });
      }
      attachmentPath = `${randomUUID()}.${extension}`;
      await uploadStoryAttachment(attachmentPath, attachment);
      uploadedAttachment = true;
    }

    const slugBase = title.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90) || "story";
    const slug = `${slugBase}-${randomUUID().slice(0, 8)}`;
    const excerpt = content.replace(/\s+/g, " ").slice(0, 220);

    const [story] = await supabaseRest<StoryRow[]>("stories", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        slug,
        title,
        excerpt,
        content,
        category,
        author_name: name,
        author_email: email,
        status: "pending",
        attachment_path: attachmentPath,
      }),
    });

    return NextResponse.json({ success: true, storyId: story.id, message: "Your story was received and is waiting for review." }, { status: 201 });
  } catch (error) {
    console.error("Story submission failed:", error);
    if (uploadedAttachment && attachmentPath) await removeStoryAttachment(attachmentPath).catch(() => undefined);
    return NextResponse.json({ error: "We could not save your story. Please try again." }, { status: 502 });
  }
}
