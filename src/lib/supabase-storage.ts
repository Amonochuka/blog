import { getSupabaseConfig } from "@/lib/supabase-rest";

const BUCKET = "story-submissions";

function storageHeaders(contentType = "application/json") {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase is not configured");
  return {
    config,
    headers: {
      apikey: config.secretKey,
      Authorization: `Bearer ${config.secretKey}`,
      "Content-Type": contentType,
    },
  };
}

function encodedPath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

export async function uploadStoryAttachment(path: string, file: File) {
  const { config, headers } = storageHeaders(file.type || "application/octet-stream");
  const response = await fetch(`${config.url}/storage/v1/object/${BUCKET}/${encodedPath(path)}`, {
    method: "POST",
    headers: { ...headers, "Content-Disposition": "attachment" },
    body: Buffer.from(await file.arrayBuffer()),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Attachment upload failed (${response.status}).`);
}

export async function removeStoryAttachment(path: string) {
  const { config, headers } = storageHeaders();
  await fetch(`${config.url}/storage/v1/object/${BUCKET}/${encodedPath(path)}`, {
    method: "DELETE",
    headers,
    cache: "no-store",
  });
}

export async function createStoryAttachmentUrl(path: string) {
  const { config, headers } = storageHeaders();
  const response = await fetch(`${config.url}/storage/v1/object/sign/${BUCKET}/${encodedPath(path)}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ expiresIn: 60 * 10 }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Could not create attachment link (${response.status}).`);
  const result = await response.json() as { signedURL?: string };
  if (!result.signedURL) throw new Error("Supabase did not return an attachment link.");
  return result.signedURL.startsWith("http")
    ? result.signedURL
    : new URL(`/storage/v1${result.signedURL}`, config.url).toString();
}
