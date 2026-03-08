# ROADMAP.md

> **Current Milestone**: v2.0 Cinematic Motion & Premium UI Overhaul
> **Goal**: Elevate the perceived value and aesthetic of the website to an ultra-premium, award-winning agency tier. We will achieve this by implementing advanced, physics-based GSAP choreography, fluid micro-interactions, and seamless motion across all existing components, ensuring the site feels like a high-end cinematic experience rather than a standard web template.

## Must-Haves
- [ ] Lenis Smooth Scrolling: Integrate @studio-freight/lenis with GSAP ScrollTrigger for buttery-smooth, inertia-based scrolling.
- [ ] Dynamic Custom Cursor: GSAP-driven cursor dot that reacts to environment (magnetic snap to buttons, expands over videos).
- [ ] Magnetic UI Elements: GSAP physics on primary buttons/nav links to subtly pull toward user cursor on hover.
- [ ] Cinematic Pre-loader: Branded, dark-mode 0-100% counter loading sequence that hides hydration and ensures video assets load.
- [ ] Advanced Media Reveals: Apply GSAP clip-path animations to portfolio/services images to elegantly unmask/wipe into view on scroll.

## Nice-To-Haves
- GSAP exit animations for seamless page transitions
- High-end text scramble/decode effects on hover
- WebGL/Three.js Liquid/Noise distortion on portfolio thumbnails

## Phases

---

### Phase 1: Lenis Smooth Scrolling Integration
**Status**: ✅ Complete
**Objective**: Install and configure `@studio-freight/lenis` layout provider specifically adapted for use with Next.js App Router and GSAP `ScrollTrigger` sync. Verify that it resolves native scroll jitter without breaking existing `PinnedSection` or `ServicesSection` functionality.

---

### Phase 2: Cinematic Pre-loader
**Status**: ⬜ Not Started
**Objective**: Build a premium 0-100% dark-mode numeric loader overlay. Ensure it fires immediately on hydration, loads critical hero video assets, and unmasks via GSAP animation (e.g., sliding up and fading out) to reveal the Hero Section flawlessly.

---

### Phase 3: Dynamic Custom Cursor & Magnetic UI
**Status**: ⬜ Not Started
**Objective**: Implement a globally tracked, GSAP-driven custom cursor. Hide default browser cursors. Create a `MagneticHover` wrapper component that applies physics-based mouse-pull logic to buttons (like Contact/CTA) and updates the cursor state (e.g., expanding or changing color on hover).

---

### Phase 4: Advanced Media Reveals (Clip-Paths)
**Status**: ⬜ Not Started
**Objective**: Refactor image/video reveal animations in Portfolio and Services sections. Transition from simple opacity/translate fades to complex GSAP `clip-path` unmasking (e.g., wiping in from inset polygons) for a highly structural, award-winning agency feel.

---

### Phase 5: Cinematic Polish & Nice-to-Haves
**Status**: ⬜ Not Started
**Objective**: Evaluate scope for seamless page transitions (`framer-motion` AnimatePresence or native GSAP page transitions) and text scramble effects. Polish easing curves globally for consistency.
