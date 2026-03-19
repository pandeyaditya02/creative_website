"use client";
import React, { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";

const statsData = [
  { value: 18, label: "YEARS EXPERIENCE", suffix: "+" },
  { value: 60, label: "CLIENTELE", suffix: "+" },
  { value: 150, label: "PROJECTS DELIVERED", suffix: "+" },
];

export default function StatsCounter() {
  const [headingRef, headingInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const countersStarted = useRef(false);

  useEffect(() => {
    if (!gridInView || countersStarted.current) return;
    countersStarted.current = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    statsData.forEach((stat, index) => {
      const el = numbersRef.current[index];
      if (!el) return;

      if (reduceMotion) {
        el.textContent = stat.value.toString();
        return;
      }

      // Stagger counter start so it matches the card animation delay
      const delay = index * 120;
      const duration = 2000;

      setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * stat.value).toString();
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay);
    });
  }, [gridInView]);

  return (
    <section
      id="work-stats"
      className="w-full bg-noir py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12 text-white overflow-hidden"
      aria-labelledby="stats-heading"
    >
      {/* Heading block */}
      <div
        ref={headingRef}
        className="flex flex-col items-center gap-4 mb-16 md:mb-20 lg:mb-24"
      >
        <span
          className="inline-flex items-center gap-2 text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.35em] text-rose-accent font-sans font-bold"
          style={{
            opacity: headingInView ? undefined : 0,
            animation: headingInView ? "fadeUpIn 0.6s ease 0ms both" : undefined,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-accent blink-coral" />
          Company Statistics
        </span>

        <h2
          id="stats-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-white text-center"
          style={{
            opacity: headingInView ? undefined : 0,
            animation: headingInView ? "fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) 80ms both" : undefined,
          }}
        >
          Why Trust Us
        </h2>

        <div
          className="w-12 h-[2px] bg-gradient-to-r from-rose-accent to-transparent mt-2"
          style={{
            opacity: headingInView ? undefined : 0,
            animation: headingInView ? "fadeUpIn 0.6s ease 200ms both" : undefined,
          }}
        />
      </div>

      {/* Stats grid — each item animates in with its own staggered delay */}
      <div
        ref={gridRef}
        className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12"
      >
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center px-4"
            style={{
              opacity: gridInView ? undefined : 0,
              animation: gridInView
                ? `fadeUpIn 0.9s cubic-bezier(0.16,1,0.3,1) ${index * 120}ms both`
                : undefined,
            }}
          >
            <div className="flex items-end justify-center mb-4 md:mb-6">
              <span
                ref={(el) => { numbersRef.current[index] = el; }}
                className="font-display font-black text-white leading-none
                           text-7xl sm:text-8xl md:text-9xl lg:text-[10rem]
                           [font-variation-settings:'wght'_900]"
                style={{ whiteSpace: "nowrap", lineHeight: "0.9" }}
              >
                0
              </span>

              {stat.suffix && (
                <span
                  className="font-display font-bold text-rose-accent leading-none ml-1 md:ml-2
                             text-5xl sm:text-6xl md:text-7xl lg:text-[7rem]"
                  style={{ marginBottom: "0.1em", lineHeight: "0.9" }}
                >
                  {stat.suffix}
                </span>
              )}
            </div>

            <p className="text-xs md:text-sm lg:text-base font-sans tracking-[0.25em] md:tracking-[0.3em] font-bold text-slate-400 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
