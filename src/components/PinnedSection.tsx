"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useIsMobile } from "@/hooks/useMediaQuery";

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

    const isMobileView = useIsMobile(mobileBreakpoint);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        // Skip GSAP pinning if on mobile and disableOnMobile is true
        if (disableOnMobile && isMobileView) {
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
            // NOTE: anticipatePin is intentionally omitted.
            // With Lenis as the scroll engine, GSAP's pre-jump from anticipatePin
            // conflicts with Lenis's interpolation and amplifies the jerk.
        });

        scrollTriggerInstance.current = st;

        return () => {
            st.kill();
        };
    }, { scope: containerRef, dependencies: [isTall, disableOnMobile, isMobileView, zIndex] });

    // Handle resize: refresh ScrollTrigger if viewport crosses breakpoint
    useEffect(() => {
        if (!disableOnMobile) return;

        const container = containerRef.current;
        if (!container) return;

        if (isMobileView) {
            // On mobile: kill GSAP pin, let CSS sticky take over
            scrollTriggerInstance.current?.kill();
            container.style.position = "relative";
            container.style.zIndex = zIndex.toString();
        } else {
            // On desktop: re-enable pinning by refreshing ScrollTrigger
            ScrollTrigger.refresh();
        }
    }, [isMobileView, disableOnMobile, zIndex]);

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