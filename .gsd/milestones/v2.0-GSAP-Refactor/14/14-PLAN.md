---
phase: 14
plan: 1
wave: 1
---

# Plan 14.1: Stats Counter Component

## Objective
Implement a cinematic "Company Statistics" section with dynamic counting numbers, adapted to the dark-mode aesthetic.

## Context
- .gsd/SPEC.md
- .gsd/ROADMAP.md
- .gsd/phases/14/RESEARCH.md
- src/app/page.tsx

## Tasks

<task type="auto">
  <name>Create StatsCounter Component</name>
  <files>src/components/StatsCounter.tsx</files>
  <action>
    Create a new Client Component for the stats counter.
    - Implement a 3-column grid with massive macro-whitespace and deep dark background.
    - Use Heavy sans-serif for numbers (18, 60, 150) and widely-tracked slate grey text for labels.
    - Use GSAP ScrollTrigger to fade/translate up the section on enter.
    - Implement a count-up animation for the numbers (0 to target) over ~2 seconds with ease-out.
    - Ensure all styling aligns with the brutalist cinematic aesthetic.
  </action>
  <verify>grep -n "StatsCounter" src/components/StatsCounter.tsx</verify>
  <done>StatsCounter component exists with GSAP animation logic isolated.</done>
</task>

<task type="auto">
  <name>Wire StatsCounter into Landing Page</name>
  <files>src/app/page.tsx</files>
  <action>
    Import and place the StatsCounter component in the page layout.
    - Find the optimal location based on page flow.
    - Ensure proper spacing between StatsCounter and adjacent sections.
  </action>
  <verify>grep -n "StatsCounter" src/app/page.tsx</verify>
  <done>StatsCounter is rendered on the main page without breaking existing layout.</done>
</task>

## Success Criteria
- [ ] StatsCounter component renders a 3-column grid with deep dark background.
- [ ] Numbers count up to target numbers over 2 seconds on scroll.
- [ ] Typography matches the brutalist numbers and sophisticated labels design.
- [ ] Section smoothly fades and translates up when scrolling into view.
