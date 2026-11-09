import Image from "next/image";
import { BaseLayout } from "@/components/BaseLayout";
import { Footer } from "@/components/Footer";

export default function StoryPage() {
  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <article className="prose lg:prose-xl max-w-2xl mx-auto">
            <Image
              src="/images/story-3.jpg"
              alt="Father's Day Reflection - featured image"
              className="w-full h-64 object-cover mb-6 rounded-md"
              loading="lazy"
            width={800}
                  height={400}
                />
            <h1 className="text-4xl font-bold text-be-900 mb-6">Fathers Day Reflection</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-be-500 text-sm">Fatherhood</span>
              <span className="text-be-400 text-sm">· 2025-06-15</span>
            </div>
            <p>What does it mean to be a father who passes on hope, not perfection?</p>

            <h2 className="text-2xl font-bold text-be-900 mt-8">The greatest legacy</h2>
            <p>The greatest legacy a father can leave is not what he accumulated, but what he awakened.</p>

            <blockquote>
              <p>
                It is in the ordinary moments — the conversations, the teachings, the presence — that we pass on the most valuable things.
              </p>
            </blockquote>

            <h2 className="text-2xl font-bold text-be-900 mt-8">Continue the journey</h2>
            <p>Every story matters. Your story might be the one someone needs to hear today.</p>

            <div className="mt-8 flex items-center gap-2">
              <nav className="lower-alpha">
                <ol>
                  <li>
                    <a href="/stories">← Back to Stories</a>
                  </li>
                </ol>
              </nav>
              <div className="ml-auto flex gap-2">
                <a
                  href="https://wa.me/?text=Check%20out%20this%20story%3A%20Fathers%20Day%20Reflection%20from%20Beard%20%26%20Diapers"
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-400 text-white text-sm rounded hover:bg-green-500 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp
                </a>
                <a
                  href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbeardanddiapers.org%2Fstories%2Ffathers-day-reflection"
                  className="flex items-center gap-1 px-3 py-1.5 bg-#1877f2 text-white text-sm rounded hover:bg-#166fe5 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  Facebook
                </a>
                <a
                  href="https://x.com/intent/tweet?url=https%3A%2F%2Fbeardanddiapers.org%2Fstories%2Ffathers-day-reflection&text=Fathers%20Day%20Reflection%20from%20Beard%20%26%20Diapers"
                  className="flex items-center gap-1 px-3 py-1.5 bg-#1da1f2 text-white text-sm rounded hover:#1a91da transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  X
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </BaseLayout>
  );
}