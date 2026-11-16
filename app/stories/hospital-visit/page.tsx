import { BaseLayout } from "@/components/BaseLayout";
import { StoryArticleLayout } from "@/components/StoryArticleLayout";

export default function HospitalVisitStoryPage() {
  return (
    <BaseLayout>
      <StoryArticleLayout
        slug="hospital-visit"
        title="A Hospital Visit Remembered"
        category="Beard & Diapers Projects"
        author="Mercy Wanjiku"
        date="2025-03-22"
        readingTime="2 min read"
        image="/images/hospital-reading-corners.jpeg"
        imageAlt="A mother and child reading together in a hospital"
      >
        <p>When words meet presence, healing begins.</p>
        <p>
          In a Nairobi hospital ward, a reading corner became more than a shelf of books. Volunteers
          read with patients and families, making room for conversation, comfort, and a little hope
          in a difficult place.
        </p>
        <p>
          The books mattered, but so did the time spent together. A quiet visit reminded people that
          they were seen and cared for.
        </p>
      </StoryArticleLayout>
    </BaseLayout>
  );
}
