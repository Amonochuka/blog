import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type StoryArticleLayoutProps = {
  slug: string;
  title: string;
  category: string;
  subtitle?: string;
  tags?: string[];
  author: string;
  date?: string | null;
  readingTime?: string;
  image: string | null;
  imageAlt: string;
  children: ReactNode;
  relatedStories?: Array<{ slug: string; title: string; excerpt: string }>;
};

function ShareIcon({ network }: { network: "whatsapp" | "facebook" | "x" }) {
  if (network === "whatsapp") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4A8.2 8.2 0 1 1 20.2 11.8Z" />
        <path d="M8.3 7.7c-.4.4-.7.9-.7 1.5 0 2.6 3.4 6 6 6 .6 0 1.1-.3 1.5-.7l.3-.4-1.9-1.3-1 .7c-1.1-.5-1.8-1.2-2.3-2.3l.7-1-1.3-1.9-.4.4Z" />
      </svg>
    );
  }

  if (network === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
    </svg>
  );
}

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
  subtitle,
  tags = [],
  author,
  date,
  readingTime,
  image,
  imageAlt,
  children,
  relatedStories = [],
}: StoryArticleLayoutProps) {
  const formattedDate = formatDate(date);
  const storyUrl = `https://beardanddiapers.org/stories/${slug}`;
  const encodedUrl = encodeURIComponent(storyUrl);
  const encodedShareText = encodeURIComponent(`${title} — ${storyUrl}`);

  return (
    <section className="bg-be-50 pt-10 pb-8 sm:pt-14 sm:pb-8 lg:pt-20 lg:pb-8 dark:bg-be-900">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-sm font-semibold text-be-600 transition-colors hover:text-be-900 dark:text-be-300 dark:hover:text-white"
        >
          <span aria-hidden="true">←</span> All stories
        </Link>

        <article className="mt-8">
          <header className={`grid items-center gap-8 ${image ? "lg:grid-cols-[0.88fr_1.12fr] lg:gap-14" : ""}`}>
            <div className="py-2">
              <p className="mb-5 inline-flex rounded-full bg-be-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-be-800 dark:bg-be-800 dark:text-be-100">
                {category}
              </p>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-be-900 sm:text-5xl lg:text-6xl dark:text-white">
                {title}
              </h1>
              {subtitle && <p className="mt-4 max-w-2xl text-xl leading-relaxed text-be-700 dark:text-zinc-300">{subtitle}</p>}
              {tags.length > 0 && <ul className="mt-4 flex flex-wrap gap-2" aria-label="Story tags">{tags.map((tag) => <li key={tag} className="rounded-full bg-be-100 px-3 py-1 text-xs text-be-700 dark:bg-be-800 dark:text-zinc-300">{tag}</li>)}</ul>}
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

            {image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-be-200 shadow-sm sm:aspect-[16/10]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                  preload
                />
              </div>
            )}
          </header>

          <div className="mx-auto mt-12 max-w-[70ch] lg:mt-16">
            <div className="story-article-body text-lg leading-8 text-be-800 dark:text-zinc-200">
              {children}
            </div>

            {relatedStories.length > 0 && <section className="mt-12" aria-labelledby="related-stories-heading">
              <h2 id="related-stories-heading" className="text-2xl font-bold text-be-900 dark:text-white">Related stories</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">{relatedStories.map((story) => <Link key={story.slug} href={`/stories/${story.slug}`} className="rounded-xl border border-[#e8ddc9] bg-white p-5 transition-colors hover:border-[#c9a96a] dark:border-[#6b4b3a] dark:bg-be-800"><h3 className="font-bold text-be-900 dark:text-white">{story.title}</h3><p className="mt-2 line-clamp-3 text-sm text-be-700 dark:text-zinc-300">{story.excerpt}</p></Link>)}</div>
            </section>}

            <footer className="mt-12 border-t border-[#d9c8a3] pt-7 dark:border-[#7d6231]">
              <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-be-900 dark:text-white">Share this story</h2>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={`https://wa.me/?text=${encodedShareText}`}
                      aria-label="Share on WhatsApp"
                      title="Share on WhatsApp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="story-share-icon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-600"
                    >
                      <ShareIcon network="whatsapp" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                      aria-label="Share on Facebook"
                      title="Share on Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="story-share-icon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-600"
                    >
                      <ShareIcon network="facebook" />
                    </a>
                    <a
                      href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(title)}`}
                      aria-label="Share on X"
                      title="Share on X"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="story-share-icon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-600"
                    >
                      <ShareIcon network="x" />
                    </a>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-be-900 dark:text-white">Have a story to share?</p>
                  <Link
                    href="/submit-story"
                    className="mt-1 inline-flex items-center gap-1 font-semibold text-be-700 underline decoration-be-400 underline-offset-4 hover:text-be-900 dark:text-be-200 dark:hover:text-white"
                  >
                    Submit your story <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
}
