"use client";
import { useEffect, useRef, useState, RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** If true, stays observed so inView can toggle back to false on leave */
  repeat?: boolean;
}

/**
 * Returns [ref, inView].
 * By default fires once — disconnects after the element enters the viewport.
 * Immediately returns inView=true if the user prefers reduced motion.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px", repeat = false } = options;

  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion: skip animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) observer.disconnect();
        } else if (repeat) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, repeat]);

  return [ref, inView];
}
