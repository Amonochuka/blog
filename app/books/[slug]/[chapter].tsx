import Image from "next/image";
import { readingTime } from "@/src/utils/readingTime";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";

export default function BookChapterPage({
  params,
}: { params: { slug: string; chapter: string } }) {
  const chapterNum = parseInt(params.chapter);
  const isDayFree = chapterNum <= 3; // First 3 days are free

  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-2xl mx-auto px-6">
          <article className="prose lg:prose-xl max-w-2xl mx-auto">
            <Image
              src="/images/heartbeat-cover.jpg"
              alt="The 100-Day Heartbeat"
              className="w-full h-48 object-cover mb-6 rounded-md"
              loading="lazy"
            />

            <header className="mb-8">
              <h1 className="text-3xl font-bold text-be-900">The 100-Day Heartbeat</h1>
              <p className="text-be-600 text-sm">Preparing my soul for 40. One hundred days. One hundred reflections. One journey of becoming.</p>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {[1, 2, 3].map((day) => (
                  <div
                    key={day}
                    className={`px-3 py-1 rounded text-xs ${
                      day === chapterNum
                        ? "bg-be-600 text-white"
                        : "text-be-500 hover:text-be-900 transition-colors"
                    }`}
                  >
                    Day {day}
                  </div>
                ))}
              </div>
            </header>

            <h2 className="text-2xl font-bold text-be-900 mb-6">Day {chapterNum} — The Quiet Beginning</h2>

            <p>
              This is a sample reflection for day {chapterNum} of the journey. Replace with the real
              manuscript text.
            </p>

            <p>Take a breath. Notice the ordinary. God is already here.</p>

            <div className="mt-8 flex justify-between items-center">
              <div className="flex items-center gap-2 text-be-500">
                <span>→</span>
                <a
                  href={`/books/the-100-day-heartbeat/day-${chapterNum + 1}`}
                  className="font-medium hover:text-be-600 transition-colors"
                >
                  Next Chapter →
                </a>
              </div>
              <a
                href="/books/the-100-day-heartbeat"
                className="font-medium text-be-600 hover:text-be-900 transition-colors"
              >
                ← Back to Book
              </a>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </BaseLayout>
  );
}

// Generate static params for ISR
export const getStaticParams = async () => {
  const params = [];
  for (let i = 1; i <= 3; i++) {
    params.push({
      slug: "the-100-day-heartbeat",
      chapter: i.toString(),
    });
  }
  return params;
};