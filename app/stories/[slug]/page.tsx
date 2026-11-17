import { notFound } from "next/navigation";
import { BaseLayout } from "@/components/BaseLayout";
import { StoryArticleLayout } from "@/components/StoryArticleLayout";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";
import { getPublishedStoryImageUrl } from "@/lib/story-image";
import { readingTime } from "@/utils/readingTime";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type PublishedStory = {
  slug: string;
  title: string;
  content: string;
  category: string;
  author_name: string;
  image_path: string | null;
  published_at: string | null;
  subtitle: string;
  tags: string[];
  seo_title: string;
  seo_description: string;
  related_story_slugs: string[];
};

async function getStory(slug: string) {
  if (!getSupabaseConfig()) return undefined;
  const stories = await supabaseRest<PublishedStory[]>(
    `stories?select=slug,title,subtitle,content,category,author_name,image_path,published_at,tags,seo_title,seo_description,related_story_slugs&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`
  );
  return stories[0];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const story = await getStory(slug);
    if (!story) return {};
    const description = story.seo_description || story.subtitle || story.content.replace(/\s+/g, " ").slice(0, 160);
    return {
      title: story.seo_title || story.title,
      description,
      openGraph: { title: story.seo_title || story.title, description, type: "article" },
    };
  } catch {
    return {};
  }
}

export default async function SubmittedStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSupabaseConfig()) notFound();

  let story: PublishedStory | undefined;
  try {
    story = await getStory(slug);
  } catch {
    notFound();
  }
  if (!story) notFound();

  const paragraphs = story.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  let relatedStories: Array<{ slug: string; title: string; excerpt: string }> = [];
  if (story.related_story_slugs?.length) {
    try {
      const slugs = story.related_story_slugs.filter((value) => /^[a-z0-9-]{1,120}$/.test(value));
      if (slugs.length) {
        relatedStories = await supabaseRest<Array<{ slug: string; title: string; excerpt: string }>>(
          `stories?select=slug,title,excerpt&slug=in.(${slugs.map((value) => `"${value}"`).join(",")})&status=eq.published&limit=3`
        );
      }
    } catch {
      relatedStories = [];
    }
  }

  return (
    <BaseLayout>
      <StoryArticleLayout
        slug={story.slug}
        title={story.title}
        category={story.category}
        subtitle={story.subtitle}
        tags={story.tags || []}
        author={story.author_name}
        date={story.published_at}
        readingTime={readingTime(story.content)}
        image={getPublishedStoryImageUrl(story.slug, story.image_path)}
        imageAlt={story.title}
        relatedStories={relatedStories}
      >
        {paragraphs.map((paragraph, index) => <p key={`${story.slug}-${index}`}>{paragraph}</p>)}
      </StoryArticleLayout>
    </BaseLayout>
  );
}
