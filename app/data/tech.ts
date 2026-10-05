/**
 * ── Technology Brand Data ──
 *
 * Single source of truth untuk logo + warna brand setiap teknologi. Dipakai
 * oleh tab "Tech Stack" (PortfolioSection) DAN daftar "Technologies Used"
 * (ProjectDetail), supaya logo yang muncul di dua tempat itu dijamin identik.
 *
 * Dua sumber logo:
 * - `icon` → simple-icons, path SVG asli + warna resmi. Tidak perlu file.
 * - `file` → file SVG sendiri di `/public/logos/tech`, untuk logo yang tidak
 *   ada di simple-icons atau yang butuh warna/gradient asli.
 *
 * Nama di sini adalah kunci lookup: `Project.technologies` harus memakai nama
 * yang sama persis (huruf besar/kecil bebas, karena pencocokan di lowercase).
 */

import type { SimpleIcon } from "simple-icons";
import {
  siBootstrap,
  siCss,
  siFigma,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLaravel,
  siLaragon,
  siMysql,
  siN8n,
  siNodedotjs,
  siObsidian,
  siPhp,
  siPostman,
  siReact,
  siTailwindcss,
  siTypescript,
  siXampp,
} from "simple-icons";

export interface TechMeta {
  /** Nama tampilan, sekaligus kunci lookup `findTech`. */
  name: string;
  /** Warna brand: dipakai untuk tile, glow, dan garis bawah kartu. */
  color: string;
  /** Logo dari simple-icons. Diколо jika `file` terisi. */
  icon?: SimpleIcon;
  /** Paksa warna logo untuk logo yang gelap (mis. GitHub). */
  logoColor?: string;
  /** Nama file di `/public/logos/tech`. Dipakai kalau `icon` undefined. */
  file?: string;
}

/** Urutan tampil di tab "Tech Stack". */
export const TECHS: TechMeta[] = [
  { name: "HTML5", color: "#E34F26", icon: siHtml5 },
  { name: "CSS3", color: "#663399", icon: siCss },
  { name: "Tailwind CSS", color: "#06B6D4", icon: siTailwindcss },
  { name: "Bootstrap", color: "#7952B3", icon: siBootstrap },
  { name: "JavaScript", color: "#F7DF1E", icon: siJavascript },
  { name: "TypeScript", color: "#3178C6", icon: siTypescript },
  { name: "React", color: "#61DAFB", icon: siReact },
  { name: "Node.js", color: "#5FA04E", icon: siNodedotjs },
  { name: "PHP", color: "#777BB4", icon: siPhp },
  { name: "Laravel", color: "#FF2D20", icon: siLaravel },
  { name: "MySQL", color: "#4479A1", icon: siMysql },
  { name: "XAMPP", color: "#FB7A24", icon: siXampp },
  { name: "Laragon", color: "#0E83CD", icon: siLaragon },
  { name: "Postman", color: "#FF6C37", icon: siPostman },
  { name: "n8n", color: "#EA4B71", icon: siN8n },
  { name: "Git", color: "#F03C2E", icon: siGit },
  // Logo GitHub hitam, dipaksa terang agar terlihat di kartu gelap.
  {
    name: "GitHub",
    color: "#E9EDF4",
    icon: siGithub,
    logoColor: "#E9EDF4",
  },
  { name: "VS Code", color: "#007ACC", file: "vscode.svg" },
  { name: "Antigravity", color: "#3186FF", file: "antigravity.svg" },
  { name: "Hermes AI", color: "#6FD3E8", file: "hermes.svg" },
  { name: "Obsidian", color: "#7C3AED", icon: siObsidian },
  { name: "Figma", color: "#F24E1E", icon: siFigma },
  { name: "Canva", color: "#00C4CC", file: "canva.svg" },
  { name: "CapCut", color: "#FFFFFF", file: "capcut.svg" },
  {
    name: "Adobe Illustrator",
    color: "#FF9A00",
    file: "adobe-illustrator.svg",
  },
];

const TECHS_BY_NAME = new Map(
  TECHS.map((tech) => [tech.name.toLowerCase(), tech]),
);

/** Cari meta teknologi berdasarkan nama. Case-insensitive. */
export function findTech(name: string): TechMeta | undefined {
  return TECHS_BY_NAME.get(name.trim().toLowerCase());
}