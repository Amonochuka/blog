const storyImageFallbacks: Record<string, string> = {
  "hope-in-the-ordinary": "/images/family-community-home.jpg",
  "walking-together": "/images/african-family-meal.jpg",
  "fathers-day-reflection": "/images/family-nairobi-father.jpg",
  "hospital-visit": "/images/hospital-reading-corners.jpeg",
};

const legacyPlaceholderImage = /\/(?:story-[123]|featured-story)\.jpg(?:[?#].*)?$/i;

export function resolveStoryImage(slug: string, imageUrl: string | null | undefined) {
  const image = imageUrl?.trim();
  if (image && !legacyPlaceholderImage.test(image)) return image;

  return storyImageFallbacks[slug] ?? "/images/community-family-kenya.jpg";
}
