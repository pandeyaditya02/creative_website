import LivingHero from "@/components/LivingHero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import PinnedSection from "@/components/PinnedSection";
import ClienteleMarquee from "@/components/ClienteleMarquee";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsCounter from "@/components/StatsCounter";
import ProjectGallery from "@/components/ProjectGallery";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-dvh bg-noir overflow-x-hidden mobile-safe-area">
      {/* 1. LIVING HERO (WebGL) */}
      <LivingHero />

      {/* 2. STATS COUNTER */}
      <div className="relative w-full bg-surface" style={{ zIndex: 20 }}>
        <StatsCounter />
      </div>

      {/* 3. CLIENTELE MARQUEE */}
      <div className="relative w-full bg-noir" style={{ zIndex: 30 }}>
        <ClienteleMarquee />
      </div>

      {/* 4. PROJECT GALLERY */}
      <ProjectGallery />

      {/* 5. ABOUT SECTION */}
      <PinnedSection 
        zIndex={40} 
        isTall={true} 
        className="bg-noir"
        disableOnMobile={true}
        mobileBreakpoint={768}
      >
        <AboutSection />
      </PinnedSection>

      {/* 6. SERVICES SECTION */}
      <div className="relative w-full bg-noir" style={{ zIndex: 50 }}>
        <ServicesSection />
      </div>

      {/* 7. WHY CHOOSE US */}
      <div className="relative w-full bg-noir" style={{ zIndex: 60 }}>
        <WhyChooseUs />
      </div>

      {/* 8. CONTACT SECTION */}
      <PinnedSection 
        zIndex={70} 
        isTall={true} 
        className="bg-noir"
        disableOnMobile={true}
        mobileBreakpoint={768}
      >
        <ContactSection />
      </PinnedSection>
    </main>
  );
}