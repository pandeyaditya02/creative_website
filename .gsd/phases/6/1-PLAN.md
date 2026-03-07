---
phase: 6
plan: 1
wave: 1
---

# Plan 6.1: Cinematic Sticky-Pinned Services Section

## Objective
Rebuild ServicesSection as a sticky-pinned scroll experience. The section self-pins at 100vh and scrubs through 5 service slides via a GSAP ScrollTrigger timeline. Replaces the current alternating split-screen layout.

## Context
- `.gsd/SPEC.md`
- `src/app/page.tsx`
- `src/components/ServicesSection.tsx`
- `src/components/PinnedSection.tsx` (reference — avoid conflicts)
- Stitch MCP design: project/7967284903617517480

## Tasks

<task type="auto">
  <name>Rewrite ServicesSection as Sticky-Pinned Scroll Experience</name>
  <files>src/components/ServicesSection.tsx</files>
  <action>
    Complete rewrite of ServicesSection.tsx:

    DATA: Keep existing 5 services array with title, description, highlights, image.

    DOM STRUCTURE:
    - Outer wrapper: min-height enough for scroll distance (not using height directly, pinSpacing handles this)
    - Inner container (.services-pin-container): flex, h-screen, overflow-hidden — THIS gets pinned
    - Left panel (.services-anchor, w-[40%]):
      - "WHAT WE DO" eyebrow (coral, uppercase, tracking-widest)
      - "OUR SERVICES" heading (text-7xl+ font-bold uppercase)
      - Progress: "{current} / 05" text
      - Progress bar: thin coral bar that fills L→R synchronized with scroll
    - Right panel (.services-slides, w-[60%], relative):
      - 5 service slides stacked with position absolute, inset-0
      - Each slide: service title (text-4xl bold), description (text-lg gray), bullet highlights, image (rounded, aspect-4/3)
      - Only the active slide is visible (opacity:1), others at opacity:0

    GSAP ANIMATION:
    - ScrollTrigger on .services-pin-container:
      - trigger: the outer wrapper
      - pin: .services-pin-container
      - start: "top top"
      - end: "+=400%" (4 transitions × 100vh each)
      - scrub: 1
    - GSAP timeline with 4 transitions (0→1, 1→2, 2→3, 3→4):
      - Each transition:
        a) Outgoing slide text: opacity 1→0, y: 0→-40
        b) Incoming slide text: opacity 0→1, y: 40→0
        c) Outgoing image: scale 1→0.95, opacity 1→0
        d) Incoming image: scale 1.1→1, opacity 0→1
        e) Progress bar scaleX: sync with timeline progress
    - Progress counter: update via onUpdate callback, computing Math.round(progress * 4) + 1

    CONSTRAINTS:
    - "use client" directive
    - Keep features/"Why choose us" section OUTSIDE the pin (rendered after the outer wrapper)
    - Dark mode: bg-black, text-white
    - High contrast: descriptions in #B0B0B0 or lighter
    - No hydration errors (all animation in useGSAP)
  </action>
  <verify>npm run dev — section renders, pins on scroll, transitions through 5 slides</verify>
  <done>Section pins at viewport, 5 slides transition with scroll, progress updates, unpins after slide 5</done>
</task>

<task type="auto">
  <name>Update page.tsx Integration</name>
  <files>src/app/page.tsx</files>
  <action>
    - Ensure ServicesSection's wrapper div allows pinSpacing to work.
    - Since GSAP pin with pinSpacing:true adds scroll height automatically,
      confirm the z-index wrapper doesn't interfere.
    - If needed, adjust the wrapper to not set overflow:hidden which would clip the pin.
    - Comment update explaining the self-pinning behavior.
  </action>
  <verify>Full page scroll works: Hero → About → Services (pins, 5 slides) → Portfolio → rest</verify>
  <done>No layout-shift bugs, smooth transition between About and Services, Services and Portfolio</done>
</task>

## Success Criteria
- [ ] Services section self-pins when reaching viewport top
- [ ] 5 service slides transition smoothly via scroll scrub
- [ ] Progress indicator shows current slide (01/05 → 05/05)
- [ ] Progress bar fills L→R with scroll
- [ ] Section unpins after last slide, scroll continues to Portfolio
- [ ] All text permanently readable during pin
- [ ] No hydration errors
- [ ] Dark mode aesthetic preserved
