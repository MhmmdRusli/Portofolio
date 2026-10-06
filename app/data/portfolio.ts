/**
 * Data tab Portfolio (Certificates & Awards).
 * Jumlahnya juga dipakai kartu statistik di About, jadi cukup diubah di sini.
 *
 * Berkas sertifikat ada di `/public/certificates/certificate-<n>.webp`
 * (dari PNG asli user, di-resize max 1000px lalu di-encode WebP). Salinan
 * PNG aslinya disimpan di `/assets-source/certificates` supaya tidak ikut
 * ter-deploy tapi tetap tersedia kalau perlu re-encode.
 */

export interface Certificate {
  id: number;
  src: string;
  width: number;
  height: number;
  /** Nama sertifikat, dipakai sebagai alt text. Kosong → "Sertifikat <id>". */
  title?: string;
}

export interface AwardItem {
  id: number;
  title: string;
  issuer: string;
  year: string;
  /** Path gambar di /public (opsional), contoh: "/awards/award-1.jpg" */
  image?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    src: "/certificates/certificate-1.webp",
    width: 1000,
    height: 708,
  },
  {
    id: 2,
    src: "/certificates/certificate-2.webp",
    width: 1000,
    height: 708,
  },
  {
    id: 3,
    src: "/certificates/certificate-3.webp",
    width: 1000,
    height: 703,
  },
  {
    id: 4,
    src: "/certificates/certificate-4.webp",
    width: 1000,
    height: 709,
  },
  {
    id: 5,
    src: "/certificates/certificate-5.webp",
    width: 1000,
    height: 706,
  },
  {
    id: 6,
    src: "/certificates/certificate-6.webp",
    width: 1000,
    height: 709,
  },
];

// Belum ada data award. Isi dengan data asli Anda, contoh:
// { id: 1, title: "Juara 1 Lomba ...", issuer: "Nama Penyelenggara", year: "2025" },
export const AWARDS: AwardItem[] = [];