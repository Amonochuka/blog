import Image from "next/image";
import { BaseLayout } from "@/components/BaseLayout";
import { getPublicContent } from "@/lib/public-content";
import Link from "next/link";
import { NewsletterSignupSection } from "@/components/NewsletterSignupSection";

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const { books, featuredBookSlug } = await getPublicContent();
  const featuredBook = books.find((book) => book.slug === featuredBookSlug) ?? books[0];

  return (
    <BaseLayout>
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-be-900 mb-4">Books</h2>
            <p className="text-be-600 dark:text-zinc-400">Serialized stories and reflections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative group-hover:translate-y-2 transition-transform">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  width={800}
                  height={400}
                    unoptimized
                />
                  <div className="absolute bottom-0 left-0 right-0 bg-be-900/90 backdrop-blur-sm text-white p-4">
                    <h3 className="font-bold">{book.title}</h3>
                    <p className="text-sm mt-1">{book.author ? `By ${book.author} · ` : ""}{book.chapters?.length ?? 0} available chapters</p>
                    <p className="text-sm mt-1">{book.tagline}</p>
                  </div>
                </div>
                <div className="p-4 text-sm text-be-700 dark:text-zinc-300">
                  <p className="line-clamp-3">{book.description}</p>
                  <span className="mt-3 inline-flex rounded-full bg-be-100 px-3 py-1 text-xs font-semibold text-be-800 dark:bg-be-800 dark:text-zinc-200">{book.status === "serializing" ? "Currently Serializing" : book.status === "completed" ? "Completed" : "Coming Soon"}</span>
                  <span className="ml-3 font-semibold text-be-700">Open book →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Book serialization info section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-be-50 dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-be-900 mb-4">Currently Serializing</h2>
              {featuredBook ? (
                <>
                  <p className="text-be-600 dark:text-zinc-400 mb-6">
                    {featuredBook.title} — {featuredBook.description}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <span className="inline-block rounded bg-be-600 px-3 py-1 text-sm text-white">Currently Serializing</span>
                    <Link
                      className="text-sm text-be-500 transition-colors hover:text-be-600"
                      href={`/books/${featuredBook.slug}`}
                    >
                      Start Reading
                    </Link>
                  </div>
                </>
              ) : (
                <p className="text-be-600 dark:text-zinc-400 mb-6">Books will be added here soon.</p>
              )}
            </div>
            <div className="relative">
              <Image
                src={featuredBook?.cover ?? "/images/family-reading-library.jpg"}
                alt={featuredBook?.title ?? "A family sharing a book in a library"}
                className="rounded-2xl w-full h-[300px] object-cover"
                width={800}
                height={400}
                loading="lazy"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>
      <NewsletterSignupSection title="The Beard & Diapers Letter" description="Get new stories, book chapters and project updates occasionally." />
    </BaseLayout>
  );
}
