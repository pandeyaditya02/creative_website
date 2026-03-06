---
phase: 4
plan: 1
wave: 1
---

# Plan 4.1: Dependency Verification & Install

## Objective
The TODO.md flagged `react-player` as a missing dependency. Investigating shows it IS listed in `package.json` (v3.4.0), but may not have been installed into `node_modules` at project setup time. This plan verifies it's installed and if not, installs it. Also verifies the dev build still compiles cleanly.

## Context
- .gsd/TODO.md
- package.json

## Tasks

<task type="auto">
  <name>Verify react-player is installed and project builds</name>
  <files>package.json</files>
  <action>
    1. Run `npm list react-player` to check if it's installed in node_modules.
    2. If the output shows `react-player@x.x.x` — dependency is present, no action needed.
    3. If the output shows UNMET DEPENDENCY or a missing package warning — run `npm install` to install all listed dependencies.
    4. After verifying/installing, run `npm run build` to confirm the project compiles without errors.
    5. If build fails due to TypeScript or import errors unrelated to our changes, note them in `.gsd/TODO.md` but do NOT attempt to fix unrelated errors in this plan.
  </action>
  <verify>Run `npm list react-player` — output must show the package name and version without an npm warn or ERROR line.</verify>
  <done>react-player is present in node_modules. Build completes successfully.</done>
</task>

<task type="auto">
  <name>Mark react-player TODO as resolved</name>
  <files>.gsd/TODO.md</files>
  <action>
    In `.gsd/TODO.md`, update the react-player checkbox from `- [ ]` to `- [x]` and add a note:
    ```markdown
    - [x] Check `react-player` dependency (showed as MISSING in STACK.md) — RESOLVED: confirmed present in package.json as `react-player@^3.4.0`.
    ```
  </action>
  <verify>Read `.gsd/TODO.md` — the react-player item should be checked off with a resolution note.</verify>
  <done>TODO.md has zero open stale items.</done>
</task>

## Success Criteria
- [ ] `react-player` confirmed present in node_modules.
- [ ] `npm run build` completes without errors from our changes.
- [ ] TODO.md is clean with no unresolved stale items.
