---
phase: 1
plan: 4
wave: 2
---

# Plan 1.4: Storytelling & Portfolio Grid Components

## Objective
Build the asymmetrical storytelling sections with macro-whitespace and the 2-column masonry portfolio grid with custom hover states.

## Context
- `.gsd/phases/1-CONTEXT.md`
- `src/app/page.tsx`

## Tasks

<task type="auto">
  <name>Build Asymmetrical Storytelling Section</name>
  <files>
    - src/components/home/StorySection.tsx
    - src/app/page.tsx
  </files>
  <action>
    - Create `StorySection.tsx` applying the `padding-macro` utilities.
    - Implement a grid mapping to the Stitch layout: small highly-tracked body copy on the left, a large cinematic image placeholder on the right, and a massive H2 below.
    - Wrap text elements in the `FadeUpReveal` animation component.
  </action>
  <verify>Test-Path src/components/home/StorySection.tsx</verify>
  <done>The storytelling section renders with massive whitespace and correct responsive layout.</done>
</task>

<task type="auto">
  <name>Build Masonry Portfolio Grid</name>
  <files>
    - src/components/portfolio/PortfolioGrid.tsx
    - src/components/portfolio/ProjectCard.tsx
    - src/app/page.tsx
  </files>
  <action>
    - Create `PortfolioGrid.tsx` with a 2-column layout and large gaps (`gap-10` or `40px+`).
    - Create `ProjectCard.tsx` for individual items.
    - Implement hover states on `ProjectCard`: The image wrappers scale `group-hover:scale-[1.05]`.
    - Build the custom circular 'PLAY' indicator that appears on hover.
  </action>
  <verify>Test-Path src/components/portfolio/PortfolioGrid.tsx</verify>
  <done>A 2-column grid renders project thumbnails that scale correctly on hover with a custom indicator.</done>
</task>

## Success Criteria
- [ ] Storytelling section alternates text/images with high padding.
- [ ] Portfolio grid uses a 2-column structure with 40px+ gaps.
- [ ] Hover states explicitly scale thumbnails 1.05x.
