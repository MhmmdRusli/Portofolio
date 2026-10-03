import Link from "next/link";
import { Globe, AtSign, Briefcase, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[var(--color-bg)] pt-16 pb-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          
          {/* Brand & Description */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href="#home" className="text-xl font-bold text-white tracking-tight">
              Muhammad <span className="text-[var(--color-accent)]">Rusli</span>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xs">
              Junior Full Stack Developer who loves building modern web applications.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link href="#home" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]">Home</Link>
              <Link href="#about" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]">About</Link>
              <Link href="#portfolio" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]">Portfolio</Link>
              <Link href="#gallery" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]">Gallery</Link>
              <Link href="#contact" className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]">Contact</Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/MhmmdRusli" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]" aria-label="GitHub">
                <Globe size={20} />
              </a>
              <a href="https://instagram.com/_rsliilsr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]" aria-label="Instagram">
                <AtSign size={20} />
              </a>
              <a href="https://www.linkedin.com/in/muhammad-rusli-0389b4404/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]" aria-label="LinkedIn">
                <Briefcase size={20} />
              </a>
              <a href="mailto:mhmmdrusliii77@gmail.com" className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {currentYear} Muhammad Rusli. All rights reserved.
          </p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <a href="#" className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
