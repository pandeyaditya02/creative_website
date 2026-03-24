"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — flip these to switch from video → Lottie
// ─────────────────────────────────────────────────────────────────────────────
const USE_LOTTIE = false;          // set true + install `@lottiefiles/react-lottie-player`
const LOTTIE_SRC = "/preloader.json"; // path to your Lottie JSON
const VIDEO_SRC  = "/LOGO LOW RESOLUTION.mp4";
const PRELOADER_TIMEOUT = 1600; // duration or safety cap in ms (e.g., 4000 = 4s)
// ─────────────────────────────────────────────────────────────────────────────

export default function Preloader() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const hasExitedRef  = useRef(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = "hidden";

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── EXIT ANIMATION ────────────────────────────────────────────────────────
    const triggerExit = () => {
      if (hasExitedRef.current) return;
      hasExitedRef.current = true;

      // Use rAF to ensure the browser has committed one paint before animating,
      // which prevents the scrollbar-flash jank on reveal.
      requestAnimationFrame(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            // Restore scroll only after the panel is fully off-screen
            document.body.style.overflow = "";
            if (containerRef.current) {
              containerRef.current.style.display = "none";
            }
            // Notify the rest of the app (e.g. Navbar entrance animations)
            window.dispatchEvent(new CustomEvent("preloaderFinished"));
          },
        });

        if (prefersReduced) {
          // Instant dismiss — no animation
          tl.set(containerRef.current, { autoAlpha: 0 });
        } else {
          // ── CURTAIN SLIDE-UP ───────────────────────────────────────────────
          tl
            // 1. Fade out the video/logo first so the curtain lifts clean
            .to(videoRef.current, {
              opacity: 0,
              duration: 0.45,
              ease: "power2.in",
            })
            // 2. Slide entire panel upward like a theatre curtain
            .to(
              containerRef.current,
              {
                yPercent: -105,   // extra 5% ensures no pixel of overlay remains
                duration: 1.15,
                ease: "power4.inOut",
              },
              "-=0.1"            // tiny overlap for a seamless feel
            );
        }
      });
    };

    // ── DOUBLE-GATE LOGIC ─────────────────────────────────────────────────────
    
    // Gate 1 — Wait for video to complete its full playback
    const gate1 = new Promise<void>((resolve) => {
      const v = videoRef.current;
      if (!v) {
        resolve(); // skip if no video
        return;
      }
      
      const onEnded = () => {
        v.removeEventListener("ended", onEnded);
        resolve();
      };
      
      // If video somehow already ended or failed to start
      if (v.ended) {
        resolve();
      } else {
        v.addEventListener("ended", onEnded);
        // Safety timeout in case video fails to trigger 'ended'
        setTimeout(resolve, PRELOADER_TIMEOUT);
      }
    });

    // Gate 2 — all heavy assets (images, videos, fonts) fully loaded
    const gate2 = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), { once: true });
      }
    });

    Promise.all([gate1, gate2]).then(() => triggerExit());

    return () => {
      // Safety: restore scroll if component unmounts unexpectedly
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="preloader-overlay"
      aria-hidden="true"
      role="presentation"
    >
      {/* ── VIDEO LAYER ─────────────────────────────────────────────────────── */}
      {!USE_LOTTIE && (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          preload="auto"
          onError={() => setShowFallback(true)}
          className="preloader-video"
        />
      )}

      {/* ── LOTTIE LAYER ────────────────────────────────────────────────────── 
           To activate:
           1. Set USE_LOTTIE = true above
           2. npm install @lottiefiles/react-lottie-player
           3. Place your .json file in /public and update LOTTIE_SRC
      */}
      {USE_LOTTIE && (
        <div className="preloader-lottie-wrapper">
          {/* <Player autoplay loop src={LOTTIE_SRC} style={{ width: "40vw", maxWidth: 500 }} /> */}
          {/* ^ Uncomment after installing @lottiefiles/react-lottie-player */}
          <p className="preloader-lottie-placeholder">
            Lottie player — enable USE_LOTTIE
          </p>
        </div>
      )}

      {/* ── CSS-ONLY FALLBACK ────────────────────────────────────────────────── 
           Shown automatically if the <video> element fires an error event.
           Pure CSS — no JS required, no blank-screen risk.
      */}
      {showFallback && (
        <div className="preloader-fallback" aria-label="Loading…">
          <div className="preloader-ring" />
          <span className="preloader-fallback-text">Loading…</span>
        </div>
      )}
    </div>
  );
}
