# garry-ocd-boilerplate

A CLI to scaffold projects following Garry's strict structure and conventions.

Quick start:

1. npm install
2. npx garry-ocd (or ./bin/cli.js)

This repository contains templates in `templates/` that the CLI copies and customizes.

---

What this package does

- Interactive CLI that scaffolds frontend or backend projects using predefined templates.
- Enforces strict project-level standards (TypeScript-only, ESLint, Prettier, Husky, Changesets, Jest, lint-staged, and branch/commit rules).
- Produces fully-configured projects with `README.md` explaining setup and usage.
- Generates `docs/` folder, `src/` layout, and optional features like Lottie, Swagger, Tailwind, Redux.

Templates included

- `garry-frontend-template` — Vite + React + TypeScript starter with Changesets, Husky, ESLint, Jest, Tailwind, and Lottie example.
- `garry-backend-template` — Express + TypeScript starter with Winston, Jest, and optional Sequelize.

Repository structure (scaffolder)

- `bin/cli.js` — CLI entry point and template orchestration.
- `templates/garry-frontend-template/` — frontend template source.
- `templates/garry-backend-template/` — backend template source.
- `docs/` — requirements and project documentation.
- `tests/` — CLI tests for scaffolding and validation.

Package scripts (scaffolder)

- `start` — run the CLI locally
- `test` — run CLI tests
- `test:coverage` — run tests with coverage
- `lint` — lint the scaffolder code (check only)
- `lint:fix` — lint and auto-fix
- `format` — format check only
- `format:fix` — format and write changes
- `ci:build` — lint:fix + format:fix + test:coverage + pack:sample
- `pack:sample` — create a local npm tarball in `tmp/pack`
- `publish` — publish to npm (public)
- `changeset` — create a changeset

Scaffolder dependencies (what they are for)

- `enquirer` — interactive prompts
- `fs-extra` — file copy/dir utilities
- `chalk` — CLI output formatting

Generated project structure (high level)

- `src/common/` — enums, types, constants, interfaces, messages, file names, operations.
- `src/utils/` — shared utilities (logger and lodash wrappers).
- `src/apis/` (backend) — API modules and handlers, plus `withWrap` error wrapper.
- `config/` — theme, client, and env JSON configs (no secrets).
- `tests/src/` — mirrors `src` with `*.test.ts` / `*.test.tsx`.
- `tests/mock/` — mock constants and factories for tests only.
- Templates are TypeScript-only by default.

Documentation

- Single master doc: `docs/PROJECT-DOCS.md` (requirements, architecture, workflows, testing, runbooks, and inventories).

How to try a scaffold locally

1. Clone this repo and run:

   npm install

2. Run the scaffolder:

   node ./bin/cli.js

   or (after linking):

   npm link
   garry-ocd

3. Follow prompts (project name, type, project path). The CLI shows dependencies, dev dependencies, scripts, and structure, then asks for confirmation before creating files.
4. When prompted, choose whether to run `npm install` and `npm test` immediately after scaffolding.

Pre-commit behavior (what will block a commit)

- Husky pre-commit runs lint/format fixes and tests with coverage.
- A pre-commit script enforces that a Changeset file is staged for every commit. Create one with `npx changeset` and stage it before commit.
- A test-structure check enforces that every `src` file has a matching test in `tests/src` (e.g. `src/App.tsx` -> `tests/src/App.test.tsx`).
- Branch names are validated: `main`, `qa`, `develop`, `feature/*`, `fix/*`, `hotfix/*`, `release/DD-MM-YYYY`.

Scaffolder repo hooks

- This repository also uses Husky + commitlint with the same commit format (`<ticket-number>: <message>`).
- Run `npm run prepare` once after install to enable hooks in this repo.

Scaffold confirmation

- The CLI prints a summary of dependencies and structure before writing files. It only proceeds after confirmation (`y`).
- `commit-msg` hook enforces commit subject format: `<ticket-number>: <message>`.

Pull Request checks (GitHub Actions)

- The repository includes a PR workflow (`.github/workflows/pr-check.yml`) that runs on pull requests against `develop`, `qa`, and `main`. It runs the same checks as the pre-commit hook: install, `lint`, `format`, tests with coverage, and validates commit messages and the presence of changeset files in the PR commits.
  Notes

- After generating a project, run `npm install` inside the generated project and then `npm run prepare` to activate Husky hooks.
- The templates include a `README.HINTS.md` with project-specific guidance (favicon, Lottie, Changesets).
- Tests live under `tests/src` and mirror the `src` folder structure.

Removing the scaffolder reference from generated projects

- The CLI removes references to `garry-ocd` (the scaffold package) from the generated project's `package.json` so the scaffold does not remain as a dependency.
- Optionally, a `.garryrc.json` can be generated to allow re-generation; if you prefer not to keep it, the CLI can remove it on request.
