import { BaseLayout } from "@/components/BaseLayout";
import { StoryArticleLayout } from "@/components/StoryArticleLayout";

export default function StoryPage() {
  return (
    <BaseLayout>
      <StoryArticleLayout
        slug="walking-together"
        title="Walking Together"
        category="Community"
        author="Roy Ochuka"
        date="2025-02-10"
        readingTime="2 min read"
        image="/images/african-family-meal.jpg"
        imageAlt="A family sharing a meal together"
      >
        <p>Hope is not meant to be carried alone. It grows when we walk together.</p>

        <h2>A single story can change a life</h2>
        <p>A single story can change a life. But a community of stories can change a nation.</p>

        <blockquote>
          <p>When we share our stories, we create space for others to encounter hope in unexpected places.</p>
        </blockquote>

        <h2>Continue the journey</h2>
        <p>Every story matters. Your story might be the one someone needs to hear today.</p>
      </StoryArticleLayout>
    </BaseLayout>
  );
}
