# Vite React TypeScript template

This is a minimal Vite + React + TypeScript starting project that follows Garry's conventions. Customize as needed.

Setup

1. npm install
2. npm run prepare  # enable Husky hooks
3. npm run dev

Scripts

- `dev` — run development server
- `build` — produce production build
- `lint` — run ESLint (errors on warnings)
- `lint:fix` — attempt to fix lint issues
- `format` — run Prettier
- `format:check` — verify formatting
- `test` — run Jest with coverage
- `test:structure` — ensure `tests/src` mirrors `src`

Folder structure

- `docs/PROJECT-DOCS.md` — single, detailed technical documentation file for the project.
- `config/` — theme, client, and env JSON configs (no secrets).
- `src/common/` — enums, types, constants, interfaces, messages, file names, operations.
- `src/utils/` — shared utilities (logger and lodash wrappers).
- `src/components/` — UI components (includes Lottie example).
- `src/store/` — Redux store and slices.
- `tests/src/` — mirrors `src` with matching `*.test.ts/tsx` files.
- `tests/mock/` — test-only mock data and factories.

Dependencies (what they are for)

- `react`, `react-dom` — UI runtime
- `@reduxjs/toolkit`, `react-redux` — state management
- `axios` — HTTP client
- `lodash` — shared utility functions (centralized in `src/utils/lodashUtils.ts`)
- `winston` — structured logging utility
- `lottie-react` — Lottie animation rendering

Notes

- Lottie sample is included (`src/components/LottieExample.tsx`). Replace `src/assets/animations/sample.json` with your animation.
- Favicon default is `public/favicon.svg` and Font Awesome CDN is included in `index.html` (optional to remove).
- Changesets are required on commits. Use `npx changeset` to create and stage a changeset before committing.
- For configuration details and workflow expectations, read `docs/PROJECT-DOCS.md`.
