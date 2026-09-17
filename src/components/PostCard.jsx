import { Link } from "react-router-dom";

const categoryStyles = {
  إضاءة: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
  بورتريه: "bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/30",
  "مناظر طبيعية": "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30",
  تقنيات: "bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30",
  معدات: "bg-teal-500/15 text-teal-400 ring-1 ring-teal-500/30",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function categoryClass(category) {
  return categoryStyles[category] ?? "bg-zinc-500/15 text-zinc-300 ring-1 ring-zinc-500/30";
}

export default function PostCard({ post, layout = "grid" }) {
  if (layout === "list") {
    return (
      <article className="group overflow-hidden rounded-2xl border border-white/5 bg-[#18181c] transition hover:border-[#f97316]/40">
        <Link to={`/blog/${post.slug}`} className="flex flex-col sm:flex-row">
          <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:w-72">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${categoryClass(post.category)}`}>
                {post.category}
              </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold leading-snug text-white transition group-hover:text-[#f97316]">{post.title}</h3>
            <p className="line-clamp-2 text-sm leading-7 text-zinc-400">{post.excerpt}</p>
            <div className="mt-auto flex items-center gap-3 pt-2">
              <img src={post.author.avatar} alt={post.author.name} className="h-9 w-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-zinc-200">{post.author.name}</p>
                <p className="text-xs text-zinc-500">{post.author.role}</p>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#18181c] transition hover:border-[#f97316]/40">
      <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium backdrop-blur ${categoryClass(post.category)}`}
          >
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="text-lg font-bold leading-snug text-white transition group-hover:text-[#f97316]">{post.title}</h3>
          <p className="line-clamp-3 flex-1 text-sm leading-7 text-zinc-400">{post.excerpt}</p>
          <div className="mt-2 flex items-center gap-3 border-t border-white/5 pt-4">
            <img src={post.author.avatar} alt={post.author.name} className="h-8 w-8 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-zinc-200">{post.author.name}</p>
              <p className="text-xs text-zinc-500">{post.author.role}</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
