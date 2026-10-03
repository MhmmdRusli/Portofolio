"use client";

import { motion } from "motion/react";
import { Play, SkipBack, SkipForward, Disc3 } from "lucide-react";

export default function DailyRotationWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="card relative flex w-full max-w-sm flex-col overflow-hidden p-1 sm:p-2"
    >
      {/* ── Background Glow ── */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[var(--color-accent-glow)] blur-3xl" />
      
      {/* ── Inner container ── */}
      <div className="relative flex h-full flex-col gap-4 rounded-xl bg-[var(--color-bg-secondary)] p-5 shadow-inner border border-white/[0.04]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)]">
            DAILY ROTATION
          </span>
          <Disc3 size={16} className="animate-[spin_4s_linear_infinite] text-[var(--color-accent)]" />
        </div>

        {/* Media Placeholder */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#1a1c3b] to-[#0c0f2e] shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Abstract visual */}
            <div className="h-16 w-16 rounded-full bg-[var(--color-accent)] opacity-20 blur-xl" />
            <div className="absolute h-12 w-12 rounded-full border-2 border-white/10" />
            <div className="absolute h-8 w-8 rounded-full border border-[var(--color-accent)]/50" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold leading-tight text-white">Placeholder Track</h3>
          <p className="text-sm text-[var(--color-text-muted)]">Placeholder Artist</p>
        </div>

        {/* Controls */}
        <div className="mt-2 flex items-center justify-between">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 bg-[var(--color-accent)] rounded-full" />
          </div>
          <span className="ml-3 text-xs font-medium text-[var(--color-text-muted)]">1:24 / 3:45</span>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-6">
          <button className="text-[var(--color-text-muted)] transition-colors hover:text-white">
            <SkipBack size={20} fill="currentColor" />
            <span className="sr-only">Previous</span>
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 active:scale-95">
            <Play size={20} fill="currentColor" className="ml-1" />
            <span className="sr-only">Play</span>
          </button>
          <button className="text-[var(--color-text-muted)] transition-colors hover:text-white">
            <SkipForward size={20} fill="currentColor" />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
