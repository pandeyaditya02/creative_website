---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Contact Form Backend & Dependencies

## Objective
Set up the backend infrastructure and dependencies required to send emails from the contact form.

## Context
- .gsd/phases/3/RESEARCH.md
- package.json

## Tasks

<task type="auto">
  <name>Install dependencies and setup API route</name>
  <files>
    - package.json
    - src/app/api/contact/route.ts
  </files>
  <action>
    1. Install `nodemailer` and `@types/nodemailer`.
    2. Create `src/app/api/contact/route.ts` with a POST handler that:
       - Parses Name, Email, Project Type, Budget, and Message from request body.
       - Validates all fields are present.
       - Uses `nodemailer` to send an email to `cc@creativechauk.com`.
       - Uses environment variables for SMTP configuration.
  </action>
  <verify>Check if src/app/api/contact/route.ts exists and compiles without errors.</verify>
  <done>API route is implemented and ready to receive requests.</done>
</task>

## Success Criteria
- [ ] `nodemailer` is listed in `package.json`.
- [ ] API route exists and handles POST requests.
