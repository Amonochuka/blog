"use client";

import { useState, type FormEvent } from "react";

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    setMessage("");
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "We could not send your message.");
        setMessage("Your message was received. We’ll get back to you by email.");
        form.reset();
      })
      .catch((error: unknown) => setMessage(error instanceof Error ? error.message : "We could not send your message. Please try again."))
      .finally(() => setSubmitting(false));
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="hidden" aria-hidden="true"><label>Leave this field blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="block text-sm font-medium text-be-700 dark:text-zinc-300">
        Name
        <input name="name" autoComplete="name" required className="mt-2 w-full rounded-md bg-be-900 px-4 py-3 text-white outline-none ring-be-600 focus:ring-2" />
      </label>
      <label className="block text-sm font-medium text-be-700 dark:text-zinc-300">
        Email
        <input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-md bg-be-900 px-4 py-3 text-white outline-none ring-be-600 focus:ring-2" />
      </label>
      <label className="block text-sm font-medium text-be-700 dark:text-zinc-300">
        Subject
        <input name="subject" defaultValue={defaultSubject} required className="mt-2 w-full rounded-md bg-be-900 px-4 py-3 text-white outline-none ring-be-600 focus:ring-2" />
      </label>
      <label className="block text-sm font-medium text-be-700 dark:text-zinc-300">
        Message
        <textarea name="message" rows={5} required className="mt-2 w-full resize-y rounded-md bg-be-900 px-4 py-3 text-white outline-none ring-be-600 focus:ring-2" />
      </label>
      <button disabled={submitting} type="submit" className="w-full rounded-full bg-be-600 px-6 py-3 font-medium text-be-900 transition-colors hover:bg-be-700 disabled:cursor-wait disabled:opacity-60">
        {submitting ? "Sending…" : "Send Message"}
      </button>
      {message && <p role="status" className="text-sm text-be-600 dark:text-zinc-300">{message}</p>}
    </form>
  );
}
