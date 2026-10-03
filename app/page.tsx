import MascotPlaceholder from "@/app/components/MascotPlaceholder";
import PageShell from "@/app/components/PageShell";
import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import PortfolioSection from "@/app/components/PortfolioSection";
import GallerySection from "@/app/components/GallerySection";
import ContactSection from "@/app/components/ContactSection";
import CommentsSection from "@/app/components/CommentsSection";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <PageShell className="py-8">
        <MascotPlaceholder />
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <GallerySection />
        <ContactSection />
        <CommentsSection />
      </PageShell>
      <Footer />
    </>
  );
}
