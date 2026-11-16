import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BaseLayout } from "@/components/BaseLayout";
import { books } from "@/content/books";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((entry) => entry.slug === slug);
  if (!book) notFound();

  const firstChapter = book.chapters[0];

  return (
    <BaseLayout>
      <section className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-be-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Image
                src={book.cover}
                alt={book.title}
                className="mb-6 h-64 w-full rounded-2xl object-cover"
                width={800}
                height={400}
                loading="lazy"
              />
              <h1 className="text-4xl font-bold text-be-900 dark:text-white">{book.title}</h1>
              <p className="mt-2 text-be-600 dark:text-zinc-400">{book.description}</p>
              <div className="mt-6">
                <span className="inline-block rounded bg-be-600 px-3 py-1 text-sm text-white">
                  {book.status === "serializing" ? "Currently Serializing" : "Book"}
                </span>
              </div>
              {firstChapter ? (
                <Link
                  className="mt-4 inline-block rounded-full bg-be-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-be-700"
                  href={`/books/${book.slug}/day-${firstChapter.number}`}
                >
                  Start Reading
                </Link>
              ) : (
                <p className="mt-4 text-sm text-be-600 dark:text-zinc-400">Chapters will be added soon.</p>
              )}
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-be-900 dark:text-white">Table of Contents</h2>
              {book.chapters.length > 0 ? (
                <ol className="space-y-2 text-be-700 dark:text-zinc-400">
                  {book.chapters.map((chapter) => (
                    <li key={chapter.number}>
                      <Link
                        href={`/books/${book.slug}/day-${chapter.number}`}
                        className="transition-colors hover:text-be-600"
                      >
                        {chapter.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-be-600 dark:text-zinc-400">Chapters will be added soon.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
