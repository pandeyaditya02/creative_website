"use client";
import React, { useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";

const ContactSection = () => {
  const [containerRef, inView] = useInView<HTMLElement>({ threshold: 0.08 });
  const btnRef = useRef<HTMLButtonElement>(null);

  // Magnetic button — vanilla JS
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
      btn.style.transform = `translate(${x}px, ${y}px)`;
      btn.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    };

    const handleMouseLeave = () => {
      btn.style.transform = "translate(0px, 0px)";
      btn.style.transition = "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)";
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Helper — keyframe fadeUpIn with delay
  const fadeUp = (delay: number) => ({
    opacity: inView ? undefined : 0,
    animation: inView ? `fadeUpIn 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` : undefined,
  });

  // Helper — mask-reveal (slideUpReveal) with delay
  const slideUp = (delay: number) => ({
    display: "inline-block" as const,
    opacity: inView ? undefined : 0,
    animation: inView ? `slideUpReveal 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` : undefined,
  });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-[100svh] bg-[#0a0a0a] text-white pt-32 pb-24 md:pt-48 md:pb-32 lg:pt-56 lg:pb-44 px-6 md:px-12 lg:px-24 overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[min(800px,150vw)] h-[min(800px,150vw)] rounded-full bg-[radial-gradient(circle,rgba(246,121,99,0.1)_0%,transparent_60%)] translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-16 relative z-10">

        {/* Left column */}
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Mask-reveal headline */}
            <div className="overflow-hidden mb-[-2vw] lg:mb-[-1.5vw]">
              <h2
                className="text-[clamp(3rem,18vw,20rem)] lg:text-[11vw] font-bold uppercase tracking-tighter text-white leading-[0.8] m-0 p-0"
                style={slideUp(0)}
              >
                LET&apos;S
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                className="text-[clamp(3rem,18vw,20rem)] lg:text-[11vw] font-bold uppercase tracking-tighter text-[#F67963] leading-[0.8] m-0 p-0"
                style={slideUp(120)}
              >
                TALK.
              </h2>
            </div>
          </div>

          <div className="mt-16 lg:mt-32 space-y-10 lg:space-y-12">
            <div style={fadeUp(200)}>
              <p className="text-[#555] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Drop us a line</p>
              <a
                href="mailto:info@creativechauk.com"
                className="text-xl md:text-3xl font-medium tracking-tight hover:text-[#F67963] transition-colors duration-300"
              >
                cc@creativechauk.com
              </a>
            </div>
            <div style={fadeUp(250)}>
              <p className="text-[#555] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Call us</p>
              <a
                href="tel:+919811922230"
                className="text-xl md:text-3xl font-medium tracking-tight hover:text-[#F67963] transition-colors duration-300"
              >
                +91 98119 22230
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-16" style={fadeUp(300)}>
              <div>
                <p className="text-[#555] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Socials</p>
                <div className="flex flex-col gap-2">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-base font-medium tracking-wide hover:text-[#F67963] transition-colors duration-300">Instagram</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-base font-medium tracking-wide hover:text-[#F67963] transition-colors duration-300">LinkedIn</a>
                </div>
              </div>
              <div>
                <p className="text-[#555] text-xs font-semibold uppercase tracking-[0.3em] mb-3 opacity-0 sm:opacity-100 hidden sm:block">Space</p>
                <div className="flex flex-col gap-2">
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-base font-medium tracking-wide hover:text-[#F67963] transition-colors duration-300">X</a>
                  <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="text-base font-medium tracking-wide hover:text-[#F67963] transition-colors duration-300">Vimeo</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: form */}
        <div className="flex flex-col justify-center lg:pl-16 xl:pl-24">
          <form className="flex flex-col gap-10 md:gap-14 w-full">

            <div style={fadeUp(100)}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-transparent border-b border-white/20 text-white placeholder-[#777] focus:outline-none focus:border-[#F67963] transition-colors duration-300 pb-4 text-lg md:text-xl font-light"
              />
            </div>

            <div style={fadeUp(180)}>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-white/20 text-white placeholder-[#777] focus:outline-none focus:border-[#F67963] transition-colors duration-300 pb-4 text-lg md:text-xl font-light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-8" style={fadeUp(260)}>
              <div className="relative">
                <select defaultValue="" className="w-full bg-transparent border-b border-white/20 text-[#777] focus:text-white focus:outline-none focus:border-[#F67963] transition-colors duration-300 pb-4 text-lg md:text-xl font-light appearance-none rounded-none cursor-pointer">
                  <option value="" disabled>Project Type</option>
                  <option value="av" className="bg-[#111] text-white">AV Production</option>
                  <option value="digital" className="bg-[#111] text-white">Digital Content</option>
                  <option value="branded" className="bg-[#111] text-white">Branded Content</option>
                  <option value="consultation" className="bg-[#111] text-white">Consultation</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 pb-4">
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>

              <div className="relative">
                <select defaultValue="" className="w-full bg-transparent border-b border-white/20 text-[#777] focus:text-white focus:outline-none focus:border-[#F67963] transition-colors duration-300 pb-4 text-lg md:text-xl font-light appearance-none rounded-none cursor-pointer">
                  <option value="" disabled>Budget Range</option>
                  <option value="<5L" className="bg-[#111] text-white">&lt; ₹5L</option>
                  <option value="5-15L" className="bg-[#111] text-white">₹5L - ₹15L</option>
                  <option value=">15L" className="bg-[#111] text-white">&gt; ₹15L</option>
                  <option value="tbd" className="bg-[#111] text-white">To Be Decided</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 pb-4">
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>

            <div style={fadeUp(340)}>
              <textarea
                placeholder="Tell us about your project..."
                rows={2}
                className="w-full bg-transparent border-b border-white/20 text-white placeholder-[#777] focus:outline-none focus:border-[#F67963] transition-colors duration-300 pb-4 text-lg md:text-xl font-light resize-none"
              />
            </div>

            <div className="flex sm:justify-end mt-4" style={fadeUp(420)}>
              <button
                ref={btnRef}
                type="button"
                className="w-36 h-36 md:w-44 md:h-44 bg-[#F67963] text-black rounded-full font-bold uppercase tracking-widest flex items-center justify-center hover:bg-white transition-colors duration-500 will-change-transform shadow-[0_0_30px_rgba(246,121,99,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
              >
                <span className="pointer-events-none text-sm md:text-base">Submit</span>
              </button>
            </div>

          </form>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-12 lg:left-24 text-[#A1A1A1]/40 text-xs tracking-wider">
        © 2026 Creative Chauk.
      </div>
    </section>
  );
};

export default ContactSection;
