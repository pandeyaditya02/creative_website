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
        <section className="relative bg-black py-24 overflow-hidden border-y border-white/[0.05]">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F67963]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 pause-on-hover">
                {/* Horizontal Fade Edges */}
                <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee whitespace-nowrap">
                    {/* First set of logos */}
                    <div className="flex items-center gap-16 px-8">
                        {logos.map((logo, index) => (
                            <div
                                key={`logo-1-${index}`}
                                className="relative flex-shrink-0 grayscale opacity-50 transition-all duration-700 ease-in-out hover:grayscale-0 hover:opacity-100 hover:scale-110 group"
                            >
                                <div className="relative h-12 w-32 lg:h-16 lg:w-40 flex items-center justify-center">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 128px, 160px"
                                    />
                                </div>
                                {/* Subtle tooltip/label on hover */}
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-[#F67963] opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
                                    {logo.alt}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Duplicate set for seamless looping */}
                    <div className="flex items-center gap-16 px-8">
                        {logos.map((logo, index) => (
                            <div
                                key={`logo-2-${index}`}
                                className="relative flex-shrink-0 grayscale opacity-50 transition-all duration-700 ease-in-out hover:grayscale-0 hover:opacity-100 hover:scale-110 group"
                            >
                                <div className="relative h-12 w-32 lg:h-16 lg:w-40 flex items-center justify-center">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 128px, 160px"
                                    />
                                </div>
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-[#F67963] opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
                                    {logo.alt}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClienteleMarquee;
