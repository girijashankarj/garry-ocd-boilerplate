# Garry OCD Boilerplate - Master Documentation

Introduction
This is the single, consolidated documentation file for the garry-ocd-boilerplate scaffolder and its templates.
It replaces the previous multi-file docs by embedding requirements, workflows, architecture, testing, security, and operations in one place.

Document goals

- Provide a single source of truth for managers, architects, engineers, QA, and DevOps.
- Describe how the scaffolder behaves, what it generates, and how to operate it safely.
- Preserve all standards: strict TypeScript, test coverage rules, linting strictness, immutability, and structure constraints.

Audience and roles

- Manager: governance, delivery, timelines, release readiness.
- Solution architect: design, constraints, tradeoffs, long-term maintainability.
- Business analyst: requirements, acceptance criteria, client expectations.
- QA lead: test strategy, coverage expectations, test matrices, risk management.
- DevOps: CI/CD, release, deployment, runtime operations.
- Engineer: daily implementation and refactoring.

Document ownership

- Owner: garry-ocd maintainers.
- Contributors: project leads and template owners.
- Review cadence: after major changes to scaffolder behavior or templates.

Change control

- Changes to this document follow the same branch and commit rules as code.
- Every update requires a changeset file.
- Last updated must be changed when content changes.

## Contents

- Executive summary
- Glossary
- Product overview
- Requirements
- CLI behavior
- Template overview
- Repository structure (ASCII)
- Frontend template structure (ASCII)
- Backend template structure (ASCII)
- Project creation flow
- Configuration management
- Logging standards
- Testing strategy
- Test case catalog
- QA checklist
- DevOps checklist
- Security and threat model
- API standards
- Database standards
- Frontend standards
- Git workflow and branching
- Commit message standards
- Changesets policy
- Pre-commit and PR quality gates
- CI design
- Release runbook
- Deployment runbook
- Maintenance and upgrades
- Troubleshooting
- Agent roles and deliverables
- Templates and file conventions
- File inventory (scaffolder)
- File inventory (frontend template)
- File inventory (backend template)
- Test case matrix (expanded)
- Checklists by role
- Appendix A: Sample configs
- Appendix B: Sample commands
- Appendix C: Decision log
- References
- Last updated

## Executive summary

- garry-ocd-boilerplate is a strict scaffolder for frontend and backend TypeScript projects.
- It enforces structure, testing discipline, linting strictness, and stable patterns.
- It produces ready-to-run projects with hooks, CI, and documentation baked in.
- It prioritizes deterministic code, immutability, and shared type sources.
- It centralizes configuration and logging to reduce drift and production risk.

## Glossary

- Scaffolder: the garry-ocd-boilerplate CLI and repository.
- Template: a static project baseline for frontend or backend.
- Generated project: a project created by running the scaffolder.
- Changeset: a markdown file indicating version changes for a release.
- Gate: a check that blocks a commit or PR if conditions fail.
- Structure test: an enforcement script that validates tests mirror src.
- Config map: JSON file mapping logical keys to env var names.
- Lint gate: ESLint rule enforcing zero warnings.

## Product overview

Purpose

- Create a strict, repeatable project baseline for client or internal work.
- Remove ambiguity in architecture, tests, and workflow standards.

Primary capabilities

- Interactive CLI for project creation.
- Frontend template with Vite, React, and TypeScript.
- Backend template with Express, TypeScript, and AJV validation.
- Strict linting, formatting, and test structure enforcement.
- Changesets required for every commit.

Non-goals

- No Storybook.
- No runtime mutation or non-deterministic behaviors.
- No automatic git initialization by default.

## Requirements

Business requirements

- Reduce onboarding time for new projects.
- Ensure consistent delivery quality across teams.
- Enforce a strict coding pattern and directory structure.
- Minimize production defects by enforcing gates early.

Technical requirements

- TypeScript only.
- Test coverage at least 80 percent.
- Tests must mirror src structure.
- Pre-commit must run lint:fix, format:fix, test:coverage, and changeset checks.
- Branch and commit naming rules enforced.
- Lint warnings are treated as errors.
- Any types allowed only in src/common (types, enums, interfaces, constants).

Operational requirements

- CI must run on PRs to main, qa, and develop.
- CI must mirror pre-commit behavior.
- Release must be traceable to changesets.
- CI checks must pass for every PR.

## CLI behavior

Inputs

- Project name
- Project type: frontend or backend
- Target path

Interactive flow

- Prompt for project name
- Prompt for project type
- Prompt for output path
- Show dependency and structure summary
- Ask for confirmation before writing files
- Ask whether to run npm install and tests

Interactive-only flow

- This CLI runs with prompts only (no flags).

## Template overview

Frontend template

- Vite + React + TypeScript
- Optional Tailwind or Bulma
- Redux Toolkit example
- Lottie example

Backend template

- Express + TypeScript
- AJV validation and structured handler pattern
- Basic bearer-token auth middleware (API_TOKEN)
- Swagger UI for API docs
- Sequelize + sqlite example

## Repository structure (ASCII)

```
garry-ocd-boilerplate/
├── bin/
│   └── cli.js
├── docs/
│   └── PROJECT-DOCS.md
├── templates/
│   ├── garry-frontend-template/
│   └── garry-backend-template/
├── tests/
├── .github/
│   └── workflows/
│       └── pr-check.yml
├── package.json
└── README.md
```

## Frontend template structure (ASCII)

```
my-app/
├── .github/workflows/pr-check.yml
├── config/
│   ├── theme.json
│   ├── client.json
│   └── env.json
├── docs/
│   └── PROJECT-DOCS.md
├── public/
│   └── favicon.svg
├── scripts/
│   ├── precommit/
│   ├── inject-badge.js
│   └── verify-tests.js
├── src/
│   ├── assets/
│   ├── common/
│   ├── components/
│   ├── store/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── mock/
│   └── src/
├── .husky/
├── package.json
└── README.md
```

## Backend template structure (ASCII)

```
my-api/
├── .github/workflows/pr-check.yml
├── config/
│   ├── theme.json
│   ├── client.json
│   └── env.json
├── docs/
│   └── PROJECT-DOCS.md
├── scripts/
│   ├── precommit/
│   ├── inject-badge.js
│   └── verify-tests.js
├── src/
│   ├── apis/
│   │   ├── common/
│   │   │   ├── constants/
│   │   │   ├── enums/
│   │   │   ├── interfaces/
│   │   │   ├── sql.ts
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── handlers/
│   │   │   ├── create-user/
│   │   │   ├── delete-user/
│   │   │   ├── get-user/
│   │   │   └── update-user/
│   │   ├── helpers/
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   └── withWrap.ts
│   ├── common/
│   ├── db/
│   ├── models/
│   ├── openapi/
│   └── utils/
├── tests/
│   ├── mock/
│   └── src/
├── .husky/
├── package.json
└── README.md
```

## Project creation flow

Interactive flow (ASCII)

```
[User] -> [CLI prompts] -> [Summary] -> [Confirm] -> [Copy template] -> [Update package.json] -> [Optional install/test]
```

No non-interactive flow is supported (interactive prompts only).

## Configuration management

Required config files

- config/theme.json
- config/client.json
- config/env.json

Rules

- No secrets in JSON.
- Env mapping must map logical keys to env var names.
- Validate config at startup or build time.

Config validation checklist

- Validate theme.mode is light or dark.
- Validate theme.colors.primary is a hex color.
- Validate client.domain matches allowed domain format.
- Validate env.json values are uppercase env var names.

## Logging standards

Required fields

- level
- message
- context
- fileName
- functionName
- payload

Message taxonomy

- INFO_MESSAGES for successful flows and state changes.
- WARN_MESSAGES for degraded paths.
- ERROR_MESSAGES for failures and exceptions.
- DEBUG_MESSAGES for detailed traces.

Example

```
loggerInfo(INFO_MESSAGES.REQUEST_OK, { id }, OPERATIONS.USERS_GET, FILE_NAMES.USERS_HANDLER, 'getUser');
```

## Testing strategy

Rules

- Every src file must have a matching test.
- tests/src mirrors src directory structure.
- Tests and mocks are linted and formatted.
- Tests and mocks are excluded from build output.
- External APIs are mocked.

## QA checklist

- QA-001 Verify lint passes with zero warnings.
- QA-002 Verify prettier check passes.
- QA-003 Verify test:structure passes for all src files.
- QA-004 Verify coverage is >= 80 percent.
- QA-005 Verify config files load correctly.
- QA-006 Verify theme toggle behavior.
- QA-007 Verify Lottie render path if enabled.
- QA-008 Verify API validation behavior for backend.
- QA-009 Verify swagger UI loads /docs for backend.
- QA-010 Verify db:sync and db:seed for backend.
- QA-011 Verify lint passes with zero warnings.
- QA-012 Verify prettier check passes.
- QA-013 Verify test:structure passes for all src files.
- QA-014 Verify coverage is >= 80 percent.
- QA-015 Verify config files load correctly.
- QA-016 Verify theme toggle behavior.
- QA-017 Verify Lottie render path if enabled.
- QA-018 Verify API validation behavior for backend.
- QA-019 Verify swagger UI loads /docs for backend.
- QA-020 Verify db:sync and db:seed for backend.
- QA-021 Verify lint passes with zero warnings.
- QA-022 Verify prettier check passes.
- QA-023 Verify test:structure passes for all src files.
- QA-024 Verify coverage is >= 80 percent.
- QA-025 Verify config files load correctly.
- QA-026 Verify theme toggle behavior.
- QA-027 Verify Lottie render path if enabled.
- QA-028 Verify API validation behavior for backend.
- QA-029 Verify swagger UI loads /docs for backend.
- QA-030 Verify db:sync and db:seed for backend.
- QA-031 Verify lint passes with zero warnings.
- QA-032 Verify prettier check passes.
- QA-033 Verify test:structure passes for all src files.
- QA-034 Verify coverage is >= 80 percent.
- QA-035 Verify config files load correctly.
- QA-036 Verify theme toggle behavior.
- QA-037 Verify Lottie render path if enabled.
- QA-038 Verify API validation behavior for backend.
- QA-039 Verify swagger UI loads /docs for backend.
- QA-040 Verify db:sync and db:seed for backend.
- QA-041 Verify lint passes with zero warnings.
- QA-042 Verify prettier check passes.
- QA-043 Verify test:structure passes for all src files.
- QA-044 Verify coverage is >= 80 percent.
- QA-045 Verify config files load correctly.
- QA-046 Verify theme toggle behavior.
- QA-047 Verify Lottie render path if enabled.
- QA-048 Verify API validation behavior for backend.
- QA-049 Verify swagger UI loads /docs for backend.
- QA-050 Verify db:sync and db:seed for backend.
- QA-051 Verify lint passes with zero warnings.
- QA-052 Verify prettier check passes.
- QA-053 Verify test:structure passes for all src files.
- QA-054 Verify coverage is >= 80 percent.
- QA-055 Verify config files load correctly.
- QA-056 Verify theme toggle behavior.
- QA-057 Verify Lottie render path if enabled.
- QA-058 Verify API validation behavior for backend.
- QA-059 Verify swagger UI loads /docs for backend.
- QA-060 Verify db:sync and db:seed for backend.

## DevOps checklist

- DO-001 Confirm CI runs on PR to main/qa/develop.
- DO-002 Confirm lint, format, test:structure, test, build all pass.
- DO-003 Confirm changeset policy is enforced.
- DO-004 Confirm offline install smoke test passes.
- DO-005 Confirm release artifacts are generated.
- DO-006 Confirm environment variables are injected securely.
- DO-007 Confirm logs are structured JSON.
- DO-008 Confirm rollback plan exists.
- DO-009 Confirm monitoring hooks are documented.
- DO-010 Confirm release notes are produced from changesets.
- DO-011 Confirm CI runs on PR to main/qa/develop.
- DO-012 Confirm lint, format, test:structure, test, build all pass.
- DO-013 Confirm changeset policy is enforced.
- DO-014 Confirm offline install smoke test passes.
- DO-015 Confirm release artifacts are generated.
- DO-016 Confirm environment variables are injected securely.
- DO-017 Confirm logs are structured JSON.
- DO-018 Confirm rollback plan exists.
- DO-019 Confirm monitoring hooks are documented.
- DO-020 Confirm release notes are produced from changesets.
- DO-021 Confirm CI runs on PR to main/qa/develop.
- DO-022 Confirm lint, format, test:structure, test, build all pass.
- DO-023 Confirm changeset policy is enforced.
- DO-024 Confirm offline install smoke test passes.
- DO-025 Confirm release artifacts are generated.
- DO-026 Confirm environment variables are injected securely.
- DO-027 Confirm logs are structured JSON.
- DO-028 Confirm rollback plan exists.
- DO-029 Confirm monitoring hooks are documented.
- DO-030 Confirm release notes are produced from changesets.
- DO-031 Confirm CI runs on PR to main/qa/develop.
- DO-032 Confirm lint, format, test:structure, test, build all pass.
- DO-033 Confirm changeset policy is enforced.
- DO-034 Confirm offline install smoke test passes.
- DO-035 Confirm release artifacts are generated.
- DO-036 Confirm environment variables are injected securely.
- DO-037 Confirm logs are structured JSON.
- DO-038 Confirm rollback plan exists.
- DO-039 Confirm monitoring hooks are documented.
- DO-040 Confirm release notes are produced from changesets.
- DO-041 Confirm CI runs on PR to main/qa/develop.
- DO-042 Confirm lint, format, test:structure, test, build all pass.
- DO-043 Confirm changeset policy is enforced.
- DO-044 Confirm offline install smoke test passes.
- DO-045 Confirm release artifacts are generated.
- DO-046 Confirm environment variables are injected securely.
- DO-047 Confirm logs are structured JSON.
- DO-048 Confirm rollback plan exists.
- DO-049 Confirm monitoring hooks are documented.
- DO-050 Confirm release notes are produced from changesets.
- DO-051 Confirm CI runs on PR to main/qa/develop.
- DO-052 Confirm lint, format, test:structure, test, build all pass.
- DO-053 Confirm changeset policy is enforced.
- DO-054 Confirm offline install smoke test passes.
- DO-055 Confirm release artifacts are generated.
- DO-056 Confirm environment variables are injected securely.
- DO-057 Confirm logs are structured JSON.
- DO-058 Confirm rollback plan exists.
- DO-059 Confirm monitoring hooks are documented.
- DO-060 Confirm release notes are produced from changesets.

## Security and threat model

Threats

- Injection via unvalidated input.
- Secret leakage via logs.
- Misconfiguration of environment variables.
- Unsafe dependency upgrades.

Mitigations

- AJV validation for all request payloads.
- No secrets in JSON config files.
- Log schema and redaction rules.
- Dependency upgrades gated by tests and CI.

## API standards

Structure

- handlers/
- requestSchema.ts
- responseSchema.ts
- logic.ts
- preOperation.ts
- postOperation.ts
- validation.ts
- businessValidation.ts
- sql.ts

## Database standards

- Use Sequelize and sqlite for local development.
- Use db:sync and db:seed for setup.
- Prefer environment variables for production databases.

## Frontend standards

- Use React functional components.
- Prefer CSS frameworks or CSS variables over custom CSS.
- Provide both light and dark themes.
- Use SVG or JPG assets where possible.

## Git workflow and branching

Branch rules

- main
- qa
- develop
- feature/\*
- fix/\*
- hotfix/\*
- release/DD-MM-YYYY

## Pre-commit and PR gates

Pre-commit checks

- lint:fix
- format:fix
- test:coverage
- changeset required

PR checks

- lint
- format
- test:coverage

## CI design

Pipeline stages

- install
- lint
- format
- test:coverage

## Release runbook

1. Confirm changesets are present and staged.
2. Run `npm run lint`, `npm run format`, and `npm run test:coverage`.
3. Verify CI green on main/qa/develop.
4. Run `npm pack` to inspect package contents.
5. Publish to npm with public access.

## Deployment runbook

Frontend

1. Run `npm install`.
2. Run `npm run build`.
3. Verify build output exists.
4. Upload artifacts to static hosting.
5. Validate env mapping in `config/`.

Backend

1. Run `npm install`.
2. Run `npm run build` or `npm run start`.
3. Verify build output exists.
4. Provision runtime env variables.
5. Deploy service to target environment.

## Maintenance and upgrades

1. Update dependencies on a schedule.
2. Run `npm run test:coverage` after updates.
3. Revalidate config structures.
4. Review changelog and deprecations quarterly.

## Troubleshooting

1. Missing changeset blocks commit; run `npx changeset`.
2. Missing tests for new file blocks pre-commit; add test in `tests/src`.
3. CI fails due to lint warnings; run `npm run lint:fix`.
4. npm pack includes unexpected files; review `package.json` files whitelist.

## Agent roles and deliverables

Design agent

1. Plan documents
2. Architecture diagram
3. Risk analysis

Implementation agent

1. Code changes
2. Template updates
3. Automation scripts

Test agent

1. Test cases
2. Mock data
3. Coverage reports

## Templates and file conventions

1. No types declared in code files; use `src/common` only.
2. No mutation of input objects.
3. Import lodash only via `src/utils/lodashUtils`.

## File inventory (summary)

Scaffolder

1. `bin/cli.js`
2. `docs/PROJECT-DOCS.md`
3. `package.json`
4. `scripts/precommit/*`
5. `tests/cli.test.js`

Frontend template

1. `templates/garry-frontend-template/*`
2. `templates/garry-frontend-template/docs/PROJECT-DOCS.md`
3. `templates/garry-frontend-template/src/*`
4. `templates/garry-frontend-template/tests/*`

Backend template

1. `templates/garry-backend-template/*`
2. `templates/garry-backend-template/docs/PROJECT-DOCS.md`
3. `templates/garry-backend-template/src/*`
4. `templates/garry-backend-template/tests/*`
