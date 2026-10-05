"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Starfield from "@/app/components/Starfield";

/* ═══════════════ KONFIGURASI ═══════════════ */

/** Progress 0 → 100% dalam 3 detik, tahan sebentar di 100%, lalu keluar. */
const PROGRESS_MS = 3000;
const HOLD_MS = 400;
const EXIT_MS = 600;

/** Versi ringkas untuk pengguna yang meminta prefers-reduced-motion. */
const REDUCED_MS = { progress: 900, hold: 120, exit: 220 };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Background onboarding 100% pekat.
 *
 * Lapisan paling bawah memakai warna SOLID (#03050e / #0c0f2e), bukan rgba
 * transparan — jadi tidak ada sedikit pun Home, Navbar, gambar, atau teks di
 * belakangnya yang bisa tembus lihat. Lapisan di atasnya hanya accent glow
 * supaya tetap terasa premium dan tidak monoton.
 */
const VEIL = {
  backgroundColor: "#03050e",
  backgroundImage: [
    "radial-gradient(ellipse 55% 45% at 50% 42%, rgba(60, 102, 229, 0.22) 0%, rgba(60, 102, 229, 0) 70%)",
    "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(12, 15, 46, 0.95) 0%, rgba(12, 15, 46, 0) 78%)",
    "linear-gradient(180deg, #03050e 0%, #0c0f2e 52%, #03050e 100%)",
  ].join(", "),
} as const;

/**
 * Ease-out hanya di awal, lalu linear. Kalau memakai ease-out penuh, angka
 * sudah membulat ke "100%" sekitar 500ms sebelum bar benar-benar penuh —
 * jadi waktu "berhenti di 100%" jadi jauh lebih lama dari yang diminta.
 */
const EASE_WINDOW = 0.35;

function easeProgress(elapsed: number) {
  if (elapsed >= EASE_WINDOW) return elapsed;

  return (1 - Math.pow(1 - elapsed / EASE_WINDOW, 2)) * EASE_WINDOW;
}

interface OnboardingProps {
  /** Dipanggil setelah exit animation selesai, lalu component di-unmount. */
  onDone: () => void;
}

/**
 * Layar pembuka full-screen.
 *
 * Tidak ada status yang disimpan di browser: component ini selalu mulai dari
 * nol setiap kali di-mount, jadi setiap muat ulang halaman `/` memutar
 * onboarding dari 0% lagi.
 */
export default function Onboarding({ onDone }: OnboardingProps) {
  const reduceMotion = useReducedMotion() === true;

  // Selalu mulai dari awal: 0%, belum exiting.
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  /* Progress dihitung dari rAF (bukan timer) supaya bar dan angka selalu
     sinkron dengan frame yang sama, termasuk saat tab sempat tersembunyi. */
  useEffect(() => {
    const duration = reduceMotion ? REDUCED_MS.progress : PROGRESS_MS;

    let frame = 0;
    let holdTimer = 0;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);

      // floor, bukan round: angka hanya menyentuh 100% di frame terakhir,
      // supaya tahan di 100% tepat selama HOLD_MS.
      setProgress(Math.floor(easeProgress(elapsed) * 100));

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      holdTimer = window.setTimeout(() => {
        setExiting(true);
      }, reduceMotion ? REDUCED_MS.hold : HOLD_MS);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(holdTimer);
    };
  }, [reduceMotion]);

  /* onDone baru dipanggil setelah exit animation selesai, supaya Home baru
     terlihat sesudah overlay benar-benar lenyap. */
  useEffect(() => {
    if (!exiting) return;

    const timer = window.setTimeout(
      onDone,
      reduceMotion ? REDUCED_MS.exit : EXIT_MS,
    );

    return () => window.clearTimeout(timer);
  }, [exiting, reduceMotion, onDone]);

  /* Kunci scroll selama onboarding aktif supaya Home tidak tergeser. */
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const enterDuration = reduceMotion ? 0 : 0.4;

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: enterDuration, ease: EASE },
    },
  };

  return (
    <motion.div
      style={VEIL}
      /* Overlay TIDAK pernah fade-in: sejak render server ia sudah pekat
         penuh, jadi Home tidak pernah terlihat—even sebelum hydration.
         Animasi masuk hanya dipakai untuk konten di dalamnya. */
      initial={false}
      animate={
        exiting
          ? { opacity: 0, scale: 0.98, y: -18 }
          : { opacity: 1, scale: 1, y: 0 }
      }
      transition={{
        duration: (exiting ? EXIT_MS : 400) / 1000,
        ease: EASE,
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
    >
      {/* Bintang sendiri, bukan milik Starfield di layout: diredupkan supaya
          tetap terasa tanpa menarik perhatian dari teks. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
      >
        <Starfield />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.07,
            },
          },
        }}
        className="relative z-10 w-full max-w-[420px] px-6"
      >
        {/* Judul */}
        <div className="text-center">
          <motion.p
            variants={fadeUp}
            className="text-[clamp(0.7rem,2.4vw,0.8rem)] font-bold uppercase tracking-[0.42em] text-[#a0a6c4]"
          >
            Welcome To My
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-3 bg-gradient-to-r from-[#f0f2ff] via-white to-[#8fb4ff] bg-clip-text text-[clamp(1.85rem,8vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-transparent"
          >
            Portfolio Website
          </motion.h1>
        </div>

        {/* Status + progress bar */}
        <motion.div
          variants={fadeUp}
          className="mt-12"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#a0a6c4] sm:text-[13px]">
              Loading
            </span>

            <span className="font-mono text-[15px] font-bold text-[#f0f2ff] tabular-nums sm:text-[17px]">
              {progress}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-label="Memuat portfolio"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="mt-3 h-[6px] w-full overflow-hidden rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/[0.06]"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#3c66e5] to-[#8fb4ff] shadow-[0_0_18px_-2px_rgba(60,102,229,0.85)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}