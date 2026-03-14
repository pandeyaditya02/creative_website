"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Helper: Detect mobile devices
const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const HeroVideo = () => {
  const [muted, setMuted] = useState(true);
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  
  const playerRef = useRef<YT.Player | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Refs for GSAP
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);

  // Sync with Preloader
  useEffect(() => {
    const handlePreloaderFinish = () => setIsPreloaderFinished(true);
    window.addEventListener("preloaderFinished", handlePreloaderFinish);
    return () => window.removeEventListener("preloaderFinished", handlePreloaderFinish);
  }, []);

  // Update mobile view state on resize
  useEffect(() => {
    const checkMobile = () => setIsMobileView(isMobile());
    checkMobile();
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useGSAP(() => {
    if (!isPreloaderFinished) return;

    const mobile = isMobileView;

    // Progress container reveal
    gsap.from(progressContainerRef.current, {
      opacity: 0,
      y: 20,
      duration: mobile ? 0.6 : 1.5,
      delay: mobile ? 0.2 : 0.4
    });

    // Showreel Mask Reveal
    gsap.to(".showreel-word", {
      y: 0,
      duration: mobile ? 0.8 : 1.2,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.2
    });

    // Subtext Fade-in
    gsap.to(".hero-subtext", {
      opacity: 1,
      y: 0,
      duration: mobile ? 0.6 : 1.2,
      delay: mobile ? 0.5 : 0.8,
      ease: "power2.out"
    });

    // 2. Parallax & Scale on Scroll - Mobile Optimized
    if (videoContainerRef.current) {
      gsap.fromTo(videoContainerRef.current,
        { scale: mobile ? 1.15 : 1.35, filter: "blur(0px)" },
        {
          scale: mobile ? 1.0 : 1.05,
          filter: mobile ? "blur(0px)" : "blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: mobile ? 0.3 : 1.5, // Reduced scrub on mobile for performance
          }
        }
      );
    }
  }, { scope: containerRef, dependencies: [isMobileView, isPreloaderFinished] });

  const videoId = "4FXlxfgxGaQ";

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
    event.target.mute();

    // Polling interval: 500ms on mobile (battery), 250ms on desktop
    const pollInterval = isMobileView ? 500 : 250;
    
    progressIntervalRef.current = setInterval(() => {
      const player = playerRef.current;
      if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
        const duration = player.getDuration();
        const currentTime = player.getCurrentTime();
        if (duration > 0) {
          setProgress((currentTime / duration) * 100);
        }
      }
    }, pollInterval);
  };

  const onPlayerStateChange = (event: { data: number }) => {
    if (event.data === YT.PlayerState.ENDED) {
      setProgress(0);
    }
  };

  // Pause progress polling when tab is hidden (saves battery)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      } else if (!document.hidden && playerRef.current?.getPlayerState() === YT.PlayerState.PLAYING) {
        const pollInterval = isMobileView ? 500 : 250;
        progressIntervalRef.current = setInterval(() => {
          const player = playerRef.current;
          if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            const duration = player.getDuration();
            const currentTime = player.getCurrentTime();
            if (duration > 0) setProgress((currentTime / duration) * 100);
          }
        }, pollInterval);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isMobileView]);

  // YouTube API Loader
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
          playsinline: 1, // Critical for mobile
          rel: 0,
          showinfo: 0,
          // Mobile optimization: prefer lower quality to save bandwidth
          vq: isMobileView ? "small" : "medium",
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    if ((window as any).YT?.Player) {
      initPlayer();
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript?.parentNode?.insertBefore(tag, firstScript);

    (window as any).onYouTubeIframeAPIReady = initPlayer;

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if ((window as any).onYouTubeIframeAPIReady) delete (window as any).onYouTubeIframeAPIReady;
    };
  }, [isMobileView, onPlayerReady]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-dvh min-h-[calc(var(--dvh,1vh)*100)] overflow-hidden bg-black text-white"
    >
      {/* Background Video Container */}
      <div 
        ref={videoContainerRef} 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none origin-center brightness-[0.7] contrast-[1.1]"
        // Mobile: reduce initial scale to avoid excessive cropping in portrait
        style={{ transform: `scale(${isMobileView ? 1.15 : 1.35})` }}
      >
        <div
          id="hero-video-player"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          // Mobile: adjust min dimensions for better portrait coverage
          style={{
            width: "100%",
            height: "100%",
            minWidth: isMobileView ? "100%" : "120%",
            minHeight: isMobileView ? "100%" : "120%",
          }}
        />
      </div>

      {/* Text Content - Responsive Positioning + Safe Areas */}
      <div className="absolute z-20 flex flex-col gap-3 md:gap-4 
                      bottom-[calc(3rem+env(safe-area-inset-bottom))] 
                      left-[calc(2rem+env(safe-area-inset-left))]
                      md:bottom-[calc(6rem+env(safe-area-inset-bottom))] 
                      md:left-[calc(6rem+env(safe-area-inset-left))]">
        
        {/* Tier 1: Overline - Now with Staggered Mask Reveal */}
        <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#F67963] font-medium flex gap-[0.4em]">
          {["SHOWREEL", "2026"].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-1">
              <span className="inline-block transform translate-y-full showreel-word">
                {word}
              </span>
            </span>
          ))}
        </div>

        {/* Dynamic Progress Bar */}
        <div ref={progressContainerRef} className="flex flex-col gap-2 w-full max-w-[240px] md:max-w-sm mt-2">
          <div className="w-full h-[1px] bg-white/20 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#F67963] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tier 3: Subtext - Responsive font & max-width */}
        <p className="text-[12px] md:text-base text-white/50 max-w-[280px] md:max-w-md leading-relaxed opacity-0 hero-subtext">
          Cinematic production and creative media dedicated to elevating brand voices for the digital age.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-50">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[8px] uppercase tracking-[0.5em] font-bold">Scroll</span>
      </div>

      {/* Sound Toggle - Touch-Friendly */}
      <div className="absolute z-20 flex justify-end items-end 
                      bottom-[calc(3rem+env(safe-area-inset-bottom))] 
                      right-[calc(2rem+env(safe-area-inset-right))]
                      md:bottom-[calc(6rem+env(safe-area-inset-bottom))] 
                      md:right-[calc(6rem+env(safe-area-inset-right))]
                      opacity-70 hover:opacity-100 transition-opacity">
        <button
          onClick={toggleSound}
          className="flex items-center gap-3 group cursor-pointer pointer-events-auto 
                     min-h-[44px] min-w-[44px] p-2 -m-2" // Increased touch target
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-[#F67963] uppercase whitespace-nowrap">
            {muted ? "Sound Off" : "Sound On"}
          </span>
          <div className="flex items-center gap-[2px] h-4 relative">
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