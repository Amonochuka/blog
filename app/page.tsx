import Image from "next/image";
import Link from "next/link";
import { BaseLayout } from "@/components/BaseLayout";
import { FamilyPhotoBackdrop } from "@/components/FamilyPhotoBackdrop";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SectionDivider } from "@/components/SectionDivider";
import { getPublicContent } from "@/lib/public-content";

type HomeStory = {
  id: string;
  title: string;
  image: string | null;
  category: string;
  excerpt: string;
  author?: string;
  date?: string;
};

type HomeBook = {
  slug: string;
  cover: string;
  title: string;
  tagline: string;
  description: string;
  chapters: Array<{ number: number; title: string; free: boolean }>;
};

type HomeProject = {
  id: string;
  name: string;
  image: string;
  location: string;
  year: string | null;
  description: string;
};

export const dynamic = "force-dynamic";

export default async function Home() {
  let stories: HomeStory[] = [];
  let books: HomeBook[] = [];
  let projects: HomeProject[] = [];
  let featuredBookSlug: string | null = null;
  try {
    const content = await getPublicContent();
    stories = content.stories;
    books = content.books;
    projects = content.projects;
    featuredBookSlug = content.featuredBookSlug;
  } catch (error) {
    console.error("Could not load homepage content:", error);
  }
  const latestStories = stories.slice(-3);
  const featuredBook = books.find((book) => book.slug === featuredBookSlug) ?? books[0];
  const chapters = featuredBook?.chapters ?? [];
  const firstChapter = chapters[0];
  const latestChapter = chapters.at(-1);

  return (
    <BaseLayout>
      <section className="relative isolate flex items-center justify-center overflow-hidden bg-white py-10 sm:py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-brand-black"
          style={{
            maskImage: "url('/images/beard-edge-mask.svg')",
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            maskPosition: "bottom",
            WebkitMaskImage: "url('/images/beard-edge-mask.svg')",
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "bottom",
          }}
        >
          <FamilyPhotoBackdrop
            firstSrc="/images/community-family-kenya.jpg"
            secondSrc="/images/community-family-urban-kenya.jpg"
            preloadFirst
            tone="dark"
            firstObjectPosition="center 65%"
          />
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-brand-gold sm:text-5xl md:text-6xl">
            Beard & Diapers
          </h1>
          <p className="font-display mb-8 max-w-2xl text-2xl font-bold leading-relaxed text-brand-gold-light md:text-3xl">
            Advancing hope where people live, learn, heal, and belong.
          </p>
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-brand-gold-muted sm:text-base">
            We believe every community carries God-given potential. Our mission is to awaken that potential through storytelling,
            creative community projects, and acts of service that strengthen society&apos;s capacity to care for its own.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              className="inline-flex h-14 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-brand-gold px-8 text-lg font-semibold text-brand-black transition-colors hover:bg-brand-gold-light"
              href="/stories"
            >
              Explore Our Stories
            </Link>
            <Link
              className="inline-flex h-14 shrink-0 items-center justify-center whitespace-nowrap rounded-full border-2 border-brand-gold px-8 text-lg font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-black"
              href="/about"
            >
              Discover Beard &amp; Diapers
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-brand-gold-light">
            <Link className="underline underline-offset-4 transition-colors hover:text-brand-gold" href="/get-involved">
              Get Involved
            </Link>
            <Link
              className="underline underline-offset-4 transition-colors hover:text-brand-gold"
              href={featuredBook ? `/books/${featuredBook.slug}` : "/books"}
            >
              Read the Book
            </Link>
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

      <SectionDivider from="light" to="dark" />

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
              Through storytelling, creative community projects, acts of service, and advocacy, we
              strengthen society&apos;s capacity to care for its own.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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

            <div className="rounded-xl border border-brand-gold/35 bg-brand-black/80 p-6 transition-colors hover:border-brand-gold">
              <div className="mb-4 text-brand-gold">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11v2a2 2 0 0 0 2 2h2l9 4V5l-9 4H5a2 2 0 0 0-2 2Z" />
                  <path d="M7 15l2 6h3l-2.3-5" />
                  <path d="M19 9.5a4 4 0 0 1 0 5" />
                  <path d="M21 7a8 8 0 0 1 0 10" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-brand-gold-light">Advocacy</h3>
              <p className="text-sm leading-relaxed text-brand-gold-muted">
                Speaking up for dignity, belonging, and community-led care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-brand-black py-12 sm:py-14 lg:py-16">
        <FamilyPhotoBackdrop
          firstSrc="/images/mother-son-reading-story.jpg"
          secondSrc="/images/family-reading-library.jpg"
          tone="dark"
          firstObjectPosition="center 24%"
          secondObjectPosition="center 50%"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="mb-4 text-4xl font-bold text-brand-gold">Latest Stories</h2>
            <p className="text-brand-gold-muted">Recently published reflections and narratives</p>
          </div>

          {latestStories.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.id}`}
                  className="group rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
                >
                  <article className={`relative overflow-hidden rounded-xl border border-brand-gold/30 bg-brand-black shadow-sm transition-colors group-hover:border-brand-gold ${story.image ? "min-h-64" : "min-h-56"}`}>
                    {story.image && (
                      <>
                        <Image
                          src={story.image}
                          alt={story.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          width={800}
                          height={600}
                          loading="lazy"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/10 to-transparent" />
                      </>
                    )}
                    <div className={`p-6 text-brand-gold-light ${story.image ? "absolute inset-x-0 bottom-0" : "flex min-h-56 flex-col justify-end"}`}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
                        {story.category}
                      </p>
                      <h3 className="text-2xl font-bold leading-tight">{story.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-gold-muted">
                        {story.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-gold/30 bg-brand-black/85 px-6 py-10 text-center">
              <p className="text-brand-gold-light">
                New stories are on the way.
              </p>
              <Link
                href="/submit-story"
                className="mt-4 inline-flex font-semibold text-brand-gold underline underline-offset-4 hover:text-brand-gold-light"
              >
                Share your story <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          )}
          {latestStories.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                href="/submit-story"
                className="inline-flex items-center rounded-full border border-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
              >
                Share your story <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <SectionDivider from="dark" to="light" />

      <section className="bg-white py-16 text-brand-black sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-1/2">
              <Image
                src={featuredBook?.cover ?? "/images/family-reading-story.jpg"}
                alt={featuredBook?.title ?? "A father reading with his child"}
                className="rounded-2xl w-full h-64 object-cover mb-6 md:mb-0"
                width={600}
                height={400}
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-muted">
                Featured Book
              </p>
              <h2 className="mb-4 text-4xl font-bold text-brand-black">
                {featuredBook?.title ?? "The 100-Day Heartbeat"}
              </h2>
              <p className="mb-6 text-brand-black">
                {featuredBook?.description ?? "Preparing my soul for 40. One hundred days. One hundred reflections. One journey of becoming."}
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <Link
                  className="inline-block rounded-full bg-brand-black px-6 py-3 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-black/85"
                  href={featuredBook && firstChapter
                    ? `/books/${featuredBook.slug}/day-${firstChapter.number}`
                    : "/books"}
                >
                  Start Reading
                </Link>
                <Link
                  className="text-sm font-semibold text-brand-black underline underline-offset-4 transition-colors hover:text-brand-gold-muted"
                  href="/books"
                >
                  Browse all books
                </Link>
              </div>
              {latestChapter && featuredBook && (
                <p className="mt-5 text-sm text-brand-black/75">
                  Latest chapter: <Link
                    href={`/books/${featuredBook.slug}/day-${latestChapter.number}`}
                    className="font-semibold underline underline-offset-4 hover:text-brand-gold"
                  >
                    {latestChapter.title}
                  </Link>
                </p>
              )}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {chapters.slice(-3).map((chapter) => (
              <Link
                key={chapter.number}
                href={`/books/${featuredBook?.slug ?? "the-100-day-heartbeat"}/day-${chapter.number}`}
                className="rounded-xl border border-brand-black/25 bg-brand-black p-4 text-center text-brand-gold transition-colors hover:border-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              >
                <span className="block text-2xl font-bold text-brand-gold">{chapter.number}</span>
                <span className="mt-1 block text-sm text-brand-gold-muted">{chapter.title}</span>
                {chapter.number === latestChapter?.number && (
                  <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-[0.14em] text-brand-gold-light">
                    Latest
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="light" to="dark" />

      <section id="projects" className="relative isolate scroll-mt-24 overflow-hidden bg-brand-black py-16 sm:py-20 lg:py-24">
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

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects#${project.id}`}
                  className="group rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
                >
                  <article className="relative overflow-hidden rounded-xl border border-brand-gold/30 bg-brand-black shadow-sm transition-colors group-hover:border-brand-gold">
                    <Image
                      src={project.image}
                      alt={project.name}
                      className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      width={800}
                      height={600}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/55 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-brand-gold-light">
                      <h3 className="text-2xl font-bold leading-tight">{project.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white">
                        {project.description}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-gold/30 bg-brand-black/85 px-6 py-10 text-center">
              <p className="text-brand-gold-light">Project updates are on the way.</p>
              <Link
                href="/get-involved"
                className="mt-4 inline-flex font-semibold text-brand-gold underline underline-offset-4 hover:text-brand-gold-light"
              >
                Ask about our work <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <SectionDivider from="dark" to="light" />

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
              <div className="mb-6 flex flex-wrap gap-3">
                {[
                  ["Volunteer", "/get-involved#volunteer"],
                  ["Partner", "/get-involved#partner"],
                  ["Share a Story", "/get-involved#share-story"],
                  ["Support a Project", "/get-involved#support-project"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    className="rounded-full border border-brand-black/20 px-4 py-2 text-sm font-semibold text-brand-black transition-colors hover:border-brand-gold hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                    href={href}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <Link
                className="inline-block rounded-full bg-brand-black px-6 py-3 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-black/85"
                href="/get-involved"
              >
                Explore all ways to get involved
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

      <SectionDivider from="light" to="dark" />

      <section id="newsletter" className="relative isolate overflow-hidden bg-brand-black py-16 sm:py-20 lg:py-24">
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

      <SectionDivider from="dark" to="light" />
    </BaseLayout>
  );
}
