"use client";

import { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

export function toRichHtml(content: string) {
  const trimmed = content.trim();
  if (!trimmed) return "<p></p>";
  if (/^<[a-z][^>]*>/i.test(trimmed)) return trimmed;
  return trimmed.split(/\n\s*\n/).map((paragraph) => {
    const text = paragraph.trim();
    const heading = text.match(/^(#{1,3})\s+([\s\S]+)$/);
    if (heading) {
      const level = Math.min(3, Math.max(2, heading[1].length));
      return `<h${level}>${escapeHtml(heading[2])}</h${level}>`;
    }
    if (text.split("\n").every((line) => /^[-*]\s/.test(line.trim()))) {
      return `<ul>${text.split("\n").map((line) => `<li>${escapeHtml(line.trim().replace(/^[-*]\s/, ""))}</li>`).join("")}</ul>`;
    }
    return `<p>${escapeHtml(text).replaceAll("\n", "<br>")}</p>`;
  }).join("");
}

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  minHeight?: number;
};

export function RichTextEditor({ value, onChange, minHeight = 280 }: RichTextEditorProps) {
  const [preview, setPreview] = useState(false);
  const [imageMessage, setImageMessage] = useState("");
  const [, refreshToolbar] = useState(0);
  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [2, 3] } }), Image.configure({ allowBase64: false })],
    content: toRichHtml(value),
    immediatelyRender: false,
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
    onSelectionUpdate: () => refreshToolbar((value) => value + 1),
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== toRichHtml(value)) editor.commands.setContent(toRichHtml(value), { emitUpdate: false });
  }, [editor, value]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const current = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter a web address for this link", current || "https://");
    if (url === null) return;
    if (!url.trim()) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().setLink({ href: url.trim() }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Paste an HTTPS image address or a site image path");
    if (!url?.trim()) return;
    if (!url.startsWith("https://") && !url.startsWith("/")) {
      window.alert("Use an HTTPS image address or a path beginning with /.");
      return;
    }
    const alt = window.prompt("Describe the image for readers who use a screen reader", "") || "";
    editor.chain().focus().insertContent(`<img src="${url.trim().replaceAll('"', "&quot;")}" alt="${alt.replaceAll('"', "&quot;")}" />`).run();
  }, [editor]);

  if (!editor) return <div className="min-h-64 animate-pulse rounded-md bg-be-50 dark:bg-be-900" />;

  const buttonClass = "rounded border border-be-200 px-2.5 py-1.5 text-xs font-semibold text-be-800 hover:bg-be-100 disabled:opacity-40 dark:border-be-700 dark:text-zinc-200 dark:hover:bg-be-800";
  const run = (action: () => void) => { action(); refreshToolbar((value) => value + 1); };

  return (
    <div className="overflow-hidden rounded-lg border border-be-200 dark:border-be-700">
      <div className="flex flex-wrap items-center gap-2 border-b border-be-200 bg-be-50 p-2 dark:border-be-700 dark:bg-be-900" aria-label="Text formatting">
        <button type="button" className={buttonClass} aria-pressed={editor.isActive("bold")} onClick={() => run(() => editor.chain().focus().toggleBold().run())}>Bold</button>
        <button type="button" className={buttonClass} aria-pressed={editor.isActive("italic")} onClick={() => run(() => editor.chain().focus().toggleItalic().run())}>Italic</button>
        <button type="button" className={buttonClass} aria-pressed={editor.isActive("heading", { level: 2 })} onClick={() => run(() => editor.chain().focus().toggleHeading({ level: 2 }).run())}>Heading</button>
        <button type="button" className={buttonClass} aria-pressed={editor.isActive("bulletList")} onClick={() => run(() => editor.chain().focus().toggleBulletList().run())}>Bullets</button>
        <button type="button" className={buttonClass} aria-pressed={editor.isActive("orderedList")} onClick={() => run(() => editor.chain().focus().toggleOrderedList().run())}>Numbered list</button>
        <button type="button" className={buttonClass} aria-pressed={editor.isActive("blockquote")} onClick={() => run(() => editor.chain().focus().toggleBlockquote().run())}>Quote</button>
        <button type="button" className={buttonClass} onClick={() => run(addLink)}>Link</button>
        <button type="button" className={buttonClass} onClick={() => run(addImage)}>Image</button>
        <label className={`${buttonClass} cursor-pointer`}>Upload image
          <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={preview} onChange={async (event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (!file || !editor) return;
            setImageMessage("Uploading image…");
            try {
              const form = new FormData();
              form.set("image", file);
              const response = await fetch("/api/admin/content-images", { method: "POST", body: form });
              const data = await response.json();
              if (!response.ok) throw new Error(data.error || "Could not upload the image.");
              const alt = window.prompt("Describe the image for readers who use a screen reader", "") || "";
              editor.chain().focus().setImage({ src: data.imageUrl, alt }).run();
              setImageMessage("Image added to this story or chapter.");
            } catch (error) {
              setImageMessage(error instanceof Error ? error.message : "Could not upload the image.");
            }
          }} />
        </label>
        <button type="button" className={`${buttonClass} ml-auto`} aria-pressed={preview} onClick={() => setPreview((current) => { editor.setEditable(current); return !current; })}>{preview ? "Back to editing" : "Preview"}</button>
      </div>
      <EditorContent editor={editor} className={`rich-editor-content ${preview ? "rich-editor-preview" : ""}`} style={{ minHeight }} />
      <p className="border-t border-be-200 px-3 py-2 text-xs text-be-500 dark:border-be-700 dark:text-zinc-400">Format text, add headings, lists, quotes, links, or upload an image. Use Preview to read the result. {imageMessage}</p>
    </div>
  );
}
