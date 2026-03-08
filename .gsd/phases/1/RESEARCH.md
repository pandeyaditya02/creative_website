---
phase: 1
level: 2
researched_at: 2026-03-08
---

# Phase 1 Research: Lenis & GSAP Synchronization

## Discovery Level: 2 (External Library Integration)

### Objective
Integrate the `lenis` package to establish a global inertia-based smooth scrolling experience, specifically ensuring it synchronizes properly with our heavily GSAP-driven scroll environment (ScrollTrigger pinning, scrub timelines).

### Technical Requirements
1. **Package**: We will use `lenis` (as `@studio-freight/lenis` is deprecated).
2. **Global Provider**: A React Client Component (`SmoothScroll.tsx`) must be created to wrap the application `layout.tsx`.
3. **GSAP Ticker Sync (CRITICAL)**:
   - Lenis uses native `requestAnimationFrame`. GSAP uses its own tick. Desynchronization causes jitter on pinned elements.
   - We must couple them: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
   - We must prevent GSAP from jumping frames: `gsap.ticker.lagSmoothing(0)`
4. **React Lifecycle**: The Lenis instance must be properly destroyed via `return () => { lenis.destroy(); gsap.ticker.remove(...) }` in a `useEffect` hook to prevent memory leaks during hot module reloading or routing.

### Architecture Impact
- **Root Layout**: `src/app/layout.tsx` will receive a new `<SmoothScroll>` wrapper around `{children}`.
- **Component Integrity**: No changes are required to `HeroVideo`, `ServicesSection`, or `ContactSection`. The scroll provider operates immutably underneath GSAP.

### Conclusion
The architecture is sound. We will proceed to generate the execution plan for installing the dependency, building the provider, wrapping the layout, and verifying the ticker lag smoothing.
