import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";
import { removeStoryAttachment, removeStoryImage, uploadStoryAttachment, uploadStoryImage } from "@/lib/supabase-storage";
import { getPublishedStoryImageUrl } from "@/lib/story-image";

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
  image_path: string | null;
  image_url: string | null;
  created_at: string;
  published_at: string | null;
};

export async function GET() {
  if (!getSupabaseConfig()) {
    return NextResponse.json({ error: "Story publishing is not configured yet." }, { status: 503 });
  }

  try {
    const stories = await supabaseRest<Array<Pick<StoryRow, "id" | "slug" | "title" | "excerpt" | "content" | "category" | "author_name" | "image_path" | "image_url" | "published_at" | "created_at">>>(
      "stories?select=id,slug,title,excerpt,content,category,author_name,image_path,image_url,published_at,created_at&status=eq.published"
    );
    stories.sort((first, second) =>
      (first.published_at ?? first.created_at).localeCompare(second.published_at ?? second.created_at)
    );
    return NextResponse.json({
      stories: stories.map(({ image_path, image_url, ...story }) => ({
        ...story,
        image_url: getPublishedStoryImageUrl(story.slug, image_path, image_url),
      })),
    });
  } catch {
    return NextResponse.json({ error: "Could not load published stories." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!getSupabaseConfig()) {
    return NextResponse.json({ error: "Story submissions are not configured yet. Please try again later." }, { status: 503 });
  }

  let attachmentPath: string | null = null;
  let imagePath: string | null = null;
  let uploadedAttachment = false;
  let uploadedImage = false;
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
    const imageCandidate = body.get("story_image");
    const storyImage = imageCandidate instanceof File && imageCandidate.size > 0 ? imageCandidate : null;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (title.length < 3 || title.length > 160 || name.length < 2 || name.length > 100 || !emailPattern.test(email) || category.length > 80 || content.length < 20 || content.length > 30000 || !permission) {
      return NextResponse.json({ error: "Please complete all fields and check the permission box. Stories must be between 20 and 30,000 characters." }, { status: 400 });
    }

    if (candidate && !(candidate instanceof File)) {
      return NextResponse.json({ error: "Choose a valid PDF, DOC, or DOCX attachment." }, { status: 400 });
    }
    if (imageCandidate && !(imageCandidate instanceof File)) {
      return NextResponse.json({ error: "Choose a valid JPG, PNG, or WebP story image." }, { status: 400 });
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
    }
    if (storyImage) {
      const extension = storyImage.name.split(".").pop()?.toLowerCase();
      const imageTypes: Record<string, { mime: string; signature: (bytes: Uint8Array) => boolean }> = {
        jpg: { mime: "image/jpeg", signature: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
        jpeg: { mime: "image/jpeg", signature: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
        png: { mime: "image/png", signature: (bytes) => bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 && bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a },
        webp: { mime: "image/webp", signature: (bytes) => String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP" },
      };
      const imageType = extension ? imageTypes[extension] : undefined;
      const signature = new Uint8Array(await storyImage.slice(0, 12).arrayBuffer());
      if (!imageType || (storyImage.type && storyImage.type !== imageType.mime) || !imageType.signature(signature)) {
        return NextResponse.json({ error: "Story images must be valid JPG, PNG, or WebP files." }, { status: 400 });
      }
      if (storyImage.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "Story images must be 10 MB or smaller." }, { status: 400 });
      }
      imagePath = `images/${randomUUID()}.${extension}`;
      await uploadStoryImage(imagePath, storyImage, imageType.mime);
      uploadedImage = true;
    }
    if (attachment) {
      const extension = attachment.name.split(".").pop()?.toLowerCase();
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
        publication_permission: permission,
        publication_permission_at: new Date().toISOString(),
        attachment_path: attachmentPath,
        image_path: imagePath,
      }),
    });

    return NextResponse.json({ success: true, storyId: story.id, message: "Your story was received and is waiting for review." }, { status: 201 });
  } catch (error) {
    console.error("Story submission failed:", error);
    if (uploadedAttachment && attachmentPath) await removeStoryAttachment(attachmentPath).catch(() => undefined);
    if (uploadedImage && imagePath) await removeStoryImage(imagePath).catch(() => undefined);
    return NextResponse.json({ error: "We could not save your story. Please try again." }, { status: 502 });
  }
}
