"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
    children: React.ReactNode;
    zIndex: number;
    isTall?: boolean; 
    className?: string;
    /** 
     * If true, disables GSAP pinning on screens < mobileBreakpoint.
     * Falls back to CSS position: sticky for a lightweight mobile experience.
     * @default true
     */
    disableOnMobile?: boolean;
    /** 
     * Breakpoint in pixels for mobile detection.
     * @default 768 (Tailwind's 'md' breakpoint)
     */
    mobileBreakpoint?: number;
}

const PinnedSection = ({ 
    children, 
    zIndex, 
    isTall = false, 
    className = "",
    disableOnMobile = true,
    mobileBreakpoint = 768
}: PinnedSectionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

    // Helper: Check if current viewport is "mobile"
    const isMobileView = () => typeof window !== "undefined" && window.innerWidth < mobileBreakpoint;

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        // Skip GSAP pinning if on mobile and disableOnMobile is true
        if (disableOnMobile && isMobileView()) {
            container.style.position = "relative";
            container.style.zIndex = zIndex.toString();
            return;
        }

        const startTrigger = isTall ? "bottom bottom" : "top top";

        // Create ScrollTrigger and store reference for cleanup
        const st = ScrollTrigger.create({
            trigger: container,
            start: startTrigger,
            end: "max",
            pin: true,
            pinSpacing: false, // Critical: allows next section to scroll OVER this one
            anticipatePin: 1,
        });

        scrollTriggerInstance.current = st;

        return () => {
            st.kill();
        };
    }, { scope: containerRef, dependencies: [isTall, disableOnMobile, mobileBreakpoint, zIndex] });

    // Handle resize: refresh ScrollTrigger if viewport crosses breakpoint
    useEffect(() => {
        if (!disableOnMobile) return;

        let resizeTimeout: NodeJS.Timeout;

        const handleResize = () => {
            // Debounce resize events for performance
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const container = containerRef.current;
                if (!container) return;

                if (isMobileView()) {
                    // On mobile: kill GSAP pin, let CSS sticky take over
                    scrollTriggerInstance.current?.kill();
                    container.style.position = "relative";
                    container.style.zIndex = zIndex.toString();
                } else {
                    // On desktop: re-enable pinning by refreshing ScrollTrigger
                    ScrollTrigger.refresh();
                }
            }, 150);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(resizeTimeout);
            window.removeEventListener("resize", handleResize);
        };
    }, [disableOnMobile, mobileBreakpoint, zIndex]);

    return (
        <>
            <div
                ref={containerRef}
                className={`relative w-full ${className} ${disableOnMobile ? 'pinned-section-mobile-fallback' : ''}`}
                style={{
                    zIndex,
                    position: "relative",
                }}
            >
                {children}
            </div>

            {/* CSS Fallback for Mobile: Sticky positioning when GSAP pin is disabled */}
            <style jsx global>{`
                @media (max-width: ${mobileBreakpoint - 1}px) {
                    .pinned-section-mobile-fallback {
                        position: -webkit-sticky;
                        position: sticky;
                        top: 0;
                        /* Ensure sticky works: parent must not have overflow: hidden */
                    }
                }
            `}</style>
        </>
    );
};

export default PinnedSection;