---
phase: 11
plan: 1
wave: 1
---

# Plan 11.1: Ultra-Premium Hero Section Redesign

## Objective
Execute a complete redesign of the Hero Section using an ultra-premium, cinematic layout. The goal is to perfect video alignment (100vh/100vw, absolute positioning, object-fit cover), enforce typographic restraint with a sophisticated 3-tier hierarchy anchored bottom-left/center, and apply high-end UI polish including feathered gradient overlays and sleek micro-interactions.

## Context
- `.gsd/ROADMAP.md`
- `src/components/HeroVideo.tsx`
- `src/app/page.tsx`

## Tasks

<task type="auto">
  <name>Redesign HTML & Tailwind Structure in HeroVideo</name>
  <files>src/components/HeroVideo.tsx</files>
  <action>
    MODIFY: src/components/HeroVideo.tsx
    - **Step 1 (Video Alignment):** Force the main container to `w-screen h-screen overflow-hidden relative`. Set the video to `absolute inset-0 w-full h-full object-cover object-center`.
    - **Step 2 (Typographic Restraint):** Downscale the giant text. Move the content block to `absolute bottom-12 left-8 md:bottom-24 md:left-24 z-20 flex flex-col gap-4`. Implement the 3-tier typography:
      1. Overline: `text-[10px] uppercase tracking-[0.4em] text-[#F67963]` (e.g., "SHOWREEL 2026").
      2. Headline: Sharp, brutalist, and modern display font (e.g., `text-4xl md:text-5xl lg:text-6xl font-sans font-black text-white tracking-tighter uppercase leading-[0.9]`).
      3. Subtext: Minimal, highly legible (e.g., `text-sm text-white/70 max-w-sm leading-relaxed`).
    - **Step 3 (High-End UI Polish):** Remove any solid background boxes behind text. Add a global subtle feathered gradient overlay anchoring the bottom (`absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent z-10`).
    - **Micro-interactions:** Restyle the "SOUND" toggle to be a sleek, elegant Play/Pause or Sound custom toggle component near the text block or anchored bottom-right.
  </action>
  <verify>Check localhost:3000 to ensure the hero section loads without horizontal scrolling, and the 3-tier hierarchy is legible over the new feathered gradient.</verify>
  <done>HTML/Tailwind layout completely updated matching the ultra-premium cinematic spec.</done>
</task>

<task type="checkpoint:human-verify">
  <name>Review Cinema & Typography Design</name>
  <files>N/A</files>
  <action>
    Pause and present the updated Hero layout via screenshot (using browser subagent) for the user to confirm the luxury feel and typographic sizing before proceeding to Phase 12.
  </action>
  <verify>User approves the layout.</verify>
  <done>Design is locked in.</done>
</task>

## Success Criteria
- [ ] No horizontal scrolling or white gaps (100vh/100vw perfect alignment).
- [ ] Video maintains `object-fit: cover` and does not stretch or break.
- [ ] 3-tier typography hierarchy successfully implemented.
- [ ] Feathered gradient overlay adds contrast without blocking the cinematic view.
- [ ] Custom sound toggle or scroll indicator added.
