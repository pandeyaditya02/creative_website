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
    return (
        <section 
            className="relative bg-black py-12 lg:py-16 overflow-hidden border-y border-white/[0.05]"
            aria-label="Our valued clientele"
        >
            {/* Ambient Background Glow - Responsive */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[600px] h-[200px] lg:h-[300px] bg-[#F67963]/5 rounded-full blur-[100px] lg:blur-[120px] pointer-events-none" />

            <div className="relative z-10">
                {/* Horizontal Fade Edges - Responsive Width */}
                <div className="absolute left-0 top-0 h-full w-16 lg:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-16 lg:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                {/* Marquee Track - Slower on mobile (30s) vs desktop (20s) */}
                <div className="flex whitespace-nowrap animate-marquee-mobile lg:animate-marquee">
                    {/* First set of logos - Interactive (Desktop Only) */}
                    <div className="flex items-center gap-8 lg:gap-16 px-4 lg:px-8">
                        {logos.map((logo, index) => (
                            <div
                                key={`logo-1-${index}`}
                                className="group relative flex-shrink-0 
                                         grayscale opacity-50 
                                         transition-all duration-700 ease-in-out
                                         hover:grayscale-0 hover:opacity-100
                                         cursor-default select-none"
                                role="img"
                                aria-label={logo.alt}
                            >
                                {/* Logo Container - Responsive Sizing */}
                                <div className="relative h-12 w-28 lg:h-32 lg:w-80 flex items-center justify-center
                                              transition-transform duration-700 ease-in-out
                                              lg:group-hover:scale-110">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 112px, 320px"
                                        loading="lazy"
                                        draggable={false}
                                    />
                                </div>
                                
                                {/* Tooltip - Desktop Only (hidden on mobile to avoid sticky hover) */}
                                <span className="hidden lg:block absolute -bottom-6 left-1/2 -translate-x-1/2 
                                               text-[10px] uppercase tracking-widest text-[#F67963] 
                                               opacity-0 lg:group-hover:opacity-100 
                                               transition-opacity duration-500 
                                               whitespace-nowrap pointer-events-none">
                                    {logo.alt}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Duplicate set for seamless looping - NON-INTERACTIVE */}
                    <div 
                        className="flex items-center gap-8 lg:gap-16 px-4 lg:px-8 pointer-events-none" 
                        aria-hidden="true"
                    >
                        {logos.map((logo, index) => (
                            <div
                                key={`logo-2-${index}`}
                                className="relative flex-shrink-0 
                                         grayscale opacity-50 
                                         cursor-default select-none"
                            >
                                {/* Logo Container - Responsive Sizing */}
                                <div className="relative h-12 w-28 lg:h-32 lg:w-80 flex items-center justify-center">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 112px, 320px"
                                        loading="lazy"
                                        draggable={false}
                                    />
                                </div>
                                {/* No tooltip on duplicate set */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClienteleMarquee;