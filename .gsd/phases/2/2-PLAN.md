---
phase: 2
plan: 2
wave: 1
---

# Plan 2.2: Enhance CustomCursor & Navbar Polish

## Objective
Improve the `CustomCursor` to add meaningful hover-state feedback (scale + color change) when the cursor is over interactive elements like buttons and links. Improve `Navbar` link visibility by increasing the font weight.

## Context
- .gsd/SPEC.md
- .gsd/phases/1/DESIGN_GAPS.md
- src/components/CustomCursor.tsx
- src/components/Navbar.tsx

## Tasks

<task type="auto">
  <name>Add hover-state feedback to CustomCursor</name>
  <files>src/components/CustomCursor.tsx</files>
  <action>
    In `CustomCursor.tsx`, the component currently only detects `mousedown`/`mouseup` for the `isHovering` state. We need to detect hovering over `a`, `button`, and elements with `data-cursor="hover"`.
    
    1. Add a new `isOverLink` state: `const [isOverLink, setIsOverLink] = useState(false);`
    2. In the `useEffect`, add event listeners that detect when the mouse is over `a` or `button` elements:
    ```tsx
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="hover"]')) {
        setIsOverLink(true);
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="hover"]')) {
        setIsOverLink(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    ```
    3. Remember to clean up these listeners in the return function.
    4. Update the leading dot's `width` and `height` style to scale up when `isOverLink` is true:
       - Default: `width: 24, height: 24`
       - On `isOverLink`: `width: 48, height: 48` with a border style instead of fill — change `bg-[#e26954]` to add a conditional class: when `isOverLink`, make the dot a transparent circle with a `#F67963` border.
       - Implement this by using Framer Motion `animate` prop on the leading dot to animate the size smoothly:
         ```tsx
         animate={{
           width: isOverLink ? 48 : isHovering ? 32 : 24,
           height: isOverLink ? 48 : isHovering ? 32 : 24,
           backgroundColor: isOverLink ? 'transparent' : '#e26954',
           border: isOverLink ? '2px solid #F67963' : '2px solid transparent',
         }}
         transition={{ duration: 0.15, ease: 'easeOut' }}
         ```
       - Remove the static `width`/`height` from `style` prop for the leading dot and use `animate` instead.
  </action>
  <verify>Start dev server with `npm run dev`. Move cursor over a nav link. The leading dot should smoothly expand and turn into a ring outline before returning to a filled circle when off the link.</verify>
  <done>Cursor visually morphs into a ring when hovering over interactive elements.</done>
</task>

<task type="auto">
  <name>Improve Navbar link weight and visibility</name>
  <files>src/components/Navbar.tsx</files>
  <action>
    In `Navbar.tsx` (line 145), the nav links div uses `font-medium` (weight 500) with `text-xs`. This results in very thin, hard-to-read links.
    Update the className on the links container (line 145):
    - Change `font-medium` to `font-semibold` — this increases weight from 500 → 600.
    - Change `text-xs` to `text-[11px]` — maintain the tight sizing but with a slight increase.
    This improves overall legibility without breaking the compact design intent.
  </action>
  <verify>With dev server running, observe the Navbar. Links should appear slightly bolder but maintain the tight, architectural letterform feel.</verify>
  <done>Navbar links are visibly more legible than before the change.</done>
</task>

## Success Criteria
- [ ] Custom cursor ring effect activates on hover over all interactive elements.
- [ ] Navbar links are more visually legible without disrupting the overall design.
