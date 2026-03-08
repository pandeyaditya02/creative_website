---
phase: 3
plan: 3
wave: 1
---

# Plan 3.3: Standalone Clientele Marquee

## Objective
Design and build a standalone, premium `ClienteleMarquee.tsx` component featuring monochromatic logo tickers, hover-to-color interactions, and infinite scrolling.

## Context
- .gsd/SPEC.md
- src/app/globals.css
- public/brand-logos/
- .gsd/ROADMAP.md

## Tasks

<task type="auto">
  <name>Setup Marquee Styles</name>
  <files>src/app/globals.css</files>
  <action>
    Add the marquee keyframes and utility class to `src/app/globals.css`:
    ```css
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 30s linear infinite;
    }
    ```
    Ensure it's integrated into the Tailwind v4 `@theme` or `@utility` layer if needed, or simply as a standard CSS rule.
  </action>
  <verify>Check `src/app/globals.css` for the new rules.</verify>
  <done>Styles are present and correctly formatted.</done>
</task>

<task type="auto">
  <name>Build ClienteleMarquee Component</name>
  <files>src/components/ClienteleMarquee.tsx</files>
  <action>
    1. Create `src/components/ClienteleMarquee.tsx`.
    2. Define `logos` array using file paths from `public/brand-logos/`.
    3. Implement the UI:
       - Outer wrapper with `py-24` and `bg-black`.
       - Marquee track with `overflow-hidden` and horizontal gradient fades.
       - Moving inner container with `flex` and `animate-marquee`.
       - Map `logos` twice for seamless loop.
       - Logo styling: `grayscale opacity-50 transition-all duration-500 hover:grayscale-0 hover:opacity-100`.
       - Use `next/image` with proper aspect ratios or fixed heights.
  </action>
  <verify>Check the file content for completeness and correct logic.</verify>
  <done>Component is created with all specified features.</done>
</task>

## Success Criteria
- [ ] `ClienteleMarquee.tsx` exists.
- [ ] Marquee animation is defined in CSS.
- [ ] Logos transition from grayscale/dim to color/bright on hover.
- [ ] The ticker scrolls infinitely and seamlessly.
- [ ] No changes made to `page.tsx`.
