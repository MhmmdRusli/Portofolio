/**
 * ── Centralized Project Data ──
 *
 * Single source of truth for the Projects section and the project detail
 * pages (`/projects/[slug]`). Nothing here should be duplicated elsewhere.
 *
 * ⚠️ PLACEHOLDER CONTENT
 * All names, descriptions and technologies below are the original placeholder
 * data. `image`, `githubUrl` and `demoUrl` are intentionally left undefined
 * so no real URLs or imagery are invented:
 *   • the cover falls back to the abstract placeholder visual
 *   • the GitHub / Live Demo buttons are hidden until real links exist
 * Replace the values here once real project information is available.
 */

export interface Project {
  id: number;
  name: string;
  slug: string;
  category: string;
  /** One-line summary used on cards and as the detail page intro. */
  shortDescription: string;
  /** Full description shown on the detail page. */
  description: string;
  technologies: string[];
  /** Cover image path. Undefined → abstract placeholder visual is used. */
  image?: string;
  /** Omitted → the GitHub button is not rendered. */
  githubUrl?: string;
  /** Omitted → the Live Demo button is not rendered. */
  demoUrl?: string;
}

/** Placeholder copy reused by every entry until real project data exists. */
const PLACEHOLDER_DESCRIPTION =
  "Placeholder description for a creative development project showcasing clean code and modern design.";

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Project One",
    slug: "project-one",
    category: "Web App",
    shortDescription: PLACEHOLDER_DESCRIPTION,
    description: PLACEHOLDER_DESCRIPTION,
    technologies: ["Next.js", "React", "Tailwind"],
  },
  {
    id: 2,
    name: "Project Two",
    slug: "project-two",
    category: "Design System",
    shortDescription: PLACEHOLDER_DESCRIPTION,
    description: PLACEHOLDER_DESCRIPTION,
    technologies: ["Figma", "CSS", "Storybook"],
  },
  {
    id: 3,
    name: "Project Three",
    slug: "project-three",
    category: "E-Commerce",
    shortDescription: PLACEHOLDER_DESCRIPTION,
    description: PLACEHOLDER_DESCRIPTION,
    technologies: ["TypeScript", "Node.js", "Stripe"],
  },
  {
    id: 4,
    name: "Project Four",
    slug: "project-four",
    category: "Landing Page",
    shortDescription: PLACEHOLDER_DESCRIPTION,
    description: PLACEHOLDER_DESCRIPTION,
    technologies: ["HTML", "Motion", "CSS"],
  },
  {
    id: 5,
    name: "Project Five",
    slug: "project-five",
    category: "Dashboard",
    shortDescription: PLACEHOLDER_DESCRIPTION,
    description: PLACEHOLDER_DESCRIPTION,
    technologies: ["React", "Chart.js", "Firebase"],
  },
  {
    id: 6,
    name: "Project Six",
    slug: "project-six",
    category: "Mobile App",
    shortDescription: PLACEHOLDER_DESCRIPTION,
    description: PLACEHOLDER_DESCRIPTION,
    technologies: ["React Native", "Expo", "API"],
  },
];

/** Returns the project matching `slug`, or `undefined` when nothing matches. */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Slugs for static prerendering of `/projects/[slug]`. */
export function getProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}
