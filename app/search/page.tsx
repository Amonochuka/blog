import { Head } from "@next/headers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";

export default async function SearchPage({
  params,
}: {
  params: { q?: string };
}) {
  const q = params.q || "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/search?q=${encodeURIComponent(
      q
    )}`
  );
  const { results, query } = await res.json();

  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-be-900 mb-4">Search Results</h2>
            {query && (
              <p className="text-be-600 dark:text-zinc-400">
                Results for“{query}”
              </p>
            )}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-be-600 dark:text-zinc-400">
                No stories, books, or projects found matching“{query}”.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => {
                if (result.id.startsWith("hope")) {
                  const story = {
                    hope-in-the-ordinary:
                      "Hope in the Ordinary",
                    walking-together: "Walking Together",
                    fathers-day-reflection: "Father's Day Reflection",
                    hospital-visit: "A Hospital Visit Remembered",
                  }[result.id];
                  return (
                    <Link
                      key={result.id}
                      to `/stories/${result.id}`
                      className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <h3 className="text-be-900 mb-2">{story}</h3>
                        <p className="text-be-600 text-sm">
                          {result.category || "Personal Reflections"}
                        </p>
                      </div>
                    </Link>
                  );
                }
                if (result.id.startsWith("the-100-day-heartbeat")) {
                  return (
                    <Link
                      key={result.id}
                      to `/books/${result.id}`
                      className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <h3 className="text-be-900 mb-2">{result.title}</h3>
                        <p className="text-be-600 text-sm">
                          {result.description?.substring(0, 80)}...
                        </p>
                      </div>
                    </Link>
                  );
                }
                if (result.id.startsWith("hospital-reading-corner")) {
                  return (
                    <Link
                      key={result.id}
                      to `/projects/${result.id}`
                      className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4">
                        <h3 className="text-be-900 mb-2">{result.name}</h3>
                        <p className="text-be-600 text-sm">
                          {result.location}
                        </p>
                      </div>
                    </Link>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </section>
    </BaseLayout>
  );
}