# ROADMAP.md

> **Current Milestone**: v3.0 Service Timeline Expansion
> **Goal**: Update the "OUR SERVICES" sticky-scroll section to expand the service timeline from 5 to 6 items, refining content, counters, and scroll dynamics while preserving the established premium aesthetic.

## Must-Haves
- [ ] **Content Expansion**: Inject "Events" (pos 03) and shift "Graphical Integration" (pos 06) in the services data array.
- [ ] **Dynamic Counters**: Update UI to reflect "X / 06" total steps.
- [ ] **Scroll Dynamics**: Adjust sticky container height/ScrollTrigger end values for 6 slides.
- [ ] **Aesthetic Integrity**: Maintain charcoal/coral color system and bi-directional GSAP animations.

## Phases

### Phase 1: Expand Services Timeline
**Status**: ✅ Completed
**Objective**: Refactor the `ServicesSection` component data and animations to support 6 slides with correct pacing and counters.

### Phase 2: Page Reordering & Z-Index Polish
**Status**: ✅ Completed
**Objective**: Move `StatsCounter` below `HeroVideo` and re-index all components in `page.tsx` to ensure proper card-stacking behavior.

### Phase 3: Standalone ClienteleMarquee
**Status**: ✅ Completed
**Objective**: Design and build a standalone, monochromatic, low-opacity logo ticker with high-end hover effects and seamless infinite scrolling.

### Phase 4: Component Integration & Z-Stack Refactor
**Status**: ⬜ Not Started
**Objective**: Integrate `ClienteleMarquee` into `page.tsx` and recalculate the sequential z-index stacking (1-7) for the cinematic scroll architecture.

---

<!-- Next phases will be added here -->

