---
phase: 8
plan: 1
wave: 1
---

# Plan 8.1: Fix Services Sticky Layout

## Objective
Fix the severe CSS layout and stacking context bugs in the "OUR SERVICES" section: transparent overlap, crushed slide dimensions, and collapsed wrapper pinning.

## Context
- `src/app/page.tsx`
- `src/components/ServicesSection.tsx`

## Tasks

<task type="auto">
  <name>Fix Page Wrapper Z-Index and Background</name>
  <files>src/app/page.tsx</files>
  <action>
    MODIFY: src/app/page.tsx
    - Find the div wrapping `<ServicesSection />` (around line 30)
    - Update its classes to include `bg-black w-full` so the pin-spacer has a solid background.
    - Change `<div className="relative" style={{ zIndex: 3 }}>` to `<div className="relative w-full bg-black" style={{ zIndex: 3 }}>`
  </action>
  <verify>npm run dev — compiles without errors</verify>
  <done>Wrapper has solid bg-black to prevent bleed-through</done>
</task>

<task type="auto">
  <name>Refactor ServicesSection Pinning and Dimensions</name>
  <files>src/components/ServicesSection.tsx</files>
  <action>
    MODIFY: src/components/ServicesSection.tsx
    - Change ScrollTrigger pin target: instead of `pin: pinContainerRef.current`, use `pin: true` so it pins the trigger itself (`wrapperRef.current`).
    - Remove `pinContainerRef` entirely. The `wrapperRef` div should now have `className="h-screen w-full flex bg-black overflow-hidden"`.
    - Fix the Slide Container Sizing: The right panel slide container `.service-slide` needs to take full width/height.
      Ensure `<div className="w-[65%] lg:w-[60%] h-full relative flex items-center...">` correctly holds `absolute inset-0` slides.
    - Inside `.service-slide`, ensure the inner container uses `w-full h-full justify-center` so it occupies full real estate instead of collapsing. Change `<div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">` to `<div className="w-full h-full flex flex-col justify-center lg:flex-row gap-8 lg:gap-12 lg:items-center">`.
  </action>
  <verify>npm run dev — compiles without errors</verify>
  <done>GSAP pinning correctly applies to wrapper, right panel slides expand to container</done>
</task>

## Success Criteria
- [ ] No bleed-through from AboutSection during Services scroll
- [ ] Right-side slides take up proper horizontal/vertical space
- [ ] Pinning works flawlessly without collapsing DOM height
