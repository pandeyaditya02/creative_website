# Plan 3.1 Summary: HeroVideo Animation & Background Fix
- Changed hero container from `bg-[#2D3E50]` → `bg-black`.
- Replaced broken `gsap.to(scale:1→1)` no-op with `gsap.fromTo(scale:1.35→1.05)` + `scrub:1.5` for a visible zoom-out parallax.
- Upgraded title parallax from `scrub:true` to `scrub:1` for smoother easing.
