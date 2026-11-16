import { NextResponse } from "next/server";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";
import { getPublishedStoryImageUrl } from "@/lib/story-image";
import { projects } from "@/content/projects";
import { books } from "@/content/books";

export const dynamic = "force-dynamic";

type PublicStoryContent = {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image: string | null;
};

export async function GET() {
  const supabaseConfigured = Boolean(getSupabaseConfig());
  let featuredBookSlug = books[0]?.slug ?? null;
  if (supabaseConfigured) {
    try {
      const settings = await supabaseRest<Array<{ value: string }>>(
        "site_settings?select=value&key=eq.featured_book_slug&limit=1"
      );
      const configuredSlug = settings[0]?.value;
      if (books.some((book) => book.slug === configuredSlug)) featuredBookSlug = configuredSlug;
    } catch (error) {
      console.error("Could not load the featured book setting:", error);
    }
  }
  let publishedStories: PublicStoryContent[] = [];
  if (supabaseConfigured) {
    try {
      const databaseStories = await supabaseRest<Array<{
        slug: string;
        title: string;
        excerpt: string;
        category: string;
        author_name: string;
        image_path: string | null;
        published_at: string | null;
        created_at: string;
      }>>("stories?select=slug,title,excerpt,category,author_name,image_path,published_at,created_at&status=eq.published");
      databaseStories.sort((first, second) =>
        (first.published_at ?? first.created_at).localeCompare(second.published_at ?? second.created_at)
      );
      publishedStories = [
        ...databaseStories.map((story) => ({
          id: story.slug,
          title: story.title,
          author: story.author_name,
          date: (story.published_at ?? story.created_at).slice(0, 10),
          category: story.category,
          excerpt: story.excerpt,
          image: getPublishedStoryImageUrl(story.slug, story.image_path),
        })),
      ];
    } catch (error) {
      console.error("Could not load published stories from Supabase:", error);
    }
  }
  publishedStories.sort((first, second) => first.date.localeCompare(second.date));
  return NextResponse.json({ stories: publishedStories, books, projects, featuredBookSlug });
}
