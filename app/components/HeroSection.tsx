"use client";

import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import DailyRotationWidget from "./DailyRotationWidget";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.5, ease: "easeOut" as any },
    },
  };

  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center py-10 lg:flex-row lg:justify-between lg:gap-12"
    >
      {/* ── Left Side: Hero Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex w-full flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2"
      >
        <motion.span
          variants={itemVariants}
          className="mb-4 font-mono text-sm font-semibold tracking-widest text-[var(--color-accent)]"
        >
          HELLO, I&apos;M
        </motion.span>
        
        <motion.h1
          variants={itemVariants}
          className="mb-2 text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Muhammad Rusli
        </motion.h1>
        
        <motion.h2
          variants={itemVariants}
          className="mb-6 text-2xl font-medium text-[var(--color-text-secondary)] sm:text-3xl lg:text-4xl"
        >
          Junior Full Stack <span className="text-white">Developer</span>
        </motion.h2>
        
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-xl text-lg text-[var(--color-text-muted)] sm:text-xl"
        >
          Junior Full Stack Developer who loves building modern web applications.
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
        >
          <a
            href="#portfolio"
            className="group flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 font-medium text-white transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent-glow)] active:scale-95"
          >
            View My Work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="group flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 font-medium text-white transition-all hover:bg-white/10 active:scale-95"
          >
            <Mail size={18} />
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* ── Right Side: Daily Rotation Widget ── */}
      <div className="mt-16 flex w-full justify-center lg:mt-0 lg:w-1/2 lg:justify-end">
        <DailyRotationWidget />
      </div>
    </section>
  );
}
