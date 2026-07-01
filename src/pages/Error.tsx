import { Link, useNavigate } from "react-router-dom";
import { House, ArrowLeft, SearchX } from "lucide-react";

export default function Error404Page() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 px-6">
      <div className="max-w-xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-sky-100 shadow-lg">
          <SearchX className="h-14 w-14 text-sky-600" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-black tracking-wider text-sky-600">404</h1>

        <h2 className="mt-3 text-3xl font-bold text-slate-800">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-slate-500">
          The page you are looking for might have been removed, renamed, or is
          temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            <House size={18} />
            Back to Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Decorative Text */}
        <p className="mt-12 text-sm text-slate-400">BoardGame Store © 2026</p>
      </div>
    </div>
  );
}
