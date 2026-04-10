import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#06111f] text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-white/68 backdrop-blur-xl">
          Page Not Found
        </div>

        <h1 className="mt-8 text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
          This route doesn’t exist.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-white/66 sm:text-lg">
          The page you tried to open is unavailable. Return to discover verified free-value opportunities across the Bay Area.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.28)] transition hover:scale-[1.02]"
          >
            Go Home
          </Link>

          <Link
            href="/list"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white/88 backdrop-blur-xl transition hover:bg-white/10"
          >
            View Offers
          </Link>
        </div>
      </div>
    </main>
  );
}
