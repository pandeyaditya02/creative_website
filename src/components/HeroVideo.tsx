"use client";
import React, { useState, useEffect, useRef } from "react";

const HeroVideo = () => {
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<YT.Player | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Background Video - YT.Player container */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none scale-[1.35] origin-center brightness-[0.7] contrast-[1.1]">
        <div
          id="hero-video-player"
          className="absolute top-1/2 left-1/2 w-[100%] h-[100%] min-w-[120%] min-h-[120%] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-16 pb-24">
        <div className="w-full max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-end">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-white mix-blend-difference drop-shadow-[0_0_20px_rgba(0,0,0,0.6)] uppercase">
              Crafting Stories<br />
              That Move
            </h1>
            {/* Dynamic Progress Bar */}
            <div className="flex flex-col gap-2 w-full max-w-md mt-8">
              <div className="flex justify-between text-xs font-bold tracking-widest text-orange-500 mb-1">
                <span>01/01</span>
                <span>PRODUCTION SHOWREEL</span>
              </div>
              <div className="w-full h-12 border border-gray-600 relative overflow-hidden">
                {/* Background layer */}
                <div className="absolute inset-0 bg-gray-500/20" />
                {/* Progress fill - animates with video */}
                <div
                  className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-[250ms] ease-linear"
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
              <span className="text-xs font-bold tracking-wider mb-2">SOUND</span>
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