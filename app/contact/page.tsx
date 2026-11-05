import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BaseLayout } from "@/components/BaseLayout";

export default function ContactPage() {
  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-be-900 mb-6 leading-tight">
                Contact
              </h2>
              <p className="text-be-700 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                We'd love to hear from you. Whether you have a story to share, a question about our
                work, or want to partner with us, get in touch.
              </p>

              <address className="text-be-600 dark:text-zinc-400 space-y-4">
                <div>
                  <strong>Beard & Diapers</strong>
                  <p>Nairobi, Kenya</p>
                </div>
                <div>
                  <strong>Email</strong>
                  <p>contact@beardandiapers.org</p>
                </div>
                <div>
                  <strong>Follow</strong>
                  <a className="hover:text-be-600 transition-colors" href="https://twitter.com/royochuka" target="_blank" rel="noopener">
                    X
                  </a>{" "}
                  <a className="hover:text-be-600 transition-colors" href="https://instagram.com/beardandiapers" target="_blank" rel="noopener">
                    Instagram
                  </a>{" "}
                  <a className="hover:text-be-600 transition-colors" href="https://facebook.com/beardandiapers" target="_blank" rel="noopener">
                    Facebook
                  </a>
                </div>
              </address>
            </div>

            <div className="space-y-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-be-700 dark:text-zinc-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-md bg-be-900 border-none text-white focus:outline-none focus:ring-2 focus:ring-be-600"
                  />
                </div>
                <div>
                  <label className="block text-be-700 dark:text-zinc-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-md bg-be-900 border-none text-white focus:outline-none focus:ring-2 focus:ring-be-600"
                  />
                </div>
                <div>
                  <label className="block text-be-700 dark:text-zinc-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-md bg-be-900 border-none text-white focus:outline-none focus:ring-2 focus:ring-be-600"
                  />
                </div>
                <div>
                  <label className="block text-be-700 dark:text-zinc-400 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-md bg-be-900 border-none text-white focus:outline-none focus:ring-2 focus:ring-be-600 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-be-600 text-be-900 font-medium rounded-full hover:bg-be-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}