import Image from "next/image";
import Link from "next/link";
import { BaseLayout } from "@/components/BaseLayout";
import { FamilyPhotoBackdrop } from "@/components/FamilyPhotoBackdrop";
import { NewsletterForm } from "@/components/NewsletterForm";

export default function Home() {
  return (
    <BaseLayout>
      <section className="relative isolate flex items-center justify-center overflow-hidden bg-brand-black py-10 sm:py-16">
        <FamilyPhotoBackdrop
          firstSrc="/images/community-family-kenya.jpg"
          secondSrc="/images/community-family-urban-kenya.jpg"
          preloadFirst
          tone="dark"
          firstObjectPosition="center 65%"
        />

        <div className="absolute -top-4 -right-4 z-10 h-96 w-96 rounded-full bg-brand-gold opacity-20 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 z-10 h-64 w-64 rounded-full bg-brand-gold opacity-10 blur-xl"></div>

        <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-brand-gold sm:text-5xl md:text-6xl">
            Beard & Diapers
          </h1>
          <p className="mb-8 max-w-2xl text-2xl leading-relaxed text-brand-gold-light md:text-3xl">
            Advancing hope where people live, learn, heal, and belong.
          </p>

          <div className="flex flex-col items-center gap-4 pb-8 sm:flex-row">
            <Link
              className="inline-flex h-14 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-brand-gold px-8 text-lg font-semibold text-brand-black transition-colors hover:bg-brand-gold-light"
              href="/stories"
            >
              Explore Our Stories
            </Link>
            <Link
              className="inline-flex h-14 shrink-0 items-center justify-center whitespace-nowrap rounded-full border-2 border-brand-gold px-8 text-lg font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-black"
              href="/books"
            >
              Read the Book
            </Link>
          </div>

          <div className="flex flex-col items-center gap-3 text-sm sm:flex-row">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold-light">
              Get Involved
            </span>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-brand-gold bg-brand-black/75 px-5 py-2 font-semibold text-brand-gold shadow-sm transition-colors hover:bg-brand-gold hover:text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
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

      <section className="bg-white py-16 text-brand-black sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-4xl font-bold leading-tight text-brand-black">
                Who We Are
              </h2>
              <p className="mb-6 leading-relaxed text-brand-black">
                We believe every community carries God-given potential. Our mission is to awaken that potential
                through storytelling, creative community projects, and acts of service that strengthen
                society&apos;s capacity to care for its own.
              </p>
              <Link
                className="mt-4 inline-block rounded-full bg-brand-black px-6 py-3 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-black/85"
                href="/about"
              >
                Learn More
              </Link>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/images/who-we-are-family.jpeg"
                alt="A father carrying his smiling daughter on his back"
                className="mx-auto aspect-[2/1] w-full max-w-xl rounded-2xl border-2 border-brand-black object-cover object-[center_20%]"
                width={1600}
                height={1067}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-black py-16 sm:py-20 lg:py-24">
        <FamilyPhotoBackdrop
          firstSrc="/images/kenya-community-gathering.jpg"
          secondSrc="/images/family-hope.jpeg"
          tone="dark"
          firstObjectPosition="center 38%"
          secondObjectPosition="center 50%"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl font-bold leading-tight text-brand-gold md:mb-6">
              What We Do
            </h2>
            <p className="mx-auto max-w-2xl leading-relaxed text-brand-gold-muted">
              Through storytelling, creative community projects, and acts of service, we strengthen
              society&apos;s capacity to care for its own.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-brand-gold/35 bg-brand-black/80 p-6 transition-colors hover:border-brand-gold">
              <div className="mb-4 text-brand-gold">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v14" /><path d="M3 18V5a2 2 0 0 1 2-2h2a5 5 0 0 1 5 5v13a4 4 0 0 0-4-3H5a2 2 0 0 0-2 2Z" /><path d="M21 18V5a2 2 0 0 0-2-2h-2a5 5 0 0 0-5 5v13a4 4 0 0 1 4-3h3a2 2 0 0 1 2 2Z" /></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-brand-gold-light">Storytelling</h3>
              <p className="text-sm leading-relaxed text-brand-gold-muted">
                Sharing stories that awaken potential and build community.
              </p>
            </div>

            <div className="rounded-xl border border-brand-gold/35 bg-brand-black/80 p-6 transition-colors hover:border-brand-gold">
              <div className="mb-4 text-brand-gold">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1" /><path d="M16 5a3 3 0 0 1 0 6" /><path d="M18 14a5 5 0 0 1 3 5v1" /></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-brand-gold-light">Creative Projects</h3>
              <p className="text-sm leading-relaxed text-brand-gold-muted">
                Community initiatives that bring hope to everyday places.
              </p>
            </div>

            <div className="rounded-xl border border-brand-gold/35 bg-brand-black/80 p-6 transition-colors hover:border-brand-gold">
              <div className="mb-4 text-brand-gold">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" /><path d="M8 12h2l1.2-2 2 4 1.2-2H16" /></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-brand-gold-light">Acts of Service</h3>
              <p className="text-sm leading-relaxed text-brand-gold-muted">
                Serving communities where hope is needed most.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-black py-16 sm:py-20 lg:py-24">
        <FamilyPhotoBackdrop
          firstSrc="/images/mother-son-reading-story.jpg"
          secondSrc="/images/family-reading-library.jpg"
          tone="dark"
          firstObjectPosition="center 24%"
          secondObjectPosition="center 50%"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-4xl font-bold text-brand-gold">Latest Stories</h2>
            <p className="text-brand-gold-muted">Recently published reflections and narratives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/stories/hope-in-the-ordinary"
              className="group transition-colors"
            >
              <article className="relative overflow-hidden rounded-xl border border-brand-gold/30 bg-brand-black shadow-sm transition-colors group-hover:border-brand-gold">
                <Image
                  src="/images/family-community-home.jpg"
                  alt="Hope in the Ordinary"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-brand-gold-light">
                  <h3 className="text-2xl font-bold leading-tight">Hope in the Ordinary</h3>
                </div>
              </article>
            </Link>

            <Link
              href="/stories/walking-together"
              className="group transition-colors"
            >
              <article className="relative overflow-hidden rounded-xl border border-brand-gold/30 bg-brand-black shadow-sm transition-colors group-hover:border-brand-gold">
                <Image
                  src="/images/african-family-meal.jpg"
                  alt="Walking Together"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-brand-gold-light">
                  <h3 className="text-2xl font-bold leading-tight">Walking Together</h3>
                </div>
              </article>
            </Link>

            <Link
              href="/stories/fathers-day-reflection"
              className="group transition-colors"
            >
              <article className="relative overflow-hidden rounded-xl border border-brand-gold/30 bg-brand-black shadow-sm transition-colors group-hover:border-brand-gold">
                <Image
                  src="/images/family-nairobi-father.jpg"
                  alt="Father's Day Reflection"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-brand-gold-light">
                  <h3 className="text-2xl font-bold leading-tight">Father&apos;s Day Reflection</h3>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-brand-black sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/family-reading-story.jpg"
                alt="A father reading with his child"
                className="rounded-2xl w-full h-64 object-cover mb-6 md:mb-0"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="mb-4 text-4xl font-bold text-brand-black">The 100-Day Heartbeat</h2>
              <p className="mb-6 text-brand-black">
                Preparing my soul for 40. One hundred days. One hundred reflections. One journey of becoming.
              </p>
              <Link
                className="inline-block rounded-full bg-brand-black px-6 py-3 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-black/85"
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
                className="rounded-xl border border-brand-black/25 bg-brand-black p-4 text-center text-brand-gold transition-colors hover:border-brand-black"
              >
                <div className="text-2xl font-bold text-brand-gold">{day}</div>
                <div className="mt-1 text-sm text-brand-gold-muted">Day {day}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-black py-16 sm:py-20 lg:py-24">
        <FamilyPhotoBackdrop
          firstSrc="/images/family-outdoor-cooking.jpg"
          secondSrc="/images/african-father-child-outdoors.jpg"
          tone="dark"
          firstObjectPosition="center 50%"
          secondObjectPosition="center 24%"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-4xl font-bold text-brand-gold">Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/projects#hospital-reading-corners" className="group transition-colors">
              <article className="relative overflow-hidden rounded-xl border border-brand-gold/30 bg-brand-black shadow-sm transition-colors group-hover:border-brand-gold">
                <Image
                  src="/images/hospital-reading-corners.jpeg"
                  alt="Black mother and child reading together"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-brand-gold-light">
                  <h3 className="text-2xl font-bold leading-tight">Hospital Reading Corners</h3>
                </div>
              </article>
            </Link>

            <Link href="/projects#childrens-home" className="group transition-colors">
              <article className="relative overflow-hidden rounded-xl border border-brand-gold/30 bg-brand-black shadow-sm transition-colors group-hover:border-brand-gold">
                <Image
                  src="/images/childrens-home-community.jpeg"
                  alt="A teacher engaging a group of children outdoors at their school"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-brand-gold-light">
                  <h3 className="text-2xl font-bold leading-tight">Children&apos;s Home</h3>
                </div>
              </article>
            </Link>

            <Link href="/projects#community-care" className="group transition-colors">
              <article className="relative overflow-hidden rounded-xl border border-brand-gold/30 bg-brand-black shadow-sm transition-colors group-hover:border-brand-gold">
                <Image
                  src="/images/kenya-community-gathering-2.jpg"
                  alt="A community gathered together outdoors in Kenya"
                  className="h-72 w-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-brand-gold-light">
                  <h3 className="text-2xl font-bold leading-tight">Community Care</h3>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-brand-black sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-4xl font-bold leading-tight text-brand-black">
                Get Involved
              </h2>
              <p className="mb-6 leading-relaxed text-brand-black">
                We believe hope grows when communities show up for one another in practical, everyday ways.
                There are many ways to take part—through service, encouragement, storytelling, and partnership.
              </p>
              <Link
                className="mt-4 inline-block rounded-full bg-brand-black px-6 py-3 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-black/85"
                href="/get-involved"
              >
                Learn More
              </Link>
            </div>
            <div className="relative flex justify-center">
              <Image
                src="/images/family-village-africa.jpg"
                alt="A family standing together in their community"
                className="mx-auto aspect-[2/1] w-full max-w-xl rounded-2xl border-2 border-brand-black object-cover object-center"
                width={1600}
                height={1000}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-black py-16 sm:py-20 lg:py-24">
        <FamilyPhotoBackdrop
          firstSrc="/images/family-newborn-hospital.jpg"
          secondSrc="/images/family-kenyan-mother-child.jpg"
          tone="dark"
          firstObjectPosition="center 24%"
          secondObjectPosition="center 24%"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold text-brand-gold">
            Stories, ideas and opportunities for hope — delivered occasionally.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-brand-gold-muted">
            Join our newsletter community and receive encouragement, story updates, and opportunities
            to participate in what God is doing.
          </p>

          <NewsletterForm />
        </div>
      </section>
    </BaseLayout>
  );
}
