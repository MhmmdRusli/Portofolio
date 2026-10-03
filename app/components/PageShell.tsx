import { ReactNode } from "react";

/**
 * Page shell: provides consistent max-width, padding, and spacing
 * for all future page sections to render inside.
 */
interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export default function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <main
      className={`relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </main>
  );
}
