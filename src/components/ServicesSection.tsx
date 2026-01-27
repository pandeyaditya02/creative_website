"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Pre-Production",
        description: "Concept development, scriptwriting, and storyboarding to lay a solid foundation.",
        image: "https://images.unsplash.com/photo-1598899134739-9609c96191b0?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Production",
        description: "High-end filming with state-of-the-art equipment and experienced crews.",
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Post-Production",
        description: "Editing, VFX, color grading, and sound design to bring the vision to life.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44e?q=80&w=600&auto=format&fit=crop"
    }
];

const features = [
    { icon: "🎥", title: "Cinema", desc: "Feature-film quality production values." },
    { icon: "⚡", title: "Fast Turnaround", desc: "Efficient workflows without compromising quality." },
    { icon: "🎨", title: "Visual Arts", desc: "Creative direction that pushes boundaries." }
];

const ServicesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Title Reveal
        gsap.from(".services-title", {
            y: 30,
            opacity: 0,
            duration: 1.5,
            scrollTrigger: {
                trigger: ".services-title",
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        // 2. Services Grid Stagger
        const cards = gsap.utils.toArray<HTMLElement>(".service-card");
        gsap.from(cards, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.3,
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        // 3. Features Row Stagger
        const featureItems = gsap.utils.toArray<HTMLElement>(".feature-item");
        gsap.from(featureItems, {
            y: 20,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: ".features-grid",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // 4. Hover Effects (3D Tilt) for Services
        cards.forEach((card) => {
            const hoverTl = gsap.timeline({ paused: true });
            hoverTl.to(card, {
                scale: 1.02,
                rotationY: 5,
                rotationX: -5,
                boxShadow: "0 20px 40px rgba(249,115,22,0.1)",
                duration: 0.4,
                ease: "power2.out"
            });

            // Add event listeners to play/reverse via GSAP logic if needed, 
            // but standard JS listeners are fine inside useGSAP too.
            // However, implementing simple hover via CSS or simpler GSAP usually suffices.
            // Let's stick to the card's internal logic for complex hover or global?
            // Actually, doing it here keeps it clean.

            card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, duration: 0.3 }));
            card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, duration: 0.3 }));
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="min-h-screen bg-black text-white py-24 px-8 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">

                {/* Main Services Grid */}
                <div className="flex flex-col items-center gap-12">
                    <h2 className="services-title text-5xl md:text-6xl font-bold uppercase tracking-tighter">
                        Services
                    </h2>

                    <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="service-card relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group bg-gray-900 border border-white/5"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${service.image})` }}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                                    <h3 className="text-3xl font-bold uppercase mb-2 group-hover:text-orange-500 transition-colors">{service.title}</h3>
                                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        {service.description}
                                    </p>
                                    <div className="w-12 h-1 bg-orange-500 mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Row */}
                <div className="flex flex-col items-center gap-12">
                    <h3 className="text-3xl font-bold uppercase tracking-tight text-gray-400">Why Choose Us</h3>
                    <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="feature-item p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-colors"
                            >
                                <span className="text-4xl mb-2">{feature.icon}</span>
                                <h4 className="text-xl font-bold text-orange-500">{feature.title}</h4>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServicesSection;
