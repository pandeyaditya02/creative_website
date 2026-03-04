"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface ProjectCardProps {
    title: string;
    client: string;
    imageSrc: string;
}

export default function ProjectCard({ title, client, imageSrc }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // A relatively simple approach to a custom cursor within the bounds of a component
        const handleMouseMove = (e: MouseEvent) => {
            if (!cursorRef.current) return;
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the container
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(cursorRef.current, {
                x: x,
                y: y,
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        }

        const handleMouseLeave = () => {
            setIsHovered(false);
            if (!cursorRef.current) return;
            gsap.to(cursorRef.current, {
                opacity: 0,
                scale: 0.5,
                duration: 0.3
            })
        }

        const handleMouseEnter = () => {
            setIsHovered(true);
        }

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
        card.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
            card.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);


    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Image Container with custom cursor boundary */}
            <div
                ref={cardRef}
                className="relative w-full aspect-[16/10] overflow-hidden bg-[#1A1A1A] cursor-none rounded-sm"
            >
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[1.05]"
                />

                {/* Custom 'PLAY' Cursor (International Orange) */}
                <div
                    ref={cursorRef}
                    className="pointer-events-none absolute top-0 left-0 w-24 h-24 bg-[#FF5C00] rounded-full flex items-center justify-center text-white font-bold text-xs tracking-widest z-20 opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
                >
                    PLAY
                </div>

                {/* Dimming overlay on hover to make cursor pop */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>

            {/* Minimalism Title Metadata */}
            <div className="flex justify-between items-start pt-2 uppercase font-work-sans text-sm tracking-wider">
                <h3 className="font-bold text-white">{title}</h3>
                <span className="text-white/60">{client}</span>
            </div>
        </div>
    );
}
