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
          <article className="prose lg:prose-2xl max-w-2xl mx-auto">
            <Image
              src="/images/story-1.jpg"
              alt="Hope in the Ordinary - featured image"
              className="w-full h-64 object-cover mb-6 rounded-md"
              loading="lazy"
            />
            <h1 className="text-4xl font-bold text-be-900 mb-6">Hope in the Ordinary</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-be-500 text-sm">Personal Reflections</span>
              <span className="text-be-400 text-sm">· 2025-01-15</span>
            </div>
            <p>Sometimes hope does not arrive as a grand event. It arrives as a neighbour carrying water, a child reading aloud, a hand held in silence.</p>

            <h2 className="text-2xl font-bold text-be-900 mt-8">The small things</h2>
            <p>We are tempted to measure impact in projects completed and funds raised. But the deeper work of hope is quieter.</p>

            <blockquote>
              <p>"We believe every community carries God-given potential."</p>
            </blockquote>

            <h2 className="text-2xl font-bold text-be-900 mt-8">A library corner</h2>
            <p>In a small hospital ward, a reading corner became a place of healing. Not because of the books alone, but because someone chose to sit and read with a stranger.</p>
            <p>That is the heartbeat of Beard & Diapers.</p>

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