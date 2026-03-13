"use client";
import React, { useRef, useEffect } from "react";
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
        title: "Events",
        description: "A complete Creative + Technical Partner for Events, turning ideas into unforgettable experiences.",
        highlights: ["Content design for IP's & Events", "Production execution", "Post Production"],
        image: "/events.jpg"
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
    },
    {
        title: "Graphical Integration",
        description: "Bring your visuals to life with advanced graphical integration. Enhance your videos, presentations, and digital content with visuals that stand out and communicate complex ideas clearly.",
        highlights: ["Eye-catching motion graphics", "Dynamic visual effects", "Custom animations & AI Videos"],
        image: "/graphical.png"
    }
];

const TOTAL_SLIDES = services.length;

const ServicesSection = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);


    // Desktop: GSAP pinned scroll animation
    useGSAP(() => {
        if (window.innerWidth < 768) return; // Skip on mobile

        const slides = gsap.utils.toArray<HTMLElement>(".service-slide-desktop");
        const slideTexts = gsap.utils.toArray<HTMLElement>(".service-slide-text");
        const slideImages = gsap.utils.toArray<HTMLElement>(".service-slide-image");

        if (slides.length === 0) return;

        const tl = gsap.timeline();

        // Initial states
        gsap.set(slides[0], { opacity: 1, zIndex: 5 });
        gsap.set(slideTexts[0], { opacity: 1, y: 0 });
        gsap.set(slideImages[0], { opacity: 1, scale: 1 });

        for (let i = 1; i < slides.length; i++) {
            gsap.set(slides[i], { opacity: 0, zIndex: 1 });
            gsap.set(slideTexts[i], { opacity: 0, y: 50 });
            gsap.set(slideImages[i], { opacity: 0, scale: 1.1 });
        }

        // Build transitions
        for (let i = 0; i < slides.length - 1; i++) {
            const transLabel = `trans-${i}`;

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

        // ScrollTrigger for desktop
        ScrollTrigger.create({
            trigger: wrapperRef.current,
            pin: true,
            start: "top top",
            end: "+=500%",
            scrub: 1,
            animation: tl,
            onUpdate: (self) => {
                if (progressBarRef.current) {
                    progressBarRef.current.style.transform = `scaleX(${self.progress})`;
                }
                if (counterRef.current) {
                    const currentSlide = Math.min(
                        Math.floor(self.progress * TOTAL_SLIDES) + 1,
                        TOTAL_SLIDES
                    );
                    counterRef.current.textContent = String(currentSlide).padStart(2, "0");
                }
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, { scope: wrapperRef });

    return (
        <div id="services" ref={wrapperRef} className="services-wrapper relative w-full bg-black overflow-hidden">
            
            {/* ─── MOBILE: Simple Vertical Scroll ─── */}
            <div className="md:hidden flex flex-col">
                {/* Sticky Header */}
                <div className="sticky top-0 z-30 bg-gradient-to-b from-black via-black/95 to-transparent px-6 py-8 border-b border-white/5 text-center">
                    <span className="inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#F67963] font-medium block mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F67963] blink-coral" />
                        What we do
                    </span>
                    <h2 className="text-4xl font-bold uppercase tracking-tighter text-white leading-[0.95] mb-4">
                        Our Services
                    </h2>
                </div>

                {/* Scrollable Service Cards */}
                <div className="flex flex-col">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            ref={(el) => { slideRefs.current[index] = el; }}
                            className="min-h-screen w-full px-6 py-12 flex flex-col justify-center border-b border-white/5"
                        >
                            <div className="flex flex-col gap-5 mb-8">
                                <span className="inline-block w-fit px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#F67963] bg-[#F67963]/10 rounded-full border border-[#F67963]/20">
                                    {String(index + 1).padStart(2, "0")} — Service
                                </span>
                                <h3 className="text-3xl font-bold text-white leading-[1.2] tracking-tight">{service.title}</h3>
                                <p className="text-[#B0B0B0] text-base leading-[1.6]">{service.description}</p>
                                <ul className="flex flex-col gap-3 mt-2">
                                    {service.highlights.map((h, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-[#A1A1A1] leading-snug">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#F67963] shrink-0 mt-1.5" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="w-16 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-4" />
                            </div>
                            <div className="w-full">
                                <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] shadow-2xl shadow-black/50">
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
                    ))}
                </div>
            </div>

            {/* ─── DESKTOP: Pinned Horizontal Scroll ─── */}
            <div className="hidden md:flex h-screen w-full flex-row">
                {/* Left Panel - Fixed */}
                <div className="w-[30%] lg:w-[40%] xl:w-[35%] h-full flex flex-col justify-center px-6 md:px-10 lg:px-16 relative bg-black">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#F67963]/5 rounded-full blur-[180px] pointer-events-none" />
                    <div className="relative z-10 flex flex-col gap-8">
                        <span className="text-[11px] uppercase tracking-[0.35em] text-[#F67963] font-medium">What we do</span>
                        <h2 className="text-5xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tighter text-white leading-[0.9]">Our<br />Services</h2>
                        <div className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent" />
                        <div className="flex flex-col gap-3 mt-4">
                            <div className="flex items-baseline gap-2">
                                <span ref={counterRef} className="text-4xl lg:text-5xl font-bold text-white tabular-nums">01</span>
                                <span className="text-lg text-white/30 font-light">/ {String(TOTAL_SLIDES).padStart(2, "0")}</span>
                            </div>
                            <div className="w-full max-w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <div ref={progressBarRef} className="h-full bg-[#F67963] rounded-full origin-left" style={{ transform: "scaleX(0)" }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Slides */}
                <div className="w-[70%] lg:w-[60%] xl:w-[65%] h-full relative">
                    {services.map((service, index) => {
                        const number = String(index + 1).padStart(2, "0");
                        return (
                            <div
                                key={index}
                                className="service-slide-desktop absolute inset-0 flex items-center pr-8 lg:pr-16"
                                style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 5 : 1 }}
                            >
                                <div className="w-full h-full flex flex-row gap-6 md:gap-8 lg:gap-12 items-center pr-8">
                                    <div className="service-slide-text flex-[1.2] flex flex-col gap-3 md:gap-4 lg:gap-5">
                                        <span className="inline-block w-fit px-3 py-1.5 text-[9px] lg:text-[10px] uppercase tracking-[0.25em] text-[#F67963] bg-[#F67963]/10 rounded-full border border-[#F67963]/20">
                                            {number} — Service
                                        </span>
                                        <h3 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.1] tracking-tight">{service.title}</h3>
                                        <p className="text-[#B0B0B0] text-sm lg:text-lg xl:text-xl leading-[1.6] max-w-md line-clamp-3 md:line-clamp-4 lg:line-clamp-none">{service.description}</p>
                                        <ul className="flex flex-col gap-2 mt-1">
                                            {service.highlights.map((h, i) => (
                                                <li key={i} className="flex items-center gap-3 text-xs md:text-sm lg:text-base text-[#A1A1A1]">
                                                    <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-[#F67963] shrink-0" />
                                                    <span className="truncate lg:whitespace-normal">{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="w-12 lg:w-16 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-1" />
                                    </div>
                                    <div className="service-slide-image flex-[0.8] max-w-[240px] md:max-w-[280px] lg:max-w-md">
                                        <div className="relative rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] shadow-2xl shadow-black/50">
                                            <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading={index === 0 ? "eager" : "lazy"} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;