// components/ViewportFix.tsx
"use client";

import { useEffect } from "react";

export default function ViewportFix() {
  useEffect(() => {
    const setDvh = () => {
      // Calculate 1% of the visual viewport height
      const dvh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--dvh', `${dvh}px`);
    };

    // Set on mount
    setDvh();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setDvh);
    window.addEventListener('orientationchange', setDvh);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setDvh);
      window.removeEventListener('orientationchange', setDvh);
    };
  }, []);
  
  return null; // Renders nothing visually
}