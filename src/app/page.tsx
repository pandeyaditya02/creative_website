import HeroVideo from "@/components/HeroVideo";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import PinnedSection from "@/components/PinnedSection";
import ClienteleMarquee from "@/components/ClienteleMarquee";
import WhyChooseUs from "@/components/WhyChooseUs";
import StatsCounter from "@/components/StatsCounter";

export default function Home() {
  return (
    // 1. min-h-dvh: Handles mobile browser address bar height changes
    // 2. overflow-x-hidden: Prevents horizontal scroll from animations/marquees
    // 3. Removed justify-between: Prevents unwanted gaps on long mobile content
    <main className="flex flex-col w-full min-h-dvh bg-black overflow-x-hidden mobile-safe-area">
      {/* 
        HERO SECTION 
        - Short content: Safe to keep pinned on all devices
        - disableOnMobile={false}: Preserve the pinning effect
      */}
      <PinnedSection 
        zIndex={1} 
        className="bg-black" 
        disableOnMobile={true}
        mobileBreakpoint={768}
      >
        <HeroVideo />
      </PinnedSection>

      {/* STATS COUNTER - Natural flow section */}
      <div className="relative w-full bg-[#0a0a0a]" style={{ zIndex: 20 }}>
        <StatsCounter />
      </div>

      {/* CLIENTELE MARQUEE - Natural flow section */}
      <div className="relative w-full bg-black" style={{ zIndex: 30 }}>
        <ClienteleMarquee />
      </div>

      {/* 
        ABOUT SECTION 
        - Tall content: Disable pin on mobile for better scroll UX
        - On desktop: Pins at "bottom bottom" to show full content before freezing
      */}
      <PinnedSection 
        zIndex={40} 
        isTall={true} 
        className="bg-black"
        disableOnMobile={true}
        mobileBreakpoint={768}
      >
        <AboutSection />
      </PinnedSection>

      {/* 
        SERVICES SECTION 
        - Uses internal GSAP pinning (not PinnedSection wrapper)
        - Ensure ServicesSection.tsx also handles mobileBreakpoint internally
      */}
      <div className="relative w-full bg-black" style={{ zIndex: 50 }}>
        <ServicesSection />
      </div>

      {/* PORTFOLIO - Commented out per your original code */}
      {/* 
      <PinnedSection zIndex={50} isTall={true} className="bg-black" disableOnMobile={true}>
        <PortfolioSection />
      </PinnedSection> 
      */}

      {/* WHY CHOOSE US - Natural flow section */}
      <div className="relative w-full bg-black" style={{ zIndex: 60 }}>
        <WhyChooseUs />
      </div>

      {/* 
        CONTACT SECTION 
        - Contains forms: Disable pin on mobile for easier input access
        - Users can scroll naturally to submit without "trapped" pinning
      */}
      <PinnedSection 
        zIndex={70} 
        isTall={true} 
        className="bg-black"
        disableOnMobile={true}
        mobileBreakpoint={768}
      >
        <ContactSection />
      </PinnedSection>

    </main>
  );
}