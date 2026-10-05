"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Contact", id: "contact" },
] as const;

/** Section id on the page → nav item it belongs to (Gallery lives under Portfolio). */
const SECTION_TO_NAV: Record<string, string> = {
  home: "home",
  about: "about",
  portfolio: "portfolio",
  gallery: "portfolio",
  contact: "contact",
};

function Mascot() {
  return (
    <motion.span
      layoutId="nav-mascot"
      transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
      aria-hidden="true"
      className="pointer-events-none absolute -top-[43px] -right-[18px] z-20 block h-9 w-9"
    >
      <span className="absolute inset-0 rounded-full bg-white" />
      <span className="absolute -bottom-[2px] left-[3px] h-[11px] w-[11px] rotate-45 bg-white" />
      <span className="absolute left-[10px] top-[13px] h-[5px] w-[5px] rounded-full bg-[#0a0a14]" />
      <span className="absolute right-[10px] top-[13px] h-[5px] w-[5px] rounded-full bg-[#0a0a14]" />
      <span className="absolute left-[5px] top-[19px] h-[4px] w-[6px] rounded-full bg-pink-300/80" />
      <span className="absolute right-[5px] top-[19px] h-[4px] w-[6px] rounded-full bg-pink-300/80" />
      <span className="absolute left-[14px] top-[20px] h-[5px] w-[8px] rounded-b-full border-b-2 border-[#0a0a14]" />
    </motion.span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  // Scroll-spy: the last section whose top has passed ~35% of the viewport is "active".
  useEffect(() => {
    const ids = Object.keys(SECTION_TO_NAV);
    const onScroll = () => {
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = SECTION_TO_NAV[id];
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sembunyikan navbar di halaman detail project (/projects/...)
  if (pathname.startsWith("/projects")) return null;

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2 md:top-[38px]"
    >
      {/* ── Desktop pill ── */}
      <div className="hidden items-center gap-2.5 rounded-full border border-white/[0.06] bg-[#111624]/80 p-2 backdrop-blur-xl md:flex">
        {NAV_ITEMS.map(({ label, id }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "true" : undefined}
              className={`relative rounded-full px-5 py-3 text-base font-bold leading-[18px] transition-colors duration-200 ${
                isActive ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {isActive && (
                <>
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    className="absolute inset-0 rounded-full bg-[#172036]"
                  />
                  <Mascot />
                </>
              )}
              <span className="relative z-10">{label}</span>
            </a>
          );
        })}
      </div>

      {/* ── Mobile toggle ── */}
      <div className="flex md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="flex items-center justify-center rounded-full border border-white/[0.06] bg-[#111624]/80 p-3 backdrop-blur-xl transition-colors hover:bg-white/[0.06]"
        >
          {mobileOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 mt-3 flex w-[220px] -translate-x-1/2 flex-col gap-1 rounded-2xl border border-white/[0.06] bg-[#111624]/95 p-2 backdrop-blur-xl md:hidden"
          >
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                  active === id ? "bg-[#172036] text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}