import { NextResponse } from "next/server";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";
import { getPublishedStoryImageUrl } from "@/lib/story-image";
import { projects } from "@/content/projects";
import { books } from "@/content/books";

export const dynamic = "force-dynamic";

type PublicStoryContent = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  excerpt: string;
  body: string;
  readingTime: string;
  image: string | null;
};

const stories = [
  {
    id: "hope-in-the-ordinary",
    title: "Hope in the Ordinary",
    subtitle: "Finding God in the small, daily acts of care",
    author: "Roy Ochuka",
    date: "2025-01-15",
    category: "Personal Reflections",
    tags: ["hope", "community", "faith"],
    featured: true,
    excerpt: "Sometimes hope does not arrive as a grand event. It arrives as a neighbour carrying water, a child reading aloud, a hand held in silence.",
    body: "Sometimes hope does not arrive as a grand event. It arrives as a neighbour carrying water, a child reading aloud, a hand held in silence.\\n\\n## The small things\\n\\nWe are tempted to measure impact in projects completed and funds raised. But the deeper work of hope is quieter.\\n\\n> \"We believe every community carries God-given potential.\"\\n\\n## A library corner\\n\\nIn a small hospital ward, a reading corner became a place of healing. Not because of the books alone, but because someone chose to sit and read with a stranger.\\n\\nThat is the heartbeat of Beard & Diapers.",
    readingTime: "3 min read",
    image: "/images/family-community-home.jpg",
  },
  {
    id: "walking-together",
    title: "Walking Together",
    subtitle: "Community as the foundation of hope",
    author: "Roy Ochuka",
    date: "2025-02-10",
    category: "Community",
    tags: ["community", "hope", "faith"],
    featured: false,
    excerpt: "Hope is not meant to be carried alone. It grows when we walk together.",
    body: "Hope is not meant to be carried alone. It grows when we walk together.\\n\\nA single story can change a life. But a community of stories can change a nation.",
    readingTime: "2 min read",
    image: "/images/african-family-meal.jpg",
  },
  {
    id: "fathers-day-reflection",
    title: "Father's Day Reflection",
    subtitle: "The legacy we leave and the stories we inherit",
    author: "Roy Ochuka",
    date: "2025-06-15",
    category: "Fatherhood",
    tags: ["fatherhood", "family", "legacy"],
    featured: false,
    excerpt: "What does it mean to be a father who passes on hope, not perfection?",
    body: "The greatest legacy a father can leave is not what he accumulated, but what he awakened.\\n\\nIt is in the ordinary moments — the conversations, the teachings, the presence — that we pass on the most valuable things.",
    readingTime: "2 min read",
    image: "/images/family-nairobi-father.jpg",
  },
  {
    id: "hospital-visit",
    title: "A Hospital Visit Remembered",
    subtitle: "How a simple reading corner changed everything",
    author: "Mercy Wanjiku",
    date: "2025-03-22",
    category: "Beard & Diapers Projects",
    tags: ["projects", "hospital", "dignity"],
    featured: true,
    excerpt: "When words meet presence, healing begins.",
    body: "In a Nairobi hospital ward, a reading corner became more than a shelf of books—it became a sanctuary.",
    readingTime: "2 min read",
    image: "/images/hospital-reading-corners.jpeg",
  },
];

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
  let publishedStories: PublicStoryContent[] = supabaseConfigured ? [] : stories;
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
          subtitle: story.excerpt,
          author: story.author_name,
          date: (story.published_at ?? story.created_at).slice(0, 10),
          category: story.category,
          tags: [],
          featured: false,
          excerpt: story.excerpt,
          body: "",
          readingTime: "",
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
