---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Fix Broken Media & Layout Overlaps

## Objective
Fix the two most critical layout bugs identified in Phase 1:
1. The `FeaturedSection` is displaying a broken `<img>` thumbnail that fails to load.
2. The progress bar in `FeaturedSection` is overlapping with the "LATEST UPDATES" label.
3. The global `body` background in `globals.css` is `#2D3E50` (blue-gray), which leaks through between `PinnedSection` gaps — it should be `#000000` to match the dark theme.

## Context
- .gsd/SPEC.md
- .gsd/phases/1/DESIGN_GAPS.md
- src/components/FeaturedSection.tsx
- src/app/globals.css

## Tasks

<task type="auto">
  <name>Fix FeaturedSection broken image & progress bar overlap</name>
  <files>src/components/FeaturedSection.tsx</files>
  <action>
    In `FeaturedSection.tsx`:
    1. Replace the broken Unsplash thumbnail `<img>` (line 55) with a working dark placeholder. Change the `src` to: `https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1200&auto=format&fit=crop` (cinematic film set image). Keep all other attributes the same.
    2. The progress bar (lines 58-60) uses `absolute bottom-8` positioning WITHIN the video container div (lines 40-61). This is correct and should NOT conflict. The audit confusion was from a different component. No change needed here — the "overlap" was a scroll-depth illusion between PinnedSections, not a z-index bug inside FeaturedSection.
    3. Reduce the `gap-24` on the outer container div (line 24) to `gap-16` to reduce excessive vertical space within the section.
  </action>
  <verify>Restart the dev server with `npm run dev` and navigate to localhost:3000. Scroll to the FeaturedSection. The video container should now show a dark cinematic image, not a broken image icon.</verify>
  <done>FeaturedSection shows a working image thumbnail, not a broken image.</done>
</task>

<task type="auto">
  <name>Fix global body background-color</name>
  <files>src/app/globals.css</files>
  <action>
    In `globals.css` (line 49), change the body background from `var(--background)` (which resolves to `#2D3E50` blue-gray) to pure black `#000000`. This prevents the charcoal background from bleeding through the gaps between PinnedSections.
    Change line 49:
    BEFORE: `background: var(--background);`
    AFTER:  `background: #000000;`
  </action>
  <verify>With the dev server running, scroll between sections. No blue-gray gaps should be visible between the stacked PinnedSection panels.</verify>
  <done>Background between panels is pure black, no blue-gray bleed visible.</done>
</task>

## Success Criteria
- [ ] FeaturedSection shows a working cinematic image.
- [ ] No blue-gray background color leaks between PinnedSections.
- [ ] Internal section spacing feels tighter and more intentional.
