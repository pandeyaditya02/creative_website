import HeroVideo from "@/components/HeroVideo";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import FeaturedSection from "@/components/FeaturedSection";
import ContactSection from "@/components/ContactSection";
import PinnedSection from "@/components/PinnedSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#2D3E50]">
      {/* 
        Smart Pinned Panels Implementation:
        - Hero: Standard Pin (Top)
        - About/Services: Tall content, so pin at Bottom (isTall={true})
        - Stacking Order: Increasing Z-Index ensures Card Stacking effect.
      */}

      <PinnedSection zIndex={1} className="bg-[#2D3E50]">
        <HeroVideo />
      </PinnedSection>

      <PinnedSection zIndex={2} isTall={true} className="bg-[#2D3E50]">
        <AboutSection />
      </PinnedSection>

      <PinnedSection zIndex={3} isTall={true} className="bg-[#2D3E50]">
        <ServicesSection />
      </PinnedSection>

      <PinnedSection zIndex={4} isTall={true} className="bg-[#2D3E50]">
        <PortfolioSection />
      </PinnedSection>

      <PinnedSection zIndex={5} isTall={true} className="bg-[#2D3E50]">
        <FeaturedSection />
      </PinnedSection>

      <PinnedSection zIndex={6} isTall={true} className="bg-[#2D3E50]">
        <ContactSection />
      </PinnedSection>
    </main>
  );
}
