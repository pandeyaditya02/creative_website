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

---

### Phase 9: Site Animation & Interaction Polish
**Status**: ⬜ Not Started
**Objective**: Refine hover states, custom cursors, and animation timings across all components to ensure a premium, unified interactive feel.
**Depends on**: Phase 8

---

### Phase 10: Native Hero Video Integration
**Status**: ✅ Verified Complete (2026-03-08)
**Objective**: Replace the YouTube-driven Hero background video with a native HTML5 video player sourced from Google Drive.
**Depends on**: Phase 8

**Tasks**:
- [x] Download the video from Google Drive to `public/hero-video.mp4` (DONE via manual user override).
- [x] Refactor `HeroVideo.tsx` to use native `<video>` tag instead of YouTube IFrame API.
- [x] Wire up progress bar to native `timeupdate` and mute button to `video.muted`.

**Verification**:
- Video auto-plays natively without YouTube branding or scripting overhead.
- Mute visualizer and progress bar synchronize accurately.

---

### Phase 11: Ultra-Premium Hero Section Redesign
**Status**: ✅ Verified Complete (2026-03-08)
**Objective**: Redesign the Hero Section for an ultra-premium, cinematic layout. Ensure perfect 100vh/100vw video alignment, enforce a 3-tier typographic restraint anchored bottom-left, and apply high-end UI polish (feathered gradient overlays, sleek toggles).
**Depends on**: Phase 10

**Tasks**:
- [ ] Apply full-bleed `100vw` / `100vh` canvas with `object-fit: cover` video.
- [ ] Implement 3-tier typography (widely-tracked overline, elegant headline, legible subtext).
- [ ] Apply feathered `bg-gradient-to-t` overlay for contrast.
- [ ] Add minimalist Play/Pause/Sound micro-interaction toggle.

**Verification**:
- No horizontal scrolling.
- Text is heavily legible but smaller and refined.
- Gradient feels subtle and not boxy.

---

### Phase 12: Stitch MCP Brutalist Redesign (YouTube Player)
**Status**: ✅ Verified Complete (2026-03-08)
**Objective**: The user restored the YouTube IFrame API background player. Redesign the UI overlay using **Stitch MCP** to generate the brutalist cinematic layout (bottom-anchored text, heavy sans-serif typography, feathered gradients) and merge it with the existing YouTube logic in `HeroVideo.tsx`.
**Depends on**: Phase 11

---

### Phase 13: Revert Video Element (YouTube Integration)
**Status**: ✅ Verified Complete (2026-03-08)
**Objective**: The user manually reverted HeroVideo.tsx back to utilizing the local `<video>` element alongside the brutalist UI. We must refactor the component to use the YouTube IFrame API (`O8_VkfRkjRg`) while strictly preserving the current brutalist UI, macro-whitespace, and GSAP animations.
**Depends on**: Phase 11 / Phase 12 (Reverted)

**Tasks**:
- [ ] Extract YouTube script loader, interval polling, and `toggleSound` logic from reference code.
- [ ] Replace local `<video>` with `<div id="hero-video-player" />` using specific `-translate` scaling CSS to hide YT branding.
- [ ] Ensure `pointer-events-none` prevents iframe hijacking.
- [ ] Do NOT modify the brutalist typography or UI overlays.

**Verification**:
- Video auto-plays from YouTube.
- Typography remains bold, brutalist, and bottom-left anchored.
- Sound toggle functions.

**Tasks**:
- [ ] Utilize Stitch MCP (`mcp_StitchMCP_generate_screen_from_text`) to generate the brutalist hero UI.
- [ ] Strip out the old centered UI in `HeroVideo.tsx`.
- [ ] Merge the new Stitch UI into `HeroVideo.tsx`, carefully preserving the YouTube initialization and `toggleSound` logic.
- [ ] Wire the progress and mute states into the new UI elements.

**Verification**:
- Video auto-plays seamlessly via YouTube API.
- Typography matches the brutalist, extended sans-serif design.
- Full 100vw/100vh bounding box is respected.

---

### Phase 14: Cinematic Stats Counter Section
**Status**: ⬜ Not Started
**Objective**: Build a "Company Statistics" section with a 3-column grid for large numbers and small labels, adapted to the ultra-premium, dark-mode cinematic aesthetic. Use GSAP for scroll reveal and count-up animation.
**Depends on**: Phase 13

**Tasks**:
- [ ] Implement StatsCounter component with deep dark background and massive macro-whitespace.
- [ ] Layout a 3-column grid (18 YEARS EXPERIENCE, 60+ CLIENTELE, 150+ PROJECTS DELIVERED).
- [ ] Use GSAP/Framer Motion in a Client Component to animate numbers counting up from 0 on scroll.
- [ ] Wire component into page.tsx.

**Verification**:
- Section fades in and translates upward on enter.
- Numbers rapidly count up to target over ~2 seconds with ease-out.
- High contrast, brutalist typography is maintained.
