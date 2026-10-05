/**
 * ── Centralized Project Data ──
 *
 * Single source of truth for the Projects section and the project detail
 * pages (`/projects/[slug]`). Nothing here should be duplicated elsewhere.
 *
 * Cover image lives at `/public/projects/<slug>.webp` (screenshots resized to
 * max 1600px and encoded as WebP). Leaving `image` undefined falls back to the
 * abstract placeholder visual on both the card and the detail page.
 *
 * `slug` stays independent from `name` on purpose: it drives the route, the
 * `getStaticParams` entry and the image filename, so renaming a project never
 * breaks an existing URL or a cover image.
 *
 * ⚠️ REVIEW BEFORE PUBLISHING
 * - `technologies` memakai dua stack bersama: `STACK` (Laravel + React +
 *   Tailwind CSS) untuk empat proyek, `BOOTSTRAP_LARAVEL_STACK` untuk
 *   Stockify dan Masakan Sunda Bu Yati.
 * - `githubUrl` / `demoUrl` are omitted until real links exist, which is why
 *   the GitHub and Live Demo buttons do not render.
 */

export interface Project {
  id: number;
  /** Display name, shown as the card and detail page heading. */
  name: string;
  /** URL segment for `/projects/[slug]`, and the cover image filename. */
  slug: string;
  /** Short type label, e.g. "Sistem Absensi". */
  category: string;
  /** One-line subtitle under the name, e.g. "Sistem Absensi Sekolah". */
  tagline: string;
  /** One-line summary used on cards and as the detail page intro. */
  shortDescription: string;
  /** Full description shown on the detail page. */
  description: string;
  /** Empty → the detail page hides its "Technologies Used" section. */
  technologies?: string[];
  /** Cover image path. Undefined → abstract placeholder visual is used. */
  image?: string;
  /** Omitted → the GitHub button is not rendered. */
  githubUrl?: string;
  /** Omitted → the Live Demo button is not rendered. */
  demoUrl?: string;
}

/**
 * Empat proyek memakai `STACK` yang sama, jadi didefinisikan sekali di sini.
 * Nama library ditulis sesuai penulisan resminya ("Tailwind CSS", bukan
 * "Tailwinds"). Kalau suatu proyek memakai stack berbeda, pakai konstanta
 * lain atau tulis array `technologies` sendiri.
 */
const STACK = ["Laravel", "React", "Tailwind CSS"];

/** Stack untuk Stockify dan Masakan Sunda Bu Yati. */
const BOOTSTRAP_LARAVEL_STACK = ["Bootstrap", "Laravel"];

export const PROJECTS: Project[] = [
  {
    id: 1,
    name: "EduAttend",
    slug: "absen",
    category: "Sistem Absensi",
    tagline: "Sistem Absensi Sekolah",
    shortDescription:
      "Sistem absensi sekolah berbasis QR Code untuk mencatat dan mengelola kehadiran siswa secara cepat dan terstruktur.",
    description:
      "Sistem absensi sekolah berbasis QR Code untuk mencatat dan mengelola kehadiran siswa secara cepat dan terstruktur.",
    technologies: STACK,
    image: "/projects/absen.webp",
  },
  {
    id: 2,
    name: "FunOutDor.ID",
    slug: "camping",
    category: "Platform Rental",
    tagline: "Platform Sewa Alat Camping",
    shortDescription:
      "Platform penyewaan alat camping yang memudahkan pengguna memilih dan menyewa berbagai perlengkapan outdoor sesuai kebutuhan.",
    description:
      "Platform penyewaan alat camping yang memudahkan pengguna memilih dan menyewa berbagai perlengkapan outdoor sesuai kebutuhan.",
    technologies: STACK,
    image: "/projects/camping.webp",
  },
  {
    id: 3,
    name: "Stockify",
    slug: "stockify",
    category: "Manajemen Stok",
    tagline: "Sistem Manajemen Stok",
    shortDescription:
      "Sistem manajemen inventaris untuk mengelola produk, memantau stok, serta mencatat barang masuk dan keluar.",
    description:
      "Sistem manajemen inventaris untuk mengelola produk, memantau stok, serta mencatat barang masuk dan keluar.",
    technologies: BOOTSTRAP_LARAVEL_STACK,
    image: "/projects/stockify.webp",
  },
  {
    id: 4,
    name: "Titipsini",
    slug: "titipsini",
    category: "Platform Penitipan",
    tagline: "Platform Berbagai Penitipan",
    shortDescription:
      "Platform layanan penitipan yang menghubungkan pengguna dengan berbagai pilihan jasa penitipan sesuai kebutuhan.",
    description:
      "Platform layanan penitipan yang menghubungkan pengguna dengan berbagai pilihan jasa penitipan sesuai kebutuhan.",
    technologies: STACK,
    image: "/projects/titipsini.webp",
  },
  {
    id: 5,
    name: "Tracker.io",
    slug: "tracker",
    category: "Aplikasi Keuangan",
    tagline: "Pencatatan Keuangan",
    shortDescription:
      "Aplikasi pencatatan keuangan untuk mengelola pemasukan dan pengeluaran serta memantau kondisi keuangan.",
    description:
      "Aplikasi pencatatan keuangan untuk mengelola pemasukan dan pengeluaran serta memantau kondisi keuangan.",
    technologies: STACK,
    image: "/projects/tracker.webp",
  },
  {
    id: 6,
    name: "MasakanSundaBuYati",
    slug: "warnas",
    category: "Website Restoran",
    tagline: "Warung Nasi",
    shortDescription:
      "Website warung nasi dengan fitur pemesanan online yang memudahkan pelanggan melihat menu dan memesan makanan secara langsung.",
    description:
      "Website warung nasi dengan fitur pemesanan online yang memudahkan pelanggan melihat menu dan memesan makanan secara langsung.",
    technologies: BOOTSTRAP_LARAVEL_STACK,
    image: "/projects/warnas.webp",
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