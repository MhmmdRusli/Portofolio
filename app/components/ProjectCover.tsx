import Image from "next/image";

/**
 * Shared project cover.
 *
 * Renders the real cover image when a project provides one, and otherwise
 * falls back to the abstract placeholder visual used by the Projects cards,
 * so the card and the detail page never diverge visually.
 *
 * The hover scale relies on an ancestor `.group` (provided by the card or
 * the detail page wrapper).
 */

interface ProjectCoverProps {
  /** Cover image path. When omitted, an abstract placeholder is shown. */
  src?: string;
  /** Meaningful alt text describing the project image. */
  alt: string;
  /** Responsive `sizes` hint passed to next/image. */
  sizes?: string;
  className?: string;
}

export default function ProjectCover({
  src,
  alt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className = "",
}: ProjectCoverProps) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[#1a1c3b] to-[#0c0f2e] ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        /* Abstract placeholder visual */
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center opacity-30 transition-transform duration-500 group-hover:scale-110"
        >
          <div className="h-24 w-24 rounded-lg border-2 border-[var(--color-accent)]/50 rotate-12" />
          <div className="absolute h-16 w-16 rounded-full bg-[var(--color-accent)] blur-2xl" />
        </div>
      )}
    </div>
  );
}
