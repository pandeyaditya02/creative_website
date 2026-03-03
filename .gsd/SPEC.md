# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
A highly aesthetic, premium portfolio website for a creative Ads & Video Production company. The site acts as an immersive digital showroom emphasizing visual storytelling, with heavy design inspiration from high-end cinematic agency sites to showcase video shoots and ad campaigns.

## Goals
1. Create a bold, cinematic landing page with a high-quality, auto-playing video background loop in the hero section.
2. Build immersive, scrollable storytelling sections that fluidly reveal the agency's creative process, services, and ethos.
3. Develop a dynamic "Work/Portfolio" grid with premium hover states (e.g., video previews) leading into minimalist project case study pages.
4. Implement a sleek, visually striking "Contact" page with a tailored inquiry form.
5. Ensure strict media optimization and lazy loading to maintain high framerates for Framer Motion and GSAP animations alongside heavy video assets.

## Non-Goals (Out of Scope for V1)
- Client login portals, hidden review links, or dedicated client dashboards.
- E-commerce or direct booking/scheduling systems.
- A blog, news, or press release section.
- Complex user authentication.

## Users
Potential clients looking for high-end ad and video production services, expecting a premium digital experience that reflects the agency's aesthetic capabilities.

## Constraints
- **Frontend Stack**: Next.js (App Router), Tailwind CSS
- **Animations**: Framer Motion and GSAP
- **Backend/Content**: Sanity.io or Supabase (Headless CMS)
- **Deployment**: Vercel
- **Performance**: Must not ruin framerates despite heavy video assets.

## Success Criteria
- [ ] Cinematic landing page with auto-playing background video is live and performant.
- [ ] Scroll-triggered storytelling sections function smoothly.
- [ ] Portfolio grid features video previews on hover without lag.
- [ ] Contact/Inquiry form successfully captures leads.
- [ ] Performance metrics meet baseline requirements for smooth animation alongside video playback.
