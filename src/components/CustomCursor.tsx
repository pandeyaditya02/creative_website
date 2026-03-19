"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [hasMouse, setHasMouse] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasMouse(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHasMouse(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!hasMouse) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };

    // Lerp factors
    const LERP = 0.15; // Smooth but heavy
    const DOT_LERP = 0.35;

    let rafId: number;

    const tick = () => {
      pos.x += (mouse.x - pos.x) * LERP;
      pos.y += (mouse.y - pos.y) * LERP;

      dotPos.x += (mouse.x - dotPos.x) * DOT_LERP;
      dotPos.y += (mouse.y - dotPos.y) * DOT_LERP;

      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseDown = () => {
      cursor.style.transform += " scale(0.8)";
      cursor.style.borderColor = "var(--color-rose-accent)";
    };

    const onMouseUp = () => {
      cursor.style.transform = cursor.style.transform.replace(" scale(0.8)", "");
      cursor.style.borderColor = "rgba(255,255,255,0.2)";
    };

    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-magnetic]')) {
        cursor.classList.add("cursor-active");
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-magnetic]')) {
        cursor.classList.remove("cursor-active");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseEnter);
    document.addEventListener("mouseout", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseEnter);
      document.removeEventListener("mouseout", onMouseLeave);
    };
  }, [hasMouse]);

  if (!hasMouse) return null;

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body { cursor: none !important; }
          a, button, input, textarea, select { cursor: none !important; }
        }

        .cursor-outer {
          position: fixed;
          top: -20px;
          left: -20px;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, border-color 0.3s ease;
          will-change: transform;
        }

        .cursor-outer.cursor-active {
          width: 80px;
          height: 80px;
          top: -40px;
          left: -40px;
          background: rgba(255, 255, 255, 0.1);
          border-color: transparent;
        }

        .cursor-dot {
          position: fixed;
          top: -2px;
          left: -2px;
          width: 4px;
          height: 4px;
          background: var(--color-rose-accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          mix-blend-mode: difference;
        }
      `}</style>
      <div ref={cursorRef} className="cursor-outer" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
