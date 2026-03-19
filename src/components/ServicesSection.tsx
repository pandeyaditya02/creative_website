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

    useGSAP(() => {
        if (!carouselRef.current) return;

        const carousel = carouselRef.current;
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;

        // Main ScrollTrigger: pins section and maps vertical scroll to carousel scrollLeft
        ScrollTrigger.create({
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: `+=${TOTAL_SLIDES * 100}%`, // one viewport height per slide
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
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

        // Optional: zoom background image on each slide as it becomes active
        const slides = gsap.utils.toArray<HTMLElement>(".service-slide");
        slides.forEach((slide, i) => {
            const image = slide.querySelector(".slide-image") as HTMLElement;
            if (!image) return;

            const start = i / TOTAL_SLIDES;
            const end = (i + 1) / TOTAL_SLIDES;

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: start * 100 + "%",
                end: end * 100 + "%",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const scale = 1 + progress * 0.1; // zoom from 1 to 1.1
                    gsap.set(image, { scale });
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, { scope: sectionRef });

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full bg-black text-white overflow-hidden"
        >
            {/* Fixed header */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none md:top-32 md:left-12 md:translate-x-0">
                <span className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-accent font-sans font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-accent blink-coral" />
                    What we do
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight mt-2 text-white/90">
                    Our Services
                </h2>
            </div>

            {/* Horizontal carousel */}
            <div
                ref={carouselRef}
                className="h-screen w-full flex overflow-x-hidden scrollbar-hide"
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
                                        priority={index === 0}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-noir/90 via-noir/60 to-noir/25" />
                                <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-noir/40" />
                            </div>

                            {/* Large watermark */}
                            <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 text-[10rem] lg:text-[16rem] font-display font-black text-white/[0.04] leading-none select-none pointer-events-none">
                                {num}
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-28 lg:bottom-32 left-8 lg:left-16 max-w-2xl z-10">
                                <h3 className="text-3xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-4">
                                    <span className="text-rose-accent">{num}</span> {service.title}
                                </h3>
                                <p className="text-white/70 text-sm lg:text-base font-sans leading-relaxed max-w-xl mb-6">
                                    {service.description}
                                </p>
                                <ul className="space-y-2">
                                    {service.highlights.map((h, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2.5 text-xs lg:text-sm font-sans text-white/50"
                                        >
                                            <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-rose-accent" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="w-16 h-[2px] bg-gradient-to-r from-rose-accent to-transparent mt-6" />
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
                        className="text-2xl lg:text-3xl font-display font-bold tabular-nums"
                    >
                        01
                    </span>
                    <span className="text-sm text-white/25 font-sans font-light">
                        / {String(TOTAL_SLIDES).padStart(2, "0")}
                    </span>
                </div>
                <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <div
                        ref={progressBarRef}
                        className="h-full bg-rose-accent rounded-full origin-left"
                        style={{ transform: "scaleX(0)" }}
                    />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-sans whitespace-nowrap">
                    Scroll to explore
                </span>
            </div>
        </section>
    );
};

export default ServicesSection;