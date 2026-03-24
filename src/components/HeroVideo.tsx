"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useIsMobile } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const HeroVideo = () => {
  const [muted, setMuted] = useState(true);
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  const isMobileView = useIsMobile(768);

  const playerRef = useRef<YT.Player | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePreloaderFinish = () => setIsPreloaderFinished(true);
    window.addEventListener("preloaderFinished", handlePreloaderFinish);
    return () => window.removeEventListener("preloaderFinished", handlePreloaderFinish);
  }, []);

  // Scroll parallax — GSAP ScrollTrigger for better compatibility with pinning & smooth scroll
  useGSAP(() => {
    const videoEl = videoContainerRef.current;
    const containerEl = containerRef.current;
    if (!videoEl || !containerEl) return;

    const startScale = isMobileView ? 1.0 : 1.0;
    const baseScale = isMobileView ? 1.15 : 2.0;

    // Set initial state
    gsap.set(videoEl, { 
      scale: startScale,
      filter: "brightness(1) contrast(1.1)"
    });

    // Create the parallax animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl,
        start: "top top",
        end: "bottom top", 
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    tl.to(videoEl, {
      scale: baseScale,
      filter: "brightness(1) contrast(1.1)",
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().filter(st => st.trigger === containerEl).forEach(st => st.kill());
    };
  }, { scope: containerRef, dependencies: [isMobileView] });

  const startPolling = useCallback((mobile: boolean) => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    const pollInterval = mobile ? 500 : 250;
    progressIntervalRef.current = setInterval(() => {
      const player = playerRef.current;
      if (player && player.getPlayerState() === window.YT?.PlayerState?.PLAYING) {
        const duration = player.getDuration();
        const currentTime = player.getCurrentTime();
        if (duration > 0) {
          setProgress((currentTime / duration) * 100);
        }
      }
    }, pollInterval);
  }, []);

  const stopPolling = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // Pause progress polling when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        stopPolling();
      } else if (playerRef.current?.getPlayerState() === window.YT?.PlayerState?.PLAYING) {
        startPolling(isMobileView);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      stopPolling();
    };
  }, [isMobileView, startPolling, stopPolling]);

  // YouTube API loader
  useEffect(() => {
    let destroyed = false;
    const videoId = "4FXlxfgxGaQ";

    const onPlayerReady = (event: { target: YT.Player }) => {
      if (destroyed) return;
      event.target.mute();
      startPolling(isMobileView);
    };

    const onPlayerStateChange = (event: { data: number }) => {
      if (destroyed) return;
      if (event.data === window.YT?.PlayerState?.ENDED) setProgress(0);
    };

    const initPlayer = () => {
      if (destroyed || playerRef.current) return;
      playerRef.current = new window.YT.Player("hero-video-player", {
        height: "100%",
        width: "100%",
        videoId,
        playerVars: {
          autoplay: 1, controls: 0, disablekb: 1, enablejsapi: 1,
          fs: 0, iv_load_policy: 3, loop: 1, modestbranding: 1,
          playlist: videoId, playsinline: 1, rel: 0, showinfo: 0,
        },
        events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript?.parentNode?.insertBefore(tag, firstScript);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      destroyed = true;
      stopPolling();
      if (window.onYouTubeIframeAPIReady === initPlayer) {
        delete window.onYouTubeIframeAPIReady;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSound = () => {
    setMuted((prev) => {
      if (playerRef.current) {
        prev ? playerRef.current.unMute() : playerRef.current.mute();
      }
      return !prev;
    });
  };

  // CSS transition delays for text reveals — triggered by isPreloaderFinished
  const mobile = isMobileView;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-dvh min-h-[calc(var(--dvh,1vh)*100)] overflow-hidden bg-black text-white"
    >
      {/* Background video container — transform managed by scroll listener */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none origin-center"
      >
        <div id="hero-video-player" />
        <style jsx global>{`
          #hero-video-player,
          #hero-video-player iframe {
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 100vw !important;
            height: 56.25vw !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
            min-width: 177.78vh !important;
            min-width: 177.78dvh !important;
            pointer-events: none;
          }
        `}</style>
      </div>

      {/* Text content */}
      <div
        className="absolute z-20 flex flex-col gap-3 md:gap-4
                    bottom-[calc(3rem+env(safe-area-inset-bottom))]
                    left-[calc(2rem+env(safe-area-inset-left))]
                    md:bottom-[calc(6rem+env(safe-area-inset-bottom))]
                    md:left-[calc(6rem+env(safe-area-inset-left))]"
      >
        <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#F67963] font-medium flex gap-[0.4em]">
          {["SHOWREEL", "2026"].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-1">
              <span
                className="inline-block"
                style={{
                  transform: isPreloaderFinished ? "translateY(0)" : "translateY(100%)",
                  transition: isPreloaderFinished
                    ? `transform ${mobile ? 0.8 : 1.2}s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.1}s`
                    : "none",
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>

        {/* Dynamic progress bar */}
        <div
          ref={progressContainerRef}
          className="flex flex-col gap-2 w-full max-w-[240px] md:max-w-sm mt-2"
          style={{
            opacity: isPreloaderFinished ? 1 : 0,
            transform: isPreloaderFinished ? "translateY(0)" : "translateY(20px)",
            transition: isPreloaderFinished
              ? `opacity ${mobile ? 0.6 : 1.5}s ease ${mobile ? 0.2 : 0.4}s, transform ${mobile ? 0.6 : 1.5}s ease ${mobile ? 0.2 : 0.4}s`
              : "none",
          }}
        >
          <div className="w-full h-[1px] bg-white/20 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#F67963] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p
          className="text-[12px] md:text-base text-white/50 max-w-[280px] md:max-w-md leading-relaxed"
          style={{
            opacity: isPreloaderFinished ? 1 : 0,
            transform: isPreloaderFinished ? "translateY(0)" : "translateY(16px)",
            transition: isPreloaderFinished
              ? `opacity ${mobile ? 0.6 : 1.2}s ease ${mobile ? 0.5 : 0.8}s, transform ${mobile ? 0.6 : 1.2}s ease ${mobile ? 0.5 : 0.8}s`
              : "none",
          }}
        >
          Cinematic production and creative media dedicated to elevating brand voices for the digital age.
        </p>
      </div>

      {/* Scroll indicator - Responsive visibility */}
      <div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 
                    hidden sm:flex flex-col items-center gap-3 md:gap-4"
        style={{
          opacity: isPreloaderFinished ? 0.4 : 0,
          transition: isPreloaderFinished
            ? `opacity 1s ease ${mobile ? 0.8 : 1.2}s`
            : "none",
        }}
      >
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold">Scroll</span>
      </div>

      {/* Sound toggle */}
      <div
        className="absolute z-20 flex justify-end items-end
                    bottom-[calc(3rem+env(safe-area-inset-bottom))]
                    right-[calc(2rem+env(safe-area-inset-right))]
                    md:bottom-[calc(6rem+env(safe-area-inset-bottom))]
                    md:right-[calc(6rem+env(safe-area-inset-right))]
                    hover:opacity-100 transition-opacity"
        style={{
          opacity: isPreloaderFinished ? 0.7 : 0,
          transition: isPreloaderFinished
            ? `opacity 1s ease ${mobile ? 0.8 : 1.2}s`
            : "none",
        }}
      >
        <button
          onClick={toggleSound}
          className="flex items-center gap-3 group cursor-pointer pointer-events-auto
                     min-h-[44px] min-w-[44px] p-2 -m-2"
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
