import { NextResponse } from "next/server";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";
import { projects } from "@/content/projects";
import { getBookCatalog } from "@/lib/book-catalog";

export const dynamic = "force-dynamic";

type SearchableStory = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  tags: string[];
  body: string;
};

type DatabaseSearchStory = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  excerpt: string;
  author_name: string;
  content: string;
  tags: string[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json({ results: [], query });
  }

  const lowercaseQuery = query.toLowerCase();
  const books = await getBookCatalog();

  let searchableStories: SearchableStory[] = [];
  if (getSupabaseConfig()) {
    try {
      let databaseStories: DatabaseSearchStory[];
      try {
        databaseStories = await supabaseRest("stories?select=slug,title,subtitle,excerpt,category,author_name,content,tags&status=eq.published");
      } catch {
        const legacy = await supabaseRest<Array<Omit<DatabaseSearchStory, "subtitle" | "tags"> & { subtitle?: string; tags?: string[] }>>("stories?select=slug,title,excerpt,category,author_name,content&status=eq.published");
        databaseStories = legacy.map((story) => ({ ...story, subtitle: story.subtitle || "", tags: story.tags || [] }));
      }
      searchableStories = [
        ...databaseStories.map((story) => ({
          id: story.slug,
          title: story.title,
          subtitle: story.subtitle || story.excerpt,
          author: story.author_name,
          category: story.category,
          tags: story.tags || [],
          body: story.content,
        })),
      ];
    } catch (error) {
      console.error("Could not load stories for search:", error);
    }
  }

  const results = [
    ...searchableStories.filter(
      (s) =>
        s.title.toLowerCase().includes(lowercaseQuery) ||
        s.subtitle.toLowerCase().includes(lowercaseQuery) ||
        s.category.toLowerCase().includes(lowercaseQuery) ||
        s.body.toLowerCase().includes(lowercaseQuery) ||
        s.tags.some((t) => t.toLowerCase().includes(lowercaseQuery))
    ).map((story) => ({ ...story, type: "story" as const })),
    ...books.filter(
      (b) =>
        b.title.toLowerCase().includes(lowercaseQuery) ||
        b.description.toLowerCase().includes(lowercaseQuery) ||
        b.chapters.some(
          (c) => c.title.toLowerCase().includes(lowercaseQuery)
        )
    ).map((book) => ({ id: book.slug, title: book.title, type: "book" as const })),
    ...projects.filter(
      (p) =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.location.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery) ||
        p.why.toLowerCase().includes(lowercaseQuery)
    ).map((project) => ({ ...project, type: "project" as const })),
  ];

  return NextResponse.json({ results, query });
}
