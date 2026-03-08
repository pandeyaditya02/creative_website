"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // Sync Lenis scroll with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Sync GSAP ticker with Lenis requestAnimationFrame
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Prevent GSAP from using lag smoothing,
        // which causes jitter with Lenis
        gsap.ticker.lagSmoothing(0);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);

    return <>{children}</>;
}
