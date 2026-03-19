"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, Plus, Play, Info, Mail } from "lucide-react";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const navLinks = [
  { href: "#work", label: "WORK", icon: <Play size={18} /> },
  { href: "#about", label: "ABOUT", icon: <Info size={18} /> },
  { href: "#services", label: "SERVICES", icon: <Plus size={18} /> },
  { href: "#contact", label: "CONTACT", icon: <Mail size={18} /> },
];

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isMobileView = useIsMobile(768);
  const reduceMotion = usePrefersReducedMotion();

  const navRef = useRef<HTMLElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  // Listen for preloader finish
  useEffect(() => {
    const handler = () => setIsPreloaderDone(true);
    window.addEventListener("preloaderFinished", handler);
    return () => window.removeEventListener("preloaderFinished", handler);
  }, []);

  // Scroll Progress and Active Section
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);

      let current = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.href.substring(1));
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = link.href;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (target) {
      const position = target.getBoundingClientRect().top + window.scrollY;
      if (window.__lenisInstance) {
        window.__lenisInstance.scrollTo(position, { duration: 1.5 });
      } else {
        window.scrollTo({ top: position, behavior: "smooth" });
      }
      setIsMenuOpen(false);
    }
  };

  useGSAP(() => {
    if (!isPreloaderDone) return;
    gsap.fromTo([navRef.current, hudRef.current], 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
  }, [isPreloaderDone]);

  return (
    <>
      {/* 1. Main Floating Nav (Top Left) */}
      <nav ref={navRef} className="fixed top-8 left-8 z-[100] hidden md:block">
        <Link href="/" className="group flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <Image src="/LOGO SAMP 01.png" alt="Logo" width={32} height={10} className="w-8 h-auto" />
          </div>
        </Link>
      </nav>

      {/* 2. Progress Sidebar (Right) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-8 py-8 hidden md:flex">
        <div className="h-64 w-[2px] bg-white/10 relative rounded-full overflow-hidden">
          <div 
            ref={progRef}
            className="absolute top-0 left-0 w-full bg-rose-accent transition-all duration-100 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        <div className="flex flex-col gap-6 text-[10px] font-bold tracking-widest uppercase [writing-mode:vertical-lr] text-white/40">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`hover:text-rose-accent transition-colors ${activeSection === link.href ? "text-rose-accent" : ""}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Circular HUD (Bottom Left) */}
      <div ref={hudRef} className="fixed bottom-8 left-8 z-[100] hidden md:block">
        <div className="relative group">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-16 h-16 bg-surface border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-500 hover:border-rose-accent hover:rotate-90"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* HUD Menu Items */}
          <div className={`absolute bottom-20 left-0 flex flex-col gap-4 transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
            {navLinks.map((link, i) => (
              <button
                key={link.label}
                onClick={(e) => scrollToSection(e, link.href)}
                className="w-12 h-12 bg-surface border border-white/10 rounded-full flex items-center justify-center text-white/60 transition-all duration-300 hover:text-rose-accent hover:border-rose-accent hover:scale-110"
                style={{ transitionDelay: `${i * 50}ms` }}
                title={link.label}
              >
                {link.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Mobile Nav */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex md:hidden items-center justify-between p-6 bg-noir/80 backdrop-blur-md border-b border-white/5">
        <Image src="/LOGO SAMP 01.png" alt="Logo" width={100} height={30} className="h-6 w-auto" />
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* 5. Fullscreen Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[110] bg-noir md:hidden transition-transform duration-700 ease-[cubic-bezier(0.76, 0, 0.24, 1)] ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-4xl font-display font-bold text-white uppercase tracking-tighter hover:text-rose-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-12 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
            <X size={20} className="text-white/40" onClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
 Navbar;
