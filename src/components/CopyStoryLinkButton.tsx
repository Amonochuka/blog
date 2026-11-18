"use client";

import { useState } from "react";

export function CopyStoryLinkButton({ url }: { url: string }) {
  const [message, setMessage] = useState("");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied. Paste it into an Instagram post or message.");
    } catch {
      setMessage("Copy this story’s address from your browser to share it on Instagram.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => void copyLink()}
        aria-label="Copy story link for Instagram"
        title="Copy link for Instagram"
        className="story-share-icon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-600"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
      </button>
      {message && <span role="status" className="text-xs text-be-600 dark:text-zinc-300">{message}</span>}
    </>
  );
}
