import { Link } from "react-router-dom";
import data from "../data/posts.json";
import PostCard from "../components/PostCard";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const { posts, siteInfo, categories } = data;
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featured = sorted.find((post) => post.featured) ?? sorted[0];
  const latest = sorted.filter((post) => post.slug !== featured.slug).slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={featured.image} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f11]/70 via-[#0f0f11]/85 to-[#0f0f11]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="mb-4 inline-flex items-center rounded-full border border-[#f97316]/30 bg-[#f97316]/10 px-4 py-1 text-sm font-semibold text-[#f97316]">
            {siteInfo.tagline}
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            انظر إلى العالم بعدسة مختلفة
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">{siteInfo.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/blog"
              className="rounded-full bg-[#f97316] px-7 py-3 text-sm font-bold text-[#0f0f11] transition hover:bg-orange-400"
            >
              تصفح المقالات
            </Link>
            <Link
              to={`/blog/${featured.slug}`}
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-bold text-white transition hover:border-[#f97316] hover:text-[#f97316]"
            >
              اقرأ المقال المميز
            </Link>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/5 bg-[#18181c]/80 p-4 text-center">
              <p className="text-2xl font-extrabold text-[#f97316]">{posts.length}</p>
              <p className="mt-1 text-xs text-zinc-400">مقال متخصص</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#18181c]/80 p-4 text-center">
              <p className="text-2xl font-extrabold text-[#f97316]">{categories.length}</p>
              <p className="mt-1 text-xs text-zinc-400">أقسام رئيسية</p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-[#18181c]/80 p-4 text-center">
              <p className="text-2xl font-extrabold text-[#f97316]">{posts.filter((p) => p.featured).length}</p>
              <p className="mt-1 text-xs text-zinc-400">مقالات مميزة</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white">المقال المميز</h2>
        <p className="mt-2 mb-8 text-zinc-400">اختيار هيئة التحرير لهذا الأسبوع</p>

        <Link
          to={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-white/5 bg-[#18181c] lg:grid-cols-2"
        >
          <div className="relative min-h-[280px]">
            <img
              src={featured.image}
              alt={featured.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <span className="rounded-full bg-[#f97316]/15 px-3 py-1 text-xs font-semibold text-[#f97316]">
                {featured.category}
              </span>
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              <span>{featured.readTime}</span>
            </div>
            <h3 className="text-2xl font-extrabold leading-snug text-white transition group-hover:text-[#f97316] sm:text-3xl">
              {featured.title}
            </h3>
            <p className="leading-8 text-zinc-400">{featured.excerpt}</p>
            <div className="flex items-center gap-3 pt-2">
              <img src={featured.author.avatar} alt={featured.author.name} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <p className="font-semibold">{featured.author.name}</p>
                <p className="text-sm text-zinc-500">{featured.author.role}</p>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-white">أحدث المقالات</h2>
            <p className="mt-2 text-zinc-400">آخر ما نُشر في عالم التصوير الفوتوغرافي</p>
          </div>
          <Link to="/blog" className="text-sm font-bold text-[#f97316] hover:underline">
            عرض الكل
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-extrabold text-white">تصفح حسب القسم</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/blog?category=${encodeURIComponent(category.name)}`}
              className="rounded-full border border-white/10 bg-[#18181c] px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-[#f97316] hover:text-[#f97316]"
            >
              {category.name}
              <span className="ms-2 text-zinc-500">({category.count})</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
