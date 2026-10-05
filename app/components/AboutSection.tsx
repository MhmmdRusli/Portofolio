"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Award,
  Code,
  FileText,
  ImagePlus,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { PROJECTS } from "@/app/data/projects";
import { CERTIFICATES } from "@/app/data/portfolio";

/* ═══════════════ DATA — ganti dengan data asli Anda ═══════════════ */

// Foto cutout (PNG transparan). Taruh di /public, contoh: "/about/foto.png".
const PHOTO_SRC = "/about/rusli-about.png";

// Versi Spider-Man untuk efek hover. File HARUS ada di /public/about dengan
// resolusi, rasio, dan posisi subjek identik dengan foto normal (409x610, PNG
// dengan alpha) supaya crossfade-nya pas dan tidak ada yang bergeser.
const PHOTO_SPIDER_SRC = "/about/rusli-about-spider.png";

// Resume. Taruh PDF di /public, contoh: "/resume.pdf". Kosong = tombol nonaktif.
const RESUME_URL = "";

const TECHNOLOGIES_COUNT = new Set(
  PROJECTS.flatMap((project) => project.technologies ?? []),
).size;

/* ═══════════════ ANIMASI SCROLL REVEAL ═══════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, margin: "-100px" } as const;

/** Arah masuk elemen: dari bawah, dari kiri, atau dari kanan. */
const OFFSET = {
  bottom: { x: 0, y: 32 },
  left: { x: -44, y: 20 },
  right: { x: 44, y: 20 },
} as const;

type RevealFrom = keyof typeof OFFSET;

/** Fade + geser sesuai arah + scale subtle, dipakai anak stagger container. */
const revealItem = (from: RevealFrom) => ({
  hidden: { opacity: 0, ...OFFSET[from], scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
});

const fromBottom = revealItem("bottom");
const fromLeft = revealItem("left");
const fromRight = revealItem("right");

const REVEAL_BY_DIRECTION = {
  bottom: fromBottom,
  left: fromLeft,
  right: fromRight,
};

/** Container yang memstaggering anak-anaknya secara berurutan. */
const stagger = (step: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: step } },
});

interface TimelineEntry {
  title: string;
  subtitle: string;
  period: string;
  logo?: string;
  logoClassName?: string;
  badge?: string;
}

const EDUCATION: TimelineEntry[] = [
  {
    title: "SMK Amaliah 1 & 2 Ciawi Bogor",
    subtitle: "Pengembangan Perangkat Lunak dan Gim",
    period: "2024 – Present",
    logo: "/logos/smk-amaliah.webp",
  },
];

const EXPERIENCE: TimelineEntry[] = [
  {
    title: "Seven Inc",
    subtitle: "Full Stack Developer",
    period: "Juli – Oktober 2026",
    logo: "/logos/seven-inc.png",
    logoClassName: "object-contain p-0",
    badge: "Magang",
  },
];

/* ═══════════════ KOMPONEN KECIL ═══════════════ */

function Logo({
  src,
  imgClassName = "object-contain p-0.5",
}: {
  src?: string;
  imgClassName?: string;
}) {
  return (
    <div className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="50px"
          className={imgClassName}
        />
      ) : null}
    </div>
  );
}

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  return (
    <motion.div
      variants={fromBottom}
      className="flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-[#0b0f1d] px-6 py-5"
    >
      <Logo
        src={entry.logo}
        imgClassName={entry.logoClassName}
      />

      <div className="min-w-0">
        <h4 className="text-[17px] font-bold leading-snug text-white">
          {entry.title}
        </h4>

        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          <p className="text-[15px] text-white/70">
            {entry.subtitle}
          </p>

          {entry.badge ? (
            <span className="rounded-full border border-[#3c66e5]/45 bg-[#3c66e5]/15 px-2 py-[3px] text-[11px] font-bold uppercase tracking-wider text-[#8fb4ff]">
              {entry.badge}
            </span>
          ) : null}
        </div>

        <p className="mt-1.5 text-[15px] text-[#8fb4ff]">
          {entry.period}
        </p>
      </div>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  caption,
  href,
  delay,
  from,
}: {
  icon: LucideIcon;
  value: number;
  label: string;
  caption: string;
  href: string;
  delay: string;
  from: RevealFrom;
}) {
  return (
    <motion.a
      href={href}
      style={{ animationDelay: delay }}
      variants={REVEAL_BY_DIRECTION[from]}
      className="stat-card group flex h-[150px] flex-col justify-between rounded-2xl p-5"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#111a33]">
          <Icon
            size={20}
            className="text-white"
          />
        </div>

        <span className="text-[44px] font-extrabold leading-none text-white">
          {value}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-[13px] font-bold tracking-[0.14em] text-white/80">
            {label}
          </p>

          <p className="mt-1 text-[14px] text-white/60">
            {caption}
          </p>
        </div>

        <ArrowUpRight
          size={16}
          className="text-white/50 transition-colors group-hover:text-white"
        />
      </div>
    </motion.a>
  );
}

/* ═══════════════ SECTION ═══════════════ */

export default function AboutSection() {
  // Layer Spider-Man hanya considered "siap" setelah file-nya benar-benar
  // termuat, supaya foto normal tidak ikut hilang saat hover kalau file belum ada.
  const [spiderReady, setSpiderReady] = useState(false);
  const [spiderFailed, setSpiderFailed] = useState(false);
  const [spiderShown, setSpiderShown] = useState(false);

  // Desktop pakai hover, jadi klik tetikus diabaikan agar tidak "nyangkut".
  // Di layar sentuh (dan untuk keyboard) ketuk/Enter yang menampilkan kostum.
  const toggleSpider = () => {
    const finePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (finePointer) return;

    setSpiderShown((v) => !v);
  };

  return (
    <section
      id="about"
      className="overflow-x-clip py-24 lg:py-32"
    >
      {/* Judul */}
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={fromBottom}
        className="text-center text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-none tracking-tight text-[#eef0ff]"
      >
        About Me
      </motion.h2>

      {/* Hero About: 3 kolom */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.12)}
        className="mt-16 grid grid-cols-1 items-end gap-10 lg:mt-24 lg:grid-cols-[1fr_minmax(260px,330px)_1fr] lg:gap-8"
      >
        {/* Kiri: sapaan + resume */}
        <motion.div
          variants={fromLeft}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <h3 className="text-[clamp(2.5rem,4.6vw,4rem)] font-extrabold leading-[1.05]">
            <span className="block text-[#3c66e5]">
              Hi, I&apos;m
            </span>

            <span className="block bg-gradient-to-r from-white to-[#8a8a8a] bg-clip-text text-transparent">
              Muhammad
            </span>

            <span className="block bg-gradient-to-r from-white to-[#8a8a8a] bg-clip-text text-transparent">
              Rusli
            </span>
          </h3>

          <a
            href={RESUME_URL || undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!RESUME_URL}
            className={`mt-8 inline-flex items-center gap-2.5 rounded-xl bg-[#3c66e5] px-6 py-3 text-[17px] font-bold text-white ${
              RESUME_URL
                ? "hover:bg-[#4a73ee]"
                : "pointer-events-none opacity-60"
            }`}
          >
            <FileText size={18} />
            View Resume
          </a>
        </motion.div>

        {/* Tengah: foto */}
        <motion.div
          variants={fromBottom}
          className="order-1 mx-auto w-full max-w-[330px] lg:order-2"
        >
          {PHOTO_SRC ? (
            <div
              role="button"
              tabIndex={0}
              aria-pressed={spiderShown}
              aria-label="Tampilkan foto mengenakan kostum Spider-Man"
              onClick={toggleSpider}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" ||
                  e.key === " "
                ) {
                  e.preventDefault();
                  setSpiderShown((v) => !v);
                }
              }}
              className="about-photo group relative aspect-[3/4] w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3c66e5]"
              data-spider={
                spiderReady ? "ready" : undefined
              }
              data-shown={
                spiderShown ? "true" : undefined
              }
            >
              {/* 1. Glow accent di belakang foto */}
              <span
                aria-hidden="true"
                className="absolute inset-x-2 bottom-4 z-0 h-[74%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-accent)_32%,transparent),transparent_72%)] blur-2xl"
              />

              {/* 2. Foto normal */}
              <Image
                src={PHOTO_SRC}
                alt="Foto Muhammad Rusli"
                fill
                sizes="330px"
                className="about-photo-img object-contain object-bottom"
                priority
              />

              {/* 3. Layer Spider-Man */}
              {PHOTO_SPIDER_SRC ? (
                <Image
                  src={PHOTO_SPIDER_SRC}
                  alt="Foto Muhammad Rusli mengenakan kostum Spider-Man"
                  fill
                  sizes="330px"
                  onLoad={() =>
                    setSpiderReady(true)
                  }
                  onError={() =>
                    setSpiderFailed(true)
                  }
                  className={`about-photo-spider object-contain object-bottom${
                    spiderFailed ? " hidden" : ""
                  }`}
                />
              ) : null}

              {/* 4. Gradasi hitam untuk menutupi garis saja */}
              <span
                aria-hidden="true"
                className="
                  about-photo-fade
                  pointer-events-none
                  absolute inset-0
                  z-20
                  bg-[linear-gradient(
                    to_bottom,
                    transparent_0%,
                    transparent_82%,
                    rgba(3,5,13,0.15)_86%,
                    rgba(3,5,13,0.55)_91%,
                    rgba(3,5,13,0.9)_96%,
                    #03050d_100%
                  )]
                "
              />
            </div>
          ) : (
            <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/20 bg-[#0b0f1d] text-center">
              <ImagePlus
                size={32}
                className="text-white/40"
              />

              <p className="px-6 text-sm text-white/50">
                Tempat foto cutout
                <br />
                (isi PHOTO_SRC di AboutSection.tsx)
              </p>
            </div>
          )}
        </motion.div>

        {/* Kanan: deskripsi + view projects */}
        <motion.div
          variants={fromRight}
          className="order-3 text-center lg:text-left"
        >
          <p className="text-[17px] leading-[1.45] text-white/80">
            Sebagai siswa/mahasiswa di bidang
            pengembangan perangkat lunak, saya
            berfokus pada pembuatan aplikasi web
            yang tidak hanya berfungsi dengan baik,
            tetapi juga memberi pengalaman yang
            nyaman bagi penggunanya.
          </p>

          <a
            href="#portfolio"
            className="mt-8 inline-flex items-center gap-2.5 rounded-xl border border-[#1c2a55] bg-[#080c1a] px-6 py-3 text-[17px] font-bold text-[#6f9bff] hover:border-[#3c66e5]"
          >
            <Code size={18} />
            View Projects
          </a>
        </motion.div>
      </motion.div>

      {/* Education & Experience */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.14)}
        className="mt-24 grid grid-cols-1 gap-12 lg:mt-32 lg:grid-cols-2 lg:gap-10"
      >
        <motion.div variants={fromLeft}>
          <motion.h3
            variants={fromBottom}
            className="mb-6 text-[26px] font-extrabold text-white"
          >
            Education
          </motion.h3>

          <motion.div
            variants={stagger(0.1)}
            className="flex flex-col gap-4"
          >
            {EDUCATION.map((e) => (
              <TimelineCard
                key={e.title}
                entry={e}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fromRight}>
          <motion.h3
            variants={fromBottom}
            className="mb-6 text-[26px] font-extrabold text-white"
          >
            Experience
          </motion.h3>

          <motion.div
            variants={stagger(0.1)}
            className="about-scroll flex max-h-[280px] flex-col gap-4 overflow-y-auto pr-3"
          >
            {EXPERIENCE.map((e) => (
              <TimelineCard
                key={e.title}
                entry={e}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Statistik */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={stagger(0.12)}
        className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-20"
      >
        <StatCard
          icon={Code}
          value={PROJECTS.length}
          label="PROJECTS"
          caption="Innovative solutions crafted"
          href="#portfolio"
          delay="0s"
          from="left"
        />

        <StatCard
          icon={Award}
          value={CERTIFICATES.length}
          label="CERTIFICATES"
          caption="Skills validated"
          href="#portfolio"
          delay="-2s"
          from="bottom"
        />

        <StatCard
          icon={Layers}
          value={TECHNOLOGIES_COUNT}
          label="TECHNOLOGIES"
          caption="Stack I build with"
          href="#portfolio"
          delay="-4s"
          from="right"
        />
      </motion.div>
    </section>
  );
}