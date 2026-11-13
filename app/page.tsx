import Image from "next/image";
import Link from "next/link";
import { BaseLayout } from "@/components/BaseLayout";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function Home() {
  return (
    <BaseLayout>
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-be-100 to-be-200 py-10 sm:py-16">
        <div className="absolute -top-4 -right-4 w-96 h-96 bg-be-400 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-be-500 rounded-full opacity-10 blur-xl"></div>

        <div className="relative flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-be-900 tracking-tight mb-4">
            Beard & Diapers
          </h1>
          <p className="text-2xl text-be-600 md:text-3xl max-w-2xl leading-relaxed mb-8">
            Advancing hope where people live, learn, heal, and belong.
          </p>

          <div className="flex flex-col items-center gap-4 pb-8 sm:flex-row">
            <Link
              className="inline-flex h-14 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-be-600 px-8 text-lg font-medium text-white transition-colors hover:bg-be-700"
              href="/stories"
            >
              Explore Our Stories
            </Link>
            <Link
              className="inline-flex h-14 shrink-0 items-center justify-center whitespace-nowrap rounded-full border-2 border-[#7d6231] px-8 text-lg font-medium text-be-900 transition-colors hover:bg-be-50"
              href="/books"
            >
              Read the Book
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-be-500 text-sm">
            <span>Get Involved</span>
            <a
              className="font-medium text-gold underline underline-offset-2 hover:text-be-600 transition-colors"
              href="/get-involved"
            >
              Join the movement
            </a>
          </div>
          <div className="mt-4 w-full max-w-md sm:mt-0">
            <NewsletterForm compact />
          </div>
        </div>
      </section>

      {/* Who We Are section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-be-900 mb-6 leading-tight">
                Who We Are
              </h2>
              <p className="text-be-700 dark:text-zinc-300 leading-relaxed mb-6">
                We believe every community carries God-given potential. Our mission is to awaken that potential
                through storytelling, creative community projects, and acts of service that strengthen
                society&apos;s capacity to care for its own.
              </p>
              <Link
                className="inline-block px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm mt-4"
                href="/about"
              >
                Learn More
              </Link>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/images/hero-community.svg"
                alt="Community gathering"
                className="mx-auto w-full max-w-xl rounded-2xl object-cover"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-be-50 dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-be-900 mb-4 md:mb-6 leading-tight">
              What We Do
            </h2>
            <p className="text-be-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Through storytelling, creative community projects, and acts of service, we strengthen
              society&apos;s capacity to care for its own.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-be-900 hover:shadow-md transition-shadow">
              <div className="text-3xl text-be-600 mb-4">📖</div>
              <h3 className="text-xl font-bold text-be-900 mb-2">Storytelling</h3>
              <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed">
                Sharing stories that awaken potential and build community.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-be-900 hover:shadow-md transition-shadow">
              <div className="text-3xl text-be-600 mb-4">👥</div>
              <h3 className="text-xl font-bold text-be-900 mb-2">Creative Projects</h3>
              <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed">
                Community initiatives that bring hope to everyday places.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-be-900 hover:shadow-md transition-shadow">
              <div className="text-3xl text-be-600 mb-4">🤝</div>
              <h3 className="text-xl font-bold text-be-900 mb-2">Acts of Service</h3>
              <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed">
                Serving communities where hope is needed most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Stories section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-be-900 mb-4">Latest Stories</h2>
            <p className="text-be-600 dark:text-zinc-400">Recently published reflections and narratives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/stories/hope-in-the-ordinary"
              className="group hover:text-be-900 transition-colors"
            >
              <article className="rounded-xl bg-white dark:bg-be-900 overflow-hidden transition-colors">
                <Image
                  src="/images/story-1.jpg"
                  alt="Hope in the Ordinary"
                  className="w-full h-48 object-cover"
                  width={800}
                  height={400}
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-be-500 text-sm">Personal Reflections</span>
                  </div>
                  <h3 className="text-xl font-bold text-be-900 mb-2">Hope in the Ordinary</h3>
                  <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Sometimes hope does not arrive as a grand event.
                  </p>
                </div>
              </article>
            </Link>

            <Link
              href="/stories/walking-together"
              className="group hover:text-be-900 transition-colors"
            >
              <article className="rounded-xl bg-white dark:bg-be-900 overflow-hidden transition-colors">
                <Image
                  src="/images/story-2.jpg"
                  alt="Walking Together"
                  className="w-full h-48 object-cover"
                  width={800}
                  height={400}
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-be-500 text-sm">Community</span>
                  </div>
                  <h3 className="text-xl font-bold text-be-900 mb-2">Walking Together</h3>
                  <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Hope is not meant to be carried alone.
                  </p>
                </div>
              </article>
            </Link>

            <Link
              href="/stories/fathers-day-reflection"
              className="group hover:text-be-900 transition-colors"
            >
              <article className="rounded-xl bg-white dark:bg-be-900 overflow-hidden transition-colors">
                <Image
                  src="/images/story-3.jpg"
                  alt="Father's Day Reflection"
                  className="w-full h-48 object-cover"
                  width={800}
                  height={400}
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-be-500 text-sm">Fatherhood</span>
                  </div>
                  <h3 className="text-xl font-bold text-be-900 mb-2">Father&apos;s Day Reflection</h3>
                  <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed">
                    The legacy we leave and the stories we inherit.
                  </p>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* From the Book section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-be-50 dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/book-cover.jpg"
                alt="The 100-Day Heartbeat cover"
                className="rounded-2xl w-full h-64 object-cover mb-6 md:mb-0"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold text-be-900 mb-4">The 100-Day Heartbeat</h2>
              <p className="text-be-600 dark:text-zinc-400 mb-6">
                Preparing my soul for 40. One hundred days. One hundred reflections. One journey of becoming.
              </p>
              <Link
                className="inline-block px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm"
                href="/books/the-100-day-heartbeat"
              >
                Start Reading
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3].map((day) => (
              <div
                key={day}
                className="bg-white dark:bg-be-900 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-bold text-be-900">{day}</div>
                <div className="text-be-600 text-sm mt-1">Day {day}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-be-900 mb-4">Projects / Where Hope Is Taking Root</h2>
            <p className="text-be-600 dark:text-zinc-400">
              Visual stories of what Beard & Diapers is actually doing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/projects#hospital-reading-corners"
              className="group hover:text-be-900 transition-colors"
            >
              <article className="rounded-xl bg-white dark:bg-be-900 overflow-hidden h-full transition-colors">
                <Image
                  src="/images/project-1.jpg"
                  alt="Hospital Reading Corners"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                width={800}
                  height={400}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-be-900 mb-2">Hospital Reading Corners</h3>
                  <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed">
                    Small reading corners in hospital wards where volunteers read with patients and families.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#e8ddc9]">
                    <span className="text-be-500 text-sm">2024 · Nairobi, Kenya</span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Story section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-be-50 dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-be-900 mb-4">Featured Story</h2>
            <p className="text-be-600 dark:text-zinc-400">
              A visually prominent human story encountering hope.
            </p>
          </div>

          <div className="rounded-xl bg-white dark:bg-be-900 overflow-hidden h-full">
            <Image
              src="/images/featured-story.jpg"
              alt="Featured story"
              className="h-64 w-full object-cover"
              loading="lazy"
            width={800}
                  height={400}
                />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-be-900 mb-2">A Hospital Visit Remembered</h3>
              <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                When words meet presence, healing begins.
              </p>
              <Link
                className="font-medium text-be-600 hover:text-be-900 transition-colors"
                href="/stories/hospital-visit"
              >
                Read full story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Get Involved
              </h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                There are many ways to participate in what Beard & Diapers is doing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-be-800 hover:bg-be-700 transition-colors">
                  <div className="text-2xl font-bold text-white mb-2">📖</div>
                  <h3 className="text-lg font-medium text-white mb-1">Tell Your Story</h3>
                  <p className="text-zinc-300 text-sm">Share your story of hope</p>
                </div>
                <div className="p-4 rounded-xl bg-be-800 hover:bg-be-700 transition-colors">
                  <div className="text-2xl font-bold text-white mb-2">🤝</div>
                  <h3 className="text-lg font-medium text-white mb-1">Volunteer</h3>
                  <p className="text-zinc-300 text-sm">Join our volunteer team</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-be-800 hover:bg-be-700 transition-colors">
                  <div className="text-2xl font-bold text-white mb-2">💼</div>
                  <h3 className="text-lg font-medium text-white mb-1">Partner With Us</h3>
                  <p className="text-zinc-300 text-sm">Churches, organisations, businesses</p>
                </div>
                <div className="p-4 rounded-xl bg-be-800 hover:bg-be-700 transition-colors">
                  <div className="text-2xl font-bold text-white mb-2">🌱</div>
                  <h3 className="text-lg font-medium text-white mb-1">Start Something</h3>
                  <p className="text-zinc-300 text-sm">Propose a community initiative</p>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/images/get-involved.jpg"
                alt="People getting involved"
                className="rounded-2xl w-full max-w-md object-cover"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-be-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Stories, ideas and opportunities for hope — delivered occasionally.
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Join our newsletter community and receive encouragement, story updates, and opportunities
            to participate in what God is doing.
          </p>

          <NewsletterForm />
        </div>
      </section>
    </BaseLayout>
  );
}
