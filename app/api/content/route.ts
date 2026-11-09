import { NextResponse } from "next/server";

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
    image: "/images/story-1.jpg",
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
    image: "/images/story-2.jpg",
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
    image: "/images/story-3.jpg",
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
    image: "/images/story-1.jpg",
  },
];

const books = [
  {
    id: "the-100-day-heartbeat",
    title: "The 100-Day Heartbeat",
    slug: "the-100-day-heartbeat",
    author: "Roy Ochuka",
    description: "Preparing my soul for 40. One hundred days. One hundred reflections. One journey of becoming.",
    cover: "/images/heartbeat-cover.jpg",
    status: "serializing",
    tagline: "100 days. 100 reflections. One journey of becoming.",
    chapters: [
      { number: 1, title: "Day 1 — The Quiet Beginning", free: true },
      { number: 2, title: "Day 2 — Listening Again", free: true },
      { number: 3, title: "Day 3 — Growing Where You Are Planted", free: true },
    ],
  },
];

const projects = [
  {
    id: "hospital-reading-corner",
    name: "Hospital Reading Corners",
    location: "Nairobi, Kenya",
    year: "2024",
    description: "Small reading corners in hospital wards where volunteers read with patients and families.",
    why: "Healing is not only medical. Stories and presence restore dignity.",
    photos: [],
    people: ["Volunteers", "Nurses", "Patients"],
    outcomes: "Three reading corners established. Over 120 reading sessions held.",
    featured: true,
  },
];

export async function GET() {
  return NextResponse.json({ stories, books, projects });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ received: true, body }, { status: 201 });
}