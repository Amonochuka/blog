import { projects, type Project } from "@/content/projects";
import { getBookCatalog } from "@/lib/book-catalog";
import { getPublishedStoryImageUrl } from "@/lib/story-image";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";

export type PublicStoryContent = {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  subtitle: string;
  image: string | null;
  readingTime?: string;
};

export type PublicBookContent = {
  id: string;
  slug: string;
  cover: string;
  title: string;
  author: string;
  tagline: string;
  description: string;
  status: "serializing" | "coming_soon" | "completed";
  totalDays: number;
  chapters: Array<{ number: number; title: string; free: boolean }>;
};

export type PublicContent = {
  stories: PublicStoryContent[];
  books: PublicBookContent[];
  projects: Project[];
  featuredBookSlug: string | null;
};

export async function getPublicContent(): Promise<PublicContent> {
  const supabaseConfigured = Boolean(getSupabaseConfig());
  const catalog = await getBookCatalog();
  const books: PublicBookContent[] = catalog.map(({ id, slug, cover, title, author, tagline, description, status, totalDays, chapters }) => ({
    id,
    slug,
    cover,
    title,
    author,
    tagline,
    description,
    status,
    totalDays,
    chapters: chapters.map(({ number, title: chapterTitle, free }) => ({ number, title: chapterTitle, free })),
  }));

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
        image_url: string | null;
        published_at: string | null;
        created_at: string;
        subtitle: string;
        tags: string[];
      }>>("stories?select=slug,title,subtitle,excerpt,category,author_name,image_path,image_url,published_at,created_at,tags&status=eq.published");
      databaseStories.sort((first, second) =>
        (first.published_at ?? first.created_at).localeCompare(second.published_at ?? second.created_at)
      );
      publishedStories = databaseStories.map((story) => ({
        id: story.slug,
        title: story.title,
        subtitle: story.subtitle,
        author: story.author_name,
        date: (story.published_at ?? story.created_at).slice(0, 10),
        category: story.category,
        excerpt: story.excerpt,
        image: getPublishedStoryImageUrl(story.slug, story.image_path, story.image_url),
      }));
    } catch (error) {
      console.error("Could not load editorial story fields; trying the original story columns:", error);
      try {
        const legacyStories = await supabaseRest<Array<{
          slug: string;
          title: string;
          excerpt: string;
          category: string;
          author_name: string;
          image_path: string | null;
          image_url: string | null;
          published_at: string | null;
          created_at: string;
        }>>("stories?select=slug,title,excerpt,category,author_name,image_path,image_url,published_at,created_at&status=eq.published");
        publishedStories = legacyStories.map((story) => ({
          id: story.slug,
          title: story.title,
          subtitle: "",
          author: story.author_name,
          date: (story.published_at ?? story.created_at).slice(0, 10),
          category: story.category,
          excerpt: story.excerpt,
          image: getPublishedStoryImageUrl(story.slug, story.image_path, story.image_url),
        }));
      } catch (legacyError) {
        console.error("Could not load published stories from Supabase:", legacyError);
      }
    }
  }

  publishedStories.sort((first, second) => first.date.localeCompare(second.date));
  return { stories: publishedStories, books, projects, featuredBookSlug };
}
