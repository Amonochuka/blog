import Image from "next/image";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";

const chapterFiles = {
  "day-1": "day-1.md",
  "day-2": "day-2.md",
  "day-3": "day-3.md",
} as const;

export default async function BookChapterPage({
  params,
}: { params: Promise<{ slug: string; chapter: string }> }) {
  const { slug, chapter } = await params;
  if (slug !== "the-100-day-heartbeat" || !Object.hasOwn(chapterFiles, chapter)) notFound();

  const chapterSource = await readFile(
    path.join(process.cwd(), "src/content/chapters", chapterFiles[chapter as keyof typeof chapterFiles]),
    "utf8"
  );
  const frontmatter = chapterSource.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!frontmatter) notFound();

  const titleLine = frontmatter[1].match(/^title:\s*(?:"([^"]+)"|'([^']+)'|(.+))\s*$/m);
  const title = titleLine?.[1] ?? titleLine?.[2] ?? titleLine?.[3];
  const paragraphs = frontmatter[2]
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph && !paragraph.startsWith("#"));
  if (!title || paragraphs.length === 0) notFound();

  const chapterNum = Number(chapter.slice("day-".length));
  const progress = chapterNum;

  return (
    <BaseLayout>
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-2xl mx-auto px-6">
          <article className="prose lg:prose-xl max-w-2xl mx-auto">
            <Image
              src="/images/family-reading-story.jpg"
              alt="A father reading with his child"
              className="w-full h-48 object-cover mb-6 rounded-md"
              loading="lazy"
            width={800}
                  height={400}
                />

            <header className="mb-8">
              <h1 className="text-3xl font-bold text-be-900">The 100-Day Heartbeat</h1>
              <p className="text-be-600 text-sm">Preparing my soul for 40. One hundred days. One hundred reflections. One journey of becoming.</p>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-be-500 text-sm mb-2">
                  <span>Progress:</span>
                  <span className="font-medium bg-be-100 px-2 py-1 rounded">Day {progress} of 100</span>
                </div>
                <p className="text-be-600 dark:text-zinc-400">
                  {progress >= 1 ? "Continue from where you left off" : "Start reading from the beginning"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3].map((day) => (
                  <Link key={day} href={`/books/the-100-day-heartbeat/day-${day}`} className={`block px-3 py-1 rounded text-xs ${day === chapterNum ? "bg-be-600 text-white" : "text-be-500 hover:text-be-900 transition-colors"}`}>
                    Day {day}
                  </Link>
                ))}
              </div>
            </header>

            <h2 className="text-2xl font-bold text-be-900 mb-6">{title}</h2>

            {paragraphs.map((paragraph, index) => <p key={`${chapter}-${index}`}>{paragraph}</p>)}

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-2">
              {chapterNum < 3 ? (
                <div className="flex items-center gap-2 text-be-500">
                  <span>→</span>
                  <a href={`/books/the-100-day-heartbeat/day-${chapterNum + 1}`} className="font-medium hover:text-be-600 transition-colors">
                    Next Chapter →
                  </a>
                </div>
              ) : (
                <p className="text-sm text-be-500">You’re at the latest available chapter.</p>
              )}
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <a
                  href={`https://wa.me/?text=Check%20out%20this%20chapter:%20Day%20${chapterNum}%20of%20the%20100-Day%20Heartbeat%20from%20Beard%20%26%20Diapers`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-400 text-white text-sm rounded hover:bg-green-500 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbeardanddiapers.org%2Fbooks%2Fthe-100-day-heartbeat%2Fday-${chapterNum}`}
                  className="flex items-center gap-1 rounded bg-[#1877f2] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#166fe5]"
                  target="_blank"
                  rel="noopener"
                >
                  Facebook
                </a>
                <a
                  href={`https://x.com/intent/tweet?url=https%3A%2F%2Fbeardanddiapers.org%2Fbooks%2Fthe-100-day-heartbeat%2Fday-${chapterNum}&text=Day%20${chapterNum}%20of%20the%20100-Day%20Heartbeat%20from%20Beard%20%26%20Diapers`}
                  className="flex items-center gap-1 rounded bg-[#1da1f2] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#1a91da]"
                  target="_blank"
                  rel="noopener"
                >
                  X
                </a>
              </div>
              <Link
                href="/books/the-100-day-heartbeat"
                className="font-medium text-be-600 hover:text-be-900 transition-colors"
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

// Generate static params for the chapters currently available.
export const generateStaticParams = async () => {
  const params = [];
  for (let i = 1; i <= 3; i++) {
    params.push({
      slug: "the-100-day-heartbeat",
      chapter: `day-${i}`,
    });
  }
  return params;
};
