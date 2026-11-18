import { NewsletterForm } from "@/components/NewsletterForm";

export function NewsletterSignupSection({
  title = "The Beard & Diapers Letter",
  description = "Stories, ideas and opportunities for hope — delivered occasionally.",
}: { title?: string; description?: string }) {
  return (
    <section id="newsletter" className="bg-be-900 px-5 py-14 text-center sm:px-8 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-3 text-3xl font-bold text-white">{title}</h2>
        <p className="mb-7 text-zinc-300">{description}</p>
        <NewsletterForm />
      </div>
    </section>
  );
}
