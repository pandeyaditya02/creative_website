"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const points = [
    {
        number: "01",
        title: "Experienced Team",
        description: "Our team consists of seasoned professionals with a passion for creativity and storytelling."
    },
    {
        number: "02",
        title: "Cutting-Edge Technology",
        description: "We utilize the latest tools and technology to deliver high-quality, impactful content."
    },
    {
        number: "03",
        title: "Client-Centric Approach",
        description: "We believe in open collaboration, ensuring that our clients' vision is at the heart of everything we produce."
    },
    {
        number: "04",
        title: "Results-Driven",
        description: "We focus on delivering results that align with your brand's objectives and make a tangible impact."
    }
];

const WhyChooseUs = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>(".wcu-point");

        items.forEach((item) => {
            gsap.fromTo(item,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        });

        // Animate the center line growing
        gsap.fromTo(".wcu-center-line",
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    end: "bottom 40%",
                    scrub: 1
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section id="why-choose-us" ref={sectionRef} className="relative bg-black text-white py-32 lg:py-44 overflow-hidden">
            {/* Section Title */}
            <div className="flex flex-col items-center gap-4 mb-24 lg:mb-36">
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#F67963] font-medium">
                    Why choose us
                </span>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-white text-center">
                    Built Different
                </h2>
                <div className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-2" />
            </div>

            {/* Timeline Container */}
            <div className="relative max-w-6xl mx-auto px-6">
                {/* Center Line */}
                <div className="wcu-center-line absolute left-1/2 top-0 bottom-0 w-px bg-white/10 origin-top hidden lg:block" />

                {/* Points */}
                <div className="flex flex-col gap-24 lg:gap-36">
                    {points.map((point, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                className={`wcu-point relative flex flex-col lg:flex-row items-center ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                                    }`}
                            >
                                {/* Content Side */}
                                <div className={`lg:w-[45%] relative ${isLeft ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"
                                    }`}>
                                    {/* Giant Background Number */}
                                    <span className={`absolute top-1/2 -translate-y-1/2 text-[160px] lg:text-[200px] font-bold text-white/[0.04] leading-none select-none pointer-events-none ${isLeft ? "right-0 lg:right-8" : "left-0 lg:left-8"
                                        }`}>
                                        {point.number}
                                    </span>

                                    <div className="relative z-10">
                                        {/* Number Badge */}
                                        <span className={`inline-block px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#F67963] bg-[#F67963]/10 rounded-full border border-[#F67963]/20 mb-5 ${isLeft ? "" : ""
                                            }`}>
                                            {point.number} — Point
                                        </span>

                                        {/* Title */}
                                        <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
                                            {point.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-[#B0B0B0] text-lg lg:text-xl leading-relaxed max-w-md">
                                            {point.description}
                                        </p>

                                        {/* Accent line */}
                                        <div className={`w-16 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-6 ${isLeft ? "lg:ml-auto" : ""
                                            }`} />
                                    </div>
                                </div>

                                {/* Center Dot (desktop only) */}
                                <div className="hidden lg:flex w-[10%] justify-center">
                                    <div className="w-3 h-3 rounded-full bg-[#F67963] ring-4 ring-[#F67963]/20 relative z-10" />
                                </div>

                                {/* Empty Side (spacing) */}
                                <div className="lg:w-[45%]" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
