import Image from "next/image";
import { readingTime } from "@/src/utils/readingTime";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BaseLayout } from "@/components/BaseLayout";

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
            />
            <h1 className="text-4xl font-bold text-be-900 mb-6">Father's Day Reflection</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-be-500 text-sm">Fatherhood</span>
              <span className="text-be-400 text-sm">· 2025-06-15</span>
            </div>
            <p>What does it mean to be a father who passes on hope, not perfection?</p>

            <h2 className="text-2xl font-bold text-be-900 mt-8">The greatest legacy</h2>
            <p>The greatest legacy a father can leave is not what he accumulated, but what he awakened.</p>

            <blockquote>
              <p>It is in the ordinary moments — the conversations, the teachings, the presence — that we pass on the most valuable things.</p>
            </blockquote>

            <h2 className="text-2xl font-bold text-be-900 mt-8">Continue the journey</h2>
            <p>Every story matters. Your story might be the one someone needs to hear today.</p>

            <div className="mt-8">
              <nav className="lower-alpha">
                <ol>
                  <li>
                    <a href="/stories">← Back to Stories</a>
                  </li>
                </ol>
              </nav>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </BaseLayout>
  );
}