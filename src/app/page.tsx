import Hero from "@/components/home/Hero";
import StorySection from "@/components/home/StorySection";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-black w-full flex flex-col items-center overflow-x-hidden">
      <Hero />
      <StorySection />
      <PortfolioGrid />

      {/* Temporary Colossal Footer Placeholder */}
      <footer className="w-full bg-black py-32 px-6 border-t border-white/10 flex flex-col justify-end min-h-[50vh]">
        <h1 className="text-[12vw] leading-none font-bold uppercase tracking-tighter text-white mt-auto text-center">
          AGENCY
        </h1>
      </footer>
    </main>
  );
}
