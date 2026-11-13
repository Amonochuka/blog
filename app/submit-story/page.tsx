import { BaseLayout } from "@/components/BaseLayout";
import { StorySubmissionForm } from "@/components/StorySubmissionForm";

export default function SubmitStoryPage() {
  return (
    <BaseLayout>
      <section className="bg-be-50 py-16 sm:py-20 lg:py-24 dark:bg-be-900">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-4xl font-bold text-be-900 sm:text-5xl dark:text-white">Share Your Story</h1>
            <p className="text-be-600 dark:text-zinc-400">
              Tell us how hope has shown up in your community. Your story will be sent privately for review before it appears on the site.
            </p>
          </div>
          <StorySubmissionForm />
        </div>
      </section>
    </BaseLayout>
  );
}
