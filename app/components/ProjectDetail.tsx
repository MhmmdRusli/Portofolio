"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { ArrowLeft, ArrowUpRight, GitBranch } from "lucide-react";

import ProjectCover from "@/app/components/ProjectCover";
import type { Project } from "@/app/data/projects";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const reduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.45, ease: "easeOut" },
    },
  };

  const hasLinks = Boolean(project.githubUrl || project.demoUrl);

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-10 py-16 lg:py-24"
    >
      {/* ── Back to Projects ── */}
      <motion.div variants={itemVariants}>
        <Link
          href="/#portfolio"
          className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-200 hover:border-[var(--color-accent)]/50 hover:text-white"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.8}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Back to Projects
        </Link>
      </motion.div>

      {/* ── Heading ── */}
      <motion.header variants={itemVariants} className="flex flex-col gap-4">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] sm:text-sm">
          {project.category}
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {project.name}
        </h1>
        <p className="max-w-2xl text-base text-[var(--color-text-muted)] sm:text-lg">
          {project.shortDescription}
        </p>
      </motion.header>

      {/* ── Actions ── */}
      {hasLinks && (
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_15px_var(--color-accent-glow)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)] hover:shadow-[0_0_22px_var(--color-accent-glow)]"
            >
              <ArrowUpRight size={16} strokeWidth={2} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[var(--color-bg-card)] px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-bg-card-hover)]"
            >
              <GitBranch size={16} strokeWidth={2} />
              GitHub
            </a>
          )}
        </motion.div>
      )}

      {/* ── Cover ── */}
      <motion.div variants={itemVariants} className="group overflow-hidden rounded-[var(--radius-lg)] border border-white/[0.08] transition-[border-color,box-shadow] duration-[var(--transition-base)] hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_20px_var(--color-accent-glow)]">
        <ProjectCover
          src={project.image}
          alt={`${project.name} project cover preview`}
          sizes="(min-width: 1024px) 66vw, 100vw"
        />
      </motion.div>

      {/* ── About ── */}
      <motion.section variants={itemVariants} className="card p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">About</h2>
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
          {project.description}
        </p>
      </motion.section>

      {/* ── Technologies ── */}
      <motion.section variants={itemVariants} className="card p-6 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">
          Technologies Used
        </h2>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.article>
  );
}
