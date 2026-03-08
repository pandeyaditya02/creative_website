---
phase: 3
plan: 4
wave: 1
---

# Plan 3.4: Component Integration & Z-Stack Refactor

## Objective
Integrate the `<ClienteleMarquee />` into `page.tsx` and normalize the z-index stacking order to 1-7, ensuring the cinematic scroll experience remains intact.

## Context
- src/app/page.tsx
- src/components/ClienteleMarquee.tsx
- .gsd/ROADMAP.md

## Tasks

<task type="auto">
  <name>Refactor page.tsx Structure</name>
  <files>src/app/page.tsx</files>
  <action>
    1. Update imports: replace `ClientsMarquee` with `ClienteleMarquee`.
    2. Relocate `ClienteleMarquee`:
       - Insert it directly after `StatsCounter`.
       - Position it directly before `AboutSection`.
    3. Remove/Comment out `ClientsMarquee` (old) and `GrandCTA` to align with the new 7-layer plan.
    4. Re-index all active components:
       - HeroVideo: 1
       - StatsCounter: 2
       - ClienteleMarquee: 3
       - AboutSection: 4 (isTall={true})
       - ServicesSection: 5
       - WhyChooseUs: 6
       - ContactSection: 7 (isTall={true})
  </action>
  <verify>Check the file content for correct order and z-index values.</verify>
  <done>Page renders the new 7-layer stack in the specified order with sequential z-indexes.</done>
</task>

## Success Criteria
- [ ] `page.tsx` uses the new `ClienteleMarquee`.
- [ ] `StatsCounter` -> `ClienteleMarquee` -> `AboutSection` order is strictly followed.
- [ ] Z-indexes are renumbered from 1 to 7 without gaps.
- [ ] All wrapper logic (`PinnedSection`, `relative` divs) is preserved.
