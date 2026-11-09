import Image from "next/image";
import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const isSerializing = slug === "the-100-day-heartbeat" && true; // Simplified check

  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/heartbeat-cover.jpg"
                alt="The 100-Day Heartbeat cover"
                className="rounded-2xl w-full h-64 object-cover mb-6"
                loading="lazy"
              width={800}
                  height={400}
                />
              <h2 className="text-4xl font-bold text-be-900">The 100-Day Heartbeat</h2>
              <p className="text-be-600 dark:text-zinc-400 mt-2">
                Preparing my soul for 40. One hundred days. One hundred reflections. One journey of becoming.
              </p>
              <div className="mt-6">
                <span className="inline-block px-3 py-1 bg-be-600 text-white text-sm rounded">Currently Serializing</span>
              </div>
              <Link
                className="inline-block mt-4 px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm"
                href={`/books/the-100-day-heartbeat/day-1`}
              >
                Start Reading
              </Link>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-be-900 mb-4">Table of Contents</h3>
              <ol className="space-y-2 text-be-700 dark:text-zinc-400">
                <li>
                  <Link
                    href="/books/the-100-day-heartbeat/day-1"
                    className="hover:text-be-600 transition-colors"
                  >
                    Day 1 — The Quiet Beginning
                  </Link>
                </li>
                <li>
                  <Link
                    href="/books/the-100-day-heartbeat/day-2"
                    className="hover:text-be-600 transition-colors"
                  >
                    Day 2 — Listening Again
                  </Link>
                </li>
                <li>
                  <Link
                    href="/books/the-100-day-heartbeat/day-3"
                    className="hover:text-be-600 transition-colors"
                  >
                    Day 3 — Growing Where You Are Planted
                  </Link>
                </li>
                {/* More chapters can be added */}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </BaseLayout>
  );
}