"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const services = [
        { emoji: "🎬", title: "Video Production", desc: "From ideation to execution — high-end production and distribution tailored to your brand." },
        { emoji: "📲", title: "Digital Content", desc: "Social media content and digital campaigns with visuals that communicate complex ideas clearly." },
        { emoji: "🤝", title: "Media Consultation", desc: "End-to-end consultation ensuring your projects run smoothly and yield measurable results." }
    ];

    useGSAP(() => {
        // 1. Split Text Title Animation
        const titleText = "About Us";
        const words = titleText.split(' ');

        if (titleRef.current) {
            titleRef.current.innerHTML = words.map(word =>
                `<span class="word" style="display: inline-block; white-space: nowrap;">
                  ${word.split('').map(char =>
                    `<span class="char" style="display: inline-block; transform: translateY(20px); opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('')}
                </span>`
            ).join('&nbsp;');

            gsap.to(titleRef.current.querySelectorAll(".char"), {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                stagger: {
                    amount: 0.3,
                    from: "start"
                },
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 99%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        // 2. Text blocks reveal with staggered ScrollTrigger
        gsap.fromTo(".about-text-block", 
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "none",
                scrollTrigger: {
                    trigger: ".grid",
                    start: "top bottom",
                    toggleActions: "play none none reverse"
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-start bg-black text-white py-24 md:py-32 px-6 sm:px-16 overflow-hidden">
            {/* Subtle Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[60ch] h-[60ch] bg-[#F67963]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[40ch] h-[40ch] bg-white/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-10 md:gap-16">
                {/* Oversized Title */}
                <div className="text-center space-y-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">Who we are</span>
                    <h2
                        ref={titleRef}
                        aria-label="About Us"
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
                                <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#F67963] bg-[#F67963]/10 rounded-full mb-6">Creative Chauk</span>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                                    Stories told with purpose.<br />Results that make an impact.
                                </h3>
                                <p className="text-white/60 leading-relaxed text-lg md:text-xl max-w-xl font-medium">
                                    We use creative, effective media solutions to bring stories to life and elevate brand voices — delivering high-quality, tailored content that reflects your vision and engages your audience.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent" />
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Est. 2020</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="about-text-block p-8 rounded-3xl bg-gradient-to-br from-[#F67963]/20 to-[#F67963]/5 border border-[#F67963]/20 flex flex-col justify-center items-center text-center group hover:scale-[1.02] transition-all duration-500">
                        <span className="text-7xl md:text-8xl font-black text-white mb-2">50+</span>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#F67963]">Global Brands</span>
                    </div>

                    {/* Mapped Service Cards */}
                    {services.map((service, idx) => (
                        <div key={idx} className="about-text-block p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 group hover:border-[#F67963]/30 transition-all duration-500">
                            <div className="text-4xl mb-4">{service.emoji}</div>
                            <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                            <p className="text-white/50 text-base leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
