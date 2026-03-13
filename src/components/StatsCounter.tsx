"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const statsData = [
    { value: 18, label: "YEARS EXPERIENCE", suffix: "+" },
    { value: 60, label: "CLIENTELE", suffix: "+" },
    { value: 150, label: "PROJECTS DELIVERED", suffix: "+" },
];

export default function StatsCounter() {
    const containerRef = useRef<HTMLDivElement>(null);
    const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobileView(isMobile());
        checkMobile();
        
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(checkMobile, 150);
        };
        
        window.addEventListener("resize", handleResize);
        return () => {
            clearTimeout(resizeTimeout);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const mobile = isMobileView;
        if (!container) return;

        gsap.fromTo(
            container,
            { opacity: 0, y: mobile ? 20 : 50 },
            {
                opacity: 1,
                y: 0,
                duration: mobile ? 0.6 : 1,
                ease: mobile ? "power2.out" : "power3.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 85%",
                    toggleActions: mobile ? "play none none none" : "play reverse play reverse",
                    once: mobile,
                },
            }
        );

        const ctx = gsap.context(() => {
            numbersRef.current.forEach((numElement, index) => {
                if (!numElement) return;

                const targetValue = statsData[index].value;
                const startObj = { val: 0 };

                gsap.to(startObj, {
                    val: targetValue,
                    duration: mobile ? 1.2 : 2,
                    ease: mobile ? "power2.out" : "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 85%",
                        toggleActions: mobile ? "play none none none" : "play reverse play reverse",
                        once: mobile,
                    },
                    onUpdate: () => {
                        if (numElement) {
                            const rounded = Math.round(startObj.val);
                            numElement.innerText = rounded.toString();
                        }
                    },
                });
            });
        }, container);

        return () => {
            ctx.revert();
        };
    }, [isMobileView]);

    return (
        <section
            ref={containerRef}
            className="w-full bg-[#0a0a0a] py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12 text-white overflow-hidden"
            aria-labelledby="stats-heading"
        >
            {/* Header */}
            <div className="flex flex-col items-center gap-4 mb-16 md:mb-20 lg:mb-24">
                <span className="text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.35em] text-[#F67963] font-medium">
                    Company Statistics
                </span>
                
                <h2 
                    id="stats-heading"
                    className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white text-center"
                >
                    Why Trust Us
                </h2>
                
                <div className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-2" />
            </div>

            {/* Stats Grid */}
            <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
                {statsData.map((stat, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col items-center justify-center text-center px-4"
                    >
                        {/* Number + Suffix Container */}
                        <div className="flex items-end justify-center mb-4 md:mb-6">
                            {/* Number */}
                            <span
                                ref={(el) => {
                                    numbersRef.current[index] = el;
                                }}
                                className="font-black text-white leading-none
                                         text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] 
                                         [font-variation-settings:'wght'_900]"
                                style={{ 
                                    whiteSpace: "nowrap",
                                    lineHeight: "0.9"
                                }}
                            >
                                0
                            </span>
                            
                            {/* Suffix (+) */}
                            {stat.suffix && (
                                <span 
                                    className="font-bold text-[#F67963] leading-none ml-1 md:ml-2
                                             text-5xl sm:text-6xl md:text-7xl lg:text-[7rem]"
                                    style={{ 
                                        marginBottom: "0.1em",
                                        lineHeight: "0.9"
                                    }}
                                >
                                    {stat.suffix}
                                </span>
                            )}
                        </div>
                        
                        {/* Label - with proper spacing */}
                        <p 
                            className="text-xs md:text-sm lg:text-base 
                                     tracking-[0.25em] md:tracking-[0.3em] 
                                     font-medium text-slate-400 uppercase"
                        >
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}