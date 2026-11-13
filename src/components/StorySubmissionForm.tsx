"use client";

import { useState, type FormEvent } from "react";

export function StorySubmissionForm() {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setMessage("");
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not submit your story.");
      setMessage("Thanks. Your story is saved and waiting for review; it will appear on the site after approval.");
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We could not submit your story. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8 dark:bg-be-900">
      <div className="hidden" aria-hidden="true"><label>Leave this field blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-be-700 dark:text-zinc-300">
          Your name
          <input name="name" autoComplete="name" required className="w-full rounded-md bg-be-50 px-4 py-3 font-normal text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-800 dark:text-white" />
        </label>
        <label className="space-y-2 text-sm font-medium text-be-700 dark:text-zinc-300">
          Email
          <input name="email" type="email" autoComplete="email" required className="w-full rounded-md bg-be-50 px-4 py-3 font-normal text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-800 dark:text-white" />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-medium text-be-700 dark:text-zinc-300">
        Story title
        <input name="title" required className="w-full rounded-md bg-be-50 px-4 py-3 font-normal text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-800 dark:text-white" />
      </label>
      <label className="block space-y-2 text-sm font-medium text-be-700 dark:text-zinc-300">
        Category
        <select name="category" defaultValue="Community" className="w-full rounded-md bg-be-50 px-4 py-3 font-normal text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-800 dark:text-white">
          <option>Community</option>
          <option>Faith</option>
          <option>Family</option>
          <option>Fatherhood</option>
          <option>Other</option>
        </select>
      </label>
      <label className="block space-y-2 text-sm font-medium text-be-700 dark:text-zinc-300">
        Your story
        <textarea name="story" required rows={9} className="w-full resize-y rounded-md bg-be-50 px-4 py-3 font-normal text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-800 dark:text-white" />
      </label>
      <label className="block space-y-2 text-sm font-medium text-be-700 dark:text-zinc-300">
        Attach a document (optional)
        <input name="attachment" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="block w-full rounded-md bg-be-50 px-4 py-3 text-sm font-normal text-be-900 file:mr-4 file:rounded-md file:border-0 file:bg-be-200 file:px-4 file:py-2 file:font-medium file:text-be-900 dark:bg-be-800 dark:text-white dark:file:bg-be-700 dark:file:text-white" />
        <span className="block text-xs font-normal text-be-500 dark:text-zinc-400">PDF, DOC, or DOCX. Maximum file size: 10 MB.</span>
      </label>
      <label className="flex items-start gap-3 text-sm text-be-600 dark:text-zinc-400">
        <input name="permission" type="checkbox" required className="mt-1 accent-be-600" />
        I give Beard &amp; Diapers permission to review this story for possible publication.
      </label>
      <button disabled={submitting} type="submit" className="w-full rounded-full bg-be-600 px-6 py-3 font-medium text-white transition-colors hover:bg-be-700 disabled:cursor-wait disabled:opacity-60 sm:w-auto">
        {submitting ? "Submitting…" : "Submit Story"}
      </button>
      {message && <p role="status" className="text-sm text-be-600 dark:text-zinc-300">{message}</p>}
    </form>
  );
}
