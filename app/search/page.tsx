import { BaseLayout } from "@/components/BaseLayout";
import { getAppBaseUrl } from "@/lib/site-url";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const res = await fetch(`${getAppBaseUrl()}/api/search?q=${encodeURIComponent(q)}`, { cache: "no-store" });
  const data = await res.json() as { results?: Array<{ id: string; title?: string; name?: string; category?: string }>; query?: string };
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

          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-be-600 dark:text-zinc-400">No results found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((result) => {
                let href = "/stories";
                let title = result.title || result.name || "View result";
                const storyIds = [
                  "hope-in-the-ordinary",
                  "walking-together",
                  "fathers-day-reflection",
                  "hospital-visit",
                ];
                if (storyIds.includes(result.id)) {
                  href = "/stories/" + result.id;
                  title = result.title || title;
                } else if (result.id?.startsWith("the-100-day-heartbeat")) {
                  href = "/books/" + result.id;
                  title = result.title || title;
                } else if (result.id?.startsWith("hospital-reading-corner")) {
                  href = "/projects#hospital-reading-corners";
                  title = result.name || title;
                }
                return result.id ? (
                  <Link
                    key={result.id}
                    href={href}
                    className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-3">
                      <h3 className="text-be-900 mb-2">{title}</h3>
                      <p className="text-be-600 text-sm">{result.category || ""}</p>
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
