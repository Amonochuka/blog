"use client";

import { RichTextEditor } from "@/components/RichTextEditor";
import Image from "next/image";

export function EditorialPreview({
  category,
  title,
  subtitle,
  author,
  date,
  image,
  content,
}: {
  category?: string;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  image?: string | null;
  content: string;
}) {
  return (
    <article className="rounded-2xl border border-be-200 bg-white p-5 text-be-900 dark:border-be-700 dark:bg-be-800 dark:text-white sm:p-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-be-600 dark:text-be-300">Preview</p>
      {category && <p className="mb-3 inline-flex rounded-full bg-be-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-be-800 dark:bg-be-900 dark:text-be-100">{category}</p>}
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title || "Untitled"}</h2>
      {subtitle && <p className="mt-3 text-lg leading-relaxed text-be-700 dark:text-zinc-300">{subtitle}</p>}
      {(author || date) && <p className="mt-4 text-sm text-be-600 dark:text-zinc-400">{author}{author && date ? " · " : ""}{date}</p>}
      {image && <Image src={image} alt={title ? `Featured image for ${title}` : "Featured image preview"} width={1200} height={800} unoptimized className="mt-6 max-h-[32rem] w-full rounded-xl object-cover" />}
      <div className="mt-6"><RichTextEditor value={content} onChange={() => undefined} displayOnly minHeight={80} /></div>
    </article>
  );
}
