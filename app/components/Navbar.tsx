"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, User, Briefcase, Image, Mail, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "#home" },
  { label: "About", icon: User, href: "#about" },
  { label: "Portfolio", icon: Briefcase, href: "#portfolio" },
  { label: "Gallery", icon: Image, href: "#gallery" },
  { label: "Contact", icon: Mail, href: "#contact" },
] as const;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
    >
      {/* ── Desktop pill ── */}
      <div className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-[rgba(12,15,46,0.75)] px-2 py-1.5 shadow-lg shadow-black/30 backdrop-blur-xl">
        {NAV_ITEMS.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-200 hover:bg-white/[0.06] hover:text-white focus-visible:text-white"
          >
            <Icon size={16} strokeWidth={1.8} className="shrink-0" />
            <span>{label}</span>
          </a>
        ))}
      </div>

      {/* ── Mobile toggle ── */}
      <div className="flex md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="flex items-center justify-center rounded-full border border-white/[0.08] bg-[rgba(12,15,46,0.75)] p-3 shadow-lg shadow-black/30 backdrop-blur-xl transition-colors hover:bg-white/[0.06]"
        >
          {mobileOpen ? (
            <X size={20} className="text-white" />
          ) : (
            <Menu size={20} className="text-white" />
          )}
          <span className="sr-only">
            {mobileOpen ? "Close menu" : "Open menu"}
          </span>
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 mt-3 flex w-[200px] -translate-x-1/2 flex-col gap-1 rounded-2xl border border-white/[0.08] bg-[rgba(12,15,46,0.92)] p-2 shadow-xl shadow-black/40 backdrop-blur-xl md:hidden"
          >
            {NAV_ITEMS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
              >
                <Icon size={16} strokeWidth={1.8} />
                <span>{label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
