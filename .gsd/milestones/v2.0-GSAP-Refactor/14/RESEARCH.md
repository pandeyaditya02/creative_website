# Phase 14 Research & Motion Contract

## Visual Design

**Aesthetic Override**: 
Deep, rich dark background (near black) that blends seamlessly with the cinematic theme. Massive macro-whitespace to ensure the section feels premium, breathable, and expensive.

**Layout**: 
Clean, centered 3-column grid.

**Typography**:
- **Numbers**: Brutalist, heavy sans-serif. Massive scale. High contrast (white or a subtle accent color).
- **Labels**: Minimal, sophisticated secondary font. Widely tracked (high letter-spacing) and slightly muted (slate grey) to establish strong visual hierarchy.

**Data Mapping**:
- Column 1: `18` | `YEARS EXPERIENCE`
- Column 2: `60` | `CLIENTELE` (with a dynamically or statically appended `+`)
- Column 3: `150` | `PROJECTS DELIVERED` (with a dynamically or statically appended `+`)

## Motion Contract

**Scroll Reveal**:
- The component must faintly fade in (`opacity: 0` -> `1`).
- Combine with a subtle upward translation (`y: ~50px` -> `0`) as it enters the viewport.

**Count-Up Effect**:
- Numbers rapidly count from `0` to their respective targets (`18`, `60`, `150`).
- Duration: ~2 seconds.
- Easing: Smooth ease-out (`power3.out` or similar).

**Technical Constraints**:
- Animations must be powered by GSAP.
- Component must be isolated as a Client Component (`"use client"`).
- Ensure no layout shift occurs during the font-load or count-up sequence.
