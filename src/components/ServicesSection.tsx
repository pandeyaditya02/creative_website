"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

interface Service {
    title: string;
    description: string;
    highlights: string[];
    image: string;
}

const services: Service[] = [
    {
        title: "Branded Content",
        description:
            "Content that captivates — from corporate films and promotional videos to staff engagement and training content. We create material that embodies your brand's ideals and builds a strong bond with your audience.",
        highlights: [
            "Embodies your brand's ideals",
            "Engages audiences on every channel",
            "Creates a strong bond with your audience",
        ],
        image: "/branded_content.jpg",
    },
    {
        title: "AV Production",
        description:
            "Storytelling excellence rooted in research, on-location filming, and high-quality post-production. From corporate documentaries and CSR films to creative features — we tell your story authentically and impactfully.",
        highlights: [
            "Research and concept development",
            "On-location filming",
            "High-quality post-production",
        ],
        image: "/avproductions1.png",
    },
    {
        title: "Events",
        description:
            "A complete Creative + Technical Partner for Events, turning ideas into unforgettable experiences.",
        highlights: [
            "Content design for IP's & Events",
            "Production execution",
            "Post Production",
        ],
        image: "/events.jpg",
    },
    {
        title: "Media Consultation",
        description:
            "Navigate the media landscape with confidence. Our experienced consultants offer expert guidance from ideation to execution, ensuring your projects run smoothly and yield measurable results.",
        highlights: [
            "Brand strategy and positioning",
            "Content strategy and planning",
            "Media production and distribution",
        ],
        image: "/mediaconsultation.png",
    },
    {
        title: "Digital Marketing",
        description:
            "Increase the visibility of your business with all-inclusive digital marketing solutions. We develop and execute plans that boost your presence, encourage conversions, and drive deep audience engagement.",
        highlights: [
            "Social media management & SEO",
            "PPC advertising & email marketing",
            "Deep engagement from your audience",
        ],
        image: "/digital.png",
    },
    {
        title: "Graphical Integration",
        description:
            "Bring your visuals to life with advanced graphical integration. Enhance your videos, presentations, and digital content with visuals that stand out and communicate complex ideas clearly.",
        highlights: [
            "Eye-catching motion graphics",
            "Dynamic visual effects",
            "Custom animations & AI Videos",
        ],
        image: "/graphical.png",
    },
];

const TOTAL_SLIDES = services.length;

const ServicesSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const desktopCarouselRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const isMobile = useIsMobile(768);

    // State for mobile progress
    const [mobileIndex, setMobileIndex] = useState(0);
    const [mobileProgress, setMobileProgress] = useState(0);

    // --- DESKTOP: Coupled horizontal scroll ---
    useGSAP(() => {
        if (isMobile || !desktopCarouselRef.current) return;

        const carousel = desktopCarouselRef.current;
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;

        // Create a ScrollTrigger that pins the section and maps scroll to horizontal position
        ScrollTrigger.create({
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: `+=${TOTAL_SLIDES * 100}%`, // one viewport height per slide
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                // Move carousel horizontally
                carousel.scrollLeft = progress * scrollWidth;

                // Update progress bar and counter
                if (progressBarRef.current) {
                    progressBarRef.current.style.transform = `scaleX(${progress})`;
                }
                if (counterRef.current) {
                    const current = Math.min(Math.floor(progress * TOTAL_SLIDES) + 1, TOTAL_SLIDES);
                    counterRef.current.textContent = String(current).padStart(2, "0");
                }
            },
        });

        // Optional: animate the background image zoom on active slide
        // We'll use a separate ScrollTrigger for each slide's image
        const slides = gsap.utils.toArray<HTMLElement>(".desktop-slide");
        slides.forEach((slide, i) => {
            const image = slide.querySelector(".slide-image") as HTMLElement;
            if (!image) return;

            // Calculate the progress range for this slide
            const start = i / TOTAL_SLIDES;
            const end = (i + 1) / TOTAL_SLIDES;

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: start * 100 + "%",
                end: end * 100 + "%",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    // Zoom image from 1 to 1.1 as we enter the slide
                    const scale = 1 + progress * 0.1;
                    gsap.set(image, { scale });
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, { scope: sectionRef, dependencies: [isMobile] });

    // --- MOBILE: Fade-up cards on scroll + progress tracking ---
    useGSAP(() => {
        if (!isMobile) return;

        const cards = gsap.utils.toArray<HTMLElement>(".mobile-card");
        cards.forEach((card) => {
            gsap.fromTo(
                card,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        // Track overall scroll progress through the section
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const progress = self.progress;
                setMobileProgress(progress);
                setMobileIndex(Math.min(Math.floor(progress * TOTAL_SLIDES), TOTAL_SLIDES - 1));
            },
        });
    }, { scope: sectionRef, dependencies: [isMobile] });

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full bg-black text-white overflow-hidden"
        >
            {/* Section header (common for both layouts) */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none md:top-12 md:left-12 md:translate-x-0">
                <span className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#F67963] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F67963] blink-coral" />
                    What we do
                </span>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mt-2">
                    Our Services
                </h2>
            </div>

            {/* DESKTOP LAYOUT (hidden on mobile) */}
            {!isMobile && (
                <div className="hidden md:block h-screen w-full">
                    {/* Horizontal carousel */}
                    <div
                        ref={desktopCarouselRef}
                        className="h-full flex overflow-x-hidden scrollbar-hide"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {services.map((service, index) => {
                            const num = String(index + 1).padStart(2, "0");
                            return (
                                <div
                                    key={index}
                                    className="desktop-slide relative h-full w-full flex-shrink-0"
                                >
                                    {/* Background image with zoom wrapper */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="slide-image w-full h-full">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover"
                                                sizes="100vw"
                                                priority={index === 0}
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                                    </div>

                                    {/* Large watermark */}
                                    <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 text-[10rem] lg:text-[16rem] font-black text-white/[0.04] leading-none select-none pointer-events-none">
                                        {num}
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-28 lg:bottom-32 left-8 lg:left-16 max-w-2xl z-10">
                                        <span className="inline-block px-3 py-1.5 text-[9px] lg:text-[10px] uppercase tracking-[0.25em] text-[#F67963] bg-white/[0.06] backdrop-blur-md rounded-full border border-white/10 mb-4">
                                            {num} — Service
                                        </span>
                                        <h3 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight mb-4">
                                            {service.title}
                                        </h3>
                                        <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-xl mb-6">
                                            {service.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {service.highlights.map((h, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-center gap-2.5 text-xs lg:text-sm text-white/50"
                                                >
                                                    <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-[#F67963]" />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="w-16 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-6" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Progress bar & counter (desktop) */}
                    <div className="absolute bottom-8 left-8 right-8 lg:left-16 lg:right-16 z-20 flex items-center gap-6">
                        <div className="flex items-baseline gap-2 shrink-0">
                            <span
                                ref={counterRef}
                                className="text-2xl lg:text-3xl font-bold tabular-nums"
                            >
                                01
                            </span>
                            <span className="text-sm text-white/25 font-light">
                                / {String(TOTAL_SLIDES).padStart(2, "0")}
                            </span>
                        </div>
                        <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                            <div
                                ref={progressBarRef}
                                className="h-full bg-[#F67963] rounded-full origin-left"
                                style={{ transform: "scaleX(0)" }}
                            />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 whitespace-nowrap">
                            Scroll to explore
                        </span>
                    </div>
                </div>
            )}

            {/* MOBILE LAYOUT (visible only on small screens) */}
            {isMobile && (
                <div className="md:hidden relative px-5 py-20">
                    {/* Mobile progress bar (sticky top) */}
                    <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm py-3 -mx-5 px-5 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold tabular-nums text-[#F67963]">
                                {String(mobileIndex + 1).padStart(2, "0")}
                            </span>
                            <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#F67963] rounded-full transition-all duration-200"
                                    style={{ width: `${mobileProgress * 100}%` }}
                                />
                            </div>
                            <span className="text-xs text-white/40">
                                /{TOTAL_SLIDES}
                            </span>
                        </div>
                    </div>

                    {/* Service cards */}
                    <div className="space-y-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="mobile-card group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08]"
                            >
                                <div className="relative w-full aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="100vw"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                        <h3 className="text-xl font-bold leading-tight">
                                            {service.title}
                                        </h3>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#F67963] bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-[#F67963]/20">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5 space-y-3">
                                    <p className="text-[#A1A1A1] text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-1">
                                        {service.highlights.map((h, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-[#8A8A8A]">
                                                <span className="w-1 h-1 rounded-full bg-[#F67963] shrink-0 mt-1.5" />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ServicesSection;