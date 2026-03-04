---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Global Architecture & Styling

## Objective
Initialize the Next.js global layout, configure the strict Tailwind dark mode theme (matching the Montage.ae palette), and set up the custom typography scale using Inter Tight (or Space Grotesk) and Work Sans.

## Context
- `.gsd/SPEC.md`
- `.gsd/phases/1-CONTEXT.md`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `tailwind.config.ts` (or equivalent Tailwind CSS configuration for v4)

## Tasks

<task type="auto">
  <name>Configure Tailwind & Global CSS</name>
  <files>
    - src/app/globals.css
  </files>
  <action>
    - Update `globals.css` to define the strict dark mode theme variables: `--background: #000000;`, `--foreground: #FFFFFF;`, `--accent: #FF5C00;`.
    - Create utility classes for macro-whitespace (e.g., `.padding-macro { padding-top: 20vh; padding-bottom: 20vh; }`).
    - Remove the default Next.js boilerplate styles.
  </action>
  <verify>grep -q "background: #000000" src/app/globals.css</verify>
  <done>Global CSS reflects pure black background and pure white text defaults.</done>
</task>

<task type="auto">
  <name>Setup Next.js Layout & Fonts</name>
  <files>
    - src/app/layout.tsx
  </files>
  <action>
    - Import and configure `Inter` (or `Space_Grotesk`) for headings and `Work_Sans` (or similar) for body copy using `next/font/google`.
    - Apply the font variables to the `<body>` tag.
    - Set the overall background to `bg-black` and text to `text-white` to enforce the theme.
  </action>
  <verify>grep -q "Inter" src/app/layout.tsx</verify>
  <done>The Next.js layout correctly loads and applies the cinematic typography scale.</done>
</task>

## Success Criteria
- [ ] Tailwind/globals.css is configured for pure dark mode (#000000 / #FFFFFF / #FF5C00).
- [ ] Custom fonts are loaded and applied globally.
