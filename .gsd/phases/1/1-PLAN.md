---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Content & Logic Expansion

## Objective
Update the `ServicesSection` component to support 6 slides by injecting the "Events" service, reordering existing items, and adjusting the scroll trigger dynamics.

## Context
- .gsd/SPEC.md
- src/components/ServicesSection.tsx
- .gsd/ROADMAP.md

## Tasks

<task type="auto">
  <name>Update Services Data</name>
  <files>src/components/ServicesSection.tsx</files>
  <action>
    Modify the `services` array in `src/components/ServicesSection.tsx`:
    1. Keep "Branded Content" and "AV Production" as 01 and 02.
    2. Insert "Events" at index 2 (position 03):
       - Title: "Events"
       - Description: "A complete Creative + Technical Partner for Events, turning ideas into unforgettable experiences."
       - Highlights: ["Content design for IP's & Events", "Production execution", "Post Production"]
       - Image: "/events.jpg" (Placeholder path, but must be valid in the code)
    3. Shift "Media Consultation" and "Digital Marketing" to indices 3 and 4.
    4. Move "Graphical Integration" to the end (index 5, position 06).
  </action>
  <verify>Check the `services` array in the source code.</verify>
  <done>Array has 6 objects in the specified order.</done>
</task>

<task type="auto">
  <name>Adjust Scroll & UI Logic</name>
  <files>src/components/ServicesSection.tsx</files>
  <action>
    1. Update the `ScrollTrigger` `end` value from `+=400%` to `+=500%` to accommodate 5 transitions between 6 slides.
    2. Ensure `TOTAL_SLIDES` (derived from `services.length`) is used correctly in the counter logic.
    3. Verify the `onUpdate` logic for `counterRef` correctly handles the 1-6 range.
  </action>
  <verify>Run `npm run dev` and scroll through the section.</verify>
  <done>Counter shows 01-06, and all 6 slides are accessible with smooth pacing.</done>
</task>

## Success Criteria
- [ ] 6 service slides are present.
- [ ] Service order: Branded Content -> AV Production -> Events -> Media Consultation -> Digital Marketing -> Graphical Integration.
- [ ] Counter displays "01 / 06" to "06 / 06".
- [ ] Scroll distance feels natural and covers all slides.
