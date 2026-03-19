"use client";
import React, { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";

const services = [
  { emoji: "🎬", title: "Video Production", desc: "From ideation to execution — high-end production and distribution tailored to your brand." },
  { emoji: "📲", title: "Digital Content", desc: "Social media content and digital campaigns with visuals that communicate complex ideas clearly." },
  { emoji: "🤝", title: "Media Consultation", desc: "End-to-end consultation ensuring your projects run smoothly and yield measurable results." },
];

const AboutSection = () => {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  const statsElRef = useRef<HTMLSpanElement>(null);
  const statsTriggered = useRef(false);

  useEffect(() => {
    if (!gridInView || statsTriggered.current) return;
    statsTriggered.current = true;

    const el = statsElRef.current;
    if (!el) return;

    const target = 50;
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.ceil(eased * target) + "+";
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [gridInView]);

  return (
    <section
      id="about"
      className="relative min-h-screen bg-black text-white py-24 md:py-32 px-6 sm:px-16 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60ch] h-[60ch] bg-rose-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40ch] h-[40ch] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-16">

        {/* Title — char-by-char slideUpReveal keyframe */}
        <div ref={titleRef} className="text-center overflow-hidden">
          <span
            className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4 block font-sans"
            style={{ opacity: titleInView ? undefined : 0, animation: titleInView ? "fadeUpIn 0.6s ease both" : undefined }}
          >
            Who we are
          </span>
          <h2 className="text-6xl sm:text-7xl md:text-9xl font-display font-bold uppercase tracking-tighter overflow-hidden">
            {"About Us".split("").map((char, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span
                  style={{
                    display: "inline-block",
                    opacity: titleInView ? undefined : 0,
                    animation: titleInView
                      ? `slideUpReveal 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms both`
                      : undefined,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Bento grid — staggered fadeUpIn keyframes */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">

          {/* Main card */}
          <div
            className="bento-card md:col-span-2 p-8 md:p-12 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-sm flex flex-col justify-between"
            style={{
              opacity: gridInView ? undefined : 0,
              animation: gridInView ? "fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) 0ms both" : undefined,
            }}
          >
            <div>
              <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-rose-accent bg-rose-accent/10 rounded-full mb-6 font-sans font-bold">
                Cinematic Studio
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
                Stories told with purpose.<br />Results that make an impact.
              </h3>
              <p className="text-white/60 text-xl md:text-2xl font-sans leading-relaxed max-w-2xl">
                We use creative, effective media solutions to bring stories to life and elevate brand voices — delivering high-quality, tailored content that reflects your vision and engages your audience.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-[2px] bg-gradient-to-r from-rose-accent to-transparent" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans">Est. 2020</span>
            </div>
          </div>

          {/* Stats card */}
          <div
            className="bento-card p-8 rounded-3xl bg-rose-accent/10 border border-rose-accent/20 flex flex-col items-center justify-center"
            style={{
              opacity: gridInView ? undefined : 0,
              animation: gridInView ? "fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) 120ms both" : undefined,
            }}
          >
            <span ref={statsElRef} id="stats-number" className="text-7xl md:text-8xl font-display font-black">0+</span>
            <span className="text-sm font-display font-bold uppercase text-rose-accent">Global Brands</span>
          </div>

          {/* Service cards */}
          {services.map((s, i) => (
            <div
              key={i}
              className="bento-card p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-rose-accent/30 transition-colors flex flex-col justify-center"
              style={{
                opacity: gridInView ? undefined : 0,
                animation: gridInView
                  ? `fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) ${(i + 2) * 120}ms both`
                  : undefined,
              }}
            >
              <div className="text-4xl mb-4">{s.emoji}</div>
              <h4 className="text-2xl font-display font-bold mb-4">{s.title}</h4>
              <p className="text-white/60 text-base md:text-lg font-sans leading-relaxed">{s.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
