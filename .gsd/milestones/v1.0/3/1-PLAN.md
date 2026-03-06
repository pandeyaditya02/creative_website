---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Fix HeroVideo Animation & Background

## Objective
Fix two bugs in `HeroVideo.tsx`:
1. The container div has a hardcoded `bg-[#2D3E50]` background color that shows before the YouTube video loads — change it to `bg-black`.
2. The video scroll parallax animation `gsap.to(videoRef.current, { scale: 1, ... })` has the same start and end scale (both `1` after initial scale is applied via class), resulting in no visible parallax effect. Fix by adding a `fromTo` with proper scale range.

## Context
- .gsd/SPEC.md
- .gsd/phases/1/DESIGN_GAPS.md
- src/components/HeroVideo.tsx

## Tasks

<task type="auto">
  <name>Fix HeroVideo container background color</name>
  <files>src/components/HeroVideo.tsx</files>
  <action>
    On line 186, the container div has `bg-[#2D3E50]`:
    ```tsx
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#2D3E50] text-white">
    ```
    Change `bg-[#2D3E50]` to `bg-black`:
    ```tsx
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
    ```
    This ensures the loading state is black rather than the charcoal blue-gray.
  </action>
  <verify>With dev server running, open localhost:3000. Before the YouTube video loads, the hero background should be pure black, not blue-gray.</verify>
  <done>Hero section renders with a black background on load.</done>
</task>

<task type="auto">
  <name>Fix HeroVideo GSAP parallax scale animation</name>
  <files>src/components/HeroVideo.tsx</files>
  <action>
    On lines 64-73, the current `gsap.to` animates `scale: 1` — but the element already starts at scale 1 (the CSS class `scale-[1.35]` is on the inner `videoRef` which is a child div, not the GSAP target). This means the animation does nothing visible because it's animating from current state to same state.

    Replace the existing `gsap.to(videoRef.current, ...)` block (lines 64-73) with a proper `fromTo` that creates a meaningful parallax zoom-out and fade:
    ```tsx
    gsap.fromTo(videoRef.current,
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
    ```
    Also smooth out the title parallax (lines 76-84) by adding `ease: "none"` and increasing `scrub` to `1` for a more deliberate feel:
    Change:
    ```tsx
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: "bottom center",
      scrub: true
    }
    ```
    To:
    ```tsx
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: "bottom center",
      scrub: 1,
    }
    ```
  </action>
  <verify>With dev server running, scroll past the hero section. The background video should visibly zoom OUT (from larger to smaller) as you scroll, with a slight blur increasing. The title should scroll up at a different rate than the viewport, creating a distinct parallax feel.</verify>
  <done>Scrolling the hero creates a visible zoom-out parallax on the video and a smooth lagged title movement.</done>
</task>

## Success Criteria
- [ ] Hero background is pure black before video loads.
- [ ] Scrolling the hero section creates a visible zoom-out parallax effect on the video.
- [ ] The title parallax has smooth scrub easing.
