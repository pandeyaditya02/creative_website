---
phase: 7
plan: 1
wave: 1
---

# Plan 7.1: Why Choose Us & Grand CTA

## Objective
Create two new cinematic components — WhyChooseUs (staggered timeline) and GrandCTA (word-by-word mask-up) — to replace the basic features grid and provide a dramatic page climax before Contact.

## Context
- `.gsd/SPEC.md`
- `src/app/page.tsx`
- `src/components/ServicesSection.tsx` — remove features grid
- Stitch design: project/6886874572271062189

## Tasks

<task type="auto">
  <name>Create WhyChooseUs and GrandCTA Components</name>
  <files>src/components/WhyChooseUs.tsx, src/components/GrandCTA.tsx</files>
  <action>
    NEW FILE: src/components/WhyChooseUs.tsx
    - "use client", GSAP ScrollTrigger
    - Data array with 4 points (exact copy from user):
      01 Experienced Team, 02 Cutting-Edge Technology,
      03 Client-Centric Approach, 04 Results-Driven
    - Layout: Section with centered thin vertical line (1px white/10)
    - Each of 4 points placed alternately LEFT/RIGHT of center line
    - Odd points (01, 03): text-right, positioned left of line
    - Even points (02, 04): text-left, positioned right of line
    - Each point block contains:
      a) Giant bg number (text-[180px]+ absolute, opacity-[0.05])
      b) Heading (text-2xl lg:text-3xl font-bold white)
      c) Description (text-base lg:text-lg text-[#B0B0B0])
    - Spacing: py-20 lg:py-32 per point block
    - Section title: "WHY CHOOSE US" centered eyebrow at top
    - GSAP: Each point uses ScrollTrigger to fade-in + drift up
      (fromTo y:50→0, opacity:0→1, ease:"power3.out",
       start:"top 85%", toggleActions:"play none none none")

    NEW FILE: src/components/GrandCTA.tsx
    - "use client", GSAP ScrollTrigger
    - Layout: Full-bleed section, py-40 lg:py-52, centered content
    - Radial gradient glow: absolute bg element with
      radial-gradient(circle, rgba(246,121,99,0.08) 0%, transparent 70%)
    - Main heading: "Let's Bring Your Vision to Life!"
      text-4xl md:text-6xl lg:text-7xl xl:text-8xl, font-bold, white
    - Subtext: full paragraph from user, text-lg, text-[#A1A1A1], max-w-2xl mx-auto
    - Button: "Contact Us" pill-shaped (px-10 py-4 rounded-full)
      bg-[#F67963] text-white font-semibold
      hover:scale-105 hover:shadow-[0_0_40px_rgba(246,121,99,0.4)] transition
    - WORD-BY-WORD ANIMATION:
      a) Split heading text into individual <span> words wrapped in overflow-hidden divs
      b) GSAP ScrollTrigger scrub: each word translateY(100%→0%) with stagger:0.05
      c) trigger: the heading container, start:"top 80%", end:"top 40%", scrub:0.8
    - Button: fade-in + scale after words complete

    CONSTRAINTS:
    - Both must be Client Components ("use client")
    - Dark mode: bg-black throughout
    - No hydration errors (all animation via useGSAP)
    - Coral accent: #F67963
  </action>
  <verify>npm run dev — both components render without errors</verify>
  <done>WhyChooseUs shows 4 staggered timeline points, GrandCTA shows word-by-word heading</done>
</task>

<task type="auto">
  <name>Wire Components and Clean Up</name>
  <files>src/components/ServicesSection.tsx, src/app/page.tsx</files>
  <action>
    MODIFY: src/components/ServicesSection.tsx
    - Remove the entire "FEATURES ROW" block (the features data array and JSX)
    - Keep only the pinned services section + its Fragment wrapper
    - The features array (lines ~54-58) and the features JSX (lines ~277-296)
      should be deleted entirely

    MODIFY: src/app/page.tsx
    - Import WhyChooseUs and GrandCTA
    - Insert them between ClientsMarquee and ContactSection:
      <div className="relative" style={{ zIndex: 5 }}>
        <ClientsMarquee />
      </div>
      <div className="relative" style={{ zIndex: 6 }}>
        <WhyChooseUs />
      </div>
      <div className="relative" style={{ zIndex: 7 }}>
        <GrandCTA />
      </div>
      <PinnedSection zIndex={8} isTall={true} className="bg-black">
        <ContactSection />
      </PinnedSection>
  </action>
  <verify>Full scroll: Services→Marquee→WhyChooseUs→GrandCTA→Contact</verify>
  <done>Page flow complete, features grid removed, no orphan components</done>
</task>

## Success Criteria
- [ ] 4 timeline points stagger L/R with massive whitespace
- [ ] Giant bg numbers at 5% opacity behind each point
- [ ] Scroll-triggered fade-in + drift-up for each point
- [ ] Grand CTA heading animates word-by-word on scroll
- [ ] Premium pill button with hover glow
- [ ] Features grid removed from ServicesSection
- [ ] Full page flow: Services→Marquee→WhyChooseUs→GrandCTA→Contact
- [ ] No hydration errors, dark mode preserved
