"use client";
import React from "react";
import Image from "next/image";

const logos = [
    { src: "/brand-logos/Amazon logo.png", alt: "Amazon" },
    { src: "/brand-logos/Bausch__Lomb_Logo.png", alt: "Bausch + Lomb" },
    { src: "/brand-logos/ccl.png", alt: "Celebrity Cricket League" },
    { src: "/brand-logos/dolby digital.png", alt: "Dolby Digital" },
    { src: "/brand-logos/Elite magazine.jpeg", alt: "Elite Magazine" },
    { src: "/brand-logos/hamdard.webp", alt: "Hamdard" },
    { src: "/brand-logos/kohler.png", alt: "Kohler" },
    { src: "/brand-logos/mahindra-new-logo-02.jpg.jpeg", alt: "Mahindra" },
    { src: "/brand-logos/outlook.avif", alt: "Outlook" },
    { src: "/brand-logos/wcl.avif", alt: "World Champions League" },
];

const ClienteleMarquee = () => {
    // Triple the logos to ensure enough content for very wide screens and seamless looping
    const allLogos = [...logos, ...logos, ...logos];

    return (
        <section 
            className="relative bg-black py-12 lg:py-20 overflow-hidden border-y border-white/[0.05]"
            aria-label="Our valued clientele"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[800px] h-[300px] bg-[#F67963]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
                {/* Horizontal Fade Edges */}
                <div className="absolute left-0 top-0 h-full w-24 lg:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-24 lg:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

                {/* 
                  Marquee Track 
                  - We use a simpler structure: one long flex container
                  - Animation moves it partially
                */}
                <div className="flex w-max whitespace-nowrap animate-marquee-mobile lg:animate-marquee">
                    {allLogos.map((logo, index) => (
                        <div
                            key={`${logo.alt}-${index}`}
                            className="group relative flex-shrink-0 px-8 lg:px-16
                                     grayscale-[0.5] opacity-70 
                                     transition-all duration-700 ease-in-out
                                     hover:grayscale-0 hover:opacity-100
                                     cursor-default select-none"
                            role="img"
                            aria-label={logo.alt}
                        >
                            {/* Logo Container */}
                            <div className="relative h-14 w-28 lg:h-36 lg:w-72 flex items-center justify-center
                                          transition-transform duration-700 ease-in-out
                                          lg:group-hover:scale-110">
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 112px, 288px"
                                    loading={index < 10 ? "eager" : "lazy"}
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