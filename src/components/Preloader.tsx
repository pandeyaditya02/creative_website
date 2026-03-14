"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        let counterDone = false;
        let fontsReady = false;
        let hasExited = false;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const tryExit = () => {
            if (!counterDone || !fontsReady || hasExited) return;
            hasExited = true;

            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = "";
                    if (containerRef.current) {
                        containerRef.current.style.display = "none";
                    }
                    window.dispatchEvent(new CustomEvent("preloaderFinished"));
                }
            });

            tl.to(textRef.current, {
                y: -50,
                opacity: 0,
                duration: prefersReduced ? 0 : 0.6,
                ease: "power3.in"
            })
            .to(containerRef.current, {
                yPercent: -100,
                duration: prefersReduced ? 0 : 1.2,
                ease: "power4.inOut"
            }, prefersReduced ? 0 : "-=0.2");
        };

        const fontTimeout = setTimeout(() => {
            fontsReady = true;
            tryExit();
        }, 3000);

        document.fonts.ready.then(() => {
            clearTimeout(fontTimeout);
            fontsReady = true;
            tryExit();
        });

        const duration = 1.8;
        const interval = 20;
        const increments = duration * 1000 / interval;
        let currentStep = 0;

        const counter = setInterval(() => {
            currentStep++;
            const nextVal = Math.min(Math.round((currentStep / increments) * 100), 100);
            setProgress(nextVal);

            if (nextVal >= 100) {
                clearInterval(counter);
                counterDone = true;
                tryExit();
            }
        }, interval);

        return () => {
            clearInterval(counter);
            clearTimeout(fontTimeout);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[#0d0d0d] text-[#ffede6]"
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
