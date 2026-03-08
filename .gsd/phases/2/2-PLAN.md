---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Cinematic Pre-loader & Logo Update

## Objective
Build a premium 0-100% dark-mode numeric loader overlay that ensures critical hero video assets load before unmasking via GSAP animation (sliding up and fading out). Additionally, update the site logo to the newly provided asset.

## Context
- `src/components/Preloader.tsx` (NEW)
- `src/app/layout.tsx` (or `src/app/page.tsx` depending on architecture)
- `src/components/Navbar.tsx` (for the logo update)
- `public/LOGO SAMP 01.png`

## Tasks

<task type="auto">
  <name>Create Cinematic Preloader</name>
  <files>src/components/Preloader.tsx, src/app/layout.tsx</files>
  <action>
    - CREATE `src/components/Preloader.tsx` as a Client Component.
    - Implement a full-screen, absolute positioned `z-50` dark overlay wrapper.
    - Use GSAP or React state to rapidly count from 0 to 100%.
    - Once 100% is reached, use GSAP to animate the wrapper sliding upwards (`yPercent: -100`) with an `ease-out` easing, and `opacity: 0` to reveal the site smoothly underneath.
    - Update `src/app/layout.tsx` to mount `<Preloader />` as the topmost element in the body so it covers everything on initial load.
  </action>
  <verify>npm run dev — compiles without errors</verify>
  <done>Preloader masks the screen, counts to 100, then smoothly animates up/out revealing the app.</done>
</task>

<task type="auto">
  <name>Update Site Logo</name>
  <files>src/components/Navbar.tsx</files>
  <action>
    - MODIFY `src/components/Navbar.tsx` (and any other core component defining the brand logo).
    - Replace the existing text-based or old SVG logo with a next/image component loading `/LOGO SAMP 01.png`.
    - Ensure it is correctly sized (e.g. `w-32` or similar) to match height expectations of a premium layout without stretching.
  </action>
  <verify>npm run dev — visually verify logo renders</verify>
  <done>The Navbar displays "LOGO SAMP 01.png" correctly.</done>
</task>

## Success Criteria
- [ ] Preloader renders on initial hydration.
- [ ] Preloader cleanly animates out to reveal content without flash of unstyled content (FOUC).
- [ ] Navbar logo is updated to `LOGO SAMP 01.png`.
