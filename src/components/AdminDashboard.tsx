"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { InquiryType } from "@/lib/inquiry-types";
import { AdminStoryEditor, type EditableStory } from "@/components/AdminStoryEditor";
import { AdminBooksManager } from "@/components/AdminBooksManager";
import { AdminNewStoryForm } from "@/components/AdminNewStoryForm";
import { AdminCommentsPanel } from "@/components/AdminCommentsPanel";

const inquiryTabs = [
  { id: "messages", label: "Messages", inquiryType: "general", emptyMessage: "No contact messages yet." },
  { id: "volunteers", label: "Volunteers", inquiryType: "volunteer", emptyMessage: "No volunteer inquiries yet." },
  { id: "church-partners", label: "Church partners", inquiryType: "church_partnership", emptyMessage: "No church partnership inquiries yet." },
  { id: "organisation-partners", label: "Organisation partners", inquiryType: "organisation_partnership", emptyMessage: "No organisation partnership inquiries yet." },
  { id: "project-support", label: "Project support", inquiryType: "support_project", emptyMessage: "No project support inquiries yet." },
] as const;

type InquiryTabId = (typeof inquiryTabs)[number]["id"];

type Story = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  author_email: string | null;
  attachment_path: string | null;
  image_path: string | null;
  status: string;
  created_at: string;
  publication_permission: boolean;
  publication_permission_at: string | null;
  subtitle: string;
  tags: string[];
  related_story_slugs: string[];
  featured: boolean;
  seo_title: string;
  seo_description: string;
  published_at: string | null;
  image_url: string | null;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiry_type: InquiryType;
  created_at: string;
};

type Subscriber = { email: string; created_at: string };
type BookOption = { slug: string; title: string };
type Tab = "stories" | InquiryTabId | "newsletter" | "books" | "comments";

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const [inboxLoaded, setInboxLoaded] = useState(false);
  const [inboxLoading, setInboxLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("stories");
  const [stories, setStories] = useState<Story[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [bookOptions, setBookOptions] = useState<BookOption[]>([]);
  const [featuredBookSlug, setFeaturedBookSlug] = useState("");
  const [bookSettingLoaded, setBookSettingLoaded] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [bookSaving, setBookSaving] = useState(false);
  const [bookError, setBookError] = useState("");
  const [bookSaved, setBookSaved] = useState(false);
  const [workingId, setWorkingId] = useState("");
  const activeInquiryTab = inquiryTabs.find((item) => item.id === tab);
  const activeInquiries = activeInquiryTab
    ? messages.filter((item) => item.inquiry_type === activeInquiryTab.inquiryType)
    : [];
  const navItems: Array<{ id: Tab; label: string }> = [
    { id: "stories", label: `Stories (${stories.filter((story) => story.status === "pending").length} pending)` },
    ...inquiryTabs.map((item) => ({
      id: item.id,
      label: `${item.label} (${messages.filter((message) => message.inquiry_type === item.inquiryType).length})`,
    })),
    { id: "newsletter", label: `Newsletter (${subscribers.length})` },
    { id: "comments", label: "Comments" },
    { id: "books", label: "Books" },
  ];

  const loadFeaturedBook = useCallback(async () => {
    setBookLoading(true);
    setBookError("");
    try {
      const response = await fetch("/api/admin/featured-book", { signal: AbortSignal.timeout(10000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load book settings.");
      setBookOptions(data.books || []);
      setFeaturedBookSlug(data.featuredBookSlug || "");
      setBookSettingLoaded(true);
    } catch (cause) {
      setBookError(cause instanceof Error ? cause.message : "Could not load book settings.");
    } finally {
      setBookLoading(false);
    }
  }, []);

  const loadInbox = useCallback(async () => {
    setInboxLoading(true);
    setError("");
    try {
      const [storyResponse, messageResponse, subscriberResponse] = await Promise.all([
        fetch("/api/admin/stories", { signal: AbortSignal.timeout(15000) }),
        fetch("/api/admin/messages", { signal: AbortSignal.timeout(15000) }),
        fetch("/api/admin/newsletter", { signal: AbortSignal.timeout(15000) }),
      ]);
      if ([storyResponse, messageResponse, subscriberResponse].some((response) => response.status === 401)) {
        setAuthenticated(false);
        setInboxLoaded(false);
        setReady(true);
        return;
      }
      const [storyData, messageData, subscriberData] = await Promise.all([
        storyResponse.json(),
        messageResponse.json(),
        subscriberResponse.json(),
      ]);
      if (!storyResponse.ok) throw new Error(storyData.error || "Could not load stories.");
      if (!messageResponse.ok) throw new Error(messageData.error || "Could not load messages.");
      if (!subscriberResponse.ok) throw new Error(subscriberData.error || "Could not load newsletter subscribers.");
      setStories(storyData.stories || []);
      setMessages(messageData.messages || []);
      setSubscribers(subscriberData.subscribers || []);
      setInboxLoaded(true);
      setAuthenticated(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load the admin inbox.");
    } finally {
      setInboxLoading(false);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]);
    void fetch("/api/admin/session", { signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not check the admin session.");
        return response.json() as Promise<{ authenticated: boolean }>;
      })
      .then((session) => {
        setAuthenticated(session.authenticated);
        setReady(true);
        if (session.authenticated) {
          void loadInbox();
          void loadFeaturedBook();
        }
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(cause instanceof Error ? cause.message : "Could not check the admin session.");
        setReady(true);
      });
    return () => controller.abort();
  }, [loadFeaturedBook, loadInbox]);

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
      setAuthenticated(true);
      setInboxLoaded(false);
      window.dispatchEvent(new Event("blog-admin-session-change"));
      await Promise.all([loadInbox(), loadFeaturedBook()]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign in.");
    }
  }

  async function saveFeaturedBook() {
    setBookSaving(true);
    setBookError("");
    setBookSaved(false);
    try {
      const response = await fetch("/api/admin/featured-book", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: featuredBookSlug }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save the featured book.");
      setBookSaved(true);
    } catch (cause) {
      setBookError(cause instanceof Error ? cause.message : "Could not save the featured book.");
    } finally {
      setBookSaving(false);
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
        <p className="mb-6 text-be-600 dark:text-zinc-400">Sign in to review stories and separate contact, volunteer, and partnership inquiries.</p>
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

  if (!inboxLoaded) {
    return (
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <h1 className="mb-3 text-3xl font-bold text-be-900 dark:text-white">Blog admin</h1>
        {inboxLoading ? (
          <p role="status" className="text-be-600 dark:text-zinc-400">Loading your inbox…</p>
        ) : (
          <div className="rounded-xl bg-white p-6 dark:bg-be-800">
            <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error || "Your inbox could not be loaded."}</p>
            <button onClick={() => void loadInbox()} className="mt-4 rounded-full bg-be-700 px-5 py-2 text-sm font-medium text-white hover:bg-be-900">Try again</button>
          </div>
        )}
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
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setTab(item.id)} className={`rounded-full px-4 py-2 text-sm ${tab === item.id ? "bg-be-700 text-white" : "bg-white text-be-700 dark:bg-be-800 dark:text-zinc-300"}`}>
            {item.label}
          </button>
        ))}
      </nav>

      {error && <p role="alert" className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</p>}

      {tab === "stories" && (
        <div className="space-y-5">
          <AdminNewStoryForm onCreated={() => void loadInbox()} />
          {stories.length === 0 && <p className="rounded-xl bg-white p-6 text-be-600 dark:bg-be-800 dark:text-zinc-300">No story submissions yet.</p>}
          {stories.map((story) => (
            <article key={story.id} className="rounded-2xl bg-white p-6 dark:bg-be-800">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-be-900 dark:text-white">{story.title}</h2>
                  <p className="mt-1 text-sm text-be-600 dark:text-zinc-400">{story.category} · {story.author_name}{story.author_email && <> · <a className="underline" href={`mailto:${story.author_email}`}>{story.author_email}</a></>}</p>
                </div>
                <span className="rounded-full bg-be-100 px-3 py-1 text-xs capitalize text-be-800 dark:bg-be-900 dark:text-zinc-200">{story.status}</span>
              </div>
              {(story.image_path || story.image_url) && (
                <Image
                  src={story.image_url || `/api/admin/stories/${story.id}/image`}
                  alt={`Photo submitted with ${story.title}`}
                  width={1200}
                  height={800}
                  unoptimized
                  className="mb-4 max-h-96 w-full max-w-2xl rounded-xl object-contain object-left"
                />
              )}
              <p className="mb-4 whitespace-pre-wrap text-be-700 dark:text-zinc-300">{story.content}</p>
              {story.attachment_path && <a className="mb-4 inline-flex text-sm font-medium text-be-700 underline underline-offset-2 hover:text-be-900 dark:text-be-300 dark:hover:text-white" href={`/api/admin/stories/${story.id}/attachment`} target="_blank" rel="noopener noreferrer">Download attached document</a>}
              <div className="flex flex-wrap gap-3 text-xs text-be-500">
                <span>Received {new Date(story.created_at).toLocaleString()}</span>
                <span>
                  {story.publication_permission
                    ? `Publication permission recorded${story.publication_permission_at ? ` ${new Date(story.publication_permission_at).toLocaleString()}` : ""}`
                    : "Publication permission not recorded"}
                </span>
                {story.status === "published" && <a className="underline" href={`/stories/${story.slug}`}>View published story</a>}
              </div>
              <AdminStoryEditor
                story={story as Story & EditableStory}
                availableStories={stories.filter((item) => item.status === "published" && item.slug !== story.slug).map(({ slug, title }) => ({ slug, title }))}
                onSaved={() => void loadInbox()}
              />
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

      {activeInquiryTab && (
        <div className="space-y-4">
          {activeInquiries.length === 0 && <p className="rounded-xl bg-white p-6 text-be-600 dark:bg-be-800 dark:text-zinc-300">{activeInquiryTab.emptyMessage}</p>}
          {activeInquiries.map((item) => <article key={item.id} className="rounded-xl bg-white p-6 dark:bg-be-800">
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

      {tab === "books" && (
        <div className="space-y-8">
        <div className="max-w-2xl rounded-2xl bg-white p-6 dark:bg-be-800">
          <h2 className="text-xl font-bold text-be-900 dark:text-white">Choose the homepage featured book</h2>
          <p className="mt-2 text-sm text-be-600 dark:text-zinc-400">This book will appear in the homepage feature section.</p>
          {bookLoading && !bookSettingLoaded ? (
            <p role="status" className="mt-5 text-sm text-be-600 dark:text-zinc-400">Loading books…</p>
          ) : bookSettingLoaded ? (
            <div className="mt-5 space-y-4">
              <label htmlFor="featured-book" className="block text-sm font-medium text-be-700 dark:text-zinc-300">Featured book</label>
              <select id="featured-book" value={featuredBookSlug} onChange={(event) => { setFeaturedBookSlug(event.target.value); setBookSaved(false); }} className="w-full rounded-md bg-be-50 px-4 py-3 text-be-900 outline-none ring-be-400 focus:ring-2 dark:bg-be-900 dark:text-white">
                {bookOptions.map((book) => <option key={book.slug} value={book.slug}>{book.title}</option>)}
              </select>
              <button onClick={() => void saveFeaturedBook()} disabled={bookSaving || !featuredBookSlug} className="rounded-full bg-be-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-be-900 disabled:cursor-wait disabled:opacity-60">
                {bookSaving ? "Saving…" : "Save featured book"}
              </button>
              {bookSaved && <p role="status" className="text-sm text-green-700 dark:text-green-300">Featured book saved.</p>}
            </div>
          ) : (
            <button onClick={() => void loadFeaturedBook()} className="mt-5 rounded-full bg-be-700 px-5 py-2 text-sm font-medium text-white hover:bg-be-900">Try again</button>
          )}
          {bookError && <p role="alert" className="mt-4 text-sm text-red-700 dark:text-red-300">{bookError}</p>}
        </div>
        <AdminBooksManager />
        </div>
      )}

      {tab === "comments" && <AdminCommentsPanel />}
    </section>
  );
}
