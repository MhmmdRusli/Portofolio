"use client";

import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";

import DailyRotationWidget from "./DailyRotationWidget";
import TypingText from "./TypingText";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons";

const ROLES = [
  "Junior Full Stack Developer",
  "Web Developer",
  "Laravel Developer",
  "React Developer",
] as const;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/MhmmdRusli", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-rusli-0389b4404/", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://instagram.com/_rsliilsr", Icon: InstagramIcon },
];

export default function HeroSection() {
  return (
    <section id="home" className="flex min-h-screen items-center pb-10 pt-28">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-14 lg:flex-row lg:items-center lg:justify-between">
        {/* ── Left: text ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1"
        >
          <h1 className="text-[clamp(2.75rem,5.6vw,4.5rem)] font-bold leading-[1.07]">
            <span className="block text-[var(--color-accent)]">Turning Ideas</span>
            <span className="block text-white">Into Reality</span>
          </h1>

          <TypingText
            words={ROLES}
            className="mt-5 font-mono text-lg tracking-wide text-[#dce6fa]"
          />

          <p className="mt-8 max-w-[480px] text-lg leading-[1.55] text-[#c9cfe3]">
            Dimulai dari rasa penasaran, berkembang menjadi passion. Aku
            membangun pengalaman digital yang tidak hanya terlihat bagus, tapi
            juga terasa bermakna bagi penggunanya.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 text-base font-bold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Project
              <ExternalLink size={16} strokeWidth={1.8} />
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 px-5 text-base font-bold text-white transition-colors hover:bg-white/5"
            >
              Contact Me
              <ArrowRight size={16} strokeWidth={1.8} />
            </a>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <span className="font-mono text-xs tracking-wider text-[#70a3f4]">FIND ME</span>
            <ul className="flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] bg-[#090b13] text-[#70a3f4] transition-colors hover:border-[var(--color-accent)]/60 hover:text-white"
                  >
                    <Icon size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Right: Daily Rotation ── */}
        <div className="flex w-full justify-center lg:w-[45%] lg:max-w-[560px] lg:justify-end">
          <DailyRotationWidget />
        </div>
      </div>
    </section>
  );
}
