"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  Award,
  ChevronDown,
  Code,
  Layers,
  type LucideIcon,
} from "lucide-react";

import { PROJECTS } from "@/app/data/projects";
import { CERTIFICATES } from "@/app/data/portfolio";
import { TECHS } from "@/app/data/tech";
import { TechLogo } from "./icons";

/* ═══════════════ DATA ═══════════════ */

const TABS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "projects", label: "Projects", icon: Code },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "tech", label: "Tech Stack", icon: Layers },
];

type TabId = "projects" | "certificates" | "tech";

const INITIAL_PROJECTS = 3;
const INITIAL_CERTIFICATES = 3;
const INITIAL_TECHS = 10;
const MOBILE_INITIAL_PROJECTS = 2;
const MOBILE_INITIAL_CERTIFICATES = 2;
const MOBILE_INITIAL_TECHS = 4;

interface TechItem {
  name: string;
  /** Warna brand: untuk isi logo, tile, dan glow saat hover. */
  color: string;
  /** Logo siap render: BrandLogo untuk simple-icons, FileLogo untuk file SVG. */
  logo: ReactNode;
}

// Sumber data ada di @/app/data/tech supaya logo di sini identik dengan yang
// dipakai ProjectDetail. Urutan tampil ikut dari sana.
const TECH_STACK: TechItem[] = TECHS.map((tech) => ({
  name: tech.name,
  color: tech.color,
  logo: <TechLogo tech={tech} size={34} />,
}));

/* ═══════════════ ANIMASI (ringan) ═══════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, margin: "-100px" } as const;

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
};

/** Arah masuk kartu mengikuti posisinya di baris: kiri, tengah, atau kanan. */
const OFFSET = {
  bottom: { x: 0, y: 28 },
  left: { x: -36, y: 20 },
  right: { x: 36, y: 20 },
} as const;

const directionOf = (index: number, columns: number) => {
  const column = index % columns;
  if (column === 0) return "left" as const;
  if (column === columns - 1) return "right" as const;
  return "bottom" as const;
};

/** Props reveal untuk kartu: fade + geser + scale subtle, stagger per kolom. */
const revealCard = (index: number, columns = 3) => ({
  initial: { opacity: 0, ...OFFSET[directionOf(index, columns)], scale: 0.98 },
  whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
  viewport: VIEWPORT,
  transition: { duration: 0.5, ease: EASE, delay: (index % columns) * 0.09 },
});

const CARD =
  "rounded-2xl border border-white/[0.07] bg-[#0a0d17] transition-colors hover:border-white/[0.14]";

/* ═══════════════ SECTION ═══════════════ */

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<TabId>("projects");
  const [isMobileView, setIsMobileView] = useState(false);
  const [expandedTabs, setExpandedTabs] = useState<Record<TabId, boolean>>({
    projects: false,
    certificates: false,
    tech: false,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateMobileView = () => setIsMobileView(mediaQuery.matches);

    updateMobileView();
    mediaQuery.addEventListener("change", updateMobileView);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileView);
    };
  }, []);

  const initialProjects = isMobileView
    ? MOBILE_INITIAL_PROJECTS
    : INITIAL_PROJECTS;
  const initialCertificates = isMobileView
    ? MOBILE_INITIAL_CERTIFICATES
    : INITIAL_CERTIFICATES;
  const initialTechs = isMobileView ? MOBILE_INITIAL_TECHS : INITIAL_TECHS;
  const isProjectsExpanded = expandedTabs.projects;
  const isCertificatesExpanded = expandedTabs.certificates;
  const isTechExpanded = expandedTabs.tech;
  const hasHiddenProjects = PROJECTS.length > initialProjects;
  const hasHiddenCertificates = CERTIFICATES.length > initialCertificates;
  const hasHiddenTechs = TECH_STACK.length > initialTechs;
  const showProjectHint = hasHiddenProjects && !isProjectsExpanded;
  const showCertificateHint = hasHiddenCertificates && !isCertificatesExpanded;
  const showTechHint = hasHiddenTechs && !isTechExpanded;
  const visibleProjects = isProjectsExpanded
    ? PROJECTS
    : PROJECTS.slice(0, initialProjects);
  const visibleCertificates = isCertificatesExpanded
    ? CERTIFICATES
    : CERTIFICATES.slice(0, initialCertificates);
  const visibleTechs = isTechExpanded
    ? TECH_STACK
    : TECH_STACK.slice(0, initialTechs);

  const toggleExpanded = (tab: TabId) => {
    setExpandedTabs((current) => ({
      ...current,
      [tab]: !current[tab],
    }));
  };

  return (
    <section id="portfolio" className="overflow-x-clip py-24 lg:py-32">
      {/* Judul */}
      <motion.h2
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.55, ease: EASE }}
        className="text-center text-[clamp(2.75rem,6vw,5rem)] font-extrabold leading-none tracking-tight text-[#eef0ff]"
      >
        Portfolio
      </motion.h2>

      {/* Tab bar */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
        role="tablist"
        className="mt-10 grid grid-cols-3 gap-1 rounded-2xl border border-white/[0.07] bg-[#0b0e19] p-1.5 lg:mt-12"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`relative flex h-16 flex-col items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-colors sm:h-[64px] sm:text-base ${
                isActive ? "text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="portfolioTab"
                  className="absolute inset-0 rounded-xl bg-[#0f1d4d]"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                />
              )}
              <Icon size={18} className="relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
);
          })}
      </motion.div>

      {/* Isi tab */}
      <div className="mt-9 min-h-[420px]">
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              {...fade}
              className="space-y-8"
            >
              <div className="relative">
                <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
                  {visibleProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      {...revealCard(i)}
                      className={`flex flex-col p-[18px] ${CARD}`}
                    >
                      <div className="relative aspect-[2/1] overflow-hidden rounded-[10px] bg-[#121727]">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={`Preview ${project.name}`}
                            fill
                            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw"
                            priority={i < 3}
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Code size={28} className="text-white/25" />
                          </div>
                        )}
                      </div>

                      <h3 className="mt-5 text-lg font-bold leading-snug text-white">
                        {project.name}
                      </h3>
                      <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                        {project.tagline}
                      </p>
                      <p className="mt-3 line-clamp-2 text-[14px] leading-[1.45] text-white/65">
                        {project.shortDescription}
                      </p>

                      <Link
                        href={`/projects/${project.slug}`}
                        aria-label={`Lihat detail ${project.name}`}
                        className="mt-6 inline-flex h-8 w-fit items-center gap-2 rounded-lg border border-white/10 bg-[#0e121d] px-4 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.06]"
                      >
                        Details
                        <ArrowRight size={15} />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {showProjectHint && <MoreItemsHint />}
              </div>

              {hasHiddenProjects && (
                <ViewMoreButton
                  expanded={isProjectsExpanded}
                  label="View More Projects"
                  lessLabel="Show Less Projects"
                  onClick={() => toggleExpanded("projects")}
                />
              )}
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div key="certificates" {...fade} className="space-y-8">
              <div className="relative">
                <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
                  {visibleCertificates.map((cert, i) => (
                    <motion.div
                      key={cert.id}
                      {...revealCard(i)}
                      whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
                      className={`cert-card group p-[18px] ${CARD}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-[#121727]">
                        <Image
                          src={cert.src}
                          alt={cert.title ?? `Sertifikat ${cert.id}`}
                          width={cert.width}
                          height={cert.height}
                          className="h-full w-full object-contain transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {showCertificateHint && <MoreItemsHint />}
              </div>

              {hasHiddenCertificates && (
                <ViewMoreButton
                  expanded={isCertificatesExpanded}
                  label="See More Certificates"
                  lessLabel="Show Less Certificates"
                  onClick={() => toggleExpanded("certificates")}
                />
              )}
            </motion.div>
          )}

          {activeTab === "tech" && (
            <motion.div key="tech" {...fade} className="space-y-8">
              <div className="relative">
                <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {visibleTechs.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      {...revealCard(i, 5)}
                      whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
                      style={{ "--brand": tech.color } as CSSProperties}
                      className={`tech-card group flex flex-col items-center justify-center gap-4 p-5 text-center ${CARD}`}
                    >
                      <span className="tech-tile flex h-14 w-14 items-center justify-center rounded-2xl">
                        {tech.logo}
                      </span>
                      <span className="text-sm font-semibold text-white">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>

                {showTechHint && <MoreItemsHint />}
              </div>

              {hasHiddenTechs && (
                <ViewMoreButton
                  expanded={isTechExpanded}
                  label="See More Stack"
                  lessLabel="Show Less Stack"
                  onClick={() => toggleExpanded("tech")}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function MoreItemsHint() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-10 h-48 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070a12]/85 to-[#070a12]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[#070a12]/80 backdrop-blur-[1px]" />
      <div className="absolute left-1/2 bottom-8 h-20 w-[min(520px,80vw)] -translate-x-1/2 rounded-full bg-[#6f8cff]/18 blur-3xl" />
      <div className="absolute left-1/2 bottom-0 h-16 w-[min(360px,70vw)] -translate-x-1/2 rounded-full bg-white/[0.06] blur-2xl" />
    </div>
  );
}

interface ViewMoreButtonProps {
  expanded: boolean;
  label: string;
  lessLabel: string;
  onClick: () => void;
}

function ViewMoreButton({
  expanded,
  label,
  lessLabel,
  onClick,
}: ViewMoreButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={expanded}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0e121d] px-5 text-sm font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/[0.06]"
      >
        {expanded ? lessLabel : label}
        <ChevronDown
          size={17}
          className={`transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
