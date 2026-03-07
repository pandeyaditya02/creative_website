# ROADMAP.md

> **Current Phase**: Phase 5 — Content Integration
> **Last Milestone**: v1.0 Design Polish & Audit — ✅ Complete (2026-03-07)

## Must-Haves (from SPEC)
*(define with next milestone)*

## Phases

---

### Phase 5: Content Integration
**Status**: ✅ Verified Complete (2026-03-07)
**Objective**: Intelligently map and integrate official Creative Chauk company copy from `public/Website Content.docx` into the cinematic website layout without altering any visual design, animations, or typography.
**Depends on**: Phases 1–4

**Tasks**:
- [x] Extract and analyse document content
- [x] Map content to UI components
- [x] Update AboutSection (branding, copy, stat, service cards)
- [x] Update ServicesSection (service descriptions + features)
- [x] Update PortfolioSection (sub-headline)
- [x] Update FeaturedSection (article titles/categories)
- [x] Update ContactSection (styled CTA sub-headline)
- [x] Create ClientsMarquee component (12 brand ticker strip)
- [x] Wire ClientsMarquee into page.tsx
- [x] Visual browser verification

**Verification**:
- Scroll through full site on dev server, confirm all content updated
- Confirm GSAP/Framer animations unaffected
- Confirm marquee scrolls smoothly

---

### Phase 6: Services Section Refactor
**Status**: ✅ Verified Complete (2026-03-07)
**Objective**: Refactor Services section into a sticky-pinned cinematic scroll experience with GSAP ScrollTrigger pin, scrubbed timeline, and progress indicator.
**Depends on**: Phase 5

**Tasks**:
- [x] Rewrite ServicesSection as sticky-pinned scroll (GSAP pin:true, scrub timeline)
- [x] Left anchor panel with heading + progress (01/05 → 05/05)
- [x] Right slide panel with 5 service cross-fade transitions
- [x] Update page.tsx with z-index wrapper
- [x] Visual browser verification

**Verification**:
- Section pins, 5 slides transition, progress updates, unpins to next section
- No hydration errors, dark mode preserved

---

### Phase 7: Why Choose Us & Grand CTA
**Status**: ✅ Verified Complete (2026-03-07)
**Objective**: Build a cinematic "Why Choose Us" section (staggered asymmetric timeline) flowing into a grand CTA, replacing the basic features grid and enhancing ContactSection.
**Depends on**: Phase 6

**Tasks**:
- [x] Create WhyChooseUs component (staggered vertical timeline, 4 points)
- [x] Create GrandCTA component (full-bleed, word-by-word mask-up animation)
- [x] Remove features grid from ServicesSection
- [x] Wire new components into page.tsx
- [x] Implement GSAP scroll-triggered reveal animations
- [x] Visual browser verification

**Verification**:
- 4 points stagger L/R of center line with massive whitespace
- CTA text animates word-by-word on scroll
- Premium pill button with magnetic hover
- Seamless flow between sections

---

### Phase 8: Services Bug Fix
**Status**: ⬜ Not Started
**Objective**: Fix the severe CSS layout and stacking context bugs in the "OUR SERVICES" section (transparent overlap, collapsed container height, constrained active slide).
**Depends on**: Phase 7

**Tasks**:
- [ ] Add solid `bg-black w-full` to ServicesSection wrapper in page.tsx
- [ ] Refactor ServicesSection pin target to the trigger element to prevent GSAP pin-spacer collapse
- [ ] Fix flexbox layout constraints of `.service-slide` content to fill available viewport real estate

**Verification**:
- No bleed-through/transparency during Services scroll
- Slides occupy normal horizontal space
- DOM pinning cleanly transitions without jumping
