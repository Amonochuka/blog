export function getPublishedStoryImageUrl(slug: string, imagePath: string | null | undefined, imageUrl?: string | null) {
  if (imageUrl && (imageUrl.startsWith("/") && !imageUrl.startsWith("//") || imageUrl.startsWith("https://"))) return imageUrl;
  return imagePath ? `/api/stories/${encodeURIComponent(slug)}/image` : null;
}
