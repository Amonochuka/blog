import { supabaseRest } from "@/lib/supabase-rest";

export type EditableContentType = "story" | "chapter";

export async function saveContentRevision(type: EditableContentType, id: string, snapshot: Record<string, unknown>) {
  await supabaseRest<unknown>("content_revisions", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ content_type: type, content_id: id, snapshot }),
  });
}

export async function clearContentAutosave(type: EditableContentType, id: string) {
  await supabaseRest<unknown>(`content_autosaves?content_type=eq.${type}&content_id=eq.${id}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  });
}

