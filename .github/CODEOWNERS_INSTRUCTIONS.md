# CODEOWNERS — Instructions

This repository contains CODEOWNERS files to suggest reviewers automatically for pull requests.

Location and purpose:
- `.github/CODEOWNERS` — repository-level owners (default reviewers)
- `templates/garry-backend-template/CODEOWNERS` — owners for the backend template
- `templates/garry-frontend-template/CODEOWNERS` — owners for the frontend template

How it works:
- A workflow (`.github/workflows/auto-request-reviewers.yml`) reads the appropriate `CODEOWNERS` file and requests reviews from the listed users and teams when a PR is opened or updated.
- Owner entries should be in the format: `<pattern> <owner1> <owner2>` where owners are GitHub usernames (e.g. `@alice`) or teams (e.g. `@org/team-slug`).

Customization:
- Edit the `CODEOWNERS` files to add your organization usernames or team slugs.
- If you prefer per-file owner mapping, list file patterns and owners in the `CODEOWNERS` files.

Notes:
- Team names must be provided as `@org/team-slug` (the workflow will extract the `team-slug` portion for API calls).
- The workflow requests reviewers based on the owners listed; you can disable it by removing or editing the workflow files in `.github/workflows/`.
