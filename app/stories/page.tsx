import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";
import readingTime from "@/src/utils/readingTime";

export default function StoriesPage() {
  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-be-900 mb-4">Stories</h2>
            <p className="text-be-600 dark:text-zinc-400">A collection of narratives from Beard & Diapers community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Story card 1 */}
            <Link
              to="/stories/hope-in-the-ordinary"
              className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
            >
              <Image
                src="/images/story-1.jpg"
                alt="Hope in the Ordinary"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-be-500 text-xs category">Personal Reflections</span>
                </div>
                <h3 className="text-xl font-bold text-be-900 mb-2">Hope in the Ordinary</h3>
                <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed mb-3">
                  Sometimes hope does not arrive as a grand event.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-be-500 text-xs">Roy Ochuka</span>
                    <span className="text-be-400 text-xs">· 2025-01-15</span>
                  </div>
                  <span className="text-be-400 text-xs">{readingTime}</span>
                </div>
              </div>
            </Link>

            {/* Story card 2 */}
            <Link
              to="/stories/walking-together"
              className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
            >
              <Image
                src="/images/story-2.jpg"
                alt="Walking Together"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-be-500 text-xs category">Community</span>
                </div>
                <h3 className="text-xl font-bold text-be-900 mb-2">Walking Together</h3>
                <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed mb-3">
                  Hope is not meant to be carried alone.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-be-500 text-xs">Roy Ochuka</span>
                    <span className="text-be-400 text-xs">· 2025-02-10</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Story card 3 */}
            <Link
              to="/stories/fathers-day-reflection"
              className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
            >
              <Image
                src="/images/story-3.jpg"
                alt="Father's Day Reflection"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-be-500 text-xs category">Fatherhood</span>
                </div>
                <h3 className="text-xl font-bold text-be-900 mb-2">Father's Day Reflection</h3>
                <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed mb-3">
                  The legacy we leave and the stories we inherit.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-be-500 text-xs">Roy Ochuka</span>
                    <span className="text-be-400 text-xs">· 2025-06-15</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action for story submissions */}
      <section className="py-24 md:py-32 bg-be-50 dark:bg-be-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white dark:bg-be-900 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-be-900 mb-4">Share Your Story</h3>
            <p className="text-be-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
              We'd love to hear your story of how hope has shown up in your community. Submit your
              reflection, experience, or narrative for possible feature on Beard & Diapers.
            </p>
            <a
              className="inline-block px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm"
              href="/get-involved"
            >
              Submit a Story
            </a>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}