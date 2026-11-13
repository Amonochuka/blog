import Image from "next/image";
import { BaseLayout } from "@/components/BaseLayout";
import { getAppBaseUrl } from "@/lib/site-url";

export default async function AboutPage() {
  const res = await fetch(`${getAppBaseUrl()}/api/content`, { cache: "no-store" });
  const { stories } = await res.json() as { stories: Array<{ id: string; title: string; image: string; category: string; featured: boolean; excerpt: string }> };

  return (
    <BaseLayout>
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-be-900 mb-6 leading-tight">
                Our Story
              </h2>
              <p className="text-be-700 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                Beard & Diapers began with a simple conviction: that hope is awakened not through grand
                gestures alone, but through the small, daily acts of care that happen where people actually
                live, learn, heal, and belong. What started as a conversation about how to embody Christian
                hope in practical ways has grown into a movement of stories, projects, and people joining
                together for the common good.
              </p>
              <blockquote className="border-l-4 border-[#c9a96a] pl-6 italic text-be-600 dark:text-zinc-300 mb-6">
                <p>
                  We believe every community carries God-given potential.
                </p>
              </blockquote>
              <a
                className="inline-block px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm"
                href="#our-mission"
              >
                Read Our Mission
              </a>
            </div>

            <div className="relative">
              <Image
                src="/images/about-image.jpg"
                alt="Beard & Diapers team and community"
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
      <section className="py-16 sm:py-20 lg:py-24 bg-be-50 dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-be-900 mb-6 leading-tight">
                Our Belief
              </h2>
              <p className="text-be-700 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                We hold a Christian understanding of human dignity, community, and hope. Every person
                is created in the image of God with inherent worth and potential. Community is not just a
                social construct but the primary context where that potential is awakened. Hope is not
                wishful thinking but the confident expectation of God&apos;s goodness breaking into the world.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white dark:bg-be-900 text-center">
                <div className="text-3xl font-bold text-be-600">💫</div>
                <div>
                  <h4 className="font-medium text-be-900 mb-1">Human Dignity</h4>
                  <p className="text-be-600 text-sm">Every person matters.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-be-900 text-center">
                <div className="text-3xl font-bold text-be-600">🤝</div>
                <div>
                  <h4 className="font-medium text-be-900 mb-1">Community</h4>
                  <p className="text-be-600 text-sm">We thrive together.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-be-900 text-center">
                <div className="text-3xl font-bold text-be-600">✨</div>
                <div>
                  <h4 className="font-medium text-be-900 mb-1">Hope</h4>
                  <p className="text-be-600 text-sm">It can begin again.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission section */}
      <section id="our-mission" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-be-900 mb-4">Our Mission</h2>
            <p className="text-be-600 dark:text-zinc-400 max-w-2xl mx-auto">
              &ldquo;To awaken God-given potential through storytelling, creative community projects, and acts
              of service that strengthen society&apos;s capacity to care for its own.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-be-900 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-be-900 mb-2">Storytelling</h3>
              <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed">
                Stories that awaken potential and build understanding.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-be-900 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-4">👷</div>
              <h3 className="text-xl font-bold text-be-900 mb-2">Creative Projects</h3>
              <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed">
                Initiatives that bring hope to concrete situations.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-be-900 hover:shadow-md transition-shadow">
              <div className="text-2xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-be-900 mb-2">Acts of Service</h3>
              <p className="text-be-600 dark:text-zinc-400 text-sm leading-relaxed">
                Serving where hope is needed most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-be-50 dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-be-900 mb-6 leading-tight">
                Our Approach
              </h2>
              <p className="text-be-700 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                We create &ldquo;small ecosystems of hope&rdquo; — intentional spaces where stories, relationships,
                and care can flourish. Rather than top-down solutions, we work alongside communities to
                identify and nurture the potential already present.
              </p>

              <h3 className="text-2xl font-bold text-be-900 mb-4">Examples of Our Work:</h3>
              <ul className="list-disc pl-6 text-be-700 dark:text-zinc-400 space-y-3">
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
                src="/images/approach-image.jpg"
                alt="Community project in progress"
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
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl bg-be-900 p-8">
              <h3 className="text-xl font-bold text-white mb-6">Our Values</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-be-600 w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">H</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Hope</h4>
                    <p className="text-zinc-400 text-sm">We believe in the possibility of positive change.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-be-600 w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">D</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Dignity</h4>
                    <p className="text-zinc-400 text-sm">Every person has inherent worth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-be-600 w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">C</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Compassion</h4>
                    <p className="text-zinc-400 text-sm">We suffer with and for others.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-full bg-be-600 w-8 h-8 flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-bold">C</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Community</h4>
                    <p className="text-zinc-400 text-sm">We belong together.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-be-900 p-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-be-600 w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">K</span>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Creativity</h4>
                  <p className="text-zinc-400 text-sm">We value imagination and new approaches.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-be-600 w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Stewardship</h4>
                  <p className="text-zinc-400 text-sm">We care with responsibility.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-be-600 w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Service</h4>
                  <p className="text-zinc-400 text-sm">We give ourselves for others.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 rounded-full bg-be-600 w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">F</span>
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
      <section className="py-16 sm:py-20 lg:py-24 bg-be-50 dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-be-900 mb-6 leading-tight">
                Founder
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/images/roy-ochuka.jpg"
                  alt="Roy Ochuka"
                  className="rounded-w-full w-24 h-24 object-cover"
                  width={300}
                  height={300}
                  loading="lazy"
                />
                <div>
                  <h3 className="text-2xl font-bold text-be-900">Roy Ochuka</h3>
                  <p className="text-be-600">Founder, Beard & Diapers</p>
                </div>
              </div>
              <p className="text-be-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                Roy is the founder of Beard & Diapers, a Christian social advocacy movement advancing hope
                where people live, learn, heal, and belong. He is passionate about storytelling, community
                development, and awakening God-given potential in everyday people.
              </p>
              <div className="flex gap-3">
                <a
                  className="text-zinc-400 hover:text-white transition-colors"
                  href="https://twitter.com/royochuka" target="_blank" rel="noopener"
                >
                  X
                </a>
                <a
                  className="text-zinc-400 hover:text-white transition-colirms"
                  href="https://linkedin.com/in/roy-ochuka" target="_blank" rel="noopener"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white dark:bg-be-900">
                <h4 className="font-semibold text-be-900 mb-3">Team Members</h4>
                <ul className="space-y-2 text-be-600 dark:text-zinc-400 text-sm">
                  <li>Mercy Wanjiku — Community Coordinator</li>
                  <li>Peter Omondi — Project Lead</li>
                  <li>Aisha Hassan — Storytelling Facilitator</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-be-900">
                <h4 className="font-semibold text-be-900 mb-3">Advisors</h4>
                <ul className="space-y-2 text-be-600 dark:text-zinc-400 text-sm">
                  <li>Father John Kariuki — Spiritual Advisor</li>
                  <li>Dr. Amina Abubakar — Community Development</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Stories sidebar */}
      <section className="py-16 sm:py-20 lg:py-24 bg-be-50 dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-be-900 mb-4">Recent Stories</h2>
            <p className="text-be-600 dark:text-zinc-400">Latest from our community</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stories
              .filter((story) => story.featured)
              .slice(0, 3)
              .map((story) => (
                <div
                  key={story.id}
                  className="bg-white dark:bg-be-900 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <Image
                    src={story.image}
                    alt={story.title}
                    className="w-full h-24 object-cover mb-3"
                    loading="lazy"
                  width={800}
                  height={400}
                />
                  <h4 className="text-bold text-be-900 mb-2">
                    {story.title}
                  </h4>
                  <p className="text-be-600 text-sm">
                    {story.excerpt}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
