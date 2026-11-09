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
  const data = await res.json();
  const results = data?.results || [];
  const query = data?.query || "";

  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-be-900 mb-4">Search Results</h2>
            {query && <p className="text-be-600 dark:text-zinc-400">Results for: {query}</p>}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-be-600 dark:text-zinc-400">No results found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((result: any) => {
                let href = "/";
                let title = "";
                if (result.id?.startsWith("hope")) {
                  href = "/stories/" + result.id;
                  const titles = {
                    "hope-in-the-ordinary": "Hope in the Ordinary",
                    "walking-together": "Walking Together",
                    "fathers-day-reflection": "Father's Day Reflection",
                    "hospital-visit": "A Hospital Visit Remembered",
                  };
                  title = (titles as any)[result.id];
                } else if (result.id?.startsWith("the-100-day-heartbeat")) {
                  href = "/books/" + result.id;
                  title = result.title;
                } else if (result.id?.startsWith("hospital-reading-corner")) {
                  href = "/projects/" + result.id;
                  title = result.name;
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