"use client";

import { useCallback, useEffect, useState } from "react";

type CommentRecord = { id: string; story_slug: string; author_name: string; author_email: string; content: string; status: "pending" | "published" | "rejected"; created_at: string };

export function AdminCommentsPanel() {
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workingId, setWorkingId] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/comments", { signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load comments.");
      setComments(data.comments || []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load comments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function setStatus(comment: CommentRecord, status: CommentRecord["status"]) {
    setWorkingId(comment.id);
    setError("");
    try {
      const response = await fetch("/api/admin/comments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: comment.id, status }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update comment.");
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update comment.");
    } finally {
      setWorkingId("");
    }
  }

  if (loading) return <p role="status" className="rounded-xl bg-white p-6 text-sm text-be-600 dark:bg-be-800 dark:text-zinc-300">Loading comments…</p>;
  if (error && comments.length === 0) return <p role="alert" className="rounded-xl bg-white p-6 text-sm text-red-700 dark:bg-be-800">{error}</p>;

  return <div className="space-y-4">
    {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    {comments.length === 0 && <p className="rounded-xl bg-white p-6 text-be-600 dark:bg-be-800 dark:text-zinc-300">No comments yet.</p>}
    {comments.map((comment) => <article key={comment.id} className="rounded-2xl bg-white p-6 dark:bg-be-800">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-bold text-be-900 dark:text-white">{comment.author_name}</h2><p className="text-sm text-be-600 dark:text-zinc-400"><a className="underline" href={`mailto:${comment.author_email}`}>{comment.author_email}</a> · on <a className="underline" href={`/stories/${comment.story_slug}`}>{comment.story_slug}</a></p></div><span className="rounded-full bg-be-100 px-3 py-1 text-xs capitalize text-be-800 dark:bg-be-900 dark:text-zinc-200">{comment.status}</span></div>
      <p className="mt-4 whitespace-pre-wrap text-be-700 dark:text-zinc-300">{comment.content}</p>
      <div className="mt-4 flex flex-wrap gap-3">{comment.status !== "published" && <button disabled={workingId === comment.id} onClick={() => void setStatus(comment, "published")} className="rounded-full bg-green-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">Approve</button>}{comment.status !== "rejected" && <button disabled={workingId === comment.id} onClick={() => void setStatus(comment, "rejected")} className="rounded-full border border-red-300 px-4 py-2 text-sm text-red-800 disabled:opacity-60">Reject</button>}</div>
    </article>)}
  </div>;
}
