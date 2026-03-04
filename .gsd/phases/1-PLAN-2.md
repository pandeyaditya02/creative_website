---
phase: 1
plan: 2
wave: 1
---

# Plan 1.2: Animation Infrastructure

## Objective
Set up the core animation infrastructure required for the cinematic experience, specifically registering GSAP plugins (ScrollTrigger) and creating fundamental Framer Motion wrappers.

## Context
- `.gsd/phases/1-CONTEXT.md`
- `package.json`

## Tasks

<task type="auto">
  <name>Create GSAP Registry/Provider</name>
  <files>
    - src/components/animations/GSAPInitializer.tsx
    - src/app/layout.tsx
  </files>
  <action>
    - Create a client-side component `GSAPInitializer.tsx` that imports `gsap` and registers `ScrollTrigger` and `useGSAP`.
    - Include this initializer in the root `layout.tsx` so GSAP is ready globally.
  </action>
  <verify>Test-Path src/components/animations/GSAPInitializer.tsx</verify>
  <done>GSAP and ScrollTrigger are registered globally without hydration errors.</done>
</task>

<task type="auto">
  <name>Create Core Animation Wrappers</name>
  <files>
    - src/components/animations/FadeUpReveal.tsx
  </files>
  <action>
    - Create a reusable `FadeUpReveal` component using `framer-motion` or GSAP to implement the required `anim-overflow` effect noted in the Montage.ae analysis (text sliding up from hidden overflow).
    - Ensure it accepts children and triggers on scroll into view.
  </action>
  <verify>Test-Path src/components/animations/FadeUpReveal.tsx</verify>
  <done>A reusable fade-up text reveal component exists for storytelling sections.</done>
</task>

## Success Criteria
- [ ] GSAP ScrollTrigger is registered globally.
- [ ] Reusable animation wrappers for scroll reveals are created.
