import { BaseLayout } from "@/components/BaseLayout";

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
<div>
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
            <div>
              <h3 className="text-2xl font-bold text-be-900 mb-6">Volunteer</h3>
              <p className="text-be-600 dark:text-zinc-400 mb-6">
                Join our team of volunteers serving communities where hope is needed most.
              </p>
              <a
                className="inline-block px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm"
                href="/contact?subject=Volunteer%20interest#contact-form"
              >
                Express Interest
              </a>
            </div>
          </div>

          {/* Partner section */}
          <div className="mt-8 pt-8 border-t border-[#e8ddc9]">
            <h3 className="text-2xl font-bold text-be-900 mb-6">Partner With Us</h3>
            <p className="text-be-600 dark:text-zinc-400 mb-6">
              For churches, organisations, businesses and individuals who want to advance hope
              where people live, learn, heal, and belong.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-be-800 text-white text-sm">
                <strong>Churches</strong><br />
                Join our network of partnering churches.
              </div>
              <div className="p-4 rounded-xl bg-be-800 text-white text-sm">
                <strong>Organisations</strong><br />
                Collaborate on community projects.
              </div>
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
