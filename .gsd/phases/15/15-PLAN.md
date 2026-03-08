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
    - Change `toggleActions: "play none none none"` to `"play reverse play reverse"` so the items hide when scrolling back up.
    - Ensure easing and sequence remain smooth without snapping.
    - Do NOT alter any HTML, Tailwind classes, or colors.
  </action>
  <verify>grep -n "toggleActions" src/components/WhyChooseUs.tsx</verify>
  <done>toggleActions updated to support bi-directional scroll without layout shifts.</done>
</task>

<task type="auto">
  <name>Refactor StatsCounter Animations</name>
  <files>src/components/StatsCounter.tsx</files>
  <action>
    Update the GSAP ScrollTrigger configuration for the section reveal and count-up effect.
    - Change `toggleActions: "play none none reverse"` to `"play reverse play reverse"` so the section fades out and resets when scrolling up.
    - Ensure count-up animation resets seamlessly.
  </action>
  <verify>grep -n "toggleActions" src/components/StatsCounter.tsx</verify>
  <done>StatsCounter animations revert safely on reverse scroll.</done>
</task>

## Success Criteria
- [ ] Animations reverse smoothly when scrolling upwards.
- [ ] Visual structure, colors, and static design elements remain completely untouched.
- [ ] No hard snapping occurs during reverse scroll.
