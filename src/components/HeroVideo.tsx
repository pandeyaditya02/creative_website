"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HeroVideo = () => {
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<YT.Player | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Refs key to GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Advanced Split Text Animation
    const titleText = titleRef.current?.innerText || "";
    const words = titleText.split(' ');

    if (titleRef.current) {
      // Clear and rebuild with spans for character animation
      titleRef.current.innerHTML = words.map(word =>
        `<span class="word" style="display: inline-block; overflow: hidden; perspective: 1000px;">
          ${word.split('').map(char =>
          `<span class="char" style="display: inline-block; transform: translateY(120%) rotateX(-90deg); opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('')}
        </span>&nbsp;`
      ).join('');

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
    gsap.to(videoRef.current, {
      scale: 1, // Shrink from 1.35
      filter: "blur(5px)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Parallax text (moves slower or faster than scroll)
    gsap.to(titleRef.current, {
      y: -100, // Move up
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: true
      }
    });

  }, { scope: containerRef });

  const videoId = "O8_VkfRkjRg";

  const toggleSound = () => {
    setMuted((prev) => {
      if (playerRef.current) {
        if (prev) {
          playerRef.current.unMute();
        } else {
          playerRef.current.mute();
        }
      }
      return !prev;
    });
  };

  const onPlayerReady = (event: { target: YT.Player }) => {
    // Mute initially
    event.target.mute();

    // Poll for progress updates every 250ms while playing
    progressIntervalRef.current = setInterval(() => {
      const player = playerRef.current;
      if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
        const duration = player.getDuration();
        const currentTime = player.getCurrentTime();
        if (duration > 0) {
          setProgress((currentTime / duration) * 100);
        }
      }
    }, 250);
  };

  const onPlayerStateChange = (event: { data: number; target?: YT.Player }) => {
    // Optional: Handle state changes (e.g., reset progress on end, though loop params should prevent full end)
    if (event.data === YT.PlayerState.ENDED) {
      setProgress(0);
    }
  };

  useEffect(() => {
    let scriptLoaded = false;

    const initPlayer = () => {
      if (playerRef.current || scriptLoaded) return;
      scriptLoaded = true;

      playerRef.current = new (window as any).YT.Player("hero-video-player", {
        height: "100%",
        width: "100%",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          modestbranding: 1,
          playlist: videoId,
          playsinline: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    // Check if YT API is already loaded
    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
      return;
    }

    // Load the script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    // Global callback for when API is ready
    (window as any).onYouTubeIframeAPIReady = initPlayer;

    // Cleanup
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if ((window as any).onYouTubeIframeAPIReady) {
        delete (window as any).onYouTubeIframeAPIReady;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#2D3E50] text-white">
      {/* Background Video - YT.Player container */}
      <div ref={videoRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none scale-[1.35] origin-center brightness-[0.7] contrast-[1.1]">
        <div
          id="hero-video-player"
          className="absolute top-1/2 left-1/2 w-[100%] h-[100%] min-w-[120%] min-h-[120%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-16 pb-24">
        <div className="w-full max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-end">
          <div className="flex flex-col gap-6">
            <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-[#F67963] uppercase">
              Crafting Stories <br />
              That Move
            </h1>
            {/* Dynamic Progress Bar */}
            <div ref={progressContainerRef} className="flex flex-col gap-2 w-full max-w-md mt-8">
              <div className="flex justify-between text-xs font-bold tracking-widest text-[#F67963] mb-1">
                <span>01/01</span>
                <span>PRODUCTION SHOWREEL</span>
              </div>
              <div className="w-full h-12 border border-gray-600 relative overflow-hidden">
                {/* Background layer */}
                <div className="absolute inset-0 bg-gray-500/20" />
                {/* Progress fill - animates with video */}
                <div
                  className="absolute top-0 left-0 h-full bg-[#e26954] transition-all duration-[250ms] ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end items-end pb-4">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex flex-col items-center gap-1 group cursor-pointer pointer-events-auto"
            >
              <span className="text-xs font-bold tracking-wider mb-2 text-[#F67963]">SOUND</span>
              <div className="flex items-center gap-[2px] h-6 relative">
                {/* Audio visualizer bars */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-1 bg-white transition-all duration-300 ${muted ? "h-1" : "animate-pulse"}`}
                    style={{
                      height: muted ? "4px" : `${[40, 70, 100, 60, 30][i - 1]}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
                {muted && (
                  <div className="w-8 h-[2px] bg-white rotate-[-45deg] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {muted ? "UNMUTE" : "MUTE"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;