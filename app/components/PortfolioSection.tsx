"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowRight, Terminal, Globe, Code2, LayoutTemplate, Palette, GitBranch, Database, Laptop } from "lucide-react";

import ProjectCover from "@/app/components/ProjectCover";
import { PROJECTS } from "@/app/data/projects";

// ── Placeholder Data ──

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "tech", label: "Tech Stack" },
] as const;

type TabId = typeof TABS[number]["id"];

const CERTIFICATES = [
  { id: 1, src: "/certificates/certificate-1.jpg", width: 1200, height: 900 },
  { id: 2, src: "/certificates/certificate-2.jpg", width: 1200, height: 900 },
  { id: 3, src: "/certificates/certificate-3.jpg", width: 1200, height: 900 },
  { id: 4, src: "/certificates/certificate-4.jpg", width: 1200, height: 900 },
  { id: 5, src: "/certificates/certificate-5.jpg", width: 1200, height: 900 },
  { id: 6, src: "/certificates/certificate-6.jpg", width: 1200, height: 900 },
];

const TECH_STACK = [
  { name: "HTML", icon: Globe },
  { name: "CSS", icon: LayoutTemplate },
  { name: "JavaScript", icon: Terminal },
  { name: "TypeScript", icon: Code2 },
  { name: "React", icon: Laptop },
  { name: "Next.js", icon: Globe },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Node.js", icon: Database },
  { name: "Git", icon: GitBranch },
  { name: "Figma", icon: Palette },
];

// ── Variants ──

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.4, ease: "easeOut" as any } 
  },
};

// ── Components ──

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<TabId>("projects");

  return (
    <section id="portfolio" className="flex flex-col gap-12 py-24 lg:py-32">
      
      {/* ── Header ── */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4">
        <motion.span 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} 
          className="mb-4 font-mono text-sm font-semibold tracking-widest text-[var(--color-accent)]"
        >
          MY PORTFOLIO
        </motion.span>
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} 
          className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          Selected Works
        </motion.h2>
        <motion.p 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} 
          className="text-lg text-[var(--color-text-muted)] sm:text-xl"
        >
          A collection of projects and certifications representing my journey and skills in digital creation.
        </motion.p>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="flex w-full justify-center px-4">
        <div className="flex flex-wrap justify-center gap-2 rounded-2xl border border-white/[0.08] bg-[var(--color-bg-secondary)] p-1.5 shadow-lg backdrop-blur-md">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 z-0 rounded-xl bg-[var(--color-accent)] shadow-[0_0_15px_var(--color-accent-glow)]"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 } as any}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="min-h-[500px] w-full px-4 sm:px-0">
        <AnimatePresence mode="wait">
          
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {PROJECTS.map((project) => (
                <motion.div key={project.id} variants={itemVariants} className="card group flex flex-col overflow-hidden">
                  <ProjectCover
                    src={project.image}
                    alt={`${project.name} project cover preview`}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wider text-[var(--color-accent)]">{project.category}</span>
                      <ExternalLink size={16} className="text-[var(--color-text-muted)] transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-[var(--color-accent)]">{project.name}</h3>
                    <p className="mb-6 flex-1 text-sm text-[var(--color-text-muted)] line-clamp-3">{project.shortDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="rounded bg-white/[0.04] px-2 py-1 text-xs font-medium text-[var(--color-text-secondary)] border border-white/[0.04]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      aria-label={`View details for ${project.name}`}
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                    >
                      View Details
                      <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              key="certificates"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {CERTIFICATES.map((cert) => (
                <motion.div key={cert.id} variants={itemVariants} className="group">
                  <div className="relative w-full overflow-hidden rounded-[var(--radius-lg)] border border-white/[0.08] bg-[var(--color-bg-card)] transition-[border-color,box-shadow] duration-[var(--transition-base)] group-hover:border-[var(--color-accent)]/50 group-hover:shadow-[0_0_20px_var(--color-accent-glow)]">
                    <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden p-2 sm:p-3">
                      <Image
                        src={cert.src}
                        alt=""
                        width={cert.width}
                        height={cert.height}
                        className="h-full w-full rounded-[var(--radius-md)] object-contain transition-transform duration-[var(--transition-slow)] group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "tech" && (
            <motion.div
              key="tech"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
              {TECH_STACK.map((tech) => (
                <motion.div key={tech.name} variants={itemVariants} className="card flex flex-col items-center justify-center gap-3 p-6 text-center hover:-translate-y-1 hover:shadow-lg hover:shadow-white/[0.02]">
                  <tech.icon size={32} className="text-[var(--color-text-secondary)]" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-white">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
