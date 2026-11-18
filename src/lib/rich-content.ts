import sanitizeHtml from "sanitize-html";

const allowedTags = ["p", "br", "h2", "h3", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "blockquote", "a", "img", "hr"];

export function sanitizeRichContent(content: string) {
  const html = /<[a-z][^>]*>/i.test(content)
    ? content
    : content.split(/\n\s*\n/).map((paragraph) => {
      const trimmed = paragraph.trim();
      const escaped = trimmed.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>");
      if (/^#{1,3}\s/.test(trimmed)) {
        const level = Math.min(3, Math.max(2, trimmed.match(/^#+/)?.[0].length || 2));
        return `<h${level}>${trimmed.replace(/^#{1,3}\s*/, "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</h${level}>`;
      }
      if (trimmed.split("\n").every((line) => /^[-*]\s/.test(line.trim()))) {
        return `<ul>${trimmed.split("\n").map((line) => `<li>${line.trim().replace(/^[-*]\s/, "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</li>`).join("")}</ul>`;
      }
      return `<p>${escaped}</p>`;
    }).join("");
  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes: { a: ["href", "name", "target", "rel"], img: ["src", "alt", "title"] },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true) },
  });
}

