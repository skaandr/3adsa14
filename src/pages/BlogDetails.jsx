import { Link, useParams } from "react-router-dom";
import data from "../data/posts.json";
import PostCard from "../components/PostCard";
import NotFound from "./NotFound";

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

function parseContent(content) {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) =>
      line.startsWith("## ")
        ? { type: "heading", text: line.replace(/^##\s+/, ""), key: index }
        : { type: "paragraph", text: line, key: index }
    );
}

export default function BlogDetails() {
  const { slug } = useParams();
  const post = data.posts.find((item) => item.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const related = data.posts.filter((item) => item.category === post.category && item.slug !== post.slug).slice(0, 3);
  const blocks = parseContent(post.content);
  const categoryClass = categoryStyles[post.category] ?? "bg-zinc-500/15 text-zinc-300 ring-1 ring-zinc-500/30";

  return (
    <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-sm text-zinc-500">
        <Link to="/" className="hover:text-[#f97316]">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-[#f97316]">
          المدونة
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-300">{post.title}</span>
      </div>

      <header className="mx-auto max-w-3xl">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${categoryClass}`}>{post.category}</span>
        <h1 className="mt-4 text-3xl font-extrabold leading-snug text-white sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-zinc-400">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <img src={post.author.avatar} alt={post.author.name} className="h-12 w-12 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-white">{post.author.name}</p>
            <p className="text-sm text-zinc-500">{post.author.role}</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <time dateTime={post.date} className="text-sm text-zinc-400">
            {formatDate(post.date)}
          </time>
          <span className="text-sm text-zinc-400">{post.readTime}</span>
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-white/5">
        <img src={post.image} alt={post.title} className="h-[420px] w-full object-cover" />
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-6">
        {blocks.map((block) =>
          block.type === "heading" ? (
            <h2 key={block.key} className="pt-4 text-2xl font-extrabold text-white">
              {block.text}
            </h2>
          ) : (
            <p key={block.key} className="text-lg leading-9 text-zinc-300">
              {block.text}
            </p>
          )
        )}

        <div className="flex flex-wrap gap-2 pt-4">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-[#18181c] px-3 py-1 text-xs text-zinc-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-extrabold text-white">مقالات ذات صلة</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
