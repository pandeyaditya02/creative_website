# ROADMAP.md

> **Current Phase**: Phase 5 — Content Integration
> **Last Milestone**: v1.0 Design Polish & Audit — ✅ Complete (2026-03-07)

## Must-Haves (from SPEC)
*(define with next milestone)*

## Phases

---

### Phase 5: Content Integration
**Status**: 🟡 In Progress
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
- [ ] Visual browser verification

**Verification**:
- Scroll through full site on dev server, confirm all content updated
- Confirm GSAP/Framer animations unaffected
- Confirm marquee scrolls smoothly
