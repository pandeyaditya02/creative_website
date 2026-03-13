"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isOverLink, setIsOverLink] = useState(false);

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configurations - fast lead, progressively slower trails for visible separation
    const springConfigFirst = { damping: 30, stiffness: 400, mass: 0.3 };
    const springConfigSecond = { damping: 20, stiffness: 180, mass: 0.6 };
    const springConfigThird = { damping: 15, stiffness: 100, mass: 0.9 };

    // Trailing dots springs
    const firstDotX = useSpring(mouseX, springConfigFirst);
    const firstDotY = useSpring(mouseY, springConfigFirst);

    const secondDotX = useSpring(mouseX, springConfigSecond);
    const secondDotY = useSpring(mouseY, springConfigSecond);

    const thirdDotX = useSpring(mouseX, springConfigThird);
    const thirdDotY = useSpring(mouseY, springConfigThird);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsHovering(true);
        const handleMouseUp = () => setIsHovering(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-cursor="hover"]')) {
                setIsOverLink(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-cursor="hover"]')) {
                setIsOverLink(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, input, textarea {
           cursor: none;
        }
      `}</style>

            {/* Biggest Dot (Leading) — morphs into ring on link hover */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none rounded-full mix-blend-screen z-[9999]"
                style={{
                    x: firstDotX,
                    y: firstDotY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isOverLink ? 48 : isHovering ? 32 : 24,
                    height: isOverLink ? 48 : isHovering ? 32 : 24,
                    backgroundColor: isOverLink ? "transparent" : "#e26954",
                    border: isOverLink ? "2px solid #F67963" : "2px solid transparent",
                }}
                transition={{ duration: 0.15, ease: "easeOut" }}
            />

            {/* Medium Dot (Middle Trail) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none rounded-full bg-[#F67963] mix-blend-screen z-[9999] opacity-80"
                style={{
                    x: secondDotX,
                    y: secondDotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 16,
                    height: 16,
                }}
            />

            {/* Smallest Dot (Last Trail) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none rounded-full bg-[#e26954] mix-blend-screen z-[9999] opacity-60"
                style={{
                    x: thirdDotX,
                    y: thirdDotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 10,
                    height: 10,
                }}
            />
        </>
    );
}
