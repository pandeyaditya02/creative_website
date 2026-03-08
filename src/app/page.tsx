import HeroVideo from "@/components/HeroVideo";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import FeaturedSection from "@/components/FeaturedSection";
import ContactSection from "@/components/ContactSection";
import PinnedSection from "@/components/PinnedSection";
import ClientsMarquee from "@/components/ClientsMarquee";
import WhyChooseUs from "@/components/WhyChooseUs";
import GrandCTA from "@/components/GrandCTA";
import StatsCounter from "@/components/StatsCounter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      {/* 
        Smart Pinned Panels Implementation:
        - Hero: Standard Pin (Top)
        - About/Services: Tall content, so pin at Bottom (isTall={true})
        - Stacking Order: Increasing Z-Index ensures Card Stacking effect.
      */}

      <PinnedSection zIndex={1} className="bg-black">
        <HeroVideo />
      </PinnedSection>

      <PinnedSection zIndex={2} isTall={true} className="bg-black">
        <AboutSection />
      </PinnedSection>

      {/* Services — self-pinning via GSAP ScrollTrigger.pin (not using PinnedSection).
           pinSpacing:true adds scroll height automatically. z-index ensures stacking order. */}
      <div className="relative w-full bg-black" style={{ zIndex: 3 }}>
        <ServicesSection />
      </div>

      {/* Portfolio — commented out for now */}
      {/* <PinnedSection zIndex={4} isTall={true} className="bg-black">
        <PortfolioSection />
      </PinnedSection> */}

      {/* Clients Marquee — needs z-index to sit above pinned sections */}
      <div className="relative w-full bg-black" style={{ zIndex: 5 }}>
        <ClientsMarquee />
      </div>

      {/* Featured — commented out for now */}
      {/* <PinnedSection zIndex={5} isTall={true} className="bg-black">
        <FeaturedSection />
      </PinnedSection> */}

      <div className="relative w-full bg-black" style={{ zIndex: 6 }}>
        <WhyChooseUs />
      </div>

      <div className="relative w-full bg-black" style={{ zIndex: 7 }}>
        <GrandCTA />
      </div>

      <div className="relative w-full bg-[#0a0a0a]" style={{ zIndex: 8 }}>
        <StatsCounter />
      </div>

      <PinnedSection zIndex={9} isTall={true} className="bg-black">
        <ContactSection />
      </PinnedSection>
    </main>
  );
}
