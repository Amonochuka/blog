import { BaseLayout } from "@/components/BaseLayout";
import { StoryArticleLayout } from "@/components/StoryArticleLayout";

export default function StoryPage() {
  return (
    <BaseLayout>
      <StoryArticleLayout
        slug="hope-in-the-ordinary"
        title="Hope in the Ordinary"
        category="Personal Reflections"
        author="Roy Ochuka"
        date="2025-01-15"
        readingTime="3 min read"
        image="/images/family-community-home.jpg"
        imageAlt="A family sharing a quiet moment at home"
      >
        <p>
          Sometimes hope does not arrive as a grand event. It arrives as a neighbour carrying water,
          a child reading aloud, a hand held in silence.
        </p>

        <h2>The small things</h2>
        <p>
          We are tempted to measure impact in projects completed and funds raised. But the deeper
          work of hope is quieter.
        </p>

        <blockquote>
          <p>We believe every community carries God-given potential.</p>
        </blockquote>

        <h2>A library corner</h2>
        <p>
          In a small hospital ward, a reading corner became a place of healing. Not because of the
          books alone, but because someone chose to sit and read with a stranger.
        </p>
        <p>That is the heartbeat of Beard &amp; Diapers.</p>
      </StoryArticleLayout>
    </BaseLayout>
  );
}
