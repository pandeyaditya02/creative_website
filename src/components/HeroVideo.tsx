"use client";
import React, { useState } from "react";

const HeroVideo = () => {
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    setMuted((prev) => !prev);
  };

  // Video ID extracted from your URL
  const videoId = "O8_VkfRkjRg";

  // Build YouTube embed URL with all necessary params
  const embedUrl = `https://www.youtube.com/embed/${videoId}?` +
    `autoplay=1` +
    `&mute=${muted ? 1 : 0}` +
    `&controls=0` +
    `&loop=1` +
    `&playlist=${videoId}` +          // Required for single-video looping
    `&rel=0` +
    `&modestbranding=1` +
    `&playsinline=1` +
    `&iv_load_policy=3` +             // Hide annotations
    `&disablekb=1`;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Background Video - using iframe */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none scale-[1.35] origin-center">
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-1/2 left-1/2 w-[100%] h-[100%] min-w-[120%] min-h-[120%] -translate-x-1/2 -translate-y-1/2"
          style={{ border: 0 }}
        />
      </div>

      {/* Overlay Content – exactly the same as before */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-16 pb-24 bg-black/10">
        <div className="w-full max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-orange-500 uppercase">
              Bringing ideas to life<br />
              one frame at a time
            </h1>
            {/* Static Showreel Label */}
            <div className="flex flex-col gap-2 w-full max-w-md mt-8">
              <div className="flex justify-between text-xs font-bold tracking-widest text-orange-500 mb-1">
                <span>01/01</span>
                <span>PRODUCTION SHOWREEL</span>
              </div>
              {/* Static decorative bar */}
              <div className="w-full h-12 border border-gray-600 relative">
                <div className="absolute top-0 left-0 h-full w-full bg-gray-500/20"></div>
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
                    className={`w-1 bg-white transition-all duration-300 ${muted ? 'h-1' : 'animate-pulse'}`}
                    style={{
                      height: muted ? '4px' : `${[40, 70, 100, 60, 30][i - 1]}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
                {muted && (
                  <div className="w-8 h-[2px] bg-white rotate-[-45deg] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {muted ? 'UNMUTE' : 'MUTE'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;