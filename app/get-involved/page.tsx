import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";

export default function GetInvolvedPage() {
  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-be-900 mb-4">Get Involved</h2>
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
                className="inline-block px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm"
                href="/get-involved/submit-story"
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
                href="#"
              >
                Express Interest
              </a>
            </div>
          </div>

          {/* Partner section */}
          <div className="mt-8 pt-8 border-t border-be-200">
            <h3 className="text-2xl font-bold text-be-900 mb-6">Partner With Us</h3>
            <p className="text-be-600 dark:text-zinc-400 mb-6">
              For churches, organisations, businesses and individuals who want to advance hope
              where people live, learn, heal, and belong.
            </p>
            <div className="grid grid-cols-2 gap-4">
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

      {/* Story submission form placeholder */}
      <section className="py-24 md:py-32 bg-be-900">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-white mb-6">Submit a Story</h3>
          <p className="text-zinc-400 mb-8">We'd love to hear your story of hope.</p>
          <form className="bg-be-800 rounded-xl p-8 max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-3 rounded-md bg-be-900 border-none text-white focus:outline-none focus:ring-2 focus:ring-be-600"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-md bg-be-900 border-none text-white focus:outline-none focus:ring-2 focus:ring-be-600"
              />
            </div>
            <input
              type="text"
              placeholder="Story title"
              className="w-full px-4 py-3 rounded-md bg-be-900 border-none text-white focus:outline-none focus:ring-2 focus:ring-be-600 mb-4"
            />
            <textarea
              rows={4}
              placeholder="Story"
              className="w-full px-4 py-3 rounded-md bg-be-900 border-none text-white focus:outline-none focus:ring-2 focus:ring-be-600 mb-4"
            ></textarea>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Location"
                className="px-4 py-3 rounded-md bg-be-900 border-none text-white focus:outline-none focus:ring-2 focus:ring-be-600"
              />
              <select
                className="px-4 py-3 rounded-md bg-be-900 border-none text-white focus:outline-none focus:ring-2 focus:ring-be-600"
              >
                <option>Select category</option>
                <option>Faith</option>
                <option>Family</option>
                <option>Fatherhood</option>
                <option>Community</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-zinc-400 mb-3">
                <input
                  type="checkbox"
                  className="rounded-be-600 accent-be-600"
                  defaultChecked
                />
                Permission to publish
              </label>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-be-600 text-be-900 font-medium rounded-md hover:bg-be-700 transition-colors mt-4"
              >
                Submit Story
              </button>
            </div>
          </form>
        </div>
      </section>
    </BaseLayout>
  );
}