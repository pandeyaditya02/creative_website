---
phase: 10
plan: 1
wave: 1
---

# Plan 10.1: Native Hero Video Integration

## Objective
Replace the YouTube-driven Hero background video with a pristine, native HTML5 video player sourced from the provided Google Drive link. This removes 3rd-party iframe latency, improves performance, and enables precise progress tracking without YouTube API boilerplate.

## Context
- `src/components/HeroVideo.tsx`
- Video Link: `https://drive.google.com/file/d/1Jk_SNOnDtwlxmDHj9smyBvCC_PHnujRE/view`
- Google Drive ID: `1Jk_SNOnDtwlxmDHj9smyBvCC_PHnujRE`

## Tasks

<task type="auto">
  <name>Download Hero Video</name>
  <files>public/hero-video.mp4</files>
  <action>
    RUN: `npx --yes gdown 1Jk_SNOnDtwlxmDHj9smyBvCC_PHnujRE -O public/hero-video.mp4`
    (If this fails due to quotas, fallback to a checkpoint:human-verify asking the user to manually place it there).
  </action>
  <verify>Check `public/hero-video.mp4` exists in the filesystem.</verify>
  <done>Video file is present and readable locally.</done>
</task>

<task type="auto">
  <name>Refactor HeroVideo Component</name>
  <files>src/components/HeroVideo.tsx</files>
  <action>
    MODIFY: src/components/HeroVideo.tsx
    - Delete all YouTube IFrame API logic (`onPlayerReady`, `onPlayerStateChange`, `useEffect` for script loading).
    - Replace the `<div id="hero-video-player">` with a native `<video>` tag:
      `<video ref={playerRef} src="/hero-video.mp4" autoPlay loop playsInline muted={muted} className="absolute top-1/2 left-1/2 w-full h-full object-cover min-w-[120%] min-h-[120%] -translate-x-1/2 -translate-y-1/2" />`
    - Update `toggleSound` to natively toggle `playerRef.current.muted`.
    - Provide an `onTimeUpdate` event handler on the `<video>` tag to update the `progress` state directly (`(currentTime / duration) * 100`), removing the `setInterval` logic.
  </action>
  <verify>npm run dev — compiles cleanly and video auto-plays locally.</verify>
  <done>Smooth streaming without YouTube branding or scripting overhead.</done>
</task>

## Success Criteria
- [ ] No YouTube iframe loading delay.
- [ ] Mute/Unmute functionality works instantly.
- [ ] Progress bar tracks cleanly tied to the video's actual `timeupdate` event.
- [ ] High-quality `/hero-video.mp4` successfully serving from public folder.
