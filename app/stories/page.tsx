import Image from "next/image";
import Link from "next/link";
import { BaseLayout } from "@/components/BaseLayout";
import { getAppBaseUrl } from "@/lib/site-url";

type StoryCard = {
  id: string;
  title: string;
  image: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  readingTime?: string;
  featured?: boolean;
};

function formatDate(date: string) {
  if (!date) return "";
  const parsed = new Date(`${date.slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function StoryMetadata({ story }: { story: StoryCard }) {
  const metadata = [story.author, formatDate(story.date), story.readingTime].filter(Boolean);

  return (
    <p className="text-sm text-be-600 dark:text-zinc-400">
      {metadata.join(" · ")}
    </p>
  );
}

export default async function StoriesPage() {
  const res = await fetch(`${getAppBaseUrl()}/api/content`, { cache: "no-store" });
  const { stories } = await res.json() as { stories: StoryCard[] };
  const featuredStory = stories.find((story) => story.featured) ?? stories[0];
  const otherStories = featuredStory
    ? stories.filter((story) => story.id !== featuredStory.id)
    : [];

  return (
    <BaseLayout>
      <section className="bg-be-50 py-14 sm:py-20 dark:bg-be-900">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <header className="mb-10 flex flex-col gap-6 border-b border-be-300 pb-8 sm:mb-14 sm:flex-row sm:items-end sm:justify-between dark:border-be-700">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-be-600 dark:text-be-300">
                Stories &amp; reflections
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-be-900 sm:text-5xl lg:text-6xl dark:text-white">
                Stories from our community
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-be-700 sm:text-lg dark:text-zinc-300">
                Reflections on hope, family, and the small acts of care that bring people together.
              </p>
            </div>
            <Link
              href="/submit-story"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-be-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-be-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-700 dark:bg-be-500 dark:text-be-900 dark:hover:bg-be-300"
            >
              Share your story <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </header>

          {featuredStory ? (
            <Link href={`/stories/${featuredStory.id}`} className="group block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-be-600">
              <article className="grid overflow-hidden rounded-3xl border border-be-200 bg-white shadow-sm transition-shadow group-hover:shadow-lg lg:grid-cols-[1.08fr_0.92fr] dark:border-be-800 dark:bg-be-800">
                <div className="relative aspect-[16/10] bg-be-200 lg:aspect-auto lg:min-h-[28rem]">
                  <Image
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    preload
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-be-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-be-800 dark:bg-be-900 dark:text-be-200">
                      Featured story
                    </span>
                    <span className="text-sm text-be-500 dark:text-be-300">{featuredStory.category}</span>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight text-be-900 transition-colors group-hover:text-be-700 sm:text-4xl dark:text-white dark:group-hover:text-be-200">
                    {featuredStory.title}
                  </h2>
                  <p className="mt-5 text-base leading-7 text-be-700 dark:text-zinc-300">
                    {featuredStory.excerpt}
                  </p>
                  <div className="mt-7">
                    <StoryMetadata story={featuredStory} />
                  </div>
                  <span className="mt-8 inline-flex items-center gap-2 font-semibold text-be-700 dark:text-be-200">
                    Read the story <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </article>
            </Link>
          ) : (
            <div className="rounded-3xl border border-be-200 bg-white p-8 text-be-700 dark:border-be-800 dark:bg-be-800 dark:text-zinc-300">
              New stories are on the way. You can be the first to share one.
            </div>
          )}

          {otherStories.length > 0 && (
            <section className="mt-14 sm:mt-20" aria-labelledby="more-stories-heading">
              <div className="mb-7 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-be-600 dark:text-be-300">
                    Keep reading
                  </p>
                  <h2 id="more-stories-heading" className="text-3xl font-bold text-be-900 sm:text-4xl dark:text-white">
                    More stories
                  </h2>
                </div>
                <span className="hidden text-sm text-be-500 sm:block dark:text-zinc-400">
                  {otherStories.length} {otherStories.length === 1 ? "story" : "stories"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {otherStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/stories/${story.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-be-200 bg-white transition-all hover:-translate-y-1 hover:border-be-400 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-be-600 dark:border-be-800 dark:bg-be-800"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-be-200">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-be-600 dark:text-be-300">
                        {story.category}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold leading-snug text-be-900 group-hover:text-be-700 dark:text-white dark:group-hover:text-be-200">
                        {story.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-be-700 dark:text-zinc-300">
                        {story.excerpt}
                      </p>
                      <div className="mt-6 border-t border-be-200 pt-4 dark:border-be-700">
                        <StoryMetadata story={story} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </BaseLayout>
  );
}
