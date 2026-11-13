import { BaseLayout } from "@/components/BaseLayout";
import { ContactForm } from "@/components/ContactForm";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject = "" } = await searchParams;

  return (
    <BaseLayout>
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-be-900 mb-6 leading-tight">
                Contact
              </h2>
              <p className="text-be-700 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                We&apos;d love to hear from you. Whether you have a story to share, a question about our
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
                  <a aria-label="Follow us on X" className="inline-flex align-middle hover:text-be-600 transition-colors" href="https://twitter.com/royochuka" target="_blank" rel="noopener">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" /></svg>
                  </a>{" "}
                  <a aria-label="Follow us on Instagram" className="inline-flex align-middle hover:text-be-600 transition-colors" href="https://instagram.com/beardandiapers" target="_blank" rel="noopener">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></svg>
                  </a>{" "}
                  <a aria-label="Follow us on Facebook" className="inline-flex align-middle hover:text-be-600 transition-colors" href="https://facebook.com/beardandiapers" target="_blank" rel="noopener">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" /></svg>
                  </a>
                </div>
              </address>
            </div>

            <div className="space-y-6">
              <ContactForm defaultSubject={subject} />
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
