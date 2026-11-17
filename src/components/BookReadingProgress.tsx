"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function storageKey(bookSlug: string) {
  return `beard-diapers-reading:${bookSlug}`;
}

export function RecordChapterProgress({ bookSlug, chapterNumber }: { bookSlug: string; chapterNumber: number }) {
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(bookSlug), String(chapterNumber));
    } catch {
      // Reading continues normally when browser storage is unavailable.
    }
  }, [bookSlug, chapterNumber]);
  return null;
}

export function ContinueReading({ bookSlug, firstChapter, totalChapters }: { bookSlug: string; firstChapter: number; totalChapters: number }) {
  const [lastRead, setLastRead] = useState<number | null>(null);

  useEffect(() => {
    let storedChapter: number | null = null;
    try {
      const stored = Number(window.localStorage.getItem(storageKey(bookSlug)));
      if (Number.isInteger(stored) && stored > 0 && stored <= totalChapters) storedChapter = stored;
    } catch {
      storedChapter = null;
    }
    const timer = window.setTimeout(() => setLastRead(storedChapter), 0);
    return () => window.clearTimeout(timer);
  }, [bookSlug, totalChapters]);

  const chapterNumber = lastRead ?? firstChapter;
  return (
    <Link
      href={`/books/${bookSlug}/day-${chapterNumber}`}
      className="inline-flex rounded-full border border-[color:var(--color-be-500)] px-5 py-2.5 text-sm font-semibold text-be-800 transition-colors hover:bg-be-100 dark:text-be-100 dark:hover:bg-be-800"
    >
      {lastRead ? `Continue Reading · Day ${lastRead}` : "Read From the Beginning"}
    </Link>
  );
}
