import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import PageShell from "@/app/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center gap-6 py-32 text-center lg:py-40">
        <span className="font-mono text-sm font-semibold tracking-widest text-[var(--color-accent)]">
          404
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Project not found
        </h1>

        <p className="max-w-md text-[var(--color-text-muted)]">
          The project you are looking for does not exist or may have been
          moved.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_15px_var(--color-accent-glow)] transition-[background-color,box-shadow] duration-200 hover:bg-[var(--color-accent-hover)] hover:shadow-[0_0_22px_var(--color-accent-glow)]"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Back to Projects
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[var(--color-bg-card)] px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,border-color] duration-200 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-bg-card-hover)]"
          >
            <Home size={16} strokeWidth={2} />
            Go to Homepage
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
