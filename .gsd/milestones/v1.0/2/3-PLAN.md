---
phase: 2
plan: 3
wave: 2
---

# Plan 2.3: Typography & Global Spacing Cohesion

## Objective
Apply targeted fixes across sections to reduce excessive black voids, create smoother typographic scale transitions, and add subtle background texture to sections so they feel less like isolated islands. This is pure CSS/Tailwind polish — no behavior changes.

## Context
- .gsd/SPEC.md
- .gsd/phases/1/DESIGN_GAPS.md
- src/app/globals.css
- src/components/AboutSection.tsx
- src/components/FeaturedSection.tsx

## Tasks

<task type="auto">
  <name>Add global smooth scrolling and font stack upgrade to globals.css</name>
  <files>src/app/globals.css</files>
  <action>
    In `globals.css`, improve the global body styling:
    1. The body currently uses `font-family: Arial, Helvetica, sans-serif` (line 51). Since the layout imports Geist via CSS variables (`--font-geist-sans`), update the body font to use it:
       Change line 51 from:
       `font-family: Arial, Helvetica, sans-serif;`
       To:
       `font-family: var(--font-sans), system-ui, sans-serif;`
    2. Add `scroll-behavior: smooth;` to the body block to enable native smooth scrolling between anchor links.
    3. Add `-webkit-font-smoothing: antialiased;` and `text-rendering: optimizeLegibility;` to the body block for crisper text rendering at all sizes.
  </action>
  <verify>With dev server running, observe text across all sections. Text should appear crisper and use the Geist Sans font (verifiable in browser DevTools > Elements > Computed styles).</verify>
  <done>Body text uses `--font-sans` (Geist Sans) and has antialiased rendering.</done>
</task>

<task type="auto">
  <name>Tighten section padding to reduce excessive vertical voids</name>
  <files>src/components/AboutSection.tsx, src/components/FeaturedSection.tsx</files>
  <action>
    The audit identified excessive black voids between sections and within individual sections. Fix by reducing top/bottom padding in the two tallest sections.

    **In `AboutSection.tsx` (line 77):**
    Change section className padding from `py-24` to `py-16`.

    **In `FeaturedSection.tsx` (line 20):**
    Change section className padding from `py-24 px-6 sm:px-8` to `py-16 px-6 sm:px-8`.

    Do NOT change any other styles in these files.
  </action>
  <verify>With dev server running, scroll through the page. The About and Featured sections should feel more compact and purposeful, with less dead space at the top and bottom.</verify>
  <done>Both sections have `py-16` padding. Vertical rhythm across the page is tighter.</done>
</task>

## Success Criteria
- [ ] Body text renders in Geist Sans with antialiased smoothing.
- [ ] Section padding produces a tighter, more premium vertical rhythm.
