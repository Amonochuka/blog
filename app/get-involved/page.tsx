import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";

export default function GetInvolvedPage() {
  return (
    <BaseLayout>
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-be-900 mb-4">Get Involved</h2>
            <p className="text-be-600 dark:text-zinc-400">
              There are many ways to participate in what Beard & Diapers is doing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tell Your Story section */}
            <div id="share-story" className="scroll-mt-28">
              <h3 className="text-2xl font-bold text-be-900 mb-6">Tell Your Story</h3>
              <p className="text-be-600 dark:text-zinc-400 mb-6">
                Share your story of how hope has shown up in your community. Submitted stories enter
                moderation before publication.
              </p>
              <a
                href="/submit-story"
                className="inline-block px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm"
              >
                Submit Your Story
              </a>
            </div>

            {/* Volunteer section */}
            <div id="volunteer" className="scroll-mt-28">
              <h3 className="text-2xl font-bold text-be-900 mb-6">Volunteer</h3>
              <p className="text-be-600 dark:text-zinc-400 mb-6">
                Join our team of volunteers serving communities where hope is needed most.
              </p>
              <a
                className="inline-block px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm"
                href="/contact?subject=Volunteer%20interest&type=volunteer#contact-form"
              >
                Express Interest
              </a>
            </div>
          </div>

          <div id="support-project" className="mt-8 scroll-mt-28 rounded-xl border border-[#e8ddc9] p-6">
            <h3 className="text-2xl font-bold text-be-900 mb-4">Support a Project</h3>
            <p className="text-be-600 dark:text-zinc-400 mb-6">
              Tell us which project you would like to support and how you hope to contribute. We&apos;ll follow up with practical next steps.
            </p>
            <Link
              href="/contact?subject=Support%20a%20project&type=support_project#contact-form"
              className="inline-block rounded-full bg-be-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-be-700"
            >
              Discuss project support
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div id="start-something" className="scroll-mt-28 rounded-xl border border-[#e8ddc9] p-6">
              <h3 className="mb-4 text-2xl font-bold text-be-900">Start Something</h3>
              <p className="mb-6 text-be-600 dark:text-zinc-400">Have an idea for a community initiative? Tell us about the need, the people involved, and what you hope to make possible.</p>
              <Link href="/contact?subject=Community%20initiative%20proposal&type=community_initiative#contact-form" className="inline-flex rounded-full bg-be-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-be-700">Propose an idea</Link>
            </div>
            <div id="pray-with-us" className="scroll-mt-28 rounded-xl border border-[#e8ddc9] p-6">
              <h3 className="mb-4 text-2xl font-bold text-be-900">Pray With Us</h3>
              <p className="mb-6 text-be-600 dark:text-zinc-400">If you would like to share a prayer or encouragement with the team, send a private note. Prayer messages are reviewed in the admin inbox.</p>
              <Link href="/contact?subject=Prayer%20and%20encouragement&type=prayer_support#contact-form" className="inline-flex rounded-full border border-be-600 px-6 py-3 text-sm font-medium text-be-800 transition-colors hover:bg-be-50">Send a prayer note</Link>
            </div>
          </div>

          {/* Partner section */}
          <div id="partner" className="mt-8 scroll-mt-28 border-t border-[#e8ddc9] pt-8">
            <h3 className="text-2xl font-bold text-be-900 mb-6">Partner With Us</h3>
            <p className="text-be-600 dark:text-zinc-400 mb-6">
              For churches, organisations, businesses and individuals who want to advance hope
              where people live, learn, heal, and belong.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/contact?subject=Church%20Partnership&type=church_partnership#contact-form"
                className="group block rounded-xl bg-be-800 p-4 text-sm text-white transition-colors hover:bg-be-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-600"
              >
                <strong className="block">Churches</strong>
                <span className="mt-1 block">Join our network of partnering churches.</span>
                <span className="mt-4 inline-flex items-center gap-2 font-semibold underline underline-offset-4">
                  Discuss a church partnership <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
              <Link
                href="/contact?subject=Organisation%20Partnership&type=organisation_partnership#contact-form"
                className="group block rounded-xl bg-be-800 p-4 text-sm text-white transition-colors hover:bg-be-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-600"
              >
                <strong className="block">Organisations</strong>
                <span className="mt-1 block">Collaborate on community projects.</span>
                <span className="mt-4 inline-flex items-center gap-2 font-semibold underline underline-offset-4">
                  Discuss an organisation partnership <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Direct link to the story submission form */}
      <section className="py-16 sm:py-20 lg:py-24 bg-be-900">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h3 className="mb-6 text-3xl font-bold text-white">Ready to share your story?</h3>
          <p className="mb-8 text-zinc-400">Use the story form to write your submission and send it for review.</p>
          <a href="/submit-story" className="inline-block rounded-full bg-be-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-be-700">
            Open Story Form
          </a>
        </div>
      </section>
    </BaseLayout>
  );
}
