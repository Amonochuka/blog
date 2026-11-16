import { BaseLayout } from "@/components/BaseLayout";
import { StoryArticleLayout } from "@/components/StoryArticleLayout";

export default function StoryPage() {
  return (
    <BaseLayout>
      <StoryArticleLayout
        slug="fathers-day-reflection"
        title="Father's Day Reflection"
        category="Fatherhood"
        author="Roy Ochuka"
        date="2025-06-15"
        readingTime="2 min read"
        image="/images/family-nairobi-father.jpg"
        imageAlt="A father spending time with his child"
      >
        <p>What does it mean to be a father who passes on hope, not perfection?</p>

        <h2>The greatest legacy</h2>
        <p>The greatest legacy a father can leave is not what he accumulated, but what he awakened.</p>

        <blockquote>
          <p>
            It is in the ordinary moments — the conversations, the teachings, the presence — that we
            pass on the most valuable things.
          </p>
        </blockquote>

        <h2>Continue the journey</h2>
        <p>Every story matters. Your story might be the one someone needs to hear today.</p>
      </StoryArticleLayout>
    </BaseLayout>
  );
}
