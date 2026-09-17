import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import data from "../data/posts.json";

const links = [
  { to: "/", label: "الرئيسية", end: true },
  { to: "/blog", label: "المدونة", end: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { siteInfo } = data;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0f0f11]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f97316]/15 ring-1 ring-[#f97316]/40">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3.2" />
              <circle cx="12" cy="12" r="8" />
            </svg>
          </span>
          <span>
            <span className="block text-lg font-extrabold leading-none text-white">{siteInfo.name}</span>
            <span className="text-xs text-zinc-400">{siteInfo.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `text-sm font-semibold transition ${isActive ? "text-[#f97316]" : "text-zinc-300 hover:text-white"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/blog"
            className="rounded-full bg-[#f97316] px-5 py-2 text-sm font-bold text-[#0f0f11] transition hover:bg-orange-400"
          >
            استكشف المقالات
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-[#18181c] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive ? "bg-[#f97316]/15 text-[#f97316]" : "text-zinc-200 hover:bg-white/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
