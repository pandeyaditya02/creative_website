---
phase: 13
plan: 1
wave: 1
---

# Plan 13.1: YouTube IFrame Integration with Brutalist Styling

## Objective
The HeroVideo component currently uses a local HTML5 `<video>` element, but it is beautifully styled with a brutalist, cinematic overlay (bottom-left typography, gradient, and custom sound toggle). Our goal is to replace only the local `<video>` element with the YouTube IFrame API implementation (using the user's provided reference code as a technical guide) while strictly preserving all existing styling, GSAP animations, layout constraints, and macro-whitespace.

## Context
- `src/components/HeroVideo.tsx`
- `.gsd/ROADMAP.md`

## Tasks

<task type="auto">
  <name>Refactor HeroVideo to use YouTube IFrame API</name>
  <files>src/components/HeroVideo.tsx</files>
  <action>
    Review the current `HeroVideo.tsx`.
    
    1. Import `useEffect` alongside `useState` and `useRef` from 'react'.
    2. Setup the YouTube API state and refs exactly as requested:
       ```typescript
       const playerRef = useRef<YT.Player | null>(null);
       const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
       const videoId = "O8_VkfRkjRg";
       ```
    3. Retain the GSAP refs (`containerRef`, `videoContainerRef`, `titleRef`, `progressContainerRef`) but remove `videoRef: HTMLVideoElement`.
    4. Port the `useEffect` block that injects the YouTube IFrame API script and handles `onYouTubeIframeAPIReady`.
    5. Port `onPlayerReady` (mutes target, starts progress polling) and `onPlayerStateChange`.
    6. Rewrite `toggleSound` to use `playerRef.current.mute()` and `unMute()`.
    
    7. **DOM Structure:** Find the existing HTML5 `<video>` tag inside `videoContainerRef`.
       - DO NOT modify the parent `videoContainerRef` (which handles the GSAP parallax and CSS filters).
       - Inside `videoContainerRef`, replace the `<video>` tag with the required YouTube iframe container:
       ```tsx
       <div
         id="hero-video-player"
         className="absolute top-1/2 left-1/2 w-[100%] h-[100%] min-w-[120%] min-h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
       />
       ```
       - This specific absolute styling is critical for ensuring the YT iframe bleeds over the edges to hide its native UI.
    
    8. **Strict Preservation Constraint:** Do not touch the `Cinematic Gradient Overlay` div, the `Text Content` block, or the `Sound Toggle` block. They must remain exactly as they are currently styled.
  </action>
  <verify>Check localhost:3000 to ensure the video loads from YouTube, but the layout remains identical.</verify>
  <done>Hero section is strictly 100vh full-bleed, YouTube player hides its UI and borders via the scale/translate CSS trick, text remains brutalist bottom-left, and the sound toggle accurately interacts with the YT API.</done>
</task>

## Success Criteria
- [ ] HTML5 `<video>` tag is completely removed.
- [ ] YouTube IFrame API dynamically loads and plays video `O8_VkfRkjRg`.
- [ ] No black borders or YouTube branding are visible because of the `min-w-[120%]` scaling trick.
- [ ] The brutalist typography, gradient, and glassmorphism sound toggle remain 100% untouched and functional.
