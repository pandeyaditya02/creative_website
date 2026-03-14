"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const services = [
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
    const wrapperRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    const isMobileView = useIsMobile(768);

    useGSAP(() => {
        if (isMobileView) return;

        const slides = gsap.utils.toArray<HTMLElement>(".service-slide");
        const contents = gsap.utils.toArray<HTMLElement>(".service-content");
        const bgs = gsap.utils.toArray<HTMLElement>(".service-bg");
        const watermarks = gsap.utils.toArray<HTMLElement>(".service-watermark");

        if (slides.length === 0) return;

        const tl = gsap.timeline();

        gsap.set(slides[0], { opacity: 1, zIndex: 5 });
        gsap.set(contents[0], { opacity: 1, y: 0 });
        gsap.set(bgs[0], { opacity: 1, scale: 1 });
        gsap.set(watermarks[0], { opacity: 1 });

        for (let i = 1; i < slides.length; i++) {
            gsap.set(slides[i], { opacity: 0, zIndex: 1 });
            gsap.set(contents[i], { opacity: 0, y: 60 });
            gsap.set(bgs[i], { opacity: 0, scale: 1.08 });
            gsap.set(watermarks[i], { opacity: 0 });
        }

        for (let i = 0; i < slides.length - 1; i++) {
            const label = `slide-${i}`;

            tl.to(contents[i], { opacity: 0, y: -50, duration: 0.5, ease: "power2.in" }, label);
            tl.to(bgs[i], { opacity: 0, scale: 0.96, duration: 0.6, ease: "power2.in" }, label);
            tl.to(watermarks[i], { opacity: 0, duration: 0.3 }, label);
            tl.to(slides[i], { opacity: 0, zIndex: 1, duration: 0.5 }, label);

            tl.to(slides[i + 1], { opacity: 1, zIndex: 5, duration: 0.5 }, label + "+=0.15");
            tl.to(bgs[i + 1], { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }, label + "+=0.2");
            tl.to(contents[i + 1], { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, label + "+=0.25");
            tl.to(watermarks[i + 1], { opacity: 1, duration: 0.5 }, label + "+=0.3");
        }

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
                    const current = Math.min(
                        Math.floor(self.progress * TOTAL_SLIDES) + 1,
                        TOTAL_SLIDES
                    );
                    counterRef.current.textContent = String(current).padStart(2, "0");
                }
            },
        });
    }, { scope: wrapperRef, dependencies: [isMobileView] });

    useGSAP(() => {
        if (!isMobileView) return;

        const cards = gsap.utils.toArray<HTMLElement>(".service-card-mobile");
        cards.forEach((card) => {
            gsap.fromTo(
                card,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, { scope: wrapperRef, dependencies: [isMobileView] });

    return (
        <div
            id="services"
            ref={wrapperRef}
            className="services-wrapper relative w-full bg-black overflow-hidden"
        >
            {/* ─── MOBILE ─── */}
            <div className="md:hidden flex flex-col py-16 px-5 sm:px-8">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#F67963] font-medium mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F67963] blink-coral" />
                        What we do
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tighter text-white leading-[0.95] mb-4">
                        Our Services
                    </h2>
                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mx-auto" />
                </div>

                <div className="flex flex-col gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card-mobile group rounded-2xl overflow-hidden
                                       bg-white/[0.03] border border-white/[0.08]
                                       hover:border-[#F67963]/20 transition-colors duration-500"
                        >
                            <div className="relative w-full aspect-[16/10] overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="100vw"
                                    priority={index === 0}
                                    loading={index === 0 ? undefined : "lazy"}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
                                        {service.title}
                                    </h3>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#F67963] bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#F67963]/20 shrink-0 ml-3">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>
                            </div>

                            <div className="px-5 py-5 flex flex-col gap-3">
                                <p className="text-[#A1A1A1] text-sm leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="flex flex-col gap-2">
                                    {service.highlights.map((h, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2.5 text-[13px] text-[#8A8A8A]"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-[#F67963] shrink-0 mt-[7px]" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── DESKTOP: Full-Viewport Cinematic Slides ─── */}
            <div className="hidden md:block h-screen w-full relative">
                {services.map((service, index) => {
                    const num = String(index + 1).padStart(2, "0");
                    return (
                        <div
                            key={index}
                            className="service-slide absolute inset-0"
                            style={{
                                opacity: index === 0 ? 1 : 0,
                                zIndex: index === 0 ? 5 : 1,
                            }}
                        >
                            <div className="service-bg absolute inset-0">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                    priority={index === 0}
                                    loading={index === 0 ? undefined : "lazy"}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                            </div>

                            <div className="service-watermark absolute right-8 lg:right-16 xl:right-24 top-1/2 -translate-y-1/2 text-[10rem] lg:text-[16rem] xl:text-[20rem] font-black text-white/[0.04] leading-none select-none pointer-events-none tracking-tighter">
                                {num}
                            </div>

                            <div className="service-content absolute bottom-28 lg:bottom-32 left-10 lg:left-16 xl:left-24 max-w-lg lg:max-w-xl xl:max-w-2xl z-10 flex flex-col gap-4 lg:gap-5">
                                <span className="inline-block w-fit px-3 py-1.5 text-[9px] lg:text-[10px] uppercase tracking-[0.25em] text-[#F67963] bg-white/[0.06] backdrop-blur-md rounded-full border border-white/10">
                                    {num} — Service
                                </span>

                                <h3 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.05] tracking-tight">
                                    {service.title}
                                </h3>

                                <p className="text-white/55 text-sm lg:text-base xl:text-lg leading-relaxed">
                                    {service.description}
                                </p>

                                <ul className="flex flex-col gap-2 mt-1">
                                    {service.highlights.map((h, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2.5 text-xs lg:text-sm text-white/45"
                                        >
                                            <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-[#F67963] shrink-0" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="w-14 lg:w-16 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-2" />
                            </div>
                        </div>
                    );
                })}

                {/* Fixed: Section label */}
                <div className="absolute top-[88px] lg:top-[100px] left-10 lg:left-16 xl:left-24 z-20 flex flex-col gap-2">
                    <span className="inline-flex items-center gap-2 text-[10px] lg:text-[11px] uppercase tracking-[0.35em] text-[#F67963] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F67963] blink-coral" />
                        What we do
                    </span>
                    <h2 className="text-xl lg:text-2xl font-bold uppercase tracking-tight text-white/80">
                        Our Services
                    </h2>
                </div>

                {/* Fixed: Progress + Counter */}
                <div className="absolute bottom-8 lg:bottom-10 left-10 lg:left-16 xl:left-24 right-10 lg:right-16 xl:right-24 z-20 flex items-center gap-6">
                    <div className="flex items-baseline gap-2 shrink-0">
                        <span
                            ref={counterRef}
                            className="text-2xl lg:text-3xl font-bold text-white tabular-nums"
                        >
                            01
                        </span>
                        <span className="text-sm text-white/25 font-light">
                            / {String(TOTAL_SLIDES).padStart(2, "0")}
                        </span>
                    </div>

                    <div className="flex-1 h-[1px] bg-white/10 rounded-full overflow-hidden">
                        <div
                            ref={progressBarRef}
                            className="h-full bg-[#F67963] rounded-full origin-left"
                            style={{ transform: "scaleX(0)" }}
                        />
                    </div>

                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 whitespace-nowrap shrink-0">
                        Scroll to explore
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
