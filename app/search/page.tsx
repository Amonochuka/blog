import { BaseLayout } from "@/components/BaseLayout";
import { getAppBaseUrl } from "@/lib/site-url";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const res = q.trim()
    ? await fetch(`${getAppBaseUrl()}/api/search?q=${encodeURIComponent(q)}`, { cache: "no-store" })
    : null;
  const data = res
    ? await res.json() as { results?: Array<{ id: string; type: "story" | "book" | "chapter" | "project"; title?: string; name?: string; category?: string; author?: string; bookTitle?: string; href?: string }>; query?: string }
    : null;
  const results = data?.results || [];
  const query = data?.query || "";

  return (
    <BaseLayout>
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-be-900 mb-4">Search Results</h2>
            {query && <p className="text-be-600 dark:text-zinc-400">Results for: {query}</p>}
          </div>

          <form action="/search" method="get" role="search" className="mx-auto mb-12 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="site-search">Search stories, books, chapters, authors, and projects</label>
            <input
              id="site-search"
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search stories, books, chapters, authors, and projects"
              required
              className="min-w-0 flex-1 rounded-full border border-[#d9c8a3] bg-white px-5 py-3 text-be-900 placeholder:text-be-600/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-600"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-be-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-be-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-600"
            >
              Search
            </button>
          </form>

          {!query.trim() ? (
            <div className="text-center py-12">
              <p className="text-be-600 dark:text-zinc-400">Enter a keyword to find stories, books, chapters, authors, and projects.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-be-600 dark:text-zinc-400">No results found for &ldquo;{query}&rdquo;. Try another keyword.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((result) => {
                const href = result.href || (result.type === "story"
                  ? `/stories/${result.id}`
                  : result.type === "book"
                    ? `/books/${result.id}`
                    : result.type === "project" ? `/projects#${result.id}` : "#");
                const title = result.title || result.name || "View result";
                return result.id ? (
                  <Link
                    key={result.id}
                    href={href}
                    className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-3">
                      <h3 className="text-be-900 mb-2">{title}</h3>
                      <p className="text-be-600 text-sm">
                        {result.category || (result.type === "chapter" ? `Chapter · ${result.bookTitle}` : result.type === "project" ? "Project" : result.type === "book" ? `Book${result.author ? ` · ${result.author}` : ""}` : result.author ? `Story · ${result.author}` : "Story")}
                      </p>
                    </div>
                  </Link>
                ) : null;
              })}
            </div>
          )}
        </div>
      </section>
    </BaseLayout>
  );
}
