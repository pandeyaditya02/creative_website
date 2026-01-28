"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configurations for trailing effect
    const springConfigFirst = { damping: 25, stiffness: 200, mass: 0.5 };
    const springConfigSecond = { damping: 20, stiffness: 150, mass: 0.8 };
    const springConfigThird = { damping: 15, stiffness: 100, mass: 1 };

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

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <style jsx global>{`
        body {
          cursor: none;
        }
        /* Ensure cursor is visible on interactive elements if needed, 
           or keep 'none' to fully replace. 
           Usually we want full replacement unless specified otherwise. */
        a, button, input, textarea {
           cursor: none;
        }
      `}</style>

            {/* Biggest Dot (Leading) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none rounded-full bg-primary mix-blend-screen z-50 shadow-[0_0_10px_rgba(204,255,0,0.8)]"
                style={{
                    x: firstDotX,
                    y: firstDotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovering ? 32 : 24,
                    height: isHovering ? 32 : 24,
                }}
            />

            {/* Medium Dot (Middle Trail) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none rounded-full bg-secondary mix-blend-screen z-50 opacity-80 shadow-[0_0_10px_rgba(255,0,153,0.8)]"
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
                className="fixed top-0 left-0 pointer-events-none rounded-full bg-primary mix-blend-screen z-50 opacity-60"
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
