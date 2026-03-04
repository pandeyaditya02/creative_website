---
phase: 1
plan: 3
wave: 2
---

# Plan 1.3: Cinematic Hero Component

## Objective
Build the full-bleed, edge-to-edge Hero section featuring an auto-playing muted background video, a transparent sticky navigation bar, and massive typography.

## Context
- `.gsd/phases/1-CONTEXT.md`
- `src/app/page.tsx`

## Tasks

<task type="auto">
  <name>Build Sticky Navigation</name>
  <files>
    - src/components/layout/Navbar.tsx
    - src/app/page.tsx
  </files>
  <action>
    - Create a `Navbar` component that is `fixed`, `w-full`, and `z-50`.
    - Add a subtle `backdrop-blur` effect on scroll.
    - Style links as minimalist, small, uppercase text with generous spacing.
    - Integrate it into the main homepage layout.
  </action>
  <verify>Test-Path src/components/layout/Navbar.tsx</verify>
  <done>A transparent, sticky navbar floats above the content.</done>
</task>

<task type="auto">
  <name>Build Hero Background Video & Overlays</name>
  <files>
    - src/components/home/Hero.tsx
    - src/app/page.tsx
  </files>
  <action>
    - Create `Hero.tsx` as a full-screen layout (`h-screen w-full`).
    - Embed a `<video>` tag set to `autoPlay`, `muted`, `loop`, `playsInline` with `object-cover`.
    - Add a dark overlay (`bg-black/40`) over the video for text contrast.
    - Overlay a massive H1 "CRAFTING VISUALS".
    - Add an absolute positioned horizontal progress bar indicator in International Orange at the bottom.
  </action>
  <verify>Test-Path src/components/home/Hero.tsx</verify>
  <done>The hero section spans the full viewport with an autoplaying video, dark overlay, and massive header.</done>
</task>

## Success Criteria
- [ ] Navbar is transparent and floats over the video.
- [ ] Hero video autoplays smoothly with a dark overlay.
- [ ] Typography scale matches the massive H1 requirement.
