import Image from "next/image";
import { BaseLayout } from "@/components/BaseLayout";
import { getAppBaseUrl } from "@/lib/site-url";
import Link from "next/link";

export default async function BooksPage() {
  const res = await fetch(`${getAppBaseUrl()}/api/content`, { cache: "no-store" });
  const { books } = await res.json() as { books: Array<{ id: string; slug: string; cover: string; title: string; tagline: string; description: string }> };

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
                />
                  <div className="absolute bottom-0 left-0 right-0 bg-be-900/80 backdrop-blur-sm text-white p-4">
                    <h3 className="font-bold">{book.title}</h3>
                    <p className="text-sm mt-1">{book.tagline}</p>
                  </div>
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
              <p className="text-be-600 dark:text-zinc-400 mb-6">
                {books[0]?.title} — {books[0]?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <span className="inline-block px-3 py-1 bg-be-600 text-white text-sm rounded">Currently Serializing</span>
                <Link
                  className="text-be-500 hover:text-be-600 transition-colors text-sm"
                  href="/books/the-100-day-heartbeat"
                >
                  Start Reading
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/book-reading.jpg"
                alt="Person reading a book"
                className="rounded-2xl w-full h-[300px] object-cover"
                width={800}
                height={400}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
