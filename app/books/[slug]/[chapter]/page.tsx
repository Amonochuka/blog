import Image from "next/image";
import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default async function BookChapterPage({
  params,
}: { params: Promise<{ slug: string; chapter: string }> }) {
  const { chapter } = await params;
  const chapterNum = parseInt(chapter);
  const progress = chapterNum;

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

            <h2 className="text-2xl font-bold text-be-900 mb-6">Day {chapterNum} — The Quiet Beginning</h2>

            <p>
              This is a sample reflection for day {chapterNum} of the journey. Replace with the real
              manuscript text.
            </p>

            <p>Take a breath. Notice the ordinary. God is already here.</p>

            <div className="mt-8 flex items-center gap-2">
              <div className="flex items-center gap-2 text-be-500">
                <span>→</span>
                <a
                  href={`/books/the-100-day-heartbeat/day-${chapterNum + 1}`}
                  className="font-medium hover:text-be-600 transition-colors"
                >
                  Next Chapter →
                </a>
              </div>
              <div className="ml-auto flex gap-2">
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
                  className="flex items-center gap-1 px-3 py-1.5 bg-#1877f2 text-white text-sm rounded hover:bg-#166fe5 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  Facebook
                </a>
                <a
                  href={`https://x.com/intent/tweet?url=https%3A%2F%2Fbeardanddiapers.org%2Fbooks%2Fthe-100-day-heartbeat%2Fday-${chapterNum}&text=Day%20${chapterNum}%20of%20the%20100-Day%20Heartbeat%20from%20Beard%20%26%20Diapers`}
                  className="flex items-center gap-1 px^3 py-1.5 bg-#1da1f2 text-white text-sm rounded hover:#1a91da transition-colors"
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
