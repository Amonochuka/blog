import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";

export default async function SubmitStoryPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "story_submit",
      name: "",
      email: "",
    }),
  });

  const data = await res.json();

  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-be-900 mb-4">Share Your Story</h2>
            <p className="text-be-600 dark:text-zinc-400">
              We'd love to hear your story of how hope has shown up in your community.
            </p>
          </div>

          <div className="bg-white dark:bg-be-900 rounded-2xl p-8 mt-8">
            <h3 className="text-2xl font-bold text-be-900 mb-4">Story Submitted</h3>
            <p className="text-be-600 dark:text-zinc-400 mb-8">
              Thank you for sharing your story! Submitted stories enter a moderation queue before
              publication. Our team will review your story and get back to you.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-be-600 text-sm">Your story will be reviewed</p>
                <p className="text-be-500 font-medium">Within 5-7 days</p>
              </div>
              <div>
                <p className="text-be-600 text-sm">You'll be notified</p>
                <p className="text-be-500 font-medium">via email</p>
              </div>
            </div>

            <a
              href="/get-involved"
              className="inline-block px-6 py-3 bg-be-600 text-white font-medium rounded-full hover:bg-be-700 transition-colors text-sm"
            >
              Back to Get Involved
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </BaseLayout>
  );
}