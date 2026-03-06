---
phase: 3
plan: 2
wave: 1
---

# Plan 3.2: Fix ServicesSection Hover Conflict & Remaining Section Padding

## Objective
Fix a GSAP hover animation conflict in `ServicesSection`. There's a `hoverTl.to` timeline (line 79-87) created and immediately followed by separate `mouseenter/mouseleave` gsap.to calls (lines 95-96) that override it. Remove the redundant `hoverTl` entirely since the simpler gsap.to calls already work, and keep only those. Also tighten remaining `py-24` padding in `ServicesSection` and `PortfolioSection` to `py-16` to match the global vertical rhythm from Phase 2.

## Context
- .gsd/SPEC.md
- .gsd/phases/2/3-SUMMARY.md
- src/components/ServicesSection.tsx
- src/components/PortfolioSection.tsx

## Tasks

<task type="auto">
  <name>Remove redundant GSAP hover timeline conflict in ServicesSection</name>
  <files>src/components/ServicesSection.tsx</files>
  <action>
    In `ServicesSection.tsx`, the hover handling block (lines 77-97) creates a `hoverTl` timeline that animates `rotationY`, `rotationX`, and `boxShadow`, but this is immediately overridden by simpler `mouseenter/mouseleave` gsap.to calls (lines 95-96) that only change `scale`. This creates conflicting GSAP targets on the same element.

    Fix: Delete the unused `hoverTl` timeline definition entirely (lines 79-88). Keep ONLY lines 95-96 which are the working mouseenter/mouseleave logic.

    The final hover block (inside `cards.forEach`) should be reduced to:
    ```tsx
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, duration: 0.3 }));
      card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, duration: 0.3 }));
    });
    ```
    Remove the immediately-following comment block (lines 89-93) too as it's now irrelevant.

    Also on line 102, change section className `py-24` to `py-16` for consistent vertical rhythm.
    And on line 107, change outer container `gap-24` to `gap-16`.
  </action>
  <verify>With dev server running, hover over a service card in the Services section. The card should scale smoothly without any jank, rotationY flicker, or conflicting animation states. Check browser DevTools > Performance if uncertain.</verify>
  <done>ServicesSection cards hover with clean scale-only animation, no competing GSAP timelines.</done>
</task>

<task type="auto">
  <name>Tighten PortfolioSection padding</name>
  <files>src/components/PortfolioSection.tsx</files>
  <action>
    In `PortfolioSection.tsx`, on line 120, change section className `py-24` to `py-16` for consistent vertical rhythm with all other sections updated in Phase 2.
  </action>
  <verify>With dev server running, scroll to the Portfolio section. The section should have less vertical whitespace at the top/bottom, matching the visual rhythm of the About and Featured sections.</verify>
  <done>PortfolioSection has `py-16` padding.</done>
</task>

## Success Criteria
- [ ] ServicesSection cards animate with a clean, single hover scale effect — no GSAP conflicts.
- [ ] ServicesSection and PortfolioSection both use `py-16` matching global vertical rhythm.
