import { NextResponse } from "next/server";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";

export const dynamic = "force-dynamic";

const stories = [
  {
    id: "hope-in-the-ordinary",
    title: "Hope in the Ordinary",
    subtitle: "Finding God in the small, daily acts of care",
    author: "Roy Ochuka",
    category: "Personal Reflections",
    tags: ["hope", "community", "faith"],
    body: "Sometimes hope does not arrive as a grand event. It arrives as a neighbour carrying water, a child reading aloud, a hand held in silence. The deeper work of hope is quieter. We believe every community carries God-given potential. In a small hospital ward, a reading corner became a place of healing.",
  },
  {
    id: "walking-together",
    title: "Walking Together",
    subtitle: "Community as the foundation of hope",
    author: "Roy Ochuka",
    category: "Community",
    tags: ["community", "hope", "faith"],
    body: "Hope is not meant to be carried alone. It grows when we walk together. A single story can change a life. But a community of stories can change a nation.",
  },
  {
    id: "fathers-day-reflection",
    title: "Father's Day Reflection",
    subtitle: "The legacy we leave and the stories we inherit",
    author: "Roy Ochuka",
    category: "Fatherhood",
    tags: ["fatherhood", "family", "legacy"],
    body: "The greatest legacy a father can leave is not what he accumulated, but what he awakened. It is in the ordinary moments — the conversations, the teachings, the presence — that we pass on the most valuable things.",
  },
  {
    id: "hospital-visit",
    title: "A Hospital Visit Remembered",
    subtitle: "How a simple reading corner changed everything",
    author: "Mercy Wanjiku",
    category: "Beard & Diapers Projects",
    tags: ["projects", "hospital", "dignity"],
    body: "In a Nairobi hospital ward, a reading corner became more than a shelf of books—it became a sanctuary.",
  },
];

const books = [
  {
    id: "the-100-day-heartbeat",
    title: "The 100-Day Heartbeat",
    description: "Preparing my soul for 40. One hundred days. One hundred reflections. One journey of becoming.",
    chapters: [
      { number: 1, title: "Day 1 — The Quiet Beginning" },
      { number: 2, title: "Day 2 — Listening Again" },
      { number: 3, title: "Day 3 — Growing Where You Are Planted" },
    ],
  },
];

const projects = [
  {
    id: "hospital-reading-corner",
    name: "Hospital Reading Corners",
    location: "Nairobi, Kenya",
    why: "Healing is not only medical. Stories and presence restore dignity.",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json({ results: [], query });
  }

  const lowercaseQuery = query.toLowerCase();

  let searchableStories = stories;
  if (getSupabaseConfig()) {
    try {
      const databaseStories = await supabaseRest<Array<{
        slug: string;
        title: string;
        subtitle: string;
        category: string;
        excerpt: string;
        author_name: string;
        content: string;
      }>>("stories?select=slug,title,excerpt,category,author_name,content&status=eq.published");
      searchableStories = [
        ...databaseStories.map((story) => ({
          id: story.slug,
          title: story.title,
          subtitle: story.excerpt,
          author: story.author_name,
          category: story.category,
          tags: [] as string[],
          body: story.content,
        })),
        ...stories,
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
        s.tags.some((t) => t.toLowerCase().includes(lowercaseQuery))
    ),
    ...books.filter(
      (b) =>
        b.title.toLowerCase().includes(lowercaseQuery) ||
        b.description.toLowerCase().includes(lowercaseQuery) ||
        b.chapters.some(
          (c) => c.title.toLowerCase().includes(lowercaseQuery)
        )
    ),
    ...projects.filter(
      (p) =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.why.toLowerCase().includes(lowercaseQuery)
    ),
  ];

  return NextResponse.json({ results, query });
}
