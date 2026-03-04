"use client";

import { useEffect, useRef, useState } from "react";


export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-center items-center">
            {/* Native HTML5 Video for reliable styling and zero type issues */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-80">
                <video
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onTimeUpdate={(e) => {
                        const video = e.currentTarget;
                        setProgress((video.currentTime / video.duration) * 100);
                    }}
                />
            </div>

            {/* Dark Overlay for text contrast */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Text Content */}
            <div className="relative z-20 text-center px-4 w-full flex flex-col items-center">
                <h1 className="text-5xl md:text-[84px] leading-tight font-bold uppercase tracking-tight text-white mb-6 max-w-5xl mx-auto">
                    Crafting Visuals
                </h1>
                <p className="text-sm md:text-base font-work-sans tracking-[0.2em] uppercase text-white/80 max-w-xl mx-auto">
                    Premium Cinematic Ads &amp; Video Production
                </p>
            </div>

            {/* Hero Progress Bar (International Orange) */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
                <div
                    className="h-full bg-[#FF5C00] transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </section>
    );
}
