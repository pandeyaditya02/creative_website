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
                boxShadow: "0 0 20px rgba(204,255,0,0.5)",
                borderColor: "rgba(204,255,0,1)",
                duration: 0.3,
                paused: true
            });

            input.addEventListener("focus", () => focusTl.play());
            input.addEventListener("blur", () => focusTl.reverse());
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-[80vh] bg-black text-white py-24 px-8 overflow-hidden block">
            {/* Footer / Map Background */}
            <div className="contact-bg absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-16">
                <h2 className="contact-title text-6xl md:text-8xl font-bold uppercase tracking-tighter text-center">
                    Contact
                </h2>

                <form
                    ref={formRef}
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl flex flex-col gap-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Name"
                            className="contact-input bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none transition-colors"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="contact-input bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none transition-colors"
                        />
                    </div>
                    <textarea
                        rows={4}
                        placeholder="Message"
                        className="contact-input bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none transition-colors resize-none"
                    />
                    <button className="bg-primary text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors shadow-lg shadow-primary/50 hover:scale-[1.02] active:scale-95 duration-200">
                        Send Message
                    </button>
                </form>

                <div className="flex gap-8 text-gray-500 text-sm uppercase tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>

                <div className="text-gray-600 text-xs mt-8">
                    © 2026 CreativeChauk. All rights reserved.
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
