"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

/**
 * A simple placeholder area for a mascot or avatar icon.
 * Displays a generic icon inside a soft-glowing circle.
 * Does NOT replicate any specific mascot from references.
 */
export default function MascotPlaceholder() {
  return (
    <div className="flex items-center justify-center pt-28 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.08] bg-[var(--color-bg-card)] shadow-lg shadow-[var(--color-accent-glow)]"
      >
        {/* Glow ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
          }}
        />
        <Sparkles
          size={32}
          className="relative text-[var(--color-accent)]"
          strokeWidth={1.5}
        />
      </motion.div>
    </div>
  );
}
