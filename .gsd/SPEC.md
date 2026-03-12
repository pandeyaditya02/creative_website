# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
Refactor the creative agency website's UI/UX to ensure highly premium, cinematic, dark-mode mobile responsiveness (< 768px). The design must scale gracefully from large desktop displays to mobile screens while preserving brutalist typography, balanced whitespace, adequate touch targets, and the exact DOM structure required for GSAP animations.

## Goals
1. Convert complex desktop grids and multi-column layouts into single-column vertical stacks on mobile (`flex-col`, `grid-cols-1`).
2. Scale down massive typography properly without overflowing or losing the brutalist styling (`tracking-tighter`, `uppercase`, `font-black`).
3. Scale vertical spacing and whitespace adjustments for smaller viewports.
4. Ensure all interactive components have a minimum 48px height (`h-12`) for tap targets.
5. Strictly preserve existing DOM structure/nesting. 

## Non-Goals (Out of Scope)
- Adding new feature sections.
- Changing GSAP animation logic or parameters.
- Modifying non-Tailwind CSS architecture or global styles heavily.
- Altering any HTML wrappers that would break ScrollTrigger/Framer animations.

## Users
Mobile users navigating the creative agency portfolio on smartphones and small tablets.

## Constraints
- **Technical constraints**: Must exclusively use Tailwind CSS classes to achieve responsiveness. Cannot break GSAP scripts. 
- **Timeline constraints**: N/A

## Success Criteria
- [ ] No horizontal scrolling on mobile viewports (320px - 768px).
- [ ] Text elements fit within screen widths.
- [ ] Grids display as 1 column on mobile, maintaining original layout on `md` and `lg`.
- [ ] Touch targets are at least 48px high.
- [ ] Animations still function flawlessly.
