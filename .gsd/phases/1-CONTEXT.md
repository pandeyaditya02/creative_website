# Phase 1: Visual Context & UI Specifications

> **Source**: Browser Analysis of Montage.ae & Stitch MCP Design Specs
> **Project ID**: 342875621832491082

## Overarching Design System (Montage.ae Inspired)

### 1. Layout & Flow
- **Grid System**: Highly disciplined grid system with **excessive macro-whitespace** (20vh - 40vh padding between sections) to create an "expensive" feel.
- **Hero Section**: Full-bleed edge-to-edge. Transparent sticky header with 10-15px backdrop-blur appearing on scroll. A subtle horizontal video progress bar sits at the bottom edge.
- **Portfolio Grid**: 2-column masonry structure. Large thumbnails (approx 16:9 equivalent) with generous 40px+ gutter spacing.
- **Footer**: Colossal, screen-width uppercase branding acting as the ultimate anchor. 

### 2. Cinematic Motion & Animations (GSAP / Framer Motion Targets)
- **Loaders & Page Transitions**: Full-screen "shutter" transitions scaling up/down.
- **Scroll-Triggered Reveals**: 
  - *SplitText Reveals*: Words or lines sliding up from hidden overflow containers (`anim-overflow`).
  - *Parallax*: Background videos and specific typography elements scroll 5-10% slower than user scroll.
- **Hover Effects**: 
  - *Project Cards*: Image scales up (1.05x). A custom circular "PLAY" or "VIEW" cursor follows the mouse within the card boundary.
  - *Nav Links*: Subtle underlines or color shifts to International Orange.

### 3. Typography & Color
- **Theme**: Strict Dark Mode.
- **Colors**: Deep Black (`#000000`) background, Pure White (`#FFFFFF`) text, International Orange (`#FF5C00`) for accents (progress bars, hover states, back-to-top buttons).
- **Typography Strategy**: `Inter Tight` (or Space Grotesk / similar clean sans-serif).
  - *Primary Headers*: Massive, bold, uppercase (H1 ~58px, H2 ~84px, Footer ~160px+).
  - *Body Copy*: Small (14-16px) but with increased tracking (letter-spacing) for a sophisticated, airy feel.

### 4. Media Handling
- **Hero Video**: Muted, auto-playing `<video>` with `object-fit: cover`. Black overlays or dimming filters must be applied to the video layer to guarantee the high-contrast white typography remains legible.

---

## Generated UI Components (Stitch Specs)

### 1. Cinematic Hero & Navigation
- **Screen ID**: 3101fd2a202f412bb630083174de4c7a
- **Description**: Full-bleed hero. Dark cinematic video background with a subtle black overlay. Transparent sticky header with minimalist logo and uppercase links. Bold white "CRAFTING VISUALS" heading. International Orange progress bar at bottom.
- **Image**: ![Cinematic Hero & Navigation](https://lh3.googleusercontent.com/aida/AOfcidXc6yepOSMMPPtSq_FnhFhYcaILnYUFOtSVr-8-FQ7nxqCwZtsjkMJeVW9VQtDm7mojNfKTKPShXYsXKYMwL5fXcVrkKCPd6Fl63TcGlvTCloUWJ_VXBTfZqueS0V4kh3l1A20LdWFq6fEhMo4WYfWNw5BQELONR9LqWVD1nx7ffwYhX3UfbeM4bY8scvuRhq1ArAnytq6ygFdW2H1GGmjrw3Ba3o_1IMhCUwStVj9sv3o2VVI_DSGD)

### 2. Asymmetrical Storytelling Section
- **Screen ID**: 91fa4b74a30c4439be1500b35374eb10
- **Description**: Asymmetrical layout utilizing massive macro-whitespace. Small, high-tracking body text on the left, large vertical cinematic image on the right. Massive uppercase H2 heading "WE TELL STORIES" below.
- **Image**: ![Asymmetrical Storytelling](https://lh3.googleusercontent.com/aida/AOfcidU-SuY2DA6AF5lU2LOxIbksShtFs5wiHuTfLy37_jP3hvup18RmOQhAjhcxUiRzBFI0WML8nCnPv1y2ZEPMD1YDtEK5oQ90CzMZeQG32dwakrSOTGznE65HzsHUj4yKadWDDAXXMxR7HqERZEer3Gg1VIFxAFVYRAkONJkZ9sW6ujXVlYxRWhn9xLc-dbJbxh6Q60ZtCL833OXwBM3eZN6Gskyk4cMocHIrkHmY2n_ns4SRIHWyeztmEQ)

### 3. 2-Column Portfolio Grid
- **Screen ID**: c3847e9b683248ca827a5e6f1de29181
- **Description**: A 2-column masonry grid with generous 40px+ gutter spacing. Custom circular 'PLAY' cursor in International Orange (#FF5C00) during 1.05x scale hover states.
- **Image**: ![2-Column Portfolio Grid](https://lh3.googleusercontent.com/aida/AOfcidVMBGh1xLtjCrTF5XPHucg3V1bIBPitLFT_IUiUMOwTKIgNkJzUfm0XsszFoQbjZ8muiryPVzNfrhCxXz1k_UfGGq6e_x8y1E7gKRVfgD5lmwAWBEWMndOoOp6weLjm8s3_YjnAvXLQ4biwgCs0BZpsbdVrF9V2_4-n_WcsuK5I0LkDyUC7oQkObFDy9gA-iXvsqelhTVD-q8ww0HBTAlB8EcMPOwZrCcUHmu08ePLDUdGI_xlOqlc-bQ)

### 4. Colossal Brand Footer
- **Screen ID**: be27c73fd943479ea33337e6ed5e8c72
- **Description**: Screen-width uppercase branding (160px+). Multi-column grid for links above the branding. International Orange 'Back to Top' button.
- **Image**: ![Colossal Brand Footer](https://lh3.googleusercontent.com/aida/AOfcidV_ULEIS1iVZqAGV3XTUP4n7mF7Xf1VUyMFAw_EvyuG1UAiYstD-rwuio8kS2dgjuLWh02H9nENRqqAsX7LIchG91gp6dUnz8qEQNeifrHE5ISHxyM4tzJgUj_2Fw4Tg9OxwrecsPkWhRIOUSsrZcRCuBOgSNm24TG-hnEskBSbySbJGeTBMZejezCwji0PqZ0yV1yJs5sMDCwmRTslsuwCmLdQQenurlQd7k0LUxwq5FgmOT01b-vKjw)
