---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Lenis Smooth Scroll Integration

## Objective
Integrate the `lenis` package to establish a global inertia-based smooth scrolling experience, specifically ensuring it synchronizes properly with our heavily GSAP-driven scroll environment without breaking hydration or pinning.

## Context
- `package.json`
- `src/components/SmoothScroll.tsx` (NEW)
- `src/app/layout.tsx`
- `.gsd/phases/1/RESEARCH.md`

## Tasks

<task type="auto">
  <name>Install Lenis Package</name>
  <files>package.json</files>
  <action>
    Run `npm install lenis` in the terminal to add the required dependency.
    DO NOT install `@studio-freight/lenis` as it is deprecated.
  </action>
  <verify>npm ls lenis</verify>
  <done>lenis is added to package.json dependencies</done>
</task>

<task type="auto">
  <name>Create SmoothScroll Provider</name>
  <files>src/components/SmoothScroll.tsx</files>
  <action>
    CREATE: src/components/SmoothScroll.tsx
    - Create a strictly `use client` component that returns `{children}`.
    - Inside a `useEffect`, initialize `new Lenis()`.
    - **CRITICAL**: Synchronize the RAF with GSAP via `gsap.ticker.add((time) => lenis.raf(time * 1000))`
    - **CRITICAL**: Disable GSAP lag smoothing via `gsap.ticker.lagSmoothing(0)`
    - Return a cleanup function that runs `lenis.destroy()` and `gsap.ticker.remove(...)` to prevent memory leaks on unmount.
  </action>
  <verify>npm run dev — compiles without errors</verify>
  <done>SmoothScroll.tsx exists and contains the GSAP sync logic and cleanup lifecycle</done>
</task>

<task type="auto">
  <name>Wrap Application Layout</name>
  <files>src/app/layout.tsx</files>
  <action>
    MODIFY: src/app/layout.tsx
    - Import `<SmoothScroll>` from `@/components/SmoothScroll`.
    - Wrap the `{children}` inside the `<body>` tag with `<SmoothScroll>`.
    - Ensure it wraps the entire application context so premium scrolling applies globally.
  </action>
  <verify>npm run dev — compiles without errors</verify>
  <done>layout.tsx renders wrapped in SmoothScroll component</done>
</task>

## Success Criteria
- [ ] `lenis` is installed.
- [ ] `SmoothScroll.tsx` successfully merges GSAP ticker and Lenis RAF.
- [ ] Layout applies Lenis over the whole app.
