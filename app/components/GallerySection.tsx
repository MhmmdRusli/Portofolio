"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const GALLERY_ITEMS = [
  { id: 1, title: "Abstract Light", category: "Photography", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1 md:row-span-2" },
  { id: 2, title: "Neon Nights", category: "Digital Art", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: 3, title: "Geometric Flow", category: "3D Design", colSpan: "col-span-1", rowSpan: "row-span-1" },
  { id: 4, title: "Deep Space", category: "Illustration", colSpan: "col-span-1", rowSpan: "row-span-2" },
  { id: 5, title: "Minimalist Grid", category: "UI Concept", colSpan: "col-span-1 md:col-span-2", rowSpan: "row-span-1" },
  { id: 6, title: "Liquid Chrome", category: "Motion Graphics", colSpan: "col-span-1", rowSpan: "row-span-1" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.6, ease: "easeOut" as any },
  },
};

export default function GallerySection() {
  return (
    <section id="gallery" className="flex flex-col gap-12 py-24 lg:py-32">
      {/* ── Header ── */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4">
        <motion.span
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
          className="mb-4 font-mono text-sm font-semibold tracking-widest text-[var(--color-accent)]"
        >
          GALLERY
        </motion.span>
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
          className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          Visual Explorations
        </motion.h2>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}
          className="text-lg text-[var(--color-text-muted)] sm:text-xl"
        >
          A curated collection of design experiments, photography, and digital art.
        </motion.p>
      </div>

      {/* ── Masonry/Grid Layout ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[250px]"
      >
        {GALLERY_ITEMS.map((item) => {
          // Compute a dynamic gradient for placeholder visuals based on ID
          const hue = (item.id * 50) % 360;
          const bgGradient = `linear-gradient(135deg, hsl(${hue}, 40%, 15%), hsl(${(hue + 40) % 360}, 60%, 8%))`;

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.04] bg-[var(--color-bg-secondary)] ${item.colSpan} ${item.rowSpan}`}
            >
              {/* CSS Abstract Visual placeholder */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ background: bgGradient }}
              >
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex justify-between items-end">
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-[var(--color-accent)]">{item.category}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                  </div>
                  <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-[var(--color-accent)]">
                    <ArrowUpRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
