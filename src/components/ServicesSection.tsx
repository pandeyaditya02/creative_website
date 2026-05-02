"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

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
    const carouselRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!carouselRef.current || !introRef.current || !contentRef.current) return;

        const carousel = carouselRef.current;
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;

        // Master Timeline for the entire section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                start: "top top",
                end: `+=${(TOTAL_SLIDES + 1) * 100}%`,
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    if (progressBarRef.current) {
                        progressBarRef.current.style.transform = `scaleX(${progress})`;
                    }
                    if (counterRef.current) {
                        const slideProgress = Math.max(0, (progress - 0.15) / 0.85);
                        const current = Math.min(Math.floor(slideProgress * TOTAL_SLIDES) + 1, TOTAL_SLIDES);
                        counterRef.current.textContent = String(current).padStart(2, "0");
                    }
                },
            },
        });

        // 1. Intro Heading Fade Out
        tl.to(introRef.current, {
            opacity: 0,
            y: -30,
            duration: 1.5, // Increased duration for a more gradual fade
            ease: "power2.inOut",
        });

        // 2. Carousel Contents Fade In
        tl.to(contentRef.current, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
        }, "-=0.5");

        // 3. Horizontal Scroll via scrollLeft Proxy
        const scrollProxy = { x: 0 };
        tl.to(scrollProxy, {
            x: scrollWidth,
            onUpdate: function() {
                if (carousel) {
                    carousel.scrollLeft = scrollProxy.x;
                }
            },
            ease: "none",
            duration: TOTAL_SLIDES * 2,
        }, "+=0.2"); // Small delay after fade in before starting scroll

        // Background Image Zooms
        const slides = gsap.utils.toArray<HTMLElement>(".service-slide");
        slides.forEach((slide, i) => {
            const image = slide.querySelector(".slide-image") as HTMLElement;
            if (!image) return;

            tl.to(image, {
                scale: 1.15,
                ease: "none",
                duration: 2,
            }, `-=${2 * (6/TOTAL_SLIDES)}`); // Roughly sync with its own scroll window
        });

        return () => {
            if (ScrollTrigger.getById("servicesTrigger")) ScrollTrigger.getById("servicesTrigger")?.kill();
        };
    }, { scope: sectionRef });

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full bg-black text-white overflow-hidden"
        >
            {/* Intro Overlay */}
            <div 
                ref={introRef}
                className="absolute inset-0 z-30 flex items-center justify-center bg-black pointer-events-none"
            >
                <div className="text-center group">
                    <span className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#F67963] font-medium mb-4 opacity-70">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F67963] blink-coral" />
                        What we do
                    </span>
                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tight leading-none">
                        Our Services
                    </h2>
                </div>
            </div>

            {/* Horizontal carousel with content wrapper */}
            <div ref={contentRef} className="h-full w-full opacity-0 relative z-10 overflow-hidden">
                <div
                    ref={carouselRef}
                    className="h-screen w-full flex overflow-hidden scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                {services.map((service, index) => {
                    const num = String(index + 1).padStart(2, "0");
                    return (
                        <div
                            key={index}
                            className="service-slide relative h-full w-screen flex-shrink-0"
                        >
                            {/* Background image with zoom wrapper */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="slide-image relative w-full h-full">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                        sizes="100vw"
                                        priority={index < 3} // Load first 3 slides eagerly
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
                                {/* <span className="inline-block px-3 py-1.5 text-[9px] lg:text-[10px] uppercase tracking-[0.25em] text-[#F67963] bg-white/[0.06] backdrop-blur-md rounded-full border border-white/10 mb-4">
                                    {num} — Service
                                </span> */}
                                <h3 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
                                    <span className="text-[#F67963]">{num}</span> {service.title}
                                </h3>
                                <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-xl mb-7">
                                    {service.description}
                                </p>
                                <ul className="space-y-3">
                                    {service.highlights.map((h, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 text-sm lg:text-base text-white/65"
                                        >
                                            <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#F67963] shrink-0" />
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

            {/* Progress bar & counter */}
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
    </section>
    );
};

export default ServicesSection;