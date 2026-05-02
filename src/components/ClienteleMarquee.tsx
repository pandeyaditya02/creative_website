"use client";
import React from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const logos = [
    { src: "/brand-logos/Amazon logo.png", alt: "Amazon" },
    { src: "/brand-logos/Bausch__Lomb_Logo.png", alt: "Bausch + Lomb" },
    { src: "/brand-logos/ccl.png", alt: "Celebrity Cricket League" },
    { src: "/brand-logos/dolby digital.png", alt: "Dolby Digital" },
    { src: "/brand-logos/dominos3.jpg", alt: "Domino's" },
    { src: "/brand-logos/dove2.webp", alt: "Dove" },
    { src: "/brand-logos/dyson2.png", alt: "Dyson" },
    { src: "/brand-logos/Elite magazine.jpeg", alt: "Elite Magazine" },
    { src: "/brand-logos/hamdard2.jpg", alt: "Hamdard" },
    { src: "/brand-logos/kohler.png", alt: "Kohler" },
    { src: "/brand-logos/lg.webp", alt: "LG" },
    { src: "/brand-logos/mahindra-new-logo-02.jpg.jpeg", alt: "Mahindra" },
    { src: "/brand-logos/outlook.avif", alt: "Outlook" },
    { src: "/brand-logos/renault.jpg", alt: "Renault" },
    { src: "/brand-logos/unilever.png", alt: "Unilever" },
    { src: "/brand-logos/wcl2.jpg", alt: "World Champions League" },
];

const ClienteleMarquee = () => {
    const allLogos = [...logos, ...logos, ...logos];
    const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.15 });

    return (
        <section
            ref={sectionRef}
            className="relative bg-black py-12 lg:py-20 overflow-hidden border-y border-white/[0.05]"
            aria-label="Our valued clientele"
            style={{
                opacity: inView ? undefined : 0,
                animation: inView ? "fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) both" : undefined,
            }}
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[800px] h-[300px] bg-[#F67963]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full bg-white py-2 md:py-4 shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden">
                {/* Horizontal Fade Edges (Now fading from White) */}
                <div className="absolute left-0 top-0 h-full w-24 lg:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-24 lg:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

                <div className="flex w-max whitespace-nowrap animate-marquee pause-on-hover px-4">
                    {allLogos.map((logo, index) => (
                        <div
                            key={`${logo.alt}-${index}`}
                            className="group relative flex-shrink-0 px-12 lg:px-24
                                     transition-all duration-700 ease-in-out
                                     cursor-default select-none"
                            role="img"
                            aria-label={logo.alt}
                        >
                            {/* Logo Container - Enlarged to "fit" the strip */}
                            <div className="relative h-16 w-36 lg:h-36 lg:w-80 flex items-center justify-center
                                          transition-transform duration-700 ease-in-out
                                          lg:group-hover:scale-105">
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 150px, 320px"
                                    priority={index < 4}
                                    loading={index < 4 ? undefined : "lazy"}
                                    draggable={false}
                                />
                            </div>

                            {/* Tooltip */}
                            <span className="hidden lg:block absolute -bottom-4 left-1/2 -translate-x-1/2 
                                           text-[10px] uppercase tracking-[0.3em] font-bold text-[#F67963] 
                                           opacity-0 lg:group-hover:opacity-100 
                                           transition-all duration-500 
                                           whitespace-nowrap pointer-events-none">
                                {logo.alt}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClienteleMarquee;