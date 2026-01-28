"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
    children: React.ReactNode;
    zIndex: number;
    isTall?: boolean; // If true, pin at "bottom bottom" to allow scrolling full content depending on viewport
    className?: string;
}

const PinnedSection = ({ children, zIndex, isTall = false, className = "" }: PinnedSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Explanation:
        // We want the section to scroll normally until it reaches its "pin point".
        // 1. If isTall=false (fits in screen): Pin when TOP hits TOP.
        // 2. If isTall=true (taller than screen): Pin when BOTTOM hits BOTTOM.
        // This ensures the user sees all the content before it freezes.

        // pinSpacing: false is crucial. It means "don't add padding space". 
        // The section freezes, and the DOM flow continues, so the NEXT section (with higher Z-Index)
        // naturally scrolls up OVER the frozen section.

        const startTrigger = isTall ? "bottom bottom" : "top top";

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: startTrigger,
            end: "max", // Effectively keep it pinned until the end of the page (or covered)
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={`relative w-full ${className}`}
            style={{
                zIndex,
                position: "relative",
                // Force a background color if not provided by children to ensure opacity during stack
                // But usually section components have their own bg. 
                // We defaults to 'isolation: isolate' to ensure z-index works.
            }}
        >
            {/* 
        We rely on the child content to provide the background color (e.g., bg-black).
        If the child is transparent, the effect will look messy (seeing through to previous pin).
      */}
            {children}
        </div>
    );
};

export default PinnedSection;
