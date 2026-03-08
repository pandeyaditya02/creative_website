---
phase: 16
level: 2
researched_at: 2026-03-08
project_id: 15385813797971628693
---

# Phase 16 Research & Motion Contract

## Visual Design Strategy (Stitch MCP)
The UI design was generated with Stitch MCP (Project ID: `15385813797971628693`). 
The resulting contract enforces:
- **Layout**: High-impact split desktop layout optimization. A min-height screen divided evenly between massive left-aligned typography and a minimalist right-aligned form.
- **Typography (Left Column)**: Giant brutalist sans-serif ("LET'S TALK"), tightly tracked (`tracking-tighter`), with significant macro-whitespace. Small, subtle direct contact info underneath.
- **Form UI (Right Column)**: Minimal elegant inputs using sleek bottom-border-only styling. Focus transitions smoothly shift border color to the coral accent (`#F67963`).
- **Fields**: Name, Email, Project Type (dropdown menu with branded options), Budget Range, Message.
- **Submit Button**: Oversized, pill-shaped, premium button.

## Animation & Motion Contract (GSAP / Framer Motion)

**Core Rules:**
- Motion must be deliberate and smooth, avoiding chaotic bouncing.
- All animations must use `play reverse play reverse` `toggleActions` or equivalent Framer logic to respect bi-directional scrolling as established in Phase 15.
- Animations must execute completely inside Client Components (`use client`) to prevent server hydration mismatches.

**Choreography:**
1. **Entrance Reveal (Left)**: Staggered line-by-line reveal of the massive headline. Words mask up from `y: 100%` within `overflow-hidden` wrappers over `1.2s` with custom ease.
2. **Form Reveal (Right)**: Form fields stagger into view sequentially, fading from `opacity: 0` and translating from `y: 20` to `y: 0` smoothly as the viewport crosses the section threshold.
3. **Micro-Interactions**:
   - Form Inputs: Bottom borders transition smoothly via CSS `transition-colors duration-300` on focus.
   - Submit Button: Implements a premium GSAP magnetic hover (button loosely follows mouse bounds organically).

## Decisions Made
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Layout Pattern | CSS Grid `grid-cols-1 md:grid-cols-2` | Best standard for modern split-layouts; scales cleanly to single-column on mobile. |
| Form Inputs | HTML/Tailwind Custom | We will manually build the clean bottom-border inputs without heavy 3rd-party form libraries to maintain absolute DOM control for animations. |

## Ready for Planning
- [x] Questions answered
- [x] Approach selected
- [x] Dependencies identified
