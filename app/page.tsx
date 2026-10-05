"use client";

import { useCallback, useEffect, useState } from "react";
import PageShell from "@/app/components/PageShell";
import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import PortfolioSection from "@/app/components/PortfolioSection";
import GallerySection from "@/app/components/GallerySection";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";
import Onboarding from "@/app/components/Onboarding";

/**
 * Pathname dokumen saat pertama kali dimuat.
 *
 * Sengaja memakai PerformanceNavigationTiming, bukan `location.pathname`:
 * yang kedua sudah berubah saat navigasi client-side, sedangkan yang pertama
 * selalu menunjuk URL dokumen asal. Jadi fungsi ini tetap akurat walau modul
 * ini baru dievaluasi setelah user berpindah halaman.
 */
function initialDocumentPath(): string {
  if (typeof window === "undefined") return "/";

  try {
    const entry = performance.getEntriesByType("navigation")[0];

    return new URL(entry?.name ?? window.location.href).pathname;
  } catch {
    return window.location.pathname;
  }
}

/**
 * Berdiri di level modul — BUKAN di browser storage, dan di-reset setiap
 * kali dokumen dimuat ulang.
 *
 * Onboarding hanya main bila dokumen ini memang dibuka di "/" dan belum
 * pernah main di dokumen ini. Akibatnya:
 *   - buka / atau refresh        → onboarding main, selalu dari 0%
 *   - Home → detail → Back       → tidak main lagi
 *   - buka detail lalu ke Home   → tidak main, dokumennya memang bukan Home
 */
let onboardingPlayedThisLoad = initialDocumentPath() !== "/";

export default function Home() {
  // Nilai ini sama di render server dan render client's yang pertama, jadi
  // tidak ada hydration mismatch.
  const [showOnboarding, setShowOnboarding] = useState(
    () => !onboardingPlayedThisLoad,
  );

  useEffect(() => {
    onboardingPlayedThisLoad = true;
  }, []);

  const handleOnboardingDone = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  /**
   * Scroll ke section sesuai hash URL, mis. `/#portfolio`.
   *
   * Next.js tidak melakukan ini sendiri saat navigasi client-side, jadi tanpa
   * handler di sini tombol "Back" di halaman detail selalu mendarat di atas
   * Home — user harus scroll manual ke Portfolio.
   *
   * Cuma dijalankan saat mount. Perpindahan hash di halaman yang sama sudah
   * ditangani browser (dengan `scroll-behavior: smooth` di globals.css), jadi
   * tidak perlu listener `hashchange` yang akan menabrakkan scroll itu.
   *
   * Ditunggu sampai onboarding selesai: selama onboarding aktif,
   * `document.body.style.overflow` = "hidden" (lihat Onboarding.tsx), jadi
   * scroll sekarang akan dibuang begitu lock-nya dilepas.
   */
  useEffect(() => {
    if (showOnboarding) return;

    const id = window.location.hash.slice(1);
    if (!id) return;

    document
      .getElementById(id)
      // "instant", bukan "auto": `scroll-behavior: smooth` di globals.css
      // masih dipakai kalau behavior-nya "auto", sehingga user menyeberangi
      // Hero + About dulu sebelum sampai Portfolio.
      ?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [showOnboarding]);

  return (
    <>
      <PageShell>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <GallerySection />
        <ContactSection />
      </PageShell>

      <Footer />

      {showOnboarding ? <Onboarding onDone={handleOnboardingDone} /> : null}
    </>
  );
}