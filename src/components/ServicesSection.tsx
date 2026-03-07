"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Pre-Production",
        description: "Concept development, scriptwriting, and storyboarding — the foundation of every story we tell. We begin by understanding your brand's vision, audience, and objectives.",
        image: "https://images.unsplash.com/photo-1598899134739-9609c96191b0?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Production",
        description: "High-end filming with state-of-the-art equipment and seasoned crews. Our productions are customized to meet the particular requirements and objectives of your brand.",
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Post-Production",
        description: "Editing, VFX, color grading, and sound design — delivering digital content with visuals that stand out and communicate complex ideas clearly across every platform.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44e?q=80&w=600&auto=format&fit=crop"
    }
];

const features = [
    { icon: "🎥", title: "Open Collaboration", desc: "Your vision is at the heart of everything we do — we work alongside you at every stage." },
    { icon: "⚡", title: "Measurable Results", desc: "From ideation to execution, every project is built to yield results that align with your objectives." },
    { icon: "🎨", title: "Deep Engagement", desc: "Creative, effective media solutions designed to drive deep engagement from your intended audience." }
];

const ServicesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Title Reveal — mount-based (no ScrollTrigger inside PinnedSection)
        gsap.fromTo(".services-title",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
        );

        // 2. Services Grid Stagger — mount-based
        const cards = gsap.utils.toArray<HTMLElement>(".service-card");
        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, delay: 0.2 + i * 0.15, ease: "power2.out" }
            );
        });

        // 3. Features Row Stagger — mount-based
        const featureItems = gsap.utils.toArray<HTMLElement>(".feature-item");
        featureItems.forEach((item, i) => {
            gsap.fromTo(item,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.4 + i * 0.12, ease: "power2.out" }
            );
        });

        // 4. Hover Effects for Services (clean, no conflicting timelines)
        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, duration: 0.3 }));
            card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, duration: 0.3 }));
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="min-h-screen bg-black text-white py-16 px-6 sm:px-8 relative overflow-hidden">
            {/* Subtle Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F67963]/5 rounded-full blur-[200px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[200px]" />

            <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

                {/* Main Services Grid */}
                <div className="flex flex-col items-center gap-16">
                    <div className="text-center space-y-4">
                        <span className="text-xs uppercase tracking-[0.3em] text-[#A1A1A1]">What we do</span>
                        <h2 className="services-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white">
                            Services
                        </h2>
                    </div>

                    <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="service-card relative h-[450px] rounded-3xl overflow-hidden cursor-pointer group border border-white/10 hover:border-[#F67963]/30 transition-all duration-500"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${service.image})` }}
                                />

                                {/* Premium Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#F67963] bg-[#F67963]/10 rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">0{index + 1}</span>
                                    <h3 className="text-3xl md:text-4xl font-bold uppercase mb-3 text-white group-hover:text-[#F67963] transition-colors duration-300">{service.title}</h3>
                                    <p className="text-[#A1A1A1] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 max-w-xs">
                                        {service.description}
                                    </p>
                                    <div className="w-16 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Row */}
                <div className="flex flex-col items-center gap-12">
                    <span className="text-xs uppercase tracking-[0.3em] text-[#A1A1A1]">Why choose us</span>
                    <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="feature-item p-8 border border-white/10 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent flex flex-col items-center text-center gap-4 hover:border-[#F67963]/30 hover:bg-white/[0.08] transition-all duration-500 group"
                            >
                                <span className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                                <h4 className="text-xl font-bold text-white">{feature.title}</h4>
                                <p className="text-[#A1A1A1] text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServicesSection;
