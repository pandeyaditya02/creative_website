---
phase: 15
plan: 1
wave: 1
---

# Plan 15.1: Bi-Directional Animation Refactor

## Objective
Update the animation logic in "WHY CHOOSE US" (and related components) so that elements animate in when scrolling down and reverse out smoothly when scrolling up, preserving all existing design and structure.

## Context
- .gsd/SPEC.md
- .gsd/ROADMAP.md
- src/components/WhyChooseUs.tsx
- src/components/StatsCounter.tsx

## Tasks

<task type="auto">
  <name>Refactor WhyChooseUs Animations</name>
  <files>src/components/WhyChooseUs.tsx</files>
  <action>
    Update the GSAP ScrollTrigger configuration for the ".wcu-point" items.
    - Change `toggleActions: "play none none none"` to `"play reverse play reverse"`.
    - Ensure easing and sequence remain smooth without snapping.
  </action>
  <verify>grep -n "toggleActions" src/components/WhyChooseUs.tsx</verify>
  <done>toggleActions updated to "play reverse play reverse".</done>
</task>

<task type="auto">
  <name>Refactor StatsCounter Animations</name>
  <files>src/components/StatsCounter.tsx</files>
  <action>
    Update the GSAP ScrollTrigger configurations (reveal and count-up).
    - Change `toggleActions: "play none none reverse"` to `"play reverse play reverse"`.
  </action>
  <verify>grep -n "toggleActions" src/components/StatsCounter.tsx</verify>
  <done>toggleActions updated to "play reverse play reverse".</done>
</task>

<task type="auto">
  <name>Refactor GrandCTA & AboutSection Animations</name>
  <files>src/components/GrandCTA.tsx, src/components/AboutSection.tsx</files>
  <action>
    Update the GSAP ScrollTrigger configurations in GrandCTA.tsx and AboutSection.tsx.
    - Change any instances of `toggleActions: "play none none none"` or `"play none none reverse"` to `"play reverse play reverse"`.
  </action>
  <verify>grep -n "toggleActions" src/components/GrandCTA.tsx</verify>
  <done>All components successfully updated to bi-directional configurations.</done>
</task>

## Success Criteria
- [ ] Animations reverse smoothly when scrolling upwards.
- [ ] Visual structure, colors, and static design elements remain completely untouched.
- [ ] No hard snapping occurs during reverse scroll.
