import Image from "next/image";
import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";

export default async function StoriesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/content`);
  const { stories } = await res.json();

  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-be-900 mb-4">Stories</h2>
            <p className="text-be-600 dark:text-zinc-400">A collection of narratives from Beard & Diapers community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Link
                key={story.id}
                href={`/stories/${story.id}`}
                className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
              >
                <Image
                  src={story.image}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-be-500 text-xs category">{story.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-be-900 mb-2">{story.title}</h3>
                  <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed mb-3">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-be-500 text-xs">{story.author}</span>
                      <span className="text-be-400 text-xs">· {story.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action for story submissions */}
      <section className="py-24 md:py-32 bg-be-50 dark:bg-be-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white dark:bg-be-900 rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-be-900 mb-4">Share Your Story</h3>
            <p className="text-be-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
              We love to hear your story of how hope has shown up in your community. Submit your
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