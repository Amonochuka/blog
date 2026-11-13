import Image from "next/image";
import Link from "next/link";
import { BaseLayout } from "@/components/BaseLayout";

export default function HospitalVisitStoryPage() {
  return (
    <BaseLayout>
      <section className="bg-white py-16 sm:py-20 lg:py-24 dark:bg-be-900">
        <article className="prose mx-auto max-w-2xl px-6">
          <Image src="/images/featured-story.jpg" alt="A reading corner in a hospital" width={800} height={400} className="mb-6 h-64 w-full rounded-xl object-cover" />
          <p className="mb-2 text-sm text-be-500">Beard &amp; Diapers Projects · 2025</p>
          <h1 className="text-4xl font-bold text-be-900">A Hospital Visit Remembered</h1>
          <p>When words meet presence, healing begins.</p>
          <p>In a Nairobi hospital ward, a reading corner became more than a shelf of books. Volunteers read with patients and families, making room for conversation, comfort, and a little hope in a difficult place.</p>
          <p>The books mattered, but so did the time spent together. A quiet visit reminded people that they were seen and cared for.</p>
          <Link href="/stories" className="font-medium text-be-600 hover:text-be-900">← Back to Stories</Link>
        </article>
      </section>
    </BaseLayout>
  );
}
