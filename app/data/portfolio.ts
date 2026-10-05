/**
 * Data tab Portfolio (Certificates & Awards).
 * Jumlahnya juga dipakai kartu statistik di About, jadi cukup diubah di sini.
 */

export interface Certificate {
  id: number;
  src: string;
  width: number;
  height: number;
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
  { id: 1, src: "/certificates/certificate-1.jpg", width: 1200, height: 900 },
  { id: 2, src: "/certificates/certificate-2.jpg", width: 1200, height: 900 },
  { id: 3, src: "/certificates/certificate-3.jpg", width: 1200, height: 900 },
  { id: 4, src: "/certificates/certificate-4.jpg", width: 1200, height: 900 },
  { id: 5, src: "/certificates/certificate-5.jpg", width: 1200, height: 900 },
  { id: 6, src: "/certificates/certificate-6.jpg", width: 1200, height: 900 },
];

// Belum ada data award. Isi dengan data asli Anda, contoh:
// { id: 1, title: "Juara 1 Lomba ...", issuer: "Nama Penyelenggara", year: "2025" },
export const AWARDS: AwardItem[] = [];