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
              src="/images/story-2.jpg"
              alt="Walking Together - featured image"
              className="w-full h-64 object-cover mb-6 rounded-md"
              loading="lazy"
            />
            <h1 className="text-4xl font-bold text-be-900 mb-6">Walking Together</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-be-500 text-sm">Community</span>
              <span className="text-be-400 text-sm">· 2025-02-10</span>
            </div>
            <p>Hope is not meant to be carried alone. It grows when we walk together.</p>

            <h2 className="text-2xl font-bold text-be-900 mt-8">A single story can change a life.</h2>
            <p>A single story can change a life. But a community of stories can change a nation.</p>

            <blockquote>
              <p>When we share our stories, we create space for others to encounter hope in unexpected places.</p>
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
                  href={`https://wa.me/?text=Check%20out%20this%20story:%20Walking%20Together%20from%20Beard%20%26%20Diapers`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-400 text-white text-sm rounded hover:bg-green-500 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbeardanddiapers.org%2Fstories%2Fwalking-together`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-#1877f2 text-white text-sm rounded hover:bg-#166fe5 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  Facebook
                </a>
                <a
                  href={`https://x.com/intent/tweet?url=https%3A%2F%2Fbeardanddiapers.org%2Fstories%2Fwalking-together&text=Walking%20Together%20from%20Beard%20%26%20Diapers`}
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