import { Link } from "react-router-dom";
import data from "../data/posts.json";

export default function Footer() {
  const { siteInfo, categories } = data;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/5 bg-[#18181c]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f97316]/15 ring-1 ring-[#f97316]/40">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3.2" />
                <circle cx="12" cy="12" r="8" />
              </svg>
            </span>
            <span className="text-xl font-extrabold text-white">{siteInfo.name}</span>
          </div>
          <p className="max-w-sm text-sm leading-7 text-zinc-400">{siteInfo.description}</p>
          <a href={`mailto:${siteInfo.email}`} className="mt-4 inline-block text-sm text-[#f97316] hover:underline">
            {siteInfo.email}
          </a>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">تصفح</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li>
              <Link to="/" className="hover:text-[#f97316]">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-[#f97316]">
                جميع المقالات
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.name}>
                <Link to={`/blog?category=${encodeURIComponent(category.name)}`} className="hover:text-[#f97316]">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">تابعنا</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li>
              <a href={siteInfo.social.twitter} target="_blank" rel="noreferrer" className="hover:text-[#f97316]">
                تويتر
              </a>
            </li>
            <li>
              <a href={siteInfo.social.youtube} target="_blank" rel="noreferrer" className="hover:text-[#f97316]">
                يوتيوب
              </a>
            </li>
            <li>
              <a href={siteInfo.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#f97316]">
                لينكدإن
              </a>
            </li>
            <li>
              <a href={siteInfo.social.github} target="_blank" rel="noreferrer" className="hover:text-[#f97316]">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-zinc-500">
        © {year} {siteInfo.name} — {siteInfo.tagline}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
