"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const services = [
    { emoji: "🎬", title: "Video Production", desc: "From ideation to execution — high-end production and distribution tailored to your brand." },
    { emoji: "📲", title: "Digital Content", desc: "Social media content and digital campaigns with visuals that communicate complex ideas clearly." },
    { emoji: "🤝", title: "Media Consultation", desc: "End-to-end consultation ensuring your projects run smoothly and yield measurable results." }
  ];

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);

    gsap.to(q(".bg-blob"), {
      y: (i) => (i === 0 ? 100 : -150),
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    gsap.to(q(".title-char"), {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: q(".title-container"),
        start: "top 85%",
        end: "top 60%",
        scrub: 1
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    tl.fromTo(q(".bento-card"), 
      { y: 70, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 2, stagger: 0.2, ease: "power3.out" }
    );

    const statsObj = { val: 0 };
    gsap.to(statsObj, {
      val: 50,
      scrollTrigger: {
        trigger: q(".stats-card"),
        start: "top 80%",
        end: "top 50%",
        scrub: true,
        onUpdate: () => {
          const el = document.getElementById("stats-number");
          if (el) el.textContent = Math.ceil(statsObj.val) + "+";
        }
      }
    });

    q(".reveal-text").forEach((el) => {
      gsap.fromTo(el, 
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse"
          } 
        }
      );
    });

  }, { scope: containerRef });

  const renderSplitTitle = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="title-char inline-block translate-y-full opacity-0">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black text-white py-24 md:py-32 px-6 sm:px-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-blob absolute top-0 right-0 w-[60ch] h-[60ch] bg-[#F67963]/5 rounded-full blur-[120px] will-change-transform" />
        <div className="bg-blob absolute bottom-0 left-0 w-[40ch] h-[40ch] bg-white/5 rounded-full blur-[100px] will-change-transform" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-16">
        <div className="text-center title-container">
          <span className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4 block">Who we are</span>
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-bold uppercase tracking-tighter overflow-hidden">
            {renderSplitTitle("About Us")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          
          {/* Main Card */}
          <div className="bento-card md:col-span-2 p-8 md:p-12 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#F67963] bg-[#F67963]/10 rounded-full mb-6 reveal-text">
                Creative Chauk
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight reveal-text">
                Stories told with purpose.<br />Results that make an impact.
              </h3>
              {/* INCREASED FONT SIZE HERE: Changed from text-lg md:text-xl to text-xl md:text-2xl */}
              <p className="text-white/60 text-xl md:text-2xl leading-relaxed max-w-2xl reveal-text">
                We use creative, effective media solutions to bring stories to life and elevate brand voices — delivering high-quality, tailored content that reflects your vision and engages your audience.
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-8 reveal-text">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Est. 2020</span>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bento-card stats-card p-8 rounded-3xl bg-[#F67963]/10 border border-[#F67963]/20 flex flex-col items-center justify-center">
            <span id="stats-number" className="text-7xl md:text-8xl font-black">0+</span>
            <span className="text-sm font-bold uppercase text-[#F67963]">Global Brands</span>
          </div>

          {/* Services */}
          {services.map((s, i) => (
            <div key={i} className="bento-card p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-[#F67963]/30 transition-colors flex flex-col justify-center">
              <div className="text-4xl mb-4">{s.emoji}</div>
              <h4 className="text-2xl font-bold mb-4">{s.title}</h4>
              {/* INCREASED FONT SIZE HERE: Changed from text-sm to text-base md:text-lg, added leading-relaxed */}
              <p className="text-white/60 text-base md:text-lg leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;