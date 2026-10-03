import MascotPlaceholder from "@/app/components/MascotPlaceholder";
import PageShell from "@/app/components/PageShell";

export default function Home() {
  return (
    <PageShell className="py-8">
      <MascotPlaceholder />

      {/* Future sections (Hero, About, Portfolio, etc.) will go here */}
      <section className="flex flex-col items-center justify-center py-32 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-[var(--color-text-primary)]">
            Phase 1 Foundation
          </span>
        </h1>
        <p className="mt-4 max-w-lg text-lg text-[var(--color-text-secondary)]">
          Design system, starfield, navbar, and page shell are ready.
          <br />
          Sections will be built in the next phase.
        </p>
        <div className="mt-8 h-px w-24 bg-[var(--color-accent)]" />
      </section>
    </PageShell>
  );
}
