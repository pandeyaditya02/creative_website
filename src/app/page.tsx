import HeroVideo from "@/components/HeroVideo";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import FeaturedSection from "@/components/FeaturedSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroVideo />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <FeaturedSection />
      <ContactSection />
    </main>
  );
}
