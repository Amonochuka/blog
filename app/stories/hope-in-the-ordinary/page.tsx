import Image from "next/image";
import { BaseLayout } from "@/components/BaseLayout";
import { Footer } from "@/components/Footer";

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
            width={800}
                  height={400}
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
                <p>
                  We believe every community carries God-given potential.
                </p>
              </blockquote>

            <h2 className="text-2xl font-bold text-be-900 mt-8">A library corner</h2>
            <p>In a small hospital ward, a reading corner became a place of healing. Not because of the books alone, but because someone chose to sit and read with a stranger.</p>
            <p>That is the heartbeat of Beard & Diapers.</p>

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
                  href={`https://wa.me/?text=Check%20out%20this%20story:%20Hope%20in%20the%20Ordinary%20from%20Beard%20%26%20Diapers`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-400 text-white text-sm rounded hover:bg-green-500 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbeardanddiapers.org%2Fstories%2Fhope-in-the-ordinary`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-#1877f2 text-white text-sm rounded hover:bg-#166fe5 transition-colors"
                  target="_blank"
                  rel="noopener"
                >
                  Facebook
                </a>
                <a
                  href={`https://x.com/intent/tweet?url=https%3A%2F%2Fbeardanddiapers.org%2Fstories%2Fhope-in-the-ordinary&text=Hope%20in%20the%20Ordinary%20from%20Beard%20%26%20Diapers`}
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