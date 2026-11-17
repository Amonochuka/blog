import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-session";
import { isSameOriginRequest } from "@/lib/same-origin-request";
import { supabaseRest } from "@/lib/supabase-rest";
import { randomUUID } from "node:crypto";
import { removeStoryImage, uploadStoryImage } from "@/lib/supabase-storage";

const imageTypes: Record<string, { mime: string; valid: (bytes: Uint8Array) => boolean }> = {
  jpg: { mime: "image/jpeg", valid: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  jpeg: { mime: "image/jpeg", valid: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  png: { mime: "image/png", valid: (bytes) => bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 && bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a },
  webp: { mime: "image/webp", valid: (bytes) => String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP" },
};

async function uploadAdminStoryImage(candidate: FormDataEntryValue | null) {
  if (!(candidate instanceof File) || candidate.size === 0) return null;
  if (candidate.size > 10 * 1024 * 1024) throw new Error("Images must be 10 MB or smaller.");
  const extension = candidate.name.split(".").pop()?.toLowerCase() || "";
  const imageType = imageTypes[extension];
  const signature = new Uint8Array(await candidate.slice(0, 12).arrayBuffer());
  if (!imageType || (candidate.type && candidate.type !== imageType.mime) || !imageType.valid(signature)) {
    throw new Error("Upload a valid JPG, PNG, or WebP image.");
  }
  const path = `images/${randomUUID()}.${extension === "jpeg" ? "jpg" : extension}`;
  await uploadStoryImage(path, candidate, imageType.mime);
  return path;
}

type StoryAdminRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  author_email: string;
  image_path: string | null;
  status: string;
  publication_permission: boolean;
  publication_permission_at: string | null;
  created_at: string;
  subtitle: string;
  tags: string[];
  related_story_slugs: string[];
  featured: boolean;
  seo_title: string;
  seo_description: string;
};

export async function GET() {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const stories = await supabaseRest<StoryAdminRow[]>("stories?select=*&order=created_at.desc");
    return NextResponse.json({ stories });
  } catch {
    return NextResponse.json({ error: "Could not load stories. Check Supabase setup." }, { status: 502 });
  }
}

export async function PATCH(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  const contentType = request.headers.get("content-type") || "";
  let id: unknown;
  let status: unknown;
  let editorial: Record<string, unknown> | null = null;
  let imageCandidate: FormDataEntryValue | null = null;
  let imagePath: string | null = null;
  let removeImage = false;
  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      id = form.get("id");
      editorial = JSON.parse(String(form.get("editorial") || "{}")) as Record<string, unknown>;
      imageCandidate = form.get("image");
      removeImage = form.get("remove_image") === "true";
    } else {
      ({ id, status, editorial } = await request.json());
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid story update." }, { status: 400 });
  }
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Invalid story update." }, { status: 400 });
  }

  try {
    if (editorial && typeof editorial === "object") {
      const cleanString = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : null;
      const title = cleanString(editorial.title, 160);
      const author_name = cleanString(editorial.author_name, 100);
      const content = cleanString(editorial.content, 30000);
      const tags = Array.isArray(editorial.tags) ? editorial.tags.filter((tag: unknown) => typeof tag === "string").map((tag: string) => tag.trim()).filter(Boolean).slice(0, 20) : [];
      const related_story_slugs = Array.isArray(editorial.related_story_slugs) ? editorial.related_story_slugs.filter((slug: unknown) => typeof slug === "string").map((slug: string) => slug.trim()).filter((slug: string) => /^[a-z0-9-]{1,120}$/.test(slug)).slice(0, 10) : [];
      if (!title || title.length < 3 || !author_name || author_name.length < 2 || !content || content.length < 20) {
        return NextResponse.json({ error: "Title, author, and a story body of at least 20 characters are required." }, { status: 400 });
      }
      try {
        imagePath = await uploadAdminStoryImage(imageCandidate);
      } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Could not upload story image." }, { status: 400 });
      }
      const previousRows = await supabaseRest<Array<{ image_path: string | null; image_url: string | null }>>(`stories?select=image_path,image_url&id=eq.${id}&limit=1`);
      if (!previousRows.length) {
        if (imagePath) await removeStoryImage(imagePath).catch(() => undefined);
        return NextResponse.json({ error: "Story not found." }, { status: 404 });
      }
      const previousImagePath = previousRows[0].image_path;
      await supabaseRest<unknown>(`stories?id=eq.${id}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({
          title,
          subtitle: cleanString(editorial.subtitle, 240) ?? "",
          excerpt: cleanString(editorial.excerpt, 500) ?? "",
          content,
          category: cleanString(editorial.category, 80) ?? "Community",
          author_name,
          tags,
          related_story_slugs,
          featured: editorial.featured === true,
          seo_title: cleanString(editorial.seo_title, 160) ?? "",
          seo_description: cleanString(editorial.seo_description, 320) ?? "",
          image_path: removeImage ? null : imagePath ?? previousImagePath,
          image_url: removeImage || imagePath ? null : previousRows[0].image_url,
          published_at: typeof editorial.published_at === "string" && /^\d{4}-\d{2}-\d{2}$/.test(editorial.published_at)
            ? `${editorial.published_at}T12:00:00.000Z`
            : null,
        }),
      });
      if ((imagePath || removeImage) && previousImagePath && previousImagePath !== imagePath) {
        await removeStoryImage(previousImagePath).catch((error) => console.error("Could not remove replaced story image:", error));
      }
      return NextResponse.json({ success: true });
    }
    if (typeof status !== "string" || !["published", "rejected", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid story update." }, { status: 400 });
    }
    await supabaseRest<unknown>(`stories?id=eq.${id}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status, published_at: status === "published" ? new Date().toISOString() : null }),
    });
    return NextResponse.json({ success: true });
  } catch {
    if (imagePath) await removeStoryImage(imagePath).catch(() => undefined);
    return NextResponse.json({ error: "Could not update this story. For editorial edits, apply the story editorial metadata migration in Supabase." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const contentType = request.headers.get("content-type") || "";
  let body: Record<string, unknown> | null = null;
  let imageCandidate: FormDataEntryValue | null = null;
  let uploadedImagePath: string | null = null;
  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      imageCandidate = form.get("image");
      const tags = String(form.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean);
      body = Object.fromEntries(form.entries()) as Record<string, unknown>;
      body.tags = tags;
      body.featured = form.get("featured") === "on";
      body.image_path = uploadedImagePath;
    } else {
      body = await request.json().catch(() => null);
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not upload story image." }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid story." }, { status: 400 });

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const author = typeof body.author_name === "string" ? body.author_name.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const requestedExcerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
  const excerpt = requestedExcerpt || content.replace(/\s+/g, " ").slice(0, 220);
  const category = typeof body.category === "string" ? body.category.trim() : "Community";
  const imageUrl = typeof body.image_url === "string" ? body.image_url.trim() : "";
  const status = body.status === "published" ? "published" : "draft";
  if (title.length < 3 || title.length > 160 || author.length < 2 || author.length > 100 || content.length < 20 || content.length > 30000 || excerpt.length > 500 || category.length > 80) {
    return NextResponse.json({ error: "Enter a title, author, category, excerpt, and story body within the stated limits." }, { status: 400 });
  }
  const tags = Array.isArray(body.tags) ? body.tags.filter((tag: unknown) => typeof tag === "string").map((tag: string) => tag.trim()).filter(Boolean).slice(0, 20) : [];
  const slugBase = title.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90) || "story";
  const slug = `${slugBase}-${randomUUID().slice(0, 8)}`;
  try {
    uploadedImagePath = await uploadAdminStoryImage(imageCandidate);
    const [story] = await supabaseRest<Array<{ id: string; slug: string }>>("stories", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        slug,
        title,
        subtitle: typeof body.subtitle === "string" ? body.subtitle.trim().slice(0, 240) : "",
        excerpt,
        content,
        category,
        author_name: author,
        author_email: typeof body.author_email === "string" && body.author_email.includes("@") ? body.author_email.trim().slice(0, 254) : null,
        image_path: uploadedImagePath,
        image_url: imageUrl.startsWith("https://") ? imageUrl.slice(0, 500) : null,
        tags,
        related_story_slugs: [],
        featured: body.featured === true,
        seo_title: typeof body.seo_title === "string" ? body.seo_title.trim().slice(0, 160) : "",
        seo_description: typeof body.seo_description === "string" ? body.seo_description.trim().slice(0, 320) : "",
        status,
        publication_permission: false,
        published_at: status === "published" ? new Date().toISOString() : null,
      }),
    });
    return NextResponse.json({ success: true, story }, { status: 201 });
  } catch {
    if (uploadedImagePath) await removeStoryImage(uploadedImagePath).catch(() => undefined);
    return NextResponse.json({ error: "Could not create this story. Apply the story editorial metadata migration in Supabase, then try again." }, { status: 502 });
  }
}
