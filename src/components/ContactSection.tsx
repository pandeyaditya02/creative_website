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
        <section ref={containerRef} className="relative min-h-[100svh] bg-[#2D3E50] text-white py-12 px-4 md:px-8 overflow-hidden flex flex-col justify-center">
            {/* Footer / Map Background */}
            <div className="contact-bg absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2D3D] to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-8 md:gap-12 w-full">
                <h2 className="contact-title text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tighter text-center text-[#F67963] mt-10">
                    Contact
                </h2>

                <form
                    ref={formRef}
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-12 rounded-2xl md:rounded-3xl flex flex-col gap-4 md:gap-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <input
                            type="text"
                            placeholder="Name"
                            className="contact-input bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder:text-gray-500 focus:outline-none transition-colors text-sm md:text-base"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="contact-input bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder:text-gray-500 focus:outline-none transition-colors text-sm md:text-base"
                        />
                    </div>
                    <textarea
                        rows={4}
                        placeholder="Message"
                        className="contact-input bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder:text-gray-500 focus:outline-none transition-colors resize-none text-sm md:text-base"
                    />
                    <button className="bg-[#e26954] text-white font-bold uppercase tracking-widest py-3 md:py-4 rounded-xl hover:bg-[#F67963] transition-colors hover:scale-[1.02] active:scale-95 duration-200 text-sm md:text-base">
                        Send Message
                    </button>
                </form>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-gray-500 text-xs md:text-sm uppercase tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>

                <div className="text-gray-600 text-[10px] md:text-xs mt-4 md:mt-8 text-center">
                    © 2026 CreativeChauk. All rights reserved.
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
