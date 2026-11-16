import { notFound } from "next/navigation";
import { BaseLayout } from "@/components/BaseLayout";
import { StoryArticleLayout } from "@/components/StoryArticleLayout";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";
import { resolveStoryImage } from "@/lib/story-image";
import { readingTime } from "@/utils/readingTime";

export const dynamic = "force-dynamic";

type PublishedStory = {
  slug: string;
  title: string;
  content: string;
  category: string;
  author_name: string;
  image_url: string | null;
  published_at: string | null;
};

export default async function SubmittedStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSupabaseConfig()) notFound();

  let story: PublishedStory | undefined;
  try {
    const stories = await supabaseRest<PublishedStory[]>(
      `stories?select=slug,title,content,category,author_name,image_url,published_at&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`
    );
    story = stories[0];
  } catch {
    notFound();
  }
  if (!story) notFound();

  const paragraphs = story.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <BaseLayout>
      <StoryArticleLayout
        slug={story.slug}
        title={story.title}
        category={story.category}
        author={story.author_name}
        date={story.published_at}
        readingTime={readingTime(story.content)}
        image={resolveStoryImage(story.slug, story.image_url)}
        imageAlt=""
      >
        {paragraphs.map((paragraph, index) => <p key={`${story.slug}-${index}`}>{paragraph}</p>)}
      </StoryArticleLayout>
    </BaseLayout>
  );
}
