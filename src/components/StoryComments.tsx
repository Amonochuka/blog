"use client";

import { useState, type FormEvent } from "react";

type PublicComment = { id: string; author_name: string; content: string; created_at: string };

function formatCommentDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

export function StoryComments({ slug, comments }: { slug: string; comments: PublicComment[] }) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setMessage("");
    const data = new FormData(form);
    try {
      const response = await fetch(`/api/stories/${encodeURIComponent(slug)}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), email: data.get("email"), content: data.get("content"), website: data.get("website") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not submit your comment.");
      form.reset();
      setMessage(result.message || "Your comment is waiting for review.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not submit your comment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="mt-14 border-t border-[#d9c8a3] pt-8 dark:border-[#7d6231]" aria-labelledby="story-comments-heading">
      <h2 id="story-comments-heading" className="text-2xl font-bold text-be-900 dark:text-white">Comments ({comments.length})</h2>
      {comments.length ? <ul className="mt-5 space-y-4">{comments.map((comment) => <li key={comment.id} className="rounded-xl bg-white p-5 dark:bg-be-800"><p className="font-semibold text-be-900 dark:text-white">{comment.author_name}</p><time className="mt-1 block text-xs text-be-500" dateTime={comment.created_at}>{formatCommentDate(comment.created_at)}</time><p className="mt-3 whitespace-pre-wrap text-be-700 dark:text-zinc-300">{comment.content}</p></li>)}</ul> : <p className="mt-3 text-sm text-be-600 dark:text-zinc-400">No comments yet. Add the first one.</p>}
      <form onSubmit={submit} className="mt-7 grid gap-4 rounded-2xl bg-white p-5 sm:grid-cols-2 dark:bg-be-800">
        <h3 className="text-lg font-bold text-be-900 sm:col-span-2 dark:text-white">Leave a comment</h3>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Your name<input name="name" required minLength={2} maxLength={100} className="w-full rounded-md bg-be-50 px-3 py-2 text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white" /></label>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300">Email (not displayed)<input type="email" name="email" required className="w-full rounded-md bg-be-50 px-3 py-2 text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white" /></label>
        <div className="hidden" aria-hidden="true"><label>Leave this field blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className="space-y-1 text-sm text-be-700 dark:text-zinc-300 sm:col-span-2">Comment<textarea name="content" required minLength={3} maxLength={2000} rows={4} className="w-full rounded-md bg-be-50 px-3 py-2 text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white" /></label>
        <div className="flex items-center gap-3 sm:col-span-2"><button disabled={sending} className="rounded-full bg-be-700 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{sending ? "Sending…" : "Submit comment"}</button>{message && <p role="status" className="text-sm text-be-700 dark:text-zinc-300">{message}</p>}</div>
        <p className="text-xs text-be-500 sm:col-span-2">Comments are reviewed before they appear publicly.</p>
      </form>
    </section>
  );
}
