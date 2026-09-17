import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import data from "../data/posts.json";
import PostCard from "../components/PostCard";

const PAGE_SIZE = 6;

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "الكل");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  const categories = ["الكل", ...data.categories.map((item) => item.name)];

  useEffect(() => {
    setCategory(searchParams.get("category") || "الكل");
    setPage(1);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return [...data.posts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((post) => {
        const matchesCategory = category === "الكل" || post.category === category;
        const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")} ${post.author.name}`.toLowerCase();
        return matchesCategory && (!term || haystack.includes(term));
      });
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const applyCategory = (name) => {
    setCategory(name);
    setPage(1);
    setSearchParams(name === "الكل" ? {} : { category: name });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white">المدونة</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          ابحث في المقالات، صفِّ حسب القسم، وبدّل بين عرض الشبكة والقائمة. نعرض 6 مقالات في كل صفحة.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="ابحث عن مقال، تقنية، أو كاتب..."
            className="w-full rounded-2xl border border-white/10 bg-[#18181c] px-12 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-[#f97316]/40"
          />
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3-3" />
          </svg>
        </div>

        <div className="flex items-center gap-2 self-start rounded-2xl border border-white/10 bg-[#18181c] p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              view === "grid" ? "bg-[#f97316] text-[#0f0f11]" : "text-zinc-300 hover:text-white"
            }`}
          >
            شبكة
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              view === "list" ? "bg-[#f97316] text-[#0f0f11]" : "text-zinc-300 hover:text-white"
            }`}
          >
            قائمة
          </button>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => applyCategory(name)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              category === name
                ? "bg-[#f97316] text-[#0f0f11]"
                : "border border-white/10 bg-[#18181c] text-zinc-300 hover:border-[#f97316] hover:text-[#f97316]"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm text-zinc-500">
        {filtered.length === 0 ? "لا توجد نتائج مطابقة" : `${filtered.length} مقالة`}
      </p>

      {pageItems.length === 0 ? (
        <div className="rounded-3xl border border-white/5 bg-[#18181c] px-6 py-16 text-center">
          <p className="text-lg font-bold text-white">لم نعثر على مقالات</p>
          <p className="mt-2 text-zinc-400">جرّب كلمات بحث مختلفة أو اختر قسماً آخر.</p>
        </div>
      ) : (
        <div className={view === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-5"}>
          {pageItems.map((post) => (
            <PostCard key={post.id} post={post} layout={view} />
          ))}
        </div>
      )}

      {filtered.length > PAGE_SIZE && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-300 disabled:opacity-40"
          >
            السابق
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => setPage(number)}
              className={`h-10 w-10 rounded-xl text-sm font-bold ${
                number === currentPage ? "bg-[#f97316] text-[#0f0f11]" : "border border-white/10 text-zinc-300"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-300 disabled:opacity-40"
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}
