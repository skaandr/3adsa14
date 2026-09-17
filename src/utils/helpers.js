export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const categoryStyles = {
  إضاءة: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  بورتريه: "bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/30",
  "مناظر طبيعية": "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30",
  تقنيات: "bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30",
  معدات: "bg-teal-500/15 text-teal-400 ring-1 ring-teal-500/30",
};

export function getCategoryClass(category) {
  return categoryStyles[category] ?? "bg-zinc-500/15 text-zinc-300 ring-1 ring-zinc-500/30";
}

export function parseContent(content) {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      if (line.startsWith("## ")) {
        return { type: "heading", text: line.replace(/^##\s+/, ""), key: index };
      }
      return { type: "paragraph", text: line, key: index };
    });
}
