"use client";
import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [hasMouse, setHasMouse] = useState(false);

  const leadDotRef = useRef<HTMLDivElement>(null);
  const midDotRef = useRef<HTMLDivElement>(null);
  const trailDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasMouse(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHasMouse(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!hasMouse) return;

    const leadEl = leadDotRef.current;
    const midEl = midDotRef.current;
    const trailEl = trailDotRef.current;
    if (!leadEl || !midEl || !trailEl) return;

    // Chained lerp positions — each dot follows the previous one
    const mouse = { x: -200, y: -200 };
    const lead  = { x: -200, y: -200 };
    const mid   = { x: -200, y: -200 };
    const trail = { x: -200, y: -200 };

    // Lerp factors: higher = faster / less lag
    const LEAD_F  = 0.22;
    const MID_F   = 0.10;
    const TRAIL_F = 0.05;

    let rafId = 0;

    const tick = () => {
      lead.x  += (mouse.x - lead.x)  * LEAD_F;
      lead.y  += (mouse.y - lead.y)  * LEAD_F;

      mid.x   += (lead.x  - mid.x)   * MID_F;
      mid.y   += (lead.y  - mid.y)   * MID_F;

      trail.x += (mid.x   - trail.x) * TRAIL_F;
      trail.y += (mid.y   - trail.y) * TRAIL_F;

      leadEl.style.transform  = `translate(${lead.x}px,  ${lead.y}px)`;
      midEl.style.transform   = `translate(${mid.x}px,   ${mid.y}px)`;
      trailEl.style.transform = `translate(${trail.x}px, ${trail.y}px)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseDown = () => {
      leadEl.style.width  = "32px";
      leadEl.style.height = "32px";
    };

    const handleMouseUp = () => {
      leadEl.style.width  = "24px";
      leadEl.style.height = "24px";
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor="hover"], h1, h2, h3, h4, h5, h6, p, span, li, label')) {
        leadEl.classList.add("cursor-hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [data-cursor="hover"], h1, h2, h3, h4, h5, h6, p, span, li, label')) {
        leadEl.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [hasMouse]);

  if (!hasMouse) return null;

  const base =
    "fixed top-0 left-0 pointer-events-none rounded-full mix-blend-screen z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform";

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body { cursor: none; }
          a, button, input, textarea, select, 
          h1, h2, h3, h4, h5, h6, p, span, li, label { 
            cursor: none; 
          }

          a:hover, button:hover, [data-cursor="hover"]:hover,
          h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover,
          p:hover, span:hover, li:hover, label:hover {
            color: #F67963 !important;
            transition: color 0.3s ease;
          }
        }

        .cursor-lead {
          transition: width 0.15s ease, height 0.15s ease,
                      background-color 0.2s ease, border-color 0.2s ease;
        }

        .cursor-lead.cursor-hover {
          width: 48px !important;
          height: 48px !important;
          background-color: transparent !important;
          border: 2px solid #F67963 !important;
        }
      `}</style>

      {/* Leading dot — snappiest */}
      <div
        ref={leadDotRef}
        className={`${base} cursor-lead`}
        style={{
          width: 24,
          height: 24,
          backgroundColor: "#e26954",
          border: "2px solid transparent",
        }}
      />

      {/* Middle dot — medium lag */}
      <div
        ref={midDotRef}
        className={base}
        style={{ width: 16, height: 16, backgroundColor: "#F67963", opacity: 0.8 }}
      />

      {/* Trail dot — most lag */}
      <div
        ref={trailDotRef}
        className={base}
        style={{ width: 10, height: 10, backgroundColor: "#e26954", opacity: 0.6 }}
      />
    </>
  );
}
