"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          consent: formData.get("consent") === "on",
          website: formData.get("website"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not save your signup.");
      setMessage("Your email is saved on the newsletter list. Email updates will begin when delivery is configured.");
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "We could not save your signup. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`mx-auto w-full rounded-xl bg-be-800 ${compact ? "max-w-md p-4 sm:p-6" : "max-w-md p-6 sm:p-8"}`}>
      <div className="hidden" aria-hidden="true"><label>Leave this field blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input name="email" type="email" autoComplete="email" placeholder="Enter your email" aria-label="Email address" required className="min-w-0 flex-1 rounded-md border-none bg-be-900 px-4 py-3 text-white outline-none ring-be-600 placeholder:text-zinc-400 focus:ring-2" />
        <button disabled={submitting} type="submit" className="rounded-md bg-be-600 px-6 py-3 font-medium text-be-900 transition-colors hover:bg-be-700 disabled:cursor-wait disabled:opacity-60">{submitting ? "Saving…" : "Subscribe"}</button>
      </div>
      <label className="mt-4 flex items-start gap-2 text-left text-xs text-zinc-300">
        <input name="consent" type="checkbox" required className="mt-0.5 accent-be-500" />
        I agree to receive occasional email updates from Beard &amp; Diapers.
      </label>
      {message && <p role="status" className="mt-4 text-left text-sm text-zinc-200">{message}</p>}
    </form>
  );
}
