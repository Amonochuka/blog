"use client";

import { useEffect, useMemo, useState } from "react";

type Revision = { id: string; snapshot: Record<string, unknown>; created_at: string };
type Autosave = { snapshot: Record<string, unknown>; updated_at: string } | null;

export function ContentHistoryControls({
  type,
  id,
  snapshot,
  onRestore,
}: {
  type: "story" | "chapter";
  id: string;
  snapshot: Record<string, unknown>;
  onRestore: (snapshot: Record<string, unknown>) => void;
}) {
  const [ready, setReady] = useState(false);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [autosave, setAutosave] = useState<Autosave>(null);
  const [chosenRevision, setChosenRevision] = useState("");
  const [note, setNote] = useState("");
  const [autosaveHandled, setAutosaveHandled] = useState(false);
  const snapshotJson = useMemo(() => JSON.stringify(snapshot), [snapshot]);
  const [initialSnapshotJson] = useState(snapshotJson);

  useEffect(() => {
    let active = true;
    fetch(`/api/admin/content-history?type=${type}&id=${encodeURIComponent(id)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load editor history.");
        if (!active) return;
        setRevisions(data.revisions || []);
        const savedDraft = data.autosave || null;
        setAutosave(savedDraft);
        setAutosaveHandled(!savedDraft || JSON.stringify(savedDraft.snapshot) === initialSnapshotJson);
        setReady(true);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setNote(error instanceof Error ? error.message : "Could not load editor history.");
        setAutosaveHandled(true);
        setReady(true);
      });
    return () => { active = false; };
  }, [id, initialSnapshotJson, type]);

  useEffect(() => {
    if (!ready || !autosaveHandled || snapshotJson === initialSnapshotJson) return;
    const timer = window.setTimeout(() => {
      fetch("/api/admin/content-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id, snapshot: JSON.parse(snapshotJson) }),
      }).then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Autosave failed.");
        }
        setNote(`Autosaved at ${new Date().toLocaleTimeString()}`);
      }).catch((error: unknown) => setNote(error instanceof Error ? error.message : "Autosave failed."));
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [autosaveHandled, id, initialSnapshotJson, ready, snapshotJson, type]);

  function recover(snapshotToRestore: Record<string, unknown>) {
    onRestore(snapshotToRestore);
    setAutosaveHandled(true);
    setAutosave(null);
    setNote("Recovered into the editor. Save when ready to update the published copy.");
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-be-50 px-3 py-2 text-xs text-be-700 dark:bg-be-900 dark:text-zinc-300">
      {autosave && !autosaveHandled && <>
        <span>Unsaved work from {new Date(autosave.updated_at).toLocaleString()} is available.</span>
        <button type="button" className="font-semibold underline" onClick={() => recover(autosave.snapshot)}>Recover autosave</button>
        <button type="button" className="underline" onClick={() => { setAutosaveHandled(true); setNote("Autosave dismissed."); }}>Dismiss</button>
      </>}
      {revisions.length > 0 && <>
        <label htmlFor={`revision-${id}`} className="font-semibold">Revision history</label>
        <select id={`revision-${id}`} className="max-w-64 rounded border border-be-200 bg-white px-2 py-1 dark:border-be-700 dark:bg-be-800" value={chosenRevision} onChange={(event) => setChosenRevision(event.target.value)}>
          <option value="">Choose a saved version</option>
          {revisions.map((revision) => <option key={revision.id} value={revision.id}>{new Date(revision.created_at).toLocaleString()}</option>)}
        </select>
        <button type="button" className="font-semibold underline disabled:opacity-50" disabled={!chosenRevision} onClick={() => {
          const revision = revisions.find((entry) => entry.id === chosenRevision);
          if (revision) recover(revision.snapshot);
        }}>Load version into editor</button>
      </>}
      {note && <span role="status">{note}</span>}
    </div>
  );
}
