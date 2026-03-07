"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Branded Content",
        description: "Content that captivates — from corporate films and promotional videos to staff engagement and training content. We create material that embodies your brand's ideals and builds a strong bond with your audience.",
        highlights: ["Embodies your brand's ideals", "Engages audiences on every channel", "Creates a strong bond with your audience"],
        image: "/branded_content.jpg"
    },
    {
        title: "AV Production",
        description: "Storytelling excellence rooted in research, on-location filming, and high-quality post-production. From corporate documentaries and CSR films to creative features — we tell your story authentically and impactfully.",
        highlights: ["Research and concept development", "On-location filming", "High-quality post-production"],
        image: "/avproductions1.png"
    },
    {
        title: "Graphical Integration",
        description: "Bring your visuals to life with advanced graphical integration. Enhance your videos, presentations, and digital content with visuals that stand out and communicate complex ideas clearly.",
        highlights: ["Eye-catching motion graphics", "Dynamic visual effects", "Custom animations & AI Videos"],
        image: "/graphical.png"
    },
    {
        title: "Media Consultation",
        description: "Navigate the media landscape with confidence. Our experienced consultants offer expert guidance from ideation to execution, ensuring your projects run smoothly and yield measurable results.",
        highlights: ["Brand strategy and positioning", "Content strategy and planning", "Media production and distribution"],
        image: "/mediaconsultation.png"
    },
    {
        title: "Digital Marketing",
        description: "Increase the visibility of your business with all-inclusive digital marketing solutions. We develop and execute plans that boost your presence, encourage conversions, and drive deep audience engagement.",
        highlights: ["Social media management & SEO", "PPC advertising & email marketing", "Deep engagement from your audience"],
        image: "/digital.png"
    }
];

const TOTAL_SLIDES = services.length;

const ServicesSection = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const slides = gsap.utils.toArray<HTMLElement>(".service-slide");
        const slideTexts = gsap.utils.toArray<HTMLElement>(".service-slide-text");
        const slideImages = gsap.utils.toArray<HTMLElement>(".service-slide-image");

        if (slides.length === 0) return;

        // Master timeline — scrubbed by ScrollTrigger
        const tl = gsap.timeline();

        // Set initial states: first slide visible, rest hidden
        gsap.set(slides[0], { opacity: 1, zIndex: 5 });
        gsap.set(slideTexts[0], { opacity: 1, y: 0 });
        gsap.set(slideImages[0], { opacity: 1, scale: 1 });

        for (let i = 1; i < slides.length; i++) {
            gsap.set(slides[i], { opacity: 0, zIndex: 1 });
            gsap.set(slideTexts[i], { opacity: 0, y: 50 });
            gsap.set(slideImages[i], { opacity: 0, scale: 1.1 });
        }

        // Build transitions: 0→1, 1→2, 2→3, 3→4
        for (let i = 0; i < slides.length - 1; i++) {
            // Each transition has a small hold at start, then transition, then hold at end
            const holdLabel = `hold-${i}`;
            const transLabel = `trans-${i}`;

            // Hold current slide (small pause for reading)
            tl.addLabel(holdLabel);
            tl.to({}, { duration: 0.3 }); // hold duration

            // Transition
            tl.addLabel(transLabel);

            // Fade out current slide
            tl.to(slideTexts[i], {
                opacity: 0,
                y: -40,
                duration: 0.5,
                ease: "power2.in"
            }, transLabel);

            tl.to(slideImages[i], {
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
                ease: "power2.in"
            }, transLabel);

            tl.to(slides[i], {
                opacity: 0,
                zIndex: 1,
                duration: 0.5,
            }, transLabel);

            // Fade in next slide
            tl.to(slides[i + 1], {
                opacity: 1,
                zIndex: 5,
                duration: 0.5,
            }, transLabel + "+=0.15");

            tl.to(slideTexts[i + 1], {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, transLabel + "+=0.2");

            tl.to(slideImages[i + 1], {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            }, transLabel + "+=0.2");
        }

        // Final hold for last slide
        tl.to({}, { duration: 0.3 });

        // Create the ScrollTrigger that pins and scrubs the timeline
        ScrollTrigger.create({
            trigger: wrapperRef.current,
            pin: true,
            start: "top top",
            end: "+=400%", // 4 transitions worth of scroll distance
            scrub: 1,
            animation: tl,
            onUpdate: (self) => {
                // Update progress bar
                if (progressBarRef.current) {
                    progressBarRef.current.style.transform = `scaleX(${self.progress})`;
                }
                // Update counter
                if (counterRef.current) {
                    const currentSlide = Math.min(
                        Math.floor(self.progress * TOTAL_SLIDES) + 1,
                        TOTAL_SLIDES
                    );
                    counterRef.current.textContent = String(currentSlide).padStart(2, "0");
                }
            }
        });

    }, { scope: wrapperRef });

    return (
        <div ref={wrapperRef} className="services-wrapper relative h-screen w-full flex bg-black overflow-hidden">
            {/* ─── LEFT PANEL: Sticky Anchor ─── */}
            <div className="w-[35%] lg:w-[40%] h-full flex flex-col justify-center px-8 lg:px-16 relative">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#F67963]/5 rounded-full blur-[180px] pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-8">
                    {/* Eyebrow */}
                    <span className="text-[11px] uppercase tracking-[0.35em] text-[#F67963] font-medium">
                        What we do
                    </span>

                    {/* Main Heading */}
                    <h2 className="text-5xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tighter text-white leading-[0.9]">
                        Our<br />Services
                    </h2>

                    {/* Divider */}
                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent" />

                    {/* Progress Indicator */}
                    <div className="flex flex-col gap-3 mt-4">
                        <div className="flex items-baseline gap-2">
                            <span
                                ref={counterRef}
                                className="text-4xl lg:text-5xl font-bold text-white tabular-nums"
                            >
                                01
                            </span>
                            <span className="text-lg text-white/30 font-light">
                                / {String(TOTAL_SLIDES).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full max-w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <div
                                ref={progressBarRef}
                                className="h-full bg-[#F67963] rounded-full origin-left"
                                style={{ transform: "scaleX(0)" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── RIGHT PANEL: Service Slides ─── */}
            <div className="w-[65%] lg:w-[60%] h-full relative flex items-center pr-8 lg:pr-16">
                {services.map((service, index) => {
                    const number = String(index + 1).padStart(2, "0");
                    return (
                        <div
                            key={index}
                            className="service-slide absolute inset-0 flex items-center pr-8 lg:pr-8"
                            style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 5 : 1 }}
                        >
                            <div className="w-full h-full flex flex-col justify-center lg:flex-row gap-8 lg:gap-12 lg:items-center">
                                {/* Text Content */}
                                <div className="service-slide-text flex-1 flex flex-col gap-5">
                                    {/* Service badge */}
                                    <span className="inline-block w-fit px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#F67963] bg-[#F67963]/10 rounded-full border border-[#F67963]/20">
                                        {number} — Service
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[#B0B0B0] text-base lg:text-lg leading-relaxed max-w-md">
                                        {service.description}
                                    </p>

                                    {/* Highlights */}
                                    <ul className="flex flex-col gap-2.5 mt-1">
                                        {service.highlights.map((h, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-[#A1A1A1]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#F67963] shrink-0" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Accent line */}
                                    <div className="w-16 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-2" />
                                </div>

                                {/* Image */}
                                <div className="service-slide-image flex-1 max-w-sm lg:max-w-md">
                                    <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] shadow-2xl shadow-black/50">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                            loading={index === 0 ? "eager" : "lazy"}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServicesSection;
