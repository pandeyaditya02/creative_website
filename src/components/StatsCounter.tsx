"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const statsData = [
    { value: 18, label: "YEARS EXPERIENCE", suffix: "" },
    { value: 60, label: "CLIENTELE", suffix: "+" },
    { value: 150, label: "PROJECTS DELIVERED", suffix: "+" },
];

export default function StatsCounter() {
    const containerRef = useRef<HTMLDivElement>(null);
    const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Scroll Reveal Animation (Fade in + translate up)
        gsap.fromTo(
            container,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%", // Trigger when top of container hits 80% down viewport
                    toggleActions: "play reverse play reverse",
                },
            }
        );

        // Count-Up Animation
        const ctx = gsap.context(() => {
            numbersRef.current.forEach((numElement, index) => {
                if (!numElement) return;

                const targetValue = statsData[index].value;
                const startObj = { val: 0 };

                gsap.to(startObj, {
                    val: targetValue,
                    duration: 2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%",
                        toggleActions: "play reverse play reverse",
                    },
                    onUpdate: () => {
                        // Update the text content, rounding to the nearest integer
                        numElement.innerText = Math.round(startObj.val).toString();
                    },
                });
            });
        }, container);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full bg-[#0a0a0a] py-32 md:py-48 px-6 md:px-12 lg:px-24 text-white overflow-hidden flex flex-col justify-center items-center"
        >
            <div className="flex flex-col items-center gap-4 mb-24 lg:mb-32">
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#F67963] font-medium">
                    Company Statistics
                </span>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-white text-center">
                    Why Trust Us
                </h2>
                <div className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-2" />
            </div>
            <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
                {statsData.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">
                        <div className="flex items-baseline mb-4">
                            <span
                                ref={(el) => {
                                    numbersRef.current[index] = el;
                                }}
                                className="text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-black tracking-tighter text-white leading-none"
                                style={{ fontVariationSettings: '"wght" 900' }}
                            >
                                0
                            </span>
                            {stat.suffix && (
                                <span className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold text-coral ml-1 leading-none">
                                    {stat.suffix}
                                </span>
                            )}
                        </div>
                        <p className="text-sm md:text-base lg:text-lg tracking-[0.3em] lg:tracking-[0.4em] font-medium text-slate-400 uppercase">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
