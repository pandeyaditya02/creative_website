---
phase: 3
plan: 2
wave: 1
---

# Plan 3.2: Contact Form Frontend & Validation

## Objective
Update the `ContactSection` component to handle form state, validation, and submission feedback.

## Context
- src/components/ContactSection.tsx
- .gsd/phases/3/RESEARCH.md

## Tasks

<task type="auto">
  <name>Implement form state and validation</name>
  <files>
    - src/components/ContactSection.tsx
  </files>
  <action>
    1. Add `useState` for form fields: `name`, `email`, `projectType`, `budget`, `message`.
    2. Add state for `status` (idle, loading, success, error).
    3. Update form inputs to be controlled components.
    4. Change the "Submit" button to `type="submit"`.
    5. Implement a `handleSubmit` function that:
       - Prevents default form submission.
       - Validates that all fields are filled.
       - Sends data to `/api/contact`.
       - Handles success/error responses.
    6. Update UI to show "Sending..." during submission and a confirmation message upon success.
  </action>
  <verify>Manually test the form in the browser (or verify via code review) that validation works and submission triggers the API call.</verify>
  <done>Frontend form is fully functional and provides feedback to the user.</done>
</task>

## Success Criteria
- [ ] All form fields are required and validated.
- [ ] User sees a confirmation message after successful submission.
- [ ] UI maintains the premium aesthetic.
