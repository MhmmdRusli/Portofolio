"use client";

import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";

// ── Placeholder Data ──

const STATS = [
  { value: "20+", label: "Projects Completed" },
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Certificates" },
  { value: "15+", label: "Technologies" },
];

const EDUCATION = [
  {
    institution: "SMK Amaliah 1 Ciawi Bogor",
    degree: "Pengembangan Perangkat Lunak dan Gim",
    year: "2024 — Present",
    description: "Currently studying.",
  },
];

const EXPERIENCE = [
  {
    company: "Seven Inc.",
    role: "Intern",
    year: "Internship / Magang",
    description: "Internship experience at Seven Inc.",
  },
];

// ── Animation Variants ──
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.5, ease: "easeOut" as any },
  },
};

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  icon: React.ElementType;
}

function TimelineItem({ title, subtitle, date, description, icon: Icon }: TimelineItemProps) {
  return (
    <motion.div variants={itemVariants} className="relative pl-8 pb-8 last:pb-0">
      {/* Line & Icon */}
      <div className="absolute left-0 top-1 bottom-[-1rem] flex w-8 flex-col items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[var(--color-bg-secondary)] shadow-sm">
          <Icon size={14} className="text-[var(--color-accent)]" />
        </div>
        <div className="w-px flex-1 bg-white/[0.08] mt-2" />
      </div>

      {/* Content */}
      <div className="card p-5 ml-4 text-left">
        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h4 className="text-lg font-bold text-white">{title}</h4>
          <span className="text-xs font-semibold tracking-wider text-[var(--color-accent)] sm:ml-4">{date}</span>
        </div>
        <h5 className="mb-3 text-sm font-medium text-[var(--color-text-secondary)]">{subtitle}</h5>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="flex flex-col gap-20 py-24 lg:py-32">
      
      {/* ── About Me ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto"
      >
        <motion.span variants={itemVariants} className="mb-4 font-mono text-sm font-semibold tracking-widest text-[var(--color-accent)]">
          ABOUT ME
        </motion.span>
        <motion.h2 variants={itemVariants} className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Muhammad Rusli
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-[var(--color-text-muted)] sm:text-xl">
          Junior Full Stack Developer who loves building modern web applications.
        </motion.p>
      </motion.div>

      {/* ── Statistics ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="card flex flex-col items-center justify-center p-6 text-center shadow-lg"
          >
            <span className="mb-2 text-4xl font-bold text-white">{stat.value}</span>
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Education & Experience ── */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
        
        {/* Education Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h3 variants={itemVariants} className="mb-8 flex items-center gap-3 text-2xl font-bold text-white">
            <GraduationCap className="text-[var(--color-accent)]" size={24} />
            Education
          </motion.h3>
          <div className="flex flex-col">
            {EDUCATION.map((edu, i) => (
              <TimelineItem
                key={i}
                title={edu.institution}
                subtitle={edu.degree}
                date={edu.year}
                description={edu.description}
                icon={GraduationCap}
              />
            ))}
          </div>
        </motion.div>

        {/* Experience Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h3 variants={itemVariants} className="mb-8 flex items-center gap-3 text-2xl font-bold text-white">
            <Briefcase className="text-[var(--color-accent)]" size={24} />
            Experience
          </motion.h3>
          <div className="flex flex-col">
            {EXPERIENCE.map((exp, i) => (
              <TimelineItem
                key={i}
                title={exp.company}
                subtitle={exp.role}
                date={exp.year}
                description={exp.description}
                icon={Briefcase}
              />
            ))}
          </div>
        </motion.div>
        
      </div>

    </section>
  );
}
