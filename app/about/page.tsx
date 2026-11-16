import Image from "next/image";
import Link from "next/link";
import { BaseLayout } from "@/components/BaseLayout";
import { getAppBaseUrl } from "@/lib/site-url";

const teamProfiles = [
  {
    name: "Mercy Wanjiku",
    role: "Community Coordinator",
    bio: "Supports coordination between the movement and the communities it serves.",
  },
  {
    name: "Peter Omondi",
    role: "Project Lead",
    bio: "Helps guide projects from community needs toward practical action.",
  },
  {
    name: "Aisha Hassan",
    role: "Storytelling Facilitator",
    bio: "Creates space for people to share stories and learn from one another.",
  },
];

const advisorProfiles = [
  {
    name: "Father John Kariuki",
    role: "Spiritual Advisor",
    bio: "Offers guidance grounded in faith, hope, and human dignity.",
  },
  {
    name: "Dr. Amina Abubakar",
    role: "Community Development Advisor",
    bio: "Advises on approaches that support local leadership and community wellbeing.",
  },
];

function ProfileCard({
  name,
  role,
  bio,
  image,
  socialLinks = [],
}: {
  name: string;
  role: string;
  bio: string;
  image?: string;
  socialLinks?: Array<{ label: string; href: string }>;
}) {
  return (
    <article className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-sm dark:border-brand-gold/20 dark:bg-brand-black">
      <div className="flex items-center gap-4">
        <Image
          src={image ?? "/images/profile-placeholder.svg"}
          alt={image ? name : ""}
          aria-hidden={!image}
          width={72}
          height={72}
          unoptimized
          className="h-[72px] w-[72px] shrink-0 rounded-full border border-brand-gold/40"
        />
        <div>
          <h4 className="font-bold text-brand-black dark:text-white">{name}</h4>
          <p className="mt-1 text-sm font-medium text-brand-gold-muted">{role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-brand-black/75 dark:text-zinc-300">{bio}</p>
      {socialLinks.length > 0 && (
        <div className="mt-4 flex gap-4">
          {socialLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-black/70 underline underline-offset-2 hover:text-brand-gold dark:text-zinc-300">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export default async function AboutPage() {
  const res = await fetch(`${getAppBaseUrl()}/api/content`, { cache: "no-store" });
  const { stories } = await res.json() as { stories: Array<{ id: string; title: string; image: string | null; category: string; excerpt: string }> };
  const recentStories = stories.slice(-3);

  return (
    <BaseLayout>
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-black mb-6 leading-tight">
                Our Story
              </h1>
              <p className="text-brand-black/80 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                Beard & Diapers began with a simple conviction: that hope is awakened not through grand
                gestures alone, but through the small, daily acts of care that happen where people actually
                live, learn, heal, and belong. What started as a conversation about how to embody Christian
                hope in practical ways has grown into a movement of stories, projects, and people joining
                together for the common good.
              </p>
              <blockquote className="border-l-4 border-[#c9a96a] pl-6 italic text-brand-black/75 dark:text-zinc-300 mb-6">
                <p>
                  We believe every community carries God-given potential.
                </p>
              </blockquote>
              <a
                className="inline-block rounded-full bg-brand-gold px-6 py-3 text-sm font-medium text-brand-black transition-colors hover:bg-brand-gold-light"
                href="#our-mission"
              >
                Read Our Mission
              </a>
            </div>

            <div className="relative">
              <Image
                src="/images/kenya-community-gathering.jpg"
                alt="Neighbors gathered together in a Kenyan community"
                className="rounded-2xl w-full h-[400px] object-cover"
                width={800}
                height={500}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Belief section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-brand-black mb-6 leading-tight">
                Our Belief
              </h2>
              <p className="text-brand-black/80 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                We hold a Christian understanding of human dignity, community, and hope. Every person
                is created in the image of God with inherent worth and potential. Community is not just a
                social construct but the primary context where that potential is awakened. Hope is not
                wishful thinking but the confident expectation of God&apos;s goodness breaking into the world.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white dark:bg-brand-black text-center">
                <div className="text-3xl font-bold text-brand-black/75">💫</div>
                <div>
                  <h4 className="font-medium text-brand-black mb-1">Human Dignity</h4>
                  <p className="text-brand-black/75 text-sm">Every person matters.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-brand-black text-center">
                <div className="text-3xl font-bold text-brand-black/75">🤝</div>
                <div>
                  <h4 className="font-medium text-brand-black mb-1">Community</h4>
                  <p className="text-brand-black/75 text-sm">We thrive together.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-brand-black text-center">
                <div className="text-3xl font-bold text-brand-black/75">✨</div>
                <div>
                  <h4 className="font-medium text-brand-black mb-1">Hope</h4>
                  <p className="text-brand-black/75 text-sm">It can begin again.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission section */}
      <section id="our-mission" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-black mb-4">Our Mission</h2>
            <p className="text-brand-black/75 dark:text-zinc-400 max-w-2xl mx-auto">
              &ldquo;To awaken God-given potential through storytelling, creative community projects, and acts
              of service that strengthen society&apos;s capacity to care for its own.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-xl bg-white dark:bg-brand-black hover:shadow-md transition-shadow">
              <div className="text-2xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-brand-black mb-2">Storytelling</h3>
              <p className="text-brand-black/75 dark:text-zinc-400 text-sm leading-relaxed">
                Stories that awaken potential and build understanding.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-brand-black hover:shadow-md transition-shadow">
              <div className="text-2xl mb-4">📣</div>
              <h3 className="text-xl font-bold text-brand-black mb-2">Advocacy</h3>
              <p className="text-brand-black/75 dark:text-zinc-400 text-sm leading-relaxed">
                Speaking up for dignity, belonging, and community-led care.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-brand-black hover:shadow-md transition-shadow">
              <div className="text-2xl mb-4">👷</div>
              <h3 className="text-xl font-bold text-brand-black mb-2">Creative Projects</h3>
              <p className="text-brand-black/75 dark:text-zinc-400 text-sm leading-relaxed">
                Initiatives that bring hope to concrete situations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-brand-black hover:shadow-md transition-shadow">
              <div className="text-2xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-brand-black mb-2">Acts of Service</h3>
              <p className="text-brand-black/75 dark:text-zinc-400 text-sm leading-relaxed">
                Serving where hope is needed most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-brand-black mb-6 leading-tight">
                Our Approach
              </h2>
              <p className="text-brand-black/80 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                We create &ldquo;small ecosystems of hope&rdquo; — intentional spaces where stories, relationships,
                and care can flourish. Rather than top-down solutions, we work alongside communities to
                identify and nurture the potential already present.
              </p>

              <h3 className="text-2xl font-bold text-brand-black mb-4">Examples of Our Work:</h3>
              <ul className="list-disc pl-6 text-brand-black/80 dark:text-zinc-400 space-y-3">
                <li>Hospital reading corners where volunteers read with patients</li>
                <li>Community libraries in neighbourhood gathering spaces</li>
                <li>Family conversation circles that build intergenerational connection</li>
                <li>Creative workshops for youth and children</li>
                <li>Volunteer neighbourhood projects</li>
                <li>Storytelling circles that honor local wisdom</li>
                <li>Youth engagement through art and reflection</li>
                <li>Community-led initiatives driven by local needs</li>
              </ul>
            </div>

            <div className="relative">
              <Image
                src="/images/mother-son-reading-story.jpg"
                alt="A mother sharing a story with her child"
                className="rounded-2xl w-full h-[400px] object-cover"
                width={800}
                height={500}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl bg-brand-black p-8">
              <h3 className="text-xl font-bold text-white mb-6">Our Values</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-brand-gold w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="text-brand-black text-sm font-bold">H</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Hope</h4>
                    <p className="text-zinc-400 text-sm">We believe in the possibility of positive change.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-brand-gold w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="text-brand-black text-sm font-bold">D</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Dignity</h4>
                    <p className="text-zinc-400 text-sm">Every person has inherent worth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-brand-gold w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="text-brand-black text-sm font-bold">C</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Compassion</h4>
                    <p className="text-zinc-400 text-sm">We suffer with and for others.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-brand-gold w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="text-brand-black text-sm font-bold">C</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Community</h4>
                    <p className="text-zinc-400 text-sm">We belong together.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-xl bg-brand-black p-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-brand-gold w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="text-brand-black text-sm font-bold">K</span>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Creativity</h4>
                  <p className="text-zinc-400 text-sm">We value imagination and new approaches.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-brand-gold w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="text-brand-black text-sm font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Stewardship</h4>
                  <p className="text-zinc-400 text-sm">We care with responsibility.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-brand-gold w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="text-brand-black text-sm font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Service</h4>
                  <p className="text-zinc-400 text-sm">We give ourselves for others.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-brand-gold w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="text-brand-black text-sm font-bold">F</span>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Faith</h4>
                  <p className="text-zinc-400 text-sm">We trust God&apos;s ongoing work.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder & Team section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-brand-black mb-6 leading-tight">
                Founder
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/images/roy-ochuka.jpg"
                  alt="Roy Ochuka"
                  width={96}
                  height={96}
                  unoptimized
                  className="h-24 w-24 shrink-0 rounded-full border border-brand-gold/40"
                />
                <div>
                  <h3 className="text-2xl font-bold text-brand-black">Roy Ochuka</h3>
                  <p className="text-brand-black/75">Founder, Beard & Diapers</p>
                </div>
              </div>
              <p className="text-brand-black/75 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                Roy is the founder of Beard & Diapers, a Christian social advocacy movement advancing hope
                where people live, learn, heal, and belong. He is passionate about storytelling, community
                development, and awakening God-given potential in everyday people.
              </p>
              <div className="flex gap-3">
                <a
                  className="text-zinc-400 hover:text-brand-gold transition-colors"
                  href="https://twitter.com/royochuka" target="_blank" rel="noopener"
                >
                  X
                </a>
                <a
                  className="text-zinc-400 transition-colors hover:text-brand-gold"
                  href="https://linkedin.com/in/roy-ochuka" target="_blank" rel="noopener"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
              {[...teamProfiles, ...advisorProfiles].map((profile) => (
                <ProfileCard key={profile.name} {...profile} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Stories sidebar */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-black mb-4">Recent Stories</h2>
            <p className="text-brand-black/75 dark:text-zinc-400">Latest from our community</p>
          </div>
          {recentStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentStories.map((story) => (
                <Link
                  href={`/stories/${story.id}`}
                  key={story.id}
                  className="group rounded-xl bg-white p-4 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold dark:bg-brand-black"
                >
                  {story.image && (
                    <Image
                      src={story.image}
                      alt={story.title}
                      className="mb-3 h-40 w-full rounded-lg object-cover"
                      loading="lazy"
                      width={800}
                      height={400}
                    />
                  )}
                  <h3 className="mb-2 font-bold text-brand-black transition-colors group-hover:text-brand-gold">
                    {story.title}
                  </h3>
                  <p className="text-brand-black/75 text-sm">
                    {story.excerpt}
                  </p>
                </Link>
                ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-black/10 bg-white p-6 text-center">
              <p className="text-brand-black/75">No published community stories yet.</p>
              <Link
                href="/stories"
                className="mt-3 inline-flex font-semibold text-brand-black underline underline-offset-4 hover:text-brand-gold"
              >
                Explore all stories <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </BaseLayout>
  );
}
