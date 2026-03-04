"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function FadeUpReveal({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.fromTo(
            containerRef.current,
            {
                y: 40,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={`${className} opacity-0`}>
            {children}
        </div>
    );
}
