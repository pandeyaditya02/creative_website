"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HeroVideo = () => {
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Refs key to GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);

  // Direct reference to the native video element
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // 1. Advanced Split Text Animation
    if (titleRef.current) {
      const originalHTML = titleRef.current.innerHTML;
      // Split by <br> tags to preserve line breaks
      const lines = originalHTML.split(/<br\s*\/?>/i);

      // Clear and rebuild with spans for character animation
      titleRef.current.innerHTML = lines.map((line, lineIndex) => {
        const words = line.trim().split(/\s+/);
        const lineHTML = words.map(word =>
          `<span class="word" style="display: inline-block; overflow: hidden; perspective: 1000px;">
            ${word.split('').map(char =>
            `<span class="char" style="display: inline-block; transform: translateY(120%) rotateX(-90deg); opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
          ).join('')}
          </span>&nbsp;`
        ).join('');
        return lineHTML + (lineIndex < lines.length - 1 ? '<br />' : '');
      }).join('');

      // Animate characters with stagger
      gsap.to(titleRef.current.querySelectorAll('.char'), {
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: {
          amount: 0.8,
          from: "start"
        }
      });
    }

    // Progress container reveal
    gsap.from(progressContainerRef.current, {
      opacity: 0,
      y: 20,
      duration: 1.5,
      delay: 0.5
    });

    // 2. Parallax & Scale on Scroll
    gsap.fromTo(videoContainerRef.current,
      { scale: 1.35, filter: "blur(0px)" },
      {
        scale: 1.05,
        filter: "blur(4px)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      }
    );

    // Parallax text (moves slower or faster than scroll)
    gsap.to(titleRef.current, {
      y: -100, // Move up
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: 1,
      }
    });

  }, { scope: containerRef });

  const toggleSound = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setMuted(newMutedState);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Background Video - Native HTML5 Player */}
      <div ref={videoContainerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none scale-[1.35] origin-center brightness-[0.7] contrast-[1.1]">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted={muted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

      {/* Text Content - Anchored Bottom Left */}
      <div className="absolute bottom-12 left-8 md:bottom-24 md:left-24 z-20 flex flex-col gap-4">
        {/* Tier 1: Overline */}
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#F67963] font-medium">
          SHOWREEL 2026
        </div>

        {/* Tier 2: Brutalist Headline */}
        <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-white tracking-tighter uppercase leading-[0.9]">
          CRAFTING STORIES<br />
          THAT MOVE
        </h1>

        {/* Dynamic Progress Bar */}
        <div ref={progressContainerRef} className="flex flex-col gap-2 w-full max-w-sm mt-4">
          <div className="w-full h-[2px] bg-white/20 relative overflow-hidden">
            {/* Progress fill */}
            <div
              className="absolute top-0 left-0 h-full bg-[#F67963] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tier 3: Subtext */}
        <p className="text-sm md:text-base text-white/70 max-w-sm leading-relaxed mt-2">
          Cinematic production and creative media dedicated to elevating brand voices.
        </p>
      </div>

      {/* Sound Toggle - Anchored Bottom Right */}
      <div className="absolute bottom-12 right-8 md:bottom-24 md:right-24 z-20 flex justify-end items-end opacity-70 hover:opacity-100 transition-opacity">
        <button
          onClick={toggleSound}
          className="flex items-center gap-3 group cursor-pointer pointer-events-auto"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#F67963] uppercase">
            {muted ? "Sound Off" : "Sound On"}
          </span>
          <div className="flex items-center gap-[2px] h-4 relative">
            {/* Audio visualizer bars */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-[2px] bg-white transition-all duration-300 ${muted ? "h-[2px]" : "animate-pulse"}`}
                style={{
                  height: muted ? "2px" : `${[60, 100, 40, 80][i - 1]}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
            {muted && (
              <div className="w-6 h-[1.5px] bg-white rotate-[-45deg] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeroVideo;