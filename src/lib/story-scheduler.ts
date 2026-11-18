import { supabaseRest } from "@/lib/supabase-rest";

/** Promote due stories when the public site is visited. This keeps scheduled content
 * automatic without requiring an external cron service. */
export async function publishDueStories() {
  const now = new Date();
  try {
    const due = await supabaseRest<Array<{ id: string; scheduled_at: string }>>(
      `stories?select=id,scheduled_at&status=eq.scheduled&scheduled_at=lte.${encodeURIComponent(now.toISOString())}&order=scheduled_at.asc&limit=100`
    );
    await Promise.all(due.map((story) => supabaseRest<unknown>(`stories?id=eq.${story.id}&status=eq.scheduled`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status: "published", published_at: story.scheduled_at, scheduled_at: null }),
    })));
  } catch {
    // Keep public pages available while the admin applies the workflow migration or
    // if Supabase is temporarily unavailable.
  }
}
