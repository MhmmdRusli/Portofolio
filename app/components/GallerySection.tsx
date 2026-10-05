"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ImagePlus } from "lucide-react";

/* ═══════════════ DATA — isi foto Anda di sini ═══════════════ */
// Taruh foto di /public/gallery/ lalu isi `src`, contoh: "/gallery/foto-1.jpg".
// `src` kosong = kartu placeholder. Tambah/kurangi item sesuka Anda
// (disarankan minimal 5 supaya efek coverflow terlihat penuh).
const GALLERY: { alt: string; src?: string }[] = [
  { alt: "Foto galeri 1" },
  { alt: "Foto galeri 2" },
  { alt: "Foto galeri 3" },
  { alt: "Foto galeri 4" },
  { alt: "Foto galeri 5" },
  { alt: "Foto galeri 6" },
  { alt: "Foto galeri 7" },
];

/* Posisi tiap kartu relatif terhadap kartu aktif (dalam % lebar kartu). */
const SLOT = {
  0: { x: 0, rotateY: 0, scale: 1, opacity: 1 },
  1: { x: 87, rotateY: 23, scale: 0.8, opacity: 1 },
  2: { x: 160, rotateY: 23, scale: 0.8, opacity: 1 },
} as const;

const SWIPE_THRESHOLD = 40; // px
const DRAG_TOLERANCE = 8; // px
const WHEEL_THRESHOLD = 50; // akumulasi delta scroll sebelum berpindah kartu

export default function GallerySection() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(Math.floor(GALLERY.length / 2));
  const startX = useRef<number | null>(null);
  const dragged = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(Math.floor(GALLERY.length / 2));
  const wheelAccum = useRef(0);
  const n = GALLERY.length;

  /** Satu pintu untuk memindahkan kartu: state + mirror ref selalu sinkron. */
  const applyActive = useCallback((index: number) => {
    const normalized = ((index % n) + n) % n;
    activeRef.current = normalized;
    setActive(normalized);
  }, [n]);

  const go = (index: number) => applyActive(index);
  const next = () => applyActive(activeRef.current + 1);
  const prev = () => applyActive(activeRef.current - 1);

  /** Selisih posisi melingkar: -n/2 … +n/2 */
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  // Scroll wheel / trackpad untuk menggeser galeri.
  // Selama kursor di atas panggung, scrolllocked ke galeri. Di ujung daftar
  // preventDefault() dilewati, jadi halaman tetap bisa digulir lewat galeri.
  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

      wheelAccum.current += delta;

      if (Math.abs(wheelAccum.current) < WHEEL_THRESHOLD) return;

      const step = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      const target = activeRef.current + step;

      // Sudah di ujung → biarkan halaman ikut bergulir.
      if (target < 0 || target > n - 1) return;

      event.preventDefault();
      applyActive(target);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      stage.removeEventListener("wheel", onWheel);
    };
  }, [applyActive, n]);

  return (
    <motion.section
      id="gallery"
      aria-roledescription="carousel"
      aria-label="Galeri foto"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }
      className="py-16 lg:py-24"
    >
      {/* Panggung selebar layar penuh */}
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            next();
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            prev();
          }
        }}
        onPointerDown={(e) => {
          startX.current = e.clientX;
          dragged.current = false;
        }}
        onPointerMove={(e) => {
          if (startX.current !== null && Math.abs(e.clientX - startX.current) > DRAG_TOLERANCE) {
            dragged.current = true;
          }
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (dx < -SWIPE_THRESHOLD) next();
          else if (dx > SWIPE_THRESHOLD) prev();
        }}
        onPointerCancel={() => {
          startX.current = null;
        }}
        className="relative left-1/2 w-screen -translate-x-1/2 cursor-grab touch-pan-y select-none overflow-hidden py-10 outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[#3c66e5]/60"
      >
        <div className="relative mx-auto aspect-square w-[min(350px,70vw)]">
          {GALLERY.map((item, i) => {
            const d = offsetOf(i);
            const abs = Math.abs(d);
            const sign = d < 0 ? -1 : 1;
            const slot = abs <= 2 ? SLOT[abs as 0 | 1 | 2] : null;

            return (
              <motion.div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} dari ${n}`}
                aria-hidden={abs > 2}
                onClick={() => {
                  if (dragged.current) return;
                  if (d !== 0) go(i);
                }}
                initial={false}
                animate={{
                  x: `${slot ? sign * slot.x : sign * 230}%`,
                  // kartu kiri miring ke kanan (+), kartu kanan miring ke kiri (-)
                  rotateY: slot ? -sign * Math.abs(slot.rotateY) * (abs === 0 ? 0 : 1) : 0,
                  scale: slot ? slot.scale : 0.8,
                  opacity: slot ? slot.opacity : 0,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 160, damping: 22, mass: 0.9 }
                }
                style={{
                  transformPerspective: 1000,
                  zIndex: 10 - abs,
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
                className={`absolute inset-0 overflow-hidden rounded-2xl bg-[#101527] ${
                  d !== 0 ? "cursor-pointer" : ""
                }`}
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="350px"
                    draggable={false}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-white/15 text-center">
                    <ImagePlus size={32} className="text-white/35" />
                    <p className="px-6 text-sm text-white/45">
                      Foto {i + 1}
                      <br />
                      (isi `src` di GallerySection.tsx)
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Titik navigasi */}
      <div className="mt-4 flex justify-center gap-2.5">
        {GALLERY.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Lihat foto ${i + 1}`}
            onClick={() => go(i)}
            aria-current={i === active ? "true" : undefined}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-white" : "w-2 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
}