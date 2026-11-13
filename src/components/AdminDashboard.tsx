"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

type Story = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  author_email: string;
  attachment_path: string | null;
  status: string;
  created_at: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

type Subscriber = { email: string; created_at: string };
type Tab = "stories" | "messages" | "newsletter";

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("stories");
  const [stories, setStories] = useState<Story[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [workingId, setWorkingId] = useState("");

  const loadInbox = useCallback(async () => {
    const [storyResponse, messageResponse, subscriberResponse] = await Promise.all([
      fetch("/api/admin/stories", { signal: AbortSignal.timeout(15000) }),
      fetch("/api/admin/messages", { signal: AbortSignal.timeout(15000) }),
      fetch("/api/admin/newsletter", { signal: AbortSignal.timeout(15000) }),
    ]);
    if (storyResponse.status === 401) {
      setAuthenticated(false);
      setReady(true);
      return;
    }
    const [storyData, messageData, subscriberData] = await Promise.all([
      storyResponse.json(),
      messageResponse.json(),
      subscriberResponse.json(),
    ]);
    if (!storyResponse.ok) throw new Error(storyData.error || "Could not load the admin inbox.");
    setStories(storyData.stories || []);
    setMessages(messageData.messages || []);
    setSubscribers(subscriberData.subscribers || []);
    setAuthenticated(true);
    setReady(true);
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadInbox).catch((cause: unknown) => {
      setError(cause instanceof Error ? cause.message : "Could not load the admin inbox.");
      setReady(true);
    });
  }, [loadInbox]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not sign in.");
      setPassword("");
      window.dispatchEvent(new Event("blog-admin-session-change"));
      await loadInbox();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign in.");
    }
  }

  async function changeStoryStatus(id: string, status: "published" | "rejected" | "pending") {
    setWorkingId(id);
    setError("");
    try {
      const response = await fetch("/api/admin/stories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update story.");
      await loadInbox();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update story.");
    } finally {
      setWorkingId("");
    }
  }

  if (!ready) {
    return <section className="mx-auto w-full max-w-5xl px-6 py-16"><p>Loading admin inbox…</p></section>;
  }

  if (!authenticated) {
    return (
      <section className="mx-auto w-full max-w-md px-6 py-16 sm:py-24">
        <h1 className="mb-3 text-3xl font-bold text-be-900 dark:text-white">Blog admin</h1>
        <p className="mb-6 text-be-600 dark:text-zinc-400">Sign in to review stories, read messages, and view newsletter signups.</p>
        <form onSubmit={signIn} className="space-y-4 rounded-2xl bg-white p-6 dark:bg-be-800">
          <div className="text-sm font-medium text-be-700 dark:text-zinc-300">
            <label htmlFor="admin-password">Admin password</label>
            <div className="relative mt-2">
              <input id="admin-password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-md bg-be-50 px-4 py-3 pr-12 text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white" />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-be-600 hover:text-be-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-be-600 dark:text-zinc-300 dark:hover:text-white"
              >
                {showPassword ? (
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.2 9.5 6-.4.7-1.3 1.9-2.7 3M6.2 6.2C4.3 7.3 3 9 2.5 11c1 1.8 4.5 6 9.5 6 1 0 2-.2 2.8-.5" /></svg>
                ) : (
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </button>
            </div>
          </div>
          <button className="w-full rounded-full bg-be-600 px-5 py-3 font-medium text-white hover:bg-be-700">Sign in</button>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
      <header className="mb-8">
        <div>
          <h1 className="text-3xl font-bold text-be-900 dark:text-white">Blog admin</h1>
          <p className="mt-1 text-sm text-be-600 dark:text-zinc-400">Review submissions before they appear publicly.</p>
        </div>
      </header>

      <nav className="mb-8 flex flex-wrap gap-2" aria-label="Admin sections">
        {(["stories", "messages", "newsletter"] as const).map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-2 text-sm capitalize ${tab === item ? "bg-be-700 text-white" : "bg-white text-be-700 dark:bg-be-800 dark:text-zinc-300"}`}>
            {item} {item === "stories" ? `(${stories.filter((story) => story.status === "pending").length} pending)` : item === "messages" ? `(${messages.length})` : `(${subscribers.length})`}
          </button>
        ))}
      </nav>

      {error && <p role="alert" className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}

      {tab === "stories" && (
        <div className="space-y-5">
          {stories.length === 0 && <p className="rounded-xl bg-white p-6 text-be-600 dark:bg-be-800 dark:text-zinc-300">No story submissions yet.</p>}
          {stories.map((story) => (
            <article key={story.id} className="rounded-2xl bg-white p-6 dark:bg-be-800">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-be-900 dark:text-white">{story.title}</h2>
                  <p className="mt-1 text-sm text-be-600 dark:text-zinc-400">{story.category} · {story.author_name} · <a className="underline" href={`mailto:${story.author_email}`}>{story.author_email}</a></p>
                </div>
                <span className="rounded-full bg-be-100 px-3 py-1 text-xs capitalize text-be-800 dark:bg-be-900 dark:text-zinc-200">{story.status}</span>
              </div>
              <p className="mb-4 whitespace-pre-wrap text-be-700 dark:text-zinc-300">{story.content}</p>
              {story.attachment_path && <a className="mb-4 inline-flex text-sm font-medium text-be-700 underline underline-offset-2 hover:text-be-900 dark:text-be-300 dark:hover:text-white" href={`/api/admin/stories/${story.id}/attachment`} target="_blank" rel="noopener noreferrer">Download attached document</a>}
              <div className="flex flex-wrap gap-3 text-xs text-be-500">
                <span>Received {new Date(story.created_at).toLocaleString()}</span>
                {story.status === "published" && <a className="underline" href={`/stories/${story.slug}`}>View published story</a>}
              </div>
              {story.status !== "published" && (
                <div className="mt-5 flex flex-wrap gap-3">
                  <button disabled={workingId === story.id} onClick={() => changeStoryStatus(story.id, "published")} className="rounded-full bg-green-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">Approve and publish</button>
                  <button disabled={workingId === story.id} onClick={() => changeStoryStatus(story.id, "rejected")} className="rounded-full border border-red-300 px-4 py-2 text-sm text-red-800 disabled:opacity-60">Reject</button>
                </div>
              )}
              {story.status === "rejected" && <button onClick={() => changeStoryStatus(story.id, "pending")} className="mt-4 text-sm text-be-600 underline">Return to pending</button>}
            </article>
          ))}
        </div>
      )}

      {tab === "messages" && (
        <div className="space-y-4">
          {messages.length === 0 && <p className="rounded-xl bg-white p-6 text-be-600 dark:bg-be-800 dark:text-zinc-300">No contact messages yet.</p>}
          {messages.map((item) => <article key={item.id} className="rounded-xl bg-white p-6 dark:bg-be-800">
            <h2 className="font-bold text-be-900 dark:text-white">{item.subject}</h2>
            <p className="my-2 text-sm text-be-600 dark:text-zinc-400">{item.name} · <a className="underline" href={`mailto:${item.email}`}>{item.email}</a> · {new Date(item.created_at).toLocaleString()}</p>
            <p className="whitespace-pre-wrap text-be-700 dark:text-zinc-300">{item.message}</p>
          </article>)}
        </div>
      )}

      {tab === "newsletter" && (
        <div className="overflow-x-auto rounded-xl bg-white dark:bg-be-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e8ddc9] text-be-700 dark:border-[#7d6231] dark:text-zinc-300"><tr><th className="p-4">Email</th><th className="p-4">Joined</th></tr></thead>
            <tbody>{subscribers.map((subscriber) => <tr key={subscriber.email} className="border-b border-[#f5f0e9] last:border-0 dark:border-[#7d6231]"><td className="p-4 text-be-900 dark:text-white">{subscriber.email}</td><td className="p-4 text-be-600 dark:text-zinc-400">{new Date(subscriber.created_at).toLocaleString()}</td></tr>)}</tbody>
          </table>
          {subscribers.length === 0 && <p className="p-6 text-be-600 dark:text-zinc-300">No newsletter signups yet.</p>}
        </div>
      )}
    </section>
  );
}
