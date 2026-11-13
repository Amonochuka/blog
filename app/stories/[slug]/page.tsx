import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BaseLayout } from "@/components/BaseLayout";
import { getSupabaseConfig, supabaseRest } from "@/lib/supabase-rest";

export const dynamic = "force-dynamic";

type PublishedStory = {
  slug: string;
  title: string;
  content: string;
  category: string;
  author_name: string;
  image_url: string;
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

  return (
    <BaseLayout>
      <section className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-be-900">
        <article className="mx-auto max-w-3xl px-6">
          <Image src={story.image_url} alt="" width={1200} height={640} className="mb-8 h-64 w-full rounded-2xl object-cover sm:h-80" />
          <p className="mb-3 text-sm text-be-500">{story.category} · {story.author_name}{story.published_at ? ` · ${story.published_at.slice(0, 10)}` : ""}</p>
          <h1 className="mb-8 text-4xl font-bold leading-tight text-be-900 sm:text-5xl dark:text-white">{story.title}</h1>
          <div className="whitespace-pre-wrap text-base leading-8 text-be-700 dark:text-zinc-300">{story.content}</div>
          <Link href="/stories" className="mt-10 inline-block font-medium text-be-600 hover:text-be-900">← Back to Stories</Link>
        </article>
      </section>
    </BaseLayout>
  );
}
