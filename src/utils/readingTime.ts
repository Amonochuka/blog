"use client";

export function readingTime(text: string) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}