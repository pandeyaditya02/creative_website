"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Split Text Title Animation
        const titleText = titleRef.current?.innerText || "";
        const words = titleText.split(' ');

        if (titleRef.current) {
            titleRef.current.innerHTML = words.map(word =>
                `<span class="word" style="display: inline-block; perspective: 1000px;">
                  ${word.split('').map(char =>
                    `<span class="char" style="display: inline-block; transform: translateY(100%) rotateX(-90deg); opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('')}
                </span>&nbsp;`
            ).join('');

            gsap.to(titleRef.current.querySelectorAll('.char'), {
                y: 0,
                rotateX: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power4.out",
                stagger: {
                    amount: 0.6,
                    from: "start"
                },
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            });
        }



        // 2. Synchronized animation for text blocks and timeline
        const mainTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 40%", // Starts later when section is more visible
                end: "bottom 80%",
                scrub: 1 // Sync with scroll
            }
        });

        // Text blocks slide in from left
        const textBlocks = gsap.utils.toArray<HTMLElement>(".about-text-block");
        textBlocks.forEach((block, index) => {
            mainTl.from(block, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, index * 0.2);
        });

        // Timeline animation synced with text blocks
        mainTl.fromTo(".timeline-line", { height: "0%" }, { height: "100%", duration: 1, ease: "power2.inOut" }, 0)
            .from(".timeline-dot", { scale: 0, opacity: 0, stagger: 0.3, duration: 0.5, ease: "back.out(1.7)" }, 0.4);

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center bg-black text-white py-16 px-6 sm:px-16 overflow-hidden">
            {/* Subtle Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F67963]/5 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-16">
                {/* Oversized Title */}
                <div className="text-center space-y-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-[#A1A1A1]">Who we are</span>
                    <h2
                        ref={titleRef}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white"
                    >
                        About Us
                    </h2>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {/* Main Feature Card - Spans 2 columns */}
                    <div className="about-text-block md:col-span-2 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm group hover:border-[#F67963]/30 transition-all duration-500">
                        <div className="flex flex-col h-full justify-between gap-8">
                            <div>
                                <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#F67963] bg-[#F67963]/10 rounded-full mb-6">Zencove Media</span>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                                    Creative solutions that bring stories to life.
                                </h3>
                                <p className="text-[#A1A1A1] leading-relaxed text-base md:text-lg max-w-xl">
                                    We use creative, effective media solutions to elevate brand voices. Our experience lies in creating high-quality, tailored content that reflects your vision and engages your audience.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent" />
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1A1]">Est. 2020</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="about-text-block p-8 rounded-3xl bg-gradient-to-br from-[#F67963]/20 to-[#F67963]/5 border border-[#F67963]/20 flex flex-col justify-center items-center text-center group hover:scale-[1.02] transition-transform duration-500">
                        <span className="text-6xl md:text-7xl font-bold text-white mb-2">50+</span>
                        <span className="text-sm uppercase tracking-[0.2em] text-[#A1A1A1]">Projects Delivered</span>
                    </div>

                    {/* Service Card 1 */}
                    <div className="about-text-block p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 group hover:border-[#F67963]/30 transition-all duration-500">
                        <div className="text-4xl mb-4">🎬</div>
                        <h4 className="text-xl font-bold text-white mb-3">Video Production</h4>
                        <p className="text-[#A1A1A1] text-sm leading-relaxed">High-end filming with state-of-the-art equipment.</p>
                    </div>

                    {/* Service Card 2 */}
                    <div className="about-text-block p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 group hover:border-[#F67963]/30 transition-all duration-500">
                        <div className="text-4xl mb-4">✨</div>
                        <h4 className="text-xl font-bold text-white mb-3">Brand Strategy</h4>
                        <p className="text-[#A1A1A1] text-sm leading-relaxed">Elevate your brand voice in the digital landscape.</p>
                    </div>

                    {/* Service Card 3 */}
                    <div className="about-text-block p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 group hover:border-[#F67963]/30 transition-all duration-500">
                        <div className="text-4xl mb-4">🎨</div>
                        <h4 className="text-xl font-bold text-white mb-3">Creative Direction</h4>
                        <p className="text-[#A1A1A1] text-sm leading-relaxed">Tailored content that reflects your vision.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
