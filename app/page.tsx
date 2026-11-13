import Image from "next/image";
import Link from "next/link";
import { BaseLayout } from "@/components/BaseLayout";
import { FamilyPhotoBackdrop } from "@/components/FamilyPhotoBackdrop";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function Home() {
  return (
    <BaseLayout>
      <section className="relative isolate flex items-center justify-center overflow-hidden bg-gradient-to-b from-be-100 to-be-200 py-10 sm:py-16">
        <FamilyPhotoBackdrop
          firstSrc="/images/community-family-kenya.jpg"
          secondSrc="/images/community-family-urban-kenya.jpg"
          preloadFirst
          firstObjectPosition="center 65%"
        />

        <div className="absolute -top-4 -right-4 z-10 h-96 w-96 rounded-full bg-be-400 opacity-20 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 z-10 h-64 w-64 rounded-full bg-be-500 opacity-10 blur-xl"></div>

        <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="hero-title-flip text-4xl sm:text-5xl md:text-6xl font-bold text-be-900 tracking-tight mb-4">
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

          <div className="flex flex-col items-center gap-3 text-sm sm:flex-row">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-be-900">
              Get Involved
            </span>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-[#7d6231] bg-white/70 px-5 py-2 font-semibold text-be-900 shadow-sm transition-colors hover:bg-[#7d6231] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7d6231]"
              href="/get-involved"
            >
              Join the movement <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-8 w-full max-w-md">
            <NewsletterForm compact />
          </div>
        </div>
      </section>

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
                src="/images/family-community-home.jpg"
                alt="A family sharing a moment together at home"
                className="mx-auto aspect-[2/1] w-full max-w-xl rounded-2xl object-cover object-[center_30%]"
                width={1600}
                height={1067}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24 bg-be-50 dark:bg-be-900">
        <FamilyPhotoBackdrop
          firstSrc="/images/kenya-community-gathering.jpg"
          secondSrc="/images/kenya-community-gathering-2.jpg"
          firstObjectPosition="center 38%"
          secondObjectPosition="center 50%"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
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

      <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <FamilyPhotoBackdrop
          firstSrc="/images/family-reading-story.jpg"
          secondSrc="/images/book-reading.jpg"
          firstObjectPosition="center 24%"
          secondObjectPosition="center 50%"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-be-900 mb-4">Latest Stories</h2>
            <p className="text-be-600 dark:text-zinc-400">Recently published reflections and narratives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/stories/hope-in-the-ordinary"
              className="group hover:text-be-900 transition-colors"
            >
              <article className="relative overflow-hidden rounded-xl bg-[#f1efe9] shadow-sm transition-colors">
                <Image
                  src="/images/family-community-home.jpg"
                  alt="Hope in the Ordinary"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2a2a]/30 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-white/80">Stories</span>
                  <h3 className="text-2xl font-bold leading-tight">Hope in the Ordinary</h3>
                </div>
              </article>
            </Link>

            <Link
              href="/stories/walking-together"
              className="group hover:text-be-900 transition-colors"
            >
              <article className="relative overflow-hidden rounded-xl bg-[#f1efe9] shadow-sm transition-colors">
                <Image
                  src="/images/african-family-meal.jpg"
                  alt="Walking Together"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2a2a]/30 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-white/80">Stories</span>
                  <h3 className="text-2xl font-bold leading-tight">Walking Together</h3>
                </div>
              </article>
            </Link>

            <Link
              href="/stories/fathers-day-reflection"
              className="group hover:text-be-900 transition-colors"
            >
              <article className="relative overflow-hidden rounded-xl bg-[#f1efe9] shadow-sm transition-colors">
                <Image
                  src="/images/family-nairobi-father.jpg"
                  alt="Father's Day Reflection"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2a2a]/30 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-white/80">Stories</span>
                  <h3 className="text-2xl font-bold leading-tight">Father&apos;s Day Reflection</h3>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

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

      <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <FamilyPhotoBackdrop
          firstSrc="/images/family-outdoor-cooking.jpg"
          secondSrc="/images/african-father-child-outdoors.jpg"
          firstObjectPosition="center 50%"
          secondObjectPosition="center 24%"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-be-900 mb-4">Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/projects#hospital-reading-corners" className="group hover:text-be-900 transition-colors">
              <article className="relative overflow-hidden rounded-xl bg-[#f1efe9] shadow-sm transition-colors">
                <Image
                  src="/images/racist.jpeg"
                  alt="Black mother and child reading together"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2a2a]/30 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-white/80">Projects</span>
                  <h3 className="text-2xl font-bold leading-tight">Hospital Reading Corners</h3>
                </div>
              </article>
            </Link>

            <Link href="/projects#childrens-home" className="group hover:text-be-900 transition-colors">
              <article className="relative overflow-hidden rounded-xl bg-[#f1efe9] shadow-sm transition-colors">
                <Image
                  src="/images/project-1.jpg"
                  alt="Children's Home"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2a2a]/30 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-white/80">Projects</span>
                  <h3 className="text-2xl font-bold leading-tight">Children&apos;s Home</h3>
                </div>
              </article>
            </Link>

            <Link href="/projects#community-care" className="group hover:text-be-900 transition-colors">
              <article className="relative overflow-hidden rounded-xl bg-[#f1efe9] shadow-sm transition-colors">
                <Image
                  src="/images/hero-community.jpg"
                  alt="Community Care"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2a2a]/30 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-white/80">Projects</span>
                  <h3 className="text-2xl font-bold leading-tight">Community Care</h3>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-be-900 mb-6 leading-tight">
                Get Involved
              </h2>
              <p className="text-be-700 dark:text-zinc-300 leading-relaxed mb-6">
                We believe hope grows when communities show up for one another in practical, everyday ways.
                There are many ways to take part—through service, encouragement, storytelling, and partnership.
              </p>
              <Link
                className="inline-block px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm mt-4"
                href="/get-involved"
              >
                Learn More
              </Link>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/images/family-outdoor-cooking.jpg"
                alt="A parent showing a child how to do a task together"
                className="mx-auto aspect-[2/1] w-full max-w-xl rounded-2xl object-cover object-center"
                width={1600}
                height={1000}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24 bg-be-900">
        <FamilyPhotoBackdrop
          firstSrc="/images/african-family-meal.jpg"
          secondSrc="/images/family-kenyan-mother-child.jpg"
          tone="dark"
          firstObjectPosition="center 24%"
          secondObjectPosition="center 24%"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
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
