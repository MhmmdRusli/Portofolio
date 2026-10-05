"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Box, ChevronRight, Code, GitBranch } from "lucide-react";
import type { CSSProperties } from "react";

import type { Project } from "@/app/data/projects";
import { findTech } from "@/app/data/tech";
import { TechLogo } from "./icons";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const reduceMotion = useReducedMotion();
  const hasLinks = Boolean(project.githubUrl || project.demoUrl);
  const hasTechnologies = Boolean(project.technologies?.length);

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
      className="mx-auto w-full max-w-[1078px] pb-24 pt-[53px]"
    >
      {/* ── Back + breadcrumb ── */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/#portfolio"
          className="inline-flex h-[39px] items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#111726] px-5 text-base text-white transition-colors hover:bg-[#161d30]"
        >
          <ArrowLeft size={18} strokeWidth={1.8} />
          Back
        </Link>

        <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-base">
          <Link href="/#portfolio" className="text-white/50 transition-colors hover:text-white">
            Projects
          </Link>
          <ChevronRight size={16} className="text-white/50" />
          <span className="text-white">{project.name}</span>
        </nav>
      </div>

      {/* ── Konten 2 kolom ── */}
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_510px] lg:gap-14">
        {/* Kiri */}
        <div className="min-w-0">
          <h1 className="text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold leading-none text-white">
            {project.name}
          </h1>

          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
            {project.tagline}
          </p>

          <p className="mt-10 max-w-[508px] text-base leading-[1.53] text-white/70">
            {project.description}
          </p>

          {hasTechnologies && (
            <>
              <h2 className="mt-12 flex items-center gap-3 text-xl font-bold text-white">
                <Code size={18} className="text-white/60" />
                Technologies Used
              </h2>

              <ul className="mt-5 flex flex-wrap gap-2.5">
                {project.technologies!.map((name) => {
                  const tech = findTech(name);
                  return (
                    <li
                      key={name}
                      style={
                        tech
                          ? ({ "--brand": tech.color } as CSSProperties)
                          : undefined
                      }
                      className="tech-card inline-flex h-11 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#0f1527] px-4 text-base text-white/90"
                    >
                      {tech ? (
                        <span className="tech-tile flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                          <TechLogo tech={tech} size={17} />
                        </span>
                      ) : (
                        // Teknologi tanpa entri di @/app/data/tech: tambah di sana
                        // supaya logo dan warnanya konsisten dengan Tech Stack.
                        <Box
                          size={16}
                          strokeWidth={1.6}
                          className="shrink-0 text-white/70"
                        />
                      )}
                      {name}
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {hasLinks && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[39px] items-center gap-2 rounded-[10px] bg-[#3c66e5] px-[18px] text-[15px] font-bold text-white transition-colors hover:bg-[#4a73ee]"
                >
                  Live Demo
                  <ArrowUpRight size={16} strokeWidth={1.8} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[39px] items-center gap-2 rounded-[10px] border border-white/10 px-[18px] text-[15px] font-bold text-white transition-colors hover:bg-white/5"
                >
                  <GitBranch size={16} strokeWidth={1.8} />
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>

        {/* Kanan: gambar proyek */}
        <div className="relative aspect-[1020/453] w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#121727]">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Preview ${project.name}`}
              fill
              sizes="(min-width: 1024px) 510px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Code size={36} className="text-white/25" />
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}