import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type StoryArticleLayoutProps = {
  slug: string;
  title: string;
  category: string;
  author: string;
  date?: string | null;
  readingTime?: string;
  image: string;
  imageAlt: string;
  children: ReactNode;
};

function formatDate(date?: string | null) {
  if (!date) return null;
  const dateValue = new Date(`${date.slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(dateValue.getTime())) return date;

  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(dateValue);
}

export function StoryArticleLayout({
  slug,
  title,
  category,
  author,
  date,
  readingTime,
  image,
  imageAlt,
  children,
}: StoryArticleLayoutProps) {
  const formattedDate = formatDate(date);
  const storyUrl = `https://beardanddiapers.org/stories/${slug}`;
  const encodedUrl = encodeURIComponent(storyUrl);
  const encodedShareText = encodeURIComponent(`${title} — ${storyUrl}`);

  return (
    <section className="bg-be-50 py-10 sm:py-14 lg:py-20 dark:bg-be-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-sm font-semibold text-be-600 transition-colors hover:text-be-900 dark:text-be-300 dark:hover:text-white"
        >
          <span aria-hidden="true">←</span> All stories
        </Link>

        <article className="mt-8">
          <header className="grid items-center gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
            <div className="py-2">
              <p className="mb-5 inline-flex rounded-full bg-be-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-be-800 dark:bg-be-800 dark:text-be-100">
                {category}
              </p>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-be-900 sm:text-5xl lg:text-6xl dark:text-white">
                {title}
              </h1>
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-be-600 dark:text-zinc-300">
                <span className="font-semibold text-be-900 dark:text-white">{author}</span>
                {formattedDate && (
                  <>
                    <span aria-hidden="true" className="text-be-400">·</span>
                    <time dateTime={date?.slice(0, 10)}>{formattedDate}</time>
                  </>
                )}
                {readingTime && (
                  <>
                    <span aria-hidden="true" className="text-be-400">·</span>
                    <span>{readingTime}</span>
                  </>
                )}
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-be-200 shadow-sm sm:aspect-[16/10]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                preload
              />
            </div>
          </header>

          <div className="mx-auto mt-12 grid max-w-6xl gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
            <div className="story-article-body min-w-0 max-w-[70ch] text-lg leading-8 text-be-800 dark:text-zinc-200">
              {children}
            </div>

            <aside className="self-start border-t border-be-300 pt-6 lg:sticky lg:top-28 lg:border-t-0 lg:border-l lg:pl-7 lg:pt-0 dark:border-be-700">
              <h2 className="text-lg font-bold text-be-900 dark:text-white">Share this story</h2>
              <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                <a
                  href={`https://wa.me/?text=${encodedShareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center rounded-full border border-be-300 px-4 text-sm font-medium text-be-700 transition-colors hover:border-be-600 hover:bg-white dark:border-be-700 dark:text-zinc-200 dark:hover:bg-be-800"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center rounded-full border border-be-300 px-4 text-sm font-medium text-be-700 transition-colors hover:border-be-600 hover:bg-white dark:border-be-700 dark:text-zinc-200 dark:hover:bg-be-800"
                >
                  Facebook
                </a>
                <a
                  href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center rounded-full border border-be-300 px-4 text-sm font-medium text-be-700 transition-colors hover:border-be-600 hover:bg-white dark:border-be-700 dark:text-zinc-200 dark:hover:bg-be-800"
                >
                  X
                </a>
              </div>

              <div className="mt-8 rounded-2xl bg-white p-5 dark:bg-be-800">
                <p className="font-semibold text-be-900 dark:text-white">Have a story to share?</p>
                <p className="mt-2 text-sm leading-6 text-be-600 dark:text-zinc-300">
                  Your experience may encourage someone else.
                </p>
                <Link
                  href="/submit-story"
                  className="mt-4 inline-flex font-semibold text-be-700 underline decoration-be-400 underline-offset-4 hover:text-be-900 dark:text-be-200 dark:hover:text-white"
                >
                  Submit your story
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
