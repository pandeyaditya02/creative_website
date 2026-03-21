"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const navLinks = [
  { href: "#work-stats", label: "WORK" },
  { href: "#about", label: "ABOUT US" },
  { href: "#services", label: "SERVICES" },
  { href: "#contact", label: "CONTACT US" },
];

const Navbar = () => {
  const [time, setTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isMobileView = useIsMobile(768);
  const reduceMotion = usePrefersReducedMotion();

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasPlayedEntrance = useRef(false);

  /**
   * Compute the correct scroll target for a section, accounting for GSAP-pinned
   * elements. When GSAP pins an element it wraps it in a spacer div and sets the
   * element to position:fixed. The spacer stays in normal document flow, so we
   * traverse up from the target to find the spacer and use its position instead.
   */
  const getScrollTarget = useCallback((elementId: string, headerOffset: number = 80): number | null => {
    const element = document.getElementById(elementId);
    if (!element) return null;

    let current: HTMLElement | null = element;
    let fixedAncestor: HTMLElement | null = null;

    while (current && current !== document.body) {
      if (window.getComputedStyle(current).position === "fixed") {
        fixedAncestor = current;
        break;
      }
      current = current.parentElement;
    }

    if (fixedAncestor?.parentElement) {
      const spacer = fixedAncestor.parentElement;
      return spacer.getBoundingClientRect().top + window.scrollY - headerOffset;
    }

    return element.getBoundingClientRect().top + window.scrollY - headerOffset;
  }, []);

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetScroll = getScrollTarget(targetId);
      if (targetScroll === null) return;

      const position = Math.max(0, targetScroll);

      if (window.__lenisInstance) {
        window.__lenisInstance.scrollTo(position, { duration: 1.5 });
      } else {
        window.scrollTo({ top: position, behavior: "smooth" });
      }
      setIsMenuOpen(false);
    },
    [getScrollTarget],
  );

  // Listen for preloader finish
  useEffect(() => {
    const handler = () => setIsPreloaderDone(true);
    window.addEventListener("preloaderFinished", handler);
    return () => window.removeEventListener("preloaderFinished", handler);
  }, []);

  // Live time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.href.substring(1));
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = link.href;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!isMobileView || !mobileMenuRef.current) return;

    if (menuTimelineRef.current) {
      menuTimelineRef.current.kill();
    }

    menuTimelineRef.current = gsap.timeline({
      defaults: {
        ease: reduceMotion ? "none" : "power2.out",
        duration: reduceMotion ? 0 : 0.3,
      },
    });

    if (isMenuOpen) {
      menuTimelineRef.current
        .set(mobileMenuRef.current, { x: "100%", autoAlpha: 0, pointerEvents: "none" })
        .to(mobileMenuRef.current, {
          x: "0%",
          autoAlpha: 1,
          pointerEvents: "auto",
          duration: reduceMotion ? 0 : 0.3,
        });
    } else {
      menuTimelineRef.current.to(mobileMenuRef.current, {
        x: "100%",
        autoAlpha: 0,
        pointerEvents: "none",
        duration: reduceMotion ? 0 : 0.25,
        ease: reduceMotion ? "none" : "power2.in",
      });
    }

    return () => {
      if (menuTimelineRef.current) {
        menuTimelineRef.current.kill();
      }
    };
  }, [isMenuOpen, isMobileView, reduceMotion]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobileView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isMobileView]);

  // --- Main GSAP hook: entrance animation → scroll hide/show → magnetic hover ---
  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const mobile = isMobileView;
      const handlers: {
        el: HTMLElement;
        enter: () => void;
        leave: () => void;
        move: (e: MouseEvent) => void;
      }[] = [];

      // Before preloader finishes: keep navbar hidden
      if (!isPreloaderDone) {
        gsap.set(nav, { autoAlpha: 0 });
        return;
      }

      let entranceDone = false;

      // --- Entrance animation (plays once) ---
      if (!hasPlayedEntrance.current) {
        hasPlayedEntrance.current = true;

        gsap.set(nav, { autoAlpha: 0, y: -60 });

        const entranceTl = gsap.timeline({
          defaults: {
            ease: reduceMotion ? "none" : "power4.out",
            duration: reduceMotion ? 0 : 0.8,
          },
          onComplete: () => {
            entranceDone = true;
          },
        });

        entranceTl.to(nav, {
          autoAlpha: 1,
          y: 0,
          duration: reduceMotion ? 0 : 0.8,
          ease: reduceMotion ? "none" : "power3.out",
        });

        entranceTl.fromTo(
          logoRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: reduceMotion ? 0 : 0.6 },
          "-=0.4",
        );

        if (!mobile) {
          entranceTl
            .fromTo(
              ".nav-link",
              { y: -20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: reduceMotion ? 0 : 0.5,
              },
              "-=0.3",
            )
            .fromTo(
              timeRef.current,
              { y: -15, opacity: 0, scale: 0.9 },
              { y: 0, opacity: 1, scale: 1, duration: reduceMotion ? 0 : 0.5 },
              "-=0.2",
            );
        }
      } else {
        entranceDone = true;
        gsap.set(nav, { autoAlpha: 1, y: 0 });
        gsap.set(logoRef.current, { y: 0, opacity: 1 });
        gsap.set(".nav-link", { y: 0, opacity: 1 });
        gsap.set(timeRef.current, { y: 0, opacity: 1, scale: 1 });
      }

      // --- Scroll hide/show (only active after entrance finishes) ---
      // Uses a direct scroll listener + rAF throttle instead of ScrollTrigger on a
      // fixed element, which is unreliable for direction detection.
      const showAnim = gsap
        .fromTo(
          nav,
          { yPercent: -100 },
          {
            yPercent: 0,
            duration: reduceMotion ? 0 : mobile ? 0.25 : 0.4,
            paused: true,
            ease: reduceMotion ? "none" : "power2.out",
          },
        )
        .progress(1);

      let lastScrollY = window.scrollY;
      let rafId = 0;

      const onScroll = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (!entranceDone) return;

          const currentY = window.scrollY;
          const delta = currentY - lastScrollY;
          lastScrollY = currentY;

          const contactEl = document.getElementById("contact");
          const contactInView = contactEl
            ? contactEl.getBoundingClientRect().top < window.innerHeight
            : false;

          if (currentY < 100 || contactInView) {
            showAnim.play();
          } else if (delta < 0) {
            // Scrolling up — slide navbar down into view
            showAnim.play();
          } else if (delta > 0) {
            // Scrolling down — slide navbar up out of view
            showAnim.reverse();
          }
        });
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      // --- Desktop: Magnetic hover ---
      if (!mobile && !reduceMotion) {
        const links = document.querySelectorAll(".nav-link");

        links.forEach((link) => {
          const el = link as HTMLElement;
          const underline = el.querySelector(".link-underline");

          const onEnter = () => {
            gsap.to(underline, {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const onLeave = () => {
            gsap.to(underline, {
              scaleX: 0,
              transformOrigin: "right center",
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.5)",
            });
          };

          const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
            gsap.to(el, { x, y, duration: 0.2, ease: "power1.out" });
          };

          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          el.addEventListener("mousemove", onMove);
          handlers.push({ el, enter: onEnter, leave: onLeave, move: onMove });
        });
      }

      return () => {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(rafId);
        handlers.forEach((h) => {
          h.el.removeEventListener("mouseenter", h.enter);
          h.el.removeEventListener("mouseleave", h.leave);
          h.el.removeEventListener("mousemove", h.move);
        });
      };
    },
    { scope: navRef, dependencies: [isMobileView, reduceMotion, isPreloaderDone] },
  );

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 z-[100] w-full flex items-center justify-between text-white transition-colors duration-300 
                   bg-transparent px-4 md:px-8 py-2 md:py-3"
      >
        {/* Logo */}
        <div ref={logoRef} className="flex items-center group cursor-pointer">
          <Image
            src="/LOGO SAMP 01.png"
            alt="Creative Chauk Production"
            width={128}
            height={40}
            className="w-24 md:w-32 h-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div
          ref={linksRef}
          className="hidden md:flex items-center gap-8 lg:gap-12 text-xs lg:text-sm font-semibold tracking-widest"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`nav-link relative py-2 px-1 transition-colors min-h-[44px] flex items-center ${activeSection === link.href ? "text-[#F67963]" : "hover:text-[#F67963]"}`}
            >
              {link.label}
              <span
                className={`link-underline absolute bottom-0 left-0 w-full h-[2px] bg-[#F67963] origin-left transition-transform duration-300 ${activeSection === link.href ? "scale-x-100" : "scale-x-0"}`}
              />
            </Link>
          ))}

          {/* Time - Desktop only */}
          <div
            ref={timeRef}
            className="ml-4 lg:ml-8 text-[#F67963] flex items-center gap-2 tabular-nums min-h-[44px]"
          >
            <span className="relative">
              <span className="absolute -left-3 w-2 h-2 bg-[#F67963] rounded-full animate-pulse" />
              {time}
            </span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          ref={menuBtnRef}
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 
                     w-11 h-11 min-h-[44px] min-w-[44px] p-2 -m-2 
                     text-white focus:outline-none focus:ring-2 focus:ring-[#F67963] rounded-lg"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center
              ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300
              ${isMenuOpen ? "opacity-0 scale-0" : "opacity-100"}`}
          />
          <span
            className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center
              ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileView && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden
              ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className="fixed top-0 right-0 z-[130] w-4/5 max-w-sm h-full bg-[#0a0a0a] 
                       shadow-2xl md:hidden flex flex-col translate-x-full opacity-0"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <span className="text-sm font-semibold text-[#F67963] uppercase tracking-wider">
                Menu
              </span>
              <button
                onClick={closeMenu}
                className="w-10 h-10 min-h-[44px] min-w-[44px] flex items-center justify-center 
                           text-white hover:text-[#F67963] transition-colors rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-[#F67963]"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`nav-link-mobile group flex items-center justify-between 
                             py-4 px-3 text-lg font-semibold rounded-lg transition-colors
                             ${activeSection === link.href ? "text-[#F67963] bg-white/5" : "text-white hover:text-[#F67963] active:bg-white/5"}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.label}
                  <span
                    className={`link-arrow opacity-0 group-hover:opacity-100 
                                   group-hover:translate-x-1 transition-all duration-200 ${activeSection === link.href ? "opacity-100 translate-x-1" : ""}`}
                  >
                    →
                  </span>
                </Link>
              ))}
            </nav>

            {/* Time + Footer */}
            <div className="px-6 py-5 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 uppercase tracking-wider">
                  Live
                </span>
                <span className="text-[#F67963] font-mono tabular-nums flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F67963] rounded-full animate-pulse" />
                  {time}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
