"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook to detect media query matches.
 * @param query - The media query to match (e.g., "(max-width: 768px)")
 * @returns boolean - True if the media query matches, false otherwise.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    
    // Initial check
    listener();

    // Listen for changes
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

/**
 * Convenience hook to detect mobile view (< 768px).
 */
export const useIsMobile = (breakpoint: number = 768): boolean => {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
};
