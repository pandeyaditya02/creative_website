"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Lock scroll explicitly during preloader
        document.body.style.overflow = "hidden";

        // Counter animation logic
        const duration = 1.5; // seconds
        const interval = 20; // ms
        const increments = duration * 1000 / interval;
        let currentStep = 0;

        const counter = setInterval(() => {
            currentStep++;
            const nextVal = Math.min(Math.round((currentStep / increments) * 100), 100);
            setProgress(nextVal);

            if (nextVal >= 100) {
                clearInterval(counter);

                // Trigger GSAP exit animation
                const tl = gsap.timeline({
                    onComplete: () => {
                        // Unlock scroll
                        document.body.style.overflow = "";
                        // Remove from DOM conceptually by hiding deeply or we can rely on opacity:0 + pointer-events-none
                        if (containerRef.current) {
                            containerRef.current.style.display = "none";
                        }
                    }
                });

                tl.to(textRef.current, {
                    y: -50,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.in"
                })
                    .to(containerRef.current, {
                        yPercent: -100,
                        duration: 1.2,
                        ease: "power4.inOut"
                    }, "-=0.2");
            }
        }, interval);

        return () => clearInterval(counter);
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d0d0d] text-[#ffede6]"
        >
            <div className="overflow-hidden">
                <div ref={textRef} className="text-8xl md:text-[12rem] font-bold tracking-tighter tabular-nums leading-none">
                    {progress}%
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm md:text-base font-mono tracking-widest uppercase opacity-50">
                Initiating Core Sequence
            </div>
        </div>
    );
}
