"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useGSAP(() => {
        // 1. Background Parallax
        gsap.to(".contact-bg", {
            y: "20%",
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // 2. Title Reveal
        gsap.from(".contact-title", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            scrollTrigger: {
                trigger: ".contact-title",
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        // 3. Form Reveal
        gsap.from(formRef.current, {
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
            scrollTrigger: {
                trigger: formRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // 4. Input Focus Animations
        const inputs = gsap.utils.toArray<HTMLElement>(".contact-input");
        inputs.forEach((input) => {
            const focusTl = gsap.to(input, {
                boxShadow: "0 0 20px rgba(226,105,84,0.5)",
                borderColor: "rgba(246,121,99,1)",
                duration: 0.3,
                paused: true
            });

            input.addEventListener("focus", () => focusTl.play());
            input.addEventListener("blur", () => focusTl.reverse());
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-[100svh] bg-black text-white py-16 px-4 md:px-8 overflow-hidden flex flex-col justify-center">
            {/* Subtle Background */}
            <div className="contact-bg absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70" />

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-12 w-full">
                {/* Title */}
                <div className="text-center space-y-4 mt-8">
                    <span className="text-xs uppercase tracking-[0.3em] text-[#A1A1A1]">Get in touch</span>
                    <h2 className="contact-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white">
                        Contact
                    </h2>
                    <p className="text-[#A1A1A1] text-sm md:text-base max-w-md leading-relaxed">
                        Ready to start a project? Let&apos;s work together to reach your media goals and{" "}
                        <span className="text-[#F67963] font-semibold">bring your vision to life.</span>
                    </p>
                </div>

                {/* Form */}
                <form
                    ref={formRef}
                    className="w-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl flex flex-col gap-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <input
                            type="text"
                            placeholder="Name"
                            className="contact-input bg-black/50 border border-white/10 rounded-2xl p-4 md:p-5 text-white placeholder:text-[#A1A1A1] focus:outline-none focus:border-[#F67963]/50 transition-all duration-300 text-sm md:text-base"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="contact-input bg-black/50 border border-white/10 rounded-2xl p-4 md:p-5 text-white placeholder:text-[#A1A1A1] focus:outline-none focus:border-[#F67963]/50 transition-all duration-300 text-sm md:text-base"
                        />
                    </div>
                    <textarea
                        rows={5}
                        placeholder="Your message..."
                        className="contact-input bg-black/50 border border-white/10 rounded-2xl p-4 md:p-5 text-white placeholder:text-[#A1A1A1] focus:outline-none focus:border-[#F67963]/50 transition-all duration-300 resize-none text-sm md:text-base"
                    />
                    <button className="bg-[#F67963] text-black font-bold uppercase tracking-widest py-4 md:py-5 rounded-2xl hover:bg-white transition-colors hover:scale-[1.02] active:scale-95 duration-300 text-sm md:text-base">
                        Send Message
                    </button>
                </form>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    <a href="#" className="text-[#A1A1A1] text-xs uppercase tracking-[0.2em] hover:text-white transition-colors duration-300">Instagram</a>
                    <a href="#" className="text-[#A1A1A1] text-xs uppercase tracking-[0.2em] hover:text-white transition-colors duration-300">Twitter</a>
                    <a href="#" className="text-[#A1A1A1] text-xs uppercase tracking-[0.2em] hover:text-white transition-colors duration-300">LinkedIn</a>
                </div>

                {/* Copyright */}
                <div className="text-[#A1A1A1]/50 text-[10px] md:text-xs mt-4 text-center">
                    © 2026 Creative Chauk. All rights reserved.
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
