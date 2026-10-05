"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons";

/* ═══════════════ DATA ═══════════════ */

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/MhmmdRusli", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-rusli-0389b4404/", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://instagram.com/_rsliilsr", Icon: InstagramIcon },
];

/* ═══════════════ ANIMASI SCROLL REVEAL ═══════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[var(--color-bg)] py-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-5 text-sm text-[var(--color-text-muted)] sm:px-8 lg:px-12"
      >
        <span className="whitespace-nowrap">
          &copy; {currentYear} Muhammad Rusli
        </span>

        {NAV.map(({ label, href }) => (
          <span key={href} className="flex items-center gap-4">
            <span aria-hidden="true" className="text-white/20">
              &middot;
            </span>
            <Link href={href} className="transition-colors hover:text-[var(--color-accent)]">
              {label}
            </Link>
          </span>
        ))}

        <span aria-hidden="true" className="text-white/20">
          &middot;
        </span>

        <ul className="flex items-center gap-4">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="block transition-colors hover:text-[var(--color-accent)]"
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </footer>
  );
}
