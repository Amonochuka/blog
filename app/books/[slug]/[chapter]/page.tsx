import Image from "next/image";
import Link from "next/link";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { BaseLayout } from "@/components/BaseLayout";
import { books } from "@/content/books";
import { getAppBaseUrl } from "@/lib/site-url";

export default async function BookChapterPage({
  params,
}: { params: Promise<{ slug: string; chapter: string }> }) {
  const { slug, chapter } = await params;
  const book = books.find((entry) => entry.slug === slug);
  const chapterMatch = /^day-(\d+)$/.exec(chapter);
  const chapterNumber = chapterMatch ? Number(chapterMatch[1]) : NaN;
  const chapterIndex = book?.chapters.findIndex((entry) => entry.number === chapterNumber) ?? -1;
  const chapterDetails = chapterIndex >= 0 ? book?.chapters[chapterIndex] : undefined;
  if (!book || !chapterDetails) notFound();

  let chapterSource: string;
  try {
    chapterSource = await readFile(
      path.join(process.cwd(), "src/content/chapters", book.slug, `${chapter}.md`),
      "utf8"
    );
  } catch {
    notFound();
  }

  const frontmatter = chapterSource.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!frontmatter) notFound();

  const titleLine = frontmatter[1].match(/^title:\s*(?:"([^"]+)"|'([^']+)'|(.+))\s*$/m);
  const title = titleLine?.[1] ?? titleLine?.[2] ?? titleLine?.[3];
  const paragraphs = frontmatter[2]
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph && !paragraph.startsWith("#"));
  if (!title || paragraphs.length === 0) notFound();

  const nextChapter = book.chapters[chapterIndex + 1];
  const chapterCount = book.totalDays ?? book.chapters.length;
  const chapterUrl = `${getAppBaseUrl()}/books/${book.slug}/${chapter}`;
  const encodedChapterUrl = encodeURIComponent(chapterUrl);
  const shareText = encodeURIComponent(`${title} — ${book.title}`);

  return (
    <BaseLayout>
      <section className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-be-900">
        <div className="mx-auto max-w-2xl px-6">
          <article className="prose mx-auto max-w-2xl lg:prose-xl">
            <Image
              src={book.cover}
              alt={book.title}
              className="mb-6 h-48 w-full rounded-md object-cover"
              width={800}
              height={400}
            />

            <header className="mb-8">
              <h1 className="text-3xl font-bold text-be-900 dark:text-white">{book.title}</h1>
              <p className="text-sm text-be-600 dark:text-zinc-400">{book.description}</p>

              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2 text-sm text-be-500">
                  <span>Progress:</span>
                  <span className="rounded bg-be-100 px-2 py-1 font-medium">Day {chapterNumber} of {chapterCount}</span>
                </div>
                <p className="text-be-600 dark:text-zinc-400">Continue from where you left off</p>
              </div>

              <nav aria-label="Book chapters" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {book.chapters.map((entry) => (
                  <Link
                    key={entry.number}
                    href={`/books/${book.slug}/day-${entry.number}`}
                    aria-current={entry.number === chapterNumber ? "page" : undefined}
                    className={`block rounded px-3 py-2 text-xs transition-colors ${entry.number === chapterNumber ? "bg-be-600 text-white" : "text-be-500 hover:bg-be-100 hover:text-be-900 dark:hover:text-white"}`}
                  >
                    {entry.title}
                  </Link>
                ))}
              </nav>
            </header>

            <h2 className="mb-6 text-2xl font-bold text-be-900 dark:text-white">{title}</h2>
            {paragraphs.map((paragraph, index) => <p key={`${chapter}-${index}`}>{paragraph}</p>)}

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-2">
              {nextChapter ? (
                <Link
                  href={`/books/${book.slug}/day-${nextChapter.number}`}
                  className="font-medium text-be-600 transition-colors hover:text-be-900 dark:hover:text-white"
                >
                  Next Chapter →
                </Link>
              ) : (
                <p className="text-sm text-be-500">You’re at the latest available chapter.</p>
              )}
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${book.title}: ${chapterUrl}`)}`}
                  className="flex items-center gap-1 rounded bg-green-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-green-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=${encodedChapterUrl}`}
                  className="flex items-center gap-1 rounded bg-[#1877f2] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#166fe5]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  href={`https://x.com/intent/tweet?url=${encodedChapterUrl}&text=${shareText}`}
                  className="flex items-center gap-1 rounded bg-[#1da1f2] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#1a91da]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X
                </a>
              </div>
              <Link
                href={`/books/${book.slug}`}
                className="font-medium text-be-600 transition-colors hover:text-be-900 dark:hover:text-white"
              >
                ← Back to Book
              </Link>
            </div>
          </article>
        </div>
      </section>
    </BaseLayout>
  );
}

export const generateStaticParams = () =>
  books.flatMap((book) =>
    book.chapters.map((chapter) => ({
      slug: book.slug,
      chapter: `day-${chapter.number}`,
    }))
  );
