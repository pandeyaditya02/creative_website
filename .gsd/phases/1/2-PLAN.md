---
phase: 3
plan: 2
wave: 1
---

# Plan 3.2: Architecture Refactor

## Objective
Reorder `src/app/page.tsx` components and normalize z-indexes to ensure the cinematic stacking effect works correctly with the new layout.

## Context
- .gsd/SPEC.md
- src/app/page.tsx
- .gsd/ROADMAP.md

## Tasks

<task type="auto">
  <name>Reorder Components & Update Z-Indexes</name>
  <files>src/app/page.tsx</files>
  <action>
    1. Find the `StatsCounter` block (wrapped in `relative` div with z-index 8) at the bottom of the file.
    2. Move it between the `HeroVideo` `PinnedSection` and the `AboutSection` `PinnedSection`.
    3. Renumber all active component z-indexes:
       - Hero: 1
       - StatsCounter: 2
       - About: 3
       - Services: 4
       - Marquee: 5
       - WhyChooseUs: 6
       - GrandCTA: 7
       - Contact: 8 (Note: This was previously 9, but the reordering shifts the count).
    4. Keep `PortfolioSection` and `FeaturedSection` comments unmoved.
  </action>
  <verify>Check the file content order and z-index values.</verify>
  <done>StatsCounter is at index 2, and all z-indexes are sequential integers from 1 to 8 without gaps.</done>
</task>

## Success Criteria
- [ ] `StatsCounter` is physically located between `HeroVideo` and `AboutSection` in the code.
- [ ] `HeroVideo` zIndex is 1.
- [ ] `StatsCounter` zIndex is 2.
- [ ] `ContactSection` zIndex is 8.
- [ ] No layout regression in components (wrapper logic preserved).
