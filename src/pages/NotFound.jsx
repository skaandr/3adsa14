import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-7xl font-extrabold text-[#f97316]">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-white">الصفحة غير موجودة</h1>
      <p className="mt-3 max-w-md text-zinc-400">
        يبدو أن الرابط الذي اتبعته لا يؤدي إلى أي مقال أو صفحة داخل عدسة. تحقق من العنوان أو عد إلى الصفحة الرئيسية.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-[#f97316] px-6 py-3 text-sm font-bold text-[#0f0f11] transition hover:bg-orange-400"
        >
          العودة للرئيسية
        </Link>
        <Link
          to="/blog"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:border-[#f97316] hover:text-[#f97316]"
        >
          تصفح المدونة
        </Link>
      </div>
    </div>
  );
}
