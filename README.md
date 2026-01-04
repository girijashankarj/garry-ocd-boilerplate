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
- `tests/` — CLI tests for scaffolding, flags, and presets.

Package scripts (scaffolder)

- `start` — run the CLI locally
- `test` — run CLI tests
- `lint` — lint the scaffolder code
- `format` / `format:check` — format and verify formatting

Scaffolder dependencies (what they are for)

- `enquirer` — interactive prompts
- `minimist` — CLI flag parsing
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

3. Follow prompts (project name, type, module, project path). The CLI shows a summary of packages and structure and asks for confirmation before creating files.
4. When prompted, choose whether to run `npm install` and `npm test` immediately after scaffolding.

Non-interactive / CI usage

You can run the CLI in non-interactive mode (for CI or scripts) using flags. Example:

  node ./bin/cli.js --non-interactive --name my-app --type frontend --module ESM

Supported flags:
- `--non-interactive` — run without prompts (use with `--name` and `--type`)
- `--yes` — non-interactive shorthand; runs without prompts and will auto-install dependencies unless `--dry-run` is specified
- `--dry-run` — skips side effects like `npm install`; useful for CI validation
- `--name <project-name>` — project folder name (required for non-interactive)
- `--type <frontend|backend>` — project type (required for non-interactive)
- `--module <CJS|ESM>` — module system
- `--path <target-path>` — where the project will be created (defaults to `./<project-name>`)
- TypeScript is mandatory in all templates (no `--ts` flag needed).
- `--lottie` — include Lottie example (template already includes optional sample)
- `--git` — initialize git (scaffold default is opt-in; use `--git` to init)
- `--preset <preset-name>` — apply a preset configuration (e.g., `frontend-full`, `backend-db`) to set multiple flags at once.

Pre-commit behavior (what will block a commit)

- Husky pre-commit runs `lint-staged` which runs ESLint (no warnings allowed) and Prettier autofix on staged files.
- A pre-commit script enforces that a Changeset file is staged for every commit. Create one with `npx changeset` and stage it before commit.
- A test-structure check enforces that every `src` file has a matching test in `tests/src` (e.g. `src/App.tsx` -> `tests/src/App.test.tsx`).
- Branch names are validated: `main`, `qa`, `develop`, `feature/*`, `fix/*`, `hotfix/*`, `release/DD-MM-YYYY`.
 
Scaffold confirmation

- The CLI prints a summary of dependencies and structure before writing files. It only proceeds after confirmation (`y`) or when `--yes` is used.
- `commit-msg` hook enforces commit subject format: `<ticket-number>: <message>`.

Pull Request checks (GitHub Actions)

- The repository includes a PR workflow (`.github/workflows/pr-check.yml`) that runs on pull requests against `develop`, `qa`, and `main`. It runs the same checks as the pre-commit hook: install, lint (errors on warnings), Prettier check, tests (with coverage), and validates commit messages and the presence of changeset files in the PR commits.
- The workflow also performs an **offline-install smoke test** for each generated template: it caches `node_modules` from a successful run and then attempts `npm ci --prefer-offline` inside a generated project to verify installs can be satisfied from the cache. If the cache is missing the smoke test will fail; to seed the cache re-run the template generation job successfully (or run a local `npm ci` and re-trigger the workflow).
Notes

- After generating a project, run `npm install` inside the generated project and then `npm run prepare` to activate Husky hooks.
- The templates include a `README.HINTS.md` with project-specific guidance (favicon, Lottie, Changesets).
- Tests live under `tests/src` and mirror the `src` folder structure.

Removing the scaffolder reference from generated projects

- The CLI removes references to `garry-ocd` (the scaffold package) from the generated project's `package.json` so the scaffold does not remain as a dependency.
- Optionally, a `.garryrc.json` can be generated to allow re-generation; if you prefer not to keep it, the CLI can remove it on request.
