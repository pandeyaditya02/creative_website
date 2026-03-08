---
phase: 16
plan: 1
wave: 1
---

# Plan 16.1: Cinematic Contact Us Redesign

## Objective
Completely redesign the `ContactSection` to function as an ultra-premium, high-end inquiry portal with a split layout, massive typography, minimal inputs, and deliberate, smooth scroll choreography.

## Context
- .gsd/SPEC.md
- .gsd/ROADMAP.md
- .gsd/phases/16/RESEARCH.md
- src/components/ContactSection.tsx

## Tasks

<task type="auto">
  <name>Refactor ContactSection Layout & UI</name>
  <files>src/components/ContactSection.tsx</files>
  <action>
    Refactor the `ContactSection` structure into a min-h-screen split layout:
    - **Left Column**: Replace the current centered title with massive, tightly-tracked (`tracking-tighter`) brutalist text (e.g., "LET'S TALK"). Include small, subtle direct contact info below it.
    - **Right Column**: Create a minimal inquiry form containing: Name, Email, Project Type (dropdown: Branded Content, AV Production, etc.), Budget Range, and Message.
    - **Inputs**: Use a sleek bottom-border-only aesthetic (`border-b border-white/20 bg-transparent`) instead of rounded boxes.
    - **Colors**: Maintain the deep dark background, using `#F67963` (coral) for the oversized submit button and focus states.
  </action>
  <verify>grep -n "LET'S TALK" src/components/ContactSection.tsx</verify>
  <done>Split layout implemented with brutalist typography and bottom-border inputs.</done>
</task>

<task type="auto">
  <name>Implement Premium Scroll Animations</name>
  <files>src/components/ContactSection.tsx</files>
  <action>
    Replace the existing mount-based GSAP animations with scroll-triggered choreography:
    - **Headline Reveal**: Implement a staggered line-by-line (or word-by-word) reveal where the giant text masks up from `y: 100%` within an `overflow-hidden` container.
    - **Form Reveal**: Form fields should stagger into view (fade from `opacity: 0` and `y: 20` to `y: 0`).
    - **Constraints**: Use `toggleActions: "play reverse play reverse"` to ensure the animations respect bi-directional scrolling as established in Phase 15.
  </action>
  <verify>grep -n "toggleActions" src/components/ContactSection.tsx</verify>
  <done>Staggered scroll reveals function in both directions smoothly.</done>
</task>

<task type="auto">
  <name>Implement Premium Micro-Interactions</name>
  <files>src/components/ContactSection.tsx</files>
  <action>
    Add high-end polish to the interactive elements:
    - **Inputs**: Use Tailwind to smoothly transition the bottom border to `#F67963` on focus (`focus:border-[#F67963] transition-colors duration-300`).
    - **Submit Button**: Retain/implement a premium "magnetic" hover effect via GSAP or Framer Motion where the button slightly tracks the mouse cursor organically.
  </action>
  <verify>grep -n "focus:border" src/components/ContactSection.tsx</verify>
  <done>Inputs highlight correctly and submit button supports magnetic hover.</done>
</task>

## Success Criteria
- [ ] Split layout dominates the screen smoothly without horizontal scrolling.
- [ ] Headline staggers in from bottom mask on scroll.
- [ ] Input fields maintain a high-end, bottom-border-only design.
- [ ] No hydration errors occur (animations safely contained in Client Components).
