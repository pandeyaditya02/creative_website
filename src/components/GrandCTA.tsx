"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ctaWords = ["Let's", "Bring", "Your", "Vision", "to", "Life!"];

const GrandCTA = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        // Word-by-word mask-up reveal
        const wordEls = gsap.utils.toArray<HTMLElement>(".cta-word");

        gsap.fromTo(wordEls,
            { yPercent: 110, opacity: 0 },
            {
                yPercent: 0,
                opacity: 1,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    end: "top 35%",
                    scrub: 0.8
                }
            }
        );

        // Subtext fade-in
        gsap.fromTo(".cta-subtext",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".cta-subtext",
                    start: "top 85%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        // Button reveal
        gsap.fromTo(".cta-button",
            { y: 20, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".cta-button",
                    start: "top 90%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        // Magnetic hover effect for button
        const btn = document.querySelector(".cta-button") as HTMLElement;
        if (btn) {
            const handleMouseMove = (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };
            const handleMouseLeave = () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
            };
            btn.addEventListener("mousemove", handleMouseMove);
            btn.addEventListener("mouseleave", handleMouseLeave);
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative bg-black text-white py-40 lg:py-52 overflow-hidden">
            {/* Radial Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(246,121,99,0.08)_0%,transparent_70%)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Word-by-word heading */}
                <h2
                    ref={headingRef}
                    className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-12"
                >
                    {ctaWords.map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                            <span className="cta-word inline-block">
                                {word}
                            </span>
                        </span>
                    ))}
                </h2>

                {/* Subtext */}
                <p className="cta-subtext text-[#A1A1A1] text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-14">
                    Ready to start a project or learn more about our services? Contact us today to see how
                    Creative Chauk can help you reach your media goals and bring your vision to life.
                </p>

                {/* Premium CTA Button */}
                <div className="flex justify-center">
                    <button className="cta-button px-10 py-4 bg-[#F67963] text-white text-lg font-semibold rounded-full hover:shadow-[0_0_50px_rgba(246,121,99,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GrandCTA;
