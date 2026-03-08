"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ContactSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Headline Mask-Up Reveal
        gsap.fromTo(".title-line",
            { y: "110%", opacity: 0 }, // slightly fade while translating for a premium feel
            {
                y: "0%",
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        // 2. Contact Info Block Reveal
        gsap.fromTo(".contact-info-block",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 65%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        // 3. Form Fields Stagger Reveal
        gsap.fromTo(".contact-input-field",
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 65%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        // 4. Magnetic Button Hover
        const btn = document.querySelector(".magnetic-btn") as HTMLElement;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
                x: x * 0.4,
                y: y * 0.4,
                duration: 0.4,
                ease: "power2.out"
            });
        };
        const handleMouseLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1.2, 0.4)" });
        };

        if (btn) {
            btn.addEventListener("mousemove", handleMouseMove);
            btn.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (btn) {
                btn.removeEventListener("mousemove", handleMouseMove);
                btn.removeEventListener("mouseleave", handleMouseLeave);
            }
        };

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-[100svh] bg-[#0a0a0a] text-white py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 overflow-hidden flex flex-col justify-center">

            {/* Subtle Gradient Glow Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(246,121,99,0.1)_0%,transparent_60%)] translate-x-1/4 translate-y-1/4" />
            </div>

            <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-16 relative z-10">

                {/* Left Column: Typography & Info */}
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className="overflow-hidden mb-[-2vw] lg:mb-[-1.5vw]">
                            <h2 className="title-line text-[18vw] lg:text-[11vw] font-bold uppercase tracking-tighter text-white leading-[0.8] m-0 p-0 transform origin-bottom">
                                LET&apos;S
                            </h2>
                        </div>
                        <div className="overflow-hidden">
                            <h2 className="title-line text-[18vw] lg:text-[11vw] font-bold uppercase tracking-tighter text-[#F67963] leading-[0.8] m-0 p-0 transform origin-bottom">
                                TALK.
                            </h2>
                        </div>
                    </div>

                    <div className="mt-16 lg:mt-32 space-y-10 lg:space-y-12">
                        <div className="contact-info-block">
                            <p className="text-[#555] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Drop us a line</p>
                            <a href="mailto:hello@creativechauk.com" className="text-xl md:text-3xl font-medium tracking-tight hover:text-[#F67963] transition-colors duration-300">
                                hello@creativechauk.com
                            </a>
                        </div>
                        <div className="contact-info-block flex flex-col sm:flex-row gap-6 sm:gap-16">
                            <div>
                                <p className="text-[#555] text-xs font-semibold uppercase tracking-[0.3em] mb-3">Socials</p>
                                <div className="flex flex-col gap-2">
                                    <a href="#" className="text-base font-medium tracking-wide hover:text-[#F67963] transition-colors duration-300">Instagram</a>
                                    <a href="#" className="text-base font-medium tracking-wide hover:text-[#F67963] transition-colors duration-300">LinkedIn</a>
                                </div>
                            </div>
                            <div>
                                <p className="text-[#555] text-xs font-semibold uppercase tracking-[0.3em] mb-3 opacity-0 sm:opacity-100 hidden sm:block">Space</p>
                                <div className="flex flex-col gap-2">
                                    <a href="#" className="text-base font-medium tracking-wide hover:text-[#F67963] transition-colors duration-300">Twitter</a>
                                    <a href="#" className="text-base font-medium tracking-wide hover:text-[#F67963] transition-colors duration-300">Vimeo</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Inquiry Form */}
                <div className="flex flex-col justify-center lg:pl-16 xl:pl-24">
                    <form className="flex flex-col gap-10 md:gap-14 w-full">

                        <div className="contact-input-field w-full relative">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-transparent border-b border-white/20 text-white placeholder-[#777] focus:outline-none focus:border-[#F67963] transition-colors duration-300 pb-4 text-lg md:text-xl font-light"
                            />
                        </div>

                        <div className="contact-input-field w-full relative">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent border-b border-white/20 text-white placeholder-[#777] focus:outline-none focus:border-[#F67963] transition-colors duration-300 pb-4 text-lg md:text-xl font-light"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-8">
                            <div className="contact-input-field w-full relative">
                                <select
                                    defaultValue=""
                                    className="w-full bg-transparent border-b border-white/20 text-[#777] focus:text-white focus:outline-none focus:border-[#F67963] transition-colors duration-300 pb-4 text-lg md:text-xl font-light appearance-none rounded-none cursor-pointer"
                                >
                                    <option value="" disabled>Project Type</option>
                                    <option value="av" className="bg-[#111] text-white">AV Production</option>
                                    <option value="digital" className="bg-[#111] text-white">Digital Content</option>
                                    <option value="branded" className="bg-[#111] text-white">Branded Content</option>
                                    <option value="consultation" className="bg-[#111] text-white">Consultation</option>
                                </select>
                                {/* Custom Dropdown Arrow */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 pb-4">
                                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className="contact-input-field w-full relative">
                                <select
                                    defaultValue=""
                                    className="w-full bg-transparent border-b border-white/20 text-[#777] focus:text-white focus:outline-none focus:border-[#F67963] transition-colors duration-300 pb-4 text-lg md:text-xl font-light appearance-none rounded-none cursor-pointer"
                                >
                                    <option value="" disabled>Budget Range</option>
                                    <option value="<5L" className="bg-[#111] text-white">&lt; ₹5L</option>
                                    <option value="5-15L" className="bg-[#111] text-white">₹5L - ₹15L</option>
                                    <option value=">15L" className="bg-[#111] text-white">&gt; ₹15L</option>
                                    <option value="tbd" className="bg-[#111] text-white">To Be Decided</option>
                                </select>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 pb-4">
                                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="contact-input-field w-full relative">
                            <textarea
                                placeholder="Tell us about your project..."
                                rows={2}
                                className="w-full bg-transparent border-b border-white/20 text-white placeholder-[#777] focus:outline-none focus:border-[#F67963] transition-colors duration-300 pb-4 text-lg md:text-xl font-light resize-none"
                            ></textarea>
                        </div>

                        <div className="contact-input-field flex sm:justify-end mt-4">
                            <button
                                type="button"
                                className="magnetic-btn w-36 h-36 md:w-44 md:h-44 bg-[#F67963] text-black rounded-full font-bold uppercase tracking-widest flex items-center justify-center hover:bg-white transition-colors duration-500 will-change-transform shadow-[0_0_30px_rgba(246,121,99,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                            >
                                <span className="pointer-events-none text-sm md:text-base">Submit</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Copyright */}
            <div className="absolute bottom-6 left-6 md:left-12 lg:left-24 text-[#A1A1A1]/40 text-xs tracking-wider">
                © 2026 Creative Chauk.
            </div>
        </section>
    );
};

export default ContactSection;
