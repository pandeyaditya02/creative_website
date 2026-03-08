---
phase: 15
level: 2
researched_at: 2026-03-08
---

# Phase 15 Research

## Questions Investigated
1. Which components currently use GSAP `ScrollTrigger` for scroll-reveals?
2. What are the current `toggleActions` applied to these instances?
3. How can we implement the bi-directional reverse effectively without breaking existing layout?

## Findings

### GSAP Usage Across Components
We analyzed `src/components/` and found the following components utilizing `toggleActions` for GSAP ScrollTriggers:
- **`WhyChooseUs.tsx`**: Uses `"play none none none"` for the `.wcu-point` reveal animations.
- **`GrandCTA.tsx`**: Uses `"play none none none"` (on text word-by-word reveal and the pill button reveal).
- **`StatsCounter.tsx`**: Uses `"play none none reverse"` for both the section fade-in and the count-up animation.
- **`AboutSection.tsx`**: Uses `"play none none reverse"` for a specific image scale animation.

Other components (like `ServicesSection`) use `scrub: true` or `scrub: 1` which inherently support bi-directional scrolling naturally.

### Bi-Directional ToggleActions Logic
The standard syntax for `toggleActions` is `"onEnter onLeave onEnterBack onLeaveBack"`. 
- To make elements animate in when scrolling down and reverse out when scrolling back up past their start point, `"play none none reverse"` is the simplest and safest. 
- To make them *also* reverse out when scrolling down *past* the element, `"play reverse play reverse"` can be used.
- For most premium portfolio sites, `"play none none reverse"` (hide when scrolling back up past it) provides the standard bi-directional feel the user is describing ("reverse out smoothly when scrolling back up"). For `WhyChooseUs` and `GrandCTA`, changing from `"play none none none"` to `"play none none reverse"` or `"play reverse play reverse"` will satisfy the requirement. Since the user specifically mentioned `"play reverse play reverse"`, we will use that for a fully responsive dual-boundary reveal constraint.

**Recommendation:** 
Update all hardcoded `"play none none none"` or `"play none none reverse"` actions to `"play reverse play reverse"` across the primary reveal components (`WhyChooseUs.tsx`, `StatsCounter.tsx`, `GrandCTA.tsx`, `AboutSection.tsx`).

## Decisions Made
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Animation Approach | Update GSAP `toggleActions` to `"play reverse play reverse"` | Meets user constraints exactly; resets correctly when scrolling out of view in either direction. |
| Structure | Unmodified | GSAP can handle reverse without DOM changes. |

## Ready for Planning
- [x] Questions answered
- [x] Approach selected
- [x] Dependencies identified
