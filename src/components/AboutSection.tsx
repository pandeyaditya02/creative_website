"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    
    // Refs for specific grid items
    const mainCardRef = useRef<HTMLDivElement>(null);
    const statsNumberRef = useRef<HTMLSpanElement>(null);
    const statsCardRef = useRef<HTMLDivElement>(null);
    const servicesContainerRef = useRef<HTMLDivElement>(null);
    
    // Refs for background parallax
    const bgBlob1Ref = useRef<HTMLDivElement>(null);
    const bgBlob2Ref = useRef<HTMLDivElement>(null);

    const services = [
        { emoji: "🎬", title: "Video Production", desc: "From ideation to execution — high-end production and distribution tailored to your brand." },
        { emoji: "📲", title: "Digital Content", desc: "Social media content and digital campaigns with visuals that communicate complex ideas clearly." },
        { emoji: "🤝", title: "Media Consultation", desc: "End-to-end consultation ensuring your projects run smoothly and yield measurable results." }
    ];

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // 1. Background Parallax Effect (Smooth Scrub)
            gsap.to([bgBlob1Ref.current, bgBlob2Ref.current], {
                y: (i, target) => i === 0 ? 100 : -150,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5 // Smooths the background movement
                }
            });

            // 2. Title Animation (Character Reveal on Scroll)
            if (titleRef.current) {
                const titleText = "About Us";
                const words = titleText.split(' ');
                
                // Split text logic
                titleRef.current.innerHTML = words.map(word =>
                    `<span class="word" style="display: inline-block; white-space: nowrap; overflow: hidden;">
                      ${word.split('').map(char =>
                        `<span class="char" style="display: inline-block; transform: translateY(100%); opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
                      ).join('')}
                    </span>`
                ).join('&nbsp;');

                gsap.to(titleRef.current.querySelectorAll(".char"), {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: {
                        amount: 0.5,
                        from: "start"
                    },
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 1 // Ties animation directly to scroll bar
                    }
                });
            }

            // 3. Main Story Timeline (Scrubbed)
            // This connects the scroll position to the appearance of the cards
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%", 
                    end: "bottom bottom",
                    scrub: 1.5, // Smooth scrubbing for the whole section
                    // toggleActions: "play none none reverse" // Removed because scrub handles reverse automatically
                }
            });

            // Step A: Main Message Card slides up
            tl.fromTo(mainCardRef.current, 
                { y: 100, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 2, ease: "power3.out" }
            )
            // Step B: Stats Card pops in
            .fromTo(statsCardRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" },
                "<" // Start at same time as previous
            )
            // Step C: Services Grid fills in
            .fromTo(gsap.utils.toArray(servicesContainerRef.current?.children || []),
                { y: 50, opacity: 0, rotateX: 10 },
                { 
                    y: 0, 
                    opacity: 1, 
                    rotateX: 0,
                    duration: 1.5, 
                    ease: "power2.out",
                    stagger: {
                        amount: 0.5,
                        grid: [3, 1],
                        from: "center"
                    }
                },
                "-=1" // Overlap significantly for smooth flow
            );

            // 4. Number Counter Animation (Independent ScrollTrigger)
            // This ensures the number counts up precisely when the card is in view
            if (statsNumberRef.current) {
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: 50,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: statsCardRef.current,
                        start: "top 80%",
                        end: "top 50%",
                        scrub: true, // Number counts up/down as you scroll
                        onUpdate: () => {
                            if (statsNumberRef.current) {
                                statsNumberRef.current.textContent = Math.ceil(obj.val) + "+";
                            }
                        }
                    }
                });
            }

            // 5. Text Content Reveal (Scrubbed)
            // Makes the paragraphs inside cards reveal as you scroll over them
            gsap.utils.toArray(".reveal-text").forEach((text: any) => {
                gsap.fromTo(text, 
                    { opacity: 0.3, y: 10 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1,
                        scrollTrigger: {
                            trigger: text,
                            start: "top 90%",
                            end: "top 70%",
                            scrub: 1
                        }
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="relative min-h-screen flex flex-col justify-start bg-black text-white py-24 md:py-32 px-6 sm:px-16 overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <div ref={bgBlob1Ref} className="absolute top-0 right-0 w-[60ch] h-[60ch] bg-[#F67963]/5 rounded-full blur-[120px]" />
                <div ref={bgBlob2Ref} className="absolute bottom-0 left-0 w-[40ch] h-[40ch] bg-white/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-10 md:gap-16">
                {/* Oversized Title */}
                <div className="text-center space-y-4">
                    <span className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F67963] blink-coral" />
                        Who we are
                    </span>
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
                    <div 
                        ref={mainCardRef}
                        className="md:col-span-2 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm group hover:border-[#F67963]/30 transition-all duration-500"
                    >
                        <div className="flex flex-col h-full justify-between gap-8">
                            <div>
                                <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#F67963] bg-[#F67963]/10 rounded-full mb-6 reveal-text">Creative Chauk</span>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight reveal-text">
                                    Stories told with purpose.<br />Results that make an impact.
                                </h3>
                                <p className="text-white/60 leading-relaxed text-lg md:text-xl max-w-xl font-medium reveal-text">
                                    We use creative, effective media solutions to bring stories to life and elevate brand voices — delivering high-quality, tailored content that reflects your vision and engages your audience.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 reveal-text">
                                <div className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent" />
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Est. 2020</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div 
                        ref={statsCardRef}
                        className="p-8 rounded-3xl bg-gradient-to-br from-[#F67963]/20 to-[#F67963]/5 border border-[#F67963]/20 flex flex-col justify-center items-center text-center group hover:scale-[1.02] transition-all duration-500"
                    >
                        {/* Number Ref added here */}
                        <span ref={statsNumberRef} className="text-7xl md:text-8xl font-black text-white mb-2 block">0+</span>
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#F67963] reveal-text">Global Brands</span>
                    </div>

                    {/* Mapped Service Cards */}
                    {/* Fixed TS Error: Added optional chaining or type assertion in GSAP, kept ref here for structure */}
                    <div ref={servicesContainerRef} className="contents">
                        {services.map((service, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 group hover:border-[#F67963]/30 transition-all duration-500">
                                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 reveal-text">{service.emoji}</div>
                                <h4 className="text-xl font-bold text-white mb-3 reveal-text">{service.title}</h4>
                                <p className="text-white/50 text-base leading-relaxed reveal-text">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;