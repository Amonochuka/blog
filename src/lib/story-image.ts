export function getPublishedStoryImageUrl(slug: string, imagePath: string | null | undefined) {
  return imagePath ? `/api/stories/${encodeURIComponent(slug)}/image` : null;
}
