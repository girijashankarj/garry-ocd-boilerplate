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
- Interactive and non-interactive CLI for project creation.
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
- Test coverage at least 70 percent.
- Tests must mirror src structure.
- Pre-commit must run lint, format, test structure, and changeset checks.
- Branch and commit naming rules enforced.
- Lint warnings are treated as errors.
- Any types allowed only in src/common (types, enums, interfaces, constants).

Operational requirements
- CI must run on PRs to main, qa, and develop.
- CI must mirror pre-commit behavior.
- Release must be traceable to changesets.
- Offline install smoke checks must pass in CI.

## CLI behavior
Inputs
- Project name
- Project type: frontend or backend
- Module system: CJS or ESM
- Target path

Interactive flow
- Prompt for project name
- Prompt for project type
- Prompt for module system
- Prompt for output path
- Show dependency and structure summary
- Ask for confirmation before writing files
- Ask whether to run npm install and tests

Non-interactive flow
- Requires --name and --type
- Use --yes to confirm and run npm install and tests
- Use --dry-run to skip install and tests

Flags
- --non-interactive
- --yes
- --dry-run
- --name <project-name>
- --type <frontend|backend>
- --module <CJS|ESM>
- --path <target-path>
- --css <tailwind|bulma>
- --redux
- --lottie
- --db <sequelize>
- --favicon <flaticon|fontawesome|none>
- --preset <frontend-full|backend-db>

## Template overview
Frontend template
- Vite + React + TypeScript
- Optional Tailwind or Bulma
- Redux Toolkit example
- Lottie example

Backend template
- Express + TypeScript
- AJV validation and structured handler pattern
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

Non-interactive flow (ASCII)
```
[Script] -> [CLI flags] -> [Summary] -> [Auto confirm] -> [Copy template] -> [Optional install/test]
```

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
- QA-004 Verify coverage is >= 70 percent.
- QA-005 Verify config files load correctly.
- QA-006 Verify theme toggle behavior.
- QA-007 Verify Lottie render path if enabled.
- QA-008 Verify API validation behavior for backend.
- QA-009 Verify swagger UI loads /docs for backend.
- QA-010 Verify db:sync and db:seed for backend.
- QA-011 Verify lint passes with zero warnings.
- QA-012 Verify prettier check passes.
- QA-013 Verify test:structure passes for all src files.
- QA-014 Verify coverage is >= 70 percent.
- QA-015 Verify config files load correctly.
- QA-016 Verify theme toggle behavior.
- QA-017 Verify Lottie render path if enabled.
- QA-018 Verify API validation behavior for backend.
- QA-019 Verify swagger UI loads /docs for backend.
- QA-020 Verify db:sync and db:seed for backend.
- QA-021 Verify lint passes with zero warnings.
- QA-022 Verify prettier check passes.
- QA-023 Verify test:structure passes for all src files.
- QA-024 Verify coverage is >= 70 percent.
- QA-025 Verify config files load correctly.
- QA-026 Verify theme toggle behavior.
- QA-027 Verify Lottie render path if enabled.
- QA-028 Verify API validation behavior for backend.
- QA-029 Verify swagger UI loads /docs for backend.
- QA-030 Verify db:sync and db:seed for backend.
- QA-031 Verify lint passes with zero warnings.
- QA-032 Verify prettier check passes.
- QA-033 Verify test:structure passes for all src files.
- QA-034 Verify coverage is >= 70 percent.
- QA-035 Verify config files load correctly.
- QA-036 Verify theme toggle behavior.
- QA-037 Verify Lottie render path if enabled.
- QA-038 Verify API validation behavior for backend.
- QA-039 Verify swagger UI loads /docs for backend.
- QA-040 Verify db:sync and db:seed for backend.
- QA-041 Verify lint passes with zero warnings.
- QA-042 Verify prettier check passes.
- QA-043 Verify test:structure passes for all src files.
- QA-044 Verify coverage is >= 70 percent.
- QA-045 Verify config files load correctly.
- QA-046 Verify theme toggle behavior.
- QA-047 Verify Lottie render path if enabled.
- QA-048 Verify API validation behavior for backend.
- QA-049 Verify swagger UI loads /docs for backend.
- QA-050 Verify db:sync and db:seed for backend.
- QA-051 Verify lint passes with zero warnings.
- QA-052 Verify prettier check passes.
- QA-053 Verify test:structure passes for all src files.
- QA-054 Verify coverage is >= 70 percent.
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
- feature/*
- fix/*
- hotfix/*
- release/DD-MM-YYYY

## Pre-commit and PR gates
Pre-commit checks
- lint-staged
- changeset required
- test:structure

PR checks
- lint
- format:check
- test:structure
- test
- build

## CI design
Pipeline stages
- install
- lint
- format
- test:structure
- test
- build

## Release runbook
- REL-01 Confirm all changesets are present and staged.
- REL-02 Run lint, format:check, test:structure, test, and build.
- REL-03 Generate release notes from changesets.
- REL-04 Verify CI green on main/qa/develop.
- REL-05 Run npm pack to inspect package contents.
- REL-06 Publish to npm with access public.
- REL-07 Confirm all changesets are present and staged.
- REL-08 Run lint, format:check, test:structure, test, and build.
- REL-09 Generate release notes from changesets.
- REL-10 Verify CI green on main/qa/develop.
- REL-11 Run npm pack to inspect package contents.
- REL-12 Publish to npm with access public.
- REL-13 Confirm all changesets are present and staged.
- REL-14 Run lint, format:check, test:structure, test, and build.
- REL-15 Generate release notes from changesets.
- REL-16 Verify CI green on main/qa/develop.
- REL-17 Run npm pack to inspect package contents.
- REL-18 Publish to npm with access public.
- REL-19 Confirm all changesets are present and staged.
- REL-20 Run lint, format:check, test:structure, test, and build.
- REL-21 Generate release notes from changesets.
- REL-22 Verify CI green on main/qa/develop.
- REL-23 Run npm pack to inspect package contents.
- REL-24 Publish to npm with access public.
- REL-25 Confirm all changesets are present and staged.
- REL-26 Run lint, format:check, test:structure, test, and build.
- REL-27 Generate release notes from changesets.
- REL-28 Verify CI green on main/qa/develop.
- REL-29 Run npm pack to inspect package contents.
- REL-30 Publish to npm with access public.

## Deployment runbook
Frontend
- DEP-FE-01 Install dependencies using npm install.
- DEP-FE-02 Run npm run build.
- DEP-FE-03 Verify dist output exists.
- DEP-FE-04 Upload build artifacts to static host.
- DEP-FE-05 Validate env mapping in config files.
- DEP-FE-06 Install dependencies using npm install.
- DEP-FE-07 Run npm run build.
- DEP-FE-08 Verify dist output exists.
- DEP-FE-09 Upload build artifacts to static host.
- DEP-FE-10 Validate env mapping in config files.
- DEP-FE-11 Install dependencies using npm install.
- DEP-FE-12 Run npm run build.
- DEP-FE-13 Verify dist output exists.
- DEP-FE-14 Upload build artifacts to static host.
- DEP-FE-15 Validate env mapping in config files.
- DEP-FE-16 Install dependencies using npm install.
- DEP-FE-17 Run npm run build.
- DEP-FE-18 Verify dist output exists.
- DEP-FE-19 Upload build artifacts to static host.
- DEP-FE-20 Validate env mapping in config files.
- DEP-FE-21 Install dependencies using npm install.
- DEP-FE-22 Run npm run build.
- DEP-FE-23 Verify dist output exists.
- DEP-FE-24 Upload build artifacts to static host.
- DEP-FE-25 Validate env mapping in config files.

Backend
- DEP-BE-01 Install dependencies using npm install.
- DEP-BE-02 Run npm run build.
- DEP-BE-03 Verify dist output exists.
- DEP-BE-04 Provision runtime environment variables.
- DEP-BE-05 Deploy service to target environment.
- DEP-BE-06 Install dependencies using npm install.
- DEP-BE-07 Run npm run build.
- DEP-BE-08 Verify dist output exists.
- DEP-BE-09 Provision runtime environment variables.
- DEP-BE-10 Deploy service to target environment.
- DEP-BE-11 Install dependencies using npm install.
- DEP-BE-12 Run npm run build.
- DEP-BE-13 Verify dist output exists.
- DEP-BE-14 Provision runtime environment variables.
- DEP-BE-15 Deploy service to target environment.
- DEP-BE-16 Install dependencies using npm install.
- DEP-BE-17 Run npm run build.
- DEP-BE-18 Verify dist output exists.
- DEP-BE-19 Provision runtime environment variables.
- DEP-BE-20 Deploy service to target environment.
- DEP-BE-21 Install dependencies using npm install.
- DEP-BE-22 Run npm run build.
- DEP-BE-23 Verify dist output exists.
- DEP-BE-24 Provision runtime environment variables.
- DEP-BE-25 Deploy service to target environment.

## Maintenance and upgrades
- Keep dependencies updated.
- Re-run test suite after updates.
- Revalidate config structures.
- Review changelog and deprecations quarterly.

## Troubleshooting
Common issues
- Missing changeset blocks commit.
- Missing tests for new file blocks pre-commit.
- CI fails due to lint warnings.
- npm pack includes unexpected files due to missing files whitelist.

## Agent roles and deliverables
Design agent
- Plan documents
- Architecture diagram
- Risk analysis

Implementation agent
- Code changes
- Template updates
- Automation scripts

Test agent
- Test cases
- Mock data
- Coverage reports

## Templates and file conventions
- No types declared in code files; use src/common only.
- No mutation of input objects.
- All shared utilities import lodash from lodashUtils.

## File inventory (scaffolder)
- CHANGELOG.md - Scaffolder changelog.
- README.md - Scaffolder overview readme.
- bin/cli.js - CLI entry or helper.
- docs/PROJECT-DOCS.md - Documentation file.
- docs/agents/index.md - Documentation file.
- docs/analysis/index.md - Documentation file.
- docs/api/standards.md - Documentation file.
- docs/architecture/data-flow.md - Documentation file.
- docs/architecture/decisions.md - Documentation file.
- docs/architecture/security.md - Documentation file.
- docs/deployment.md - Documentation file.
- docs/faq.md - Documentation file.
- docs/garry-ocd-requirements.md - Documentation file.
- docs/infrastructure/index.md - Documentation file.
- docs/logging.md - Documentation file.
- docs/maintenance.md - Documentation file.
- docs/plan/index.md - Documentation file.
- docs/requirements/changelog-template.md - Documentation file.
- docs/requirements/configuration.md - Documentation file.
- docs/requirements/index.md - Documentation file.
- docs/requirements/overview.md - Documentation file.
- docs/structure-tree.md - Documentation file.
- docs/testing/conventions.md - Documentation file.
- docs/testing/strategy.md - Documentation file.
- docs/tickets/index.md - Documentation file.
- docs/workflows/ci.md - Documentation file.
- docs/workflows/git-workflow.md - Documentation file.
- docs/workflows/release.md - Documentation file.
- package-lock.json - Repository file.
- package.json - Scaffolder package manifest.
- tests/cleanup.test.js - Scaffolder test.
- tests/cli-autoinstall.test.js - Scaffolder test.
- tests/cli-backend-structure.test.js - Scaffolder test.
- tests/cli-flags.test.js - Scaffolder test.
- tests/cli-frontend-structure.test.js - Scaffolder test.
- tests/cli-noninteractive.test.js - Scaffolder test.
- tests/cli-presets.test.js - Scaffolder test.
- tests/cli.test.js - Scaffolder test.

## File inventory (frontend template)
- templates/garry-frontend-template/README.HINTS.md - Frontend template file.
- templates/garry-frontend-template/README.md - Frontend template file.
- templates/garry-frontend-template/config/client.json - Frontend template file.
- templates/garry-frontend-template/config/env.json - Frontend template file.
- templates/garry-frontend-template/config/theme.json - Frontend template file.
- templates/garry-frontend-template/docs/PROJECT-DOCS.md - Frontend template file.
- templates/garry-frontend-template/index.html - Frontend template file.
- templates/garry-frontend-template/jest.config.cjs - Frontend template file.
- templates/garry-frontend-template/jest.setup.js - Frontend template file.
- templates/garry-frontend-template/package.json - Frontend template file.
- templates/garry-frontend-template/public/favicon-flaticon.svg - Frontend template file.
- templates/garry-frontend-template/public/favicon.svg - Frontend template file.
- templates/garry-frontend-template/scripts/inject-badge.js - Frontend template file.
- templates/garry-frontend-template/scripts/precommit/ensure-changeset.js - Frontend template file.
- templates/garry-frontend-template/scripts/precommit/validate-branch.js - Frontend template file.
- templates/garry-frontend-template/scripts/verify-tests.js - Frontend template file.
- templates/garry-frontend-template/src/App.tsx - Frontend template file.
- templates/garry-frontend-template/src/assets/animations/sample.json - Frontend template file.
- templates/garry-frontend-template/src/common/constants/index.ts - Frontend template file.
- templates/garry-frontend-template/src/common/enums/index.ts - Frontend template file.
- templates/garry-frontend-template/src/common/fileNames.ts - Frontend template file.
- templates/garry-frontend-template/src/common/index.ts - Frontend template file.
- templates/garry-frontend-template/src/common/interfaces/index.ts - Frontend template file.
- templates/garry-frontend-template/src/common/messages/debug.ts - Frontend template file.
- templates/garry-frontend-template/src/common/messages/error.ts - Frontend template file.
- templates/garry-frontend-template/src/common/messages/index.ts - Frontend template file.
- templates/garry-frontend-template/src/common/messages/info.ts - Frontend template file.
- templates/garry-frontend-template/src/common/messages/warn.ts - Frontend template file.
- templates/garry-frontend-template/src/common/operations.ts - Frontend template file.
- templates/garry-frontend-template/src/common/types/index.ts - Frontend template file.
- templates/garry-frontend-template/src/components/LottieExample.tsx - Frontend template file.
- templates/garry-frontend-template/src/main.tsx - Frontend template file.
- templates/garry-frontend-template/src/store/index.ts - Frontend template file.
- templates/garry-frontend-template/src/store/todoSlice.ts - Frontend template file.
- templates/garry-frontend-template/src/styles.css - Frontend template file.
- templates/garry-frontend-template/src/utils/index.ts - Frontend template file.
- templates/garry-frontend-template/src/utils/lodashUtils.ts - Frontend template file.
- templates/garry-frontend-template/src/utils/loggerUtils.ts - Frontend template file.
- templates/garry-frontend-template/tests/mock/index.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/App.test.tsx - Frontend template file.
- templates/garry-frontend-template/tests/src/common/constants/index.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/enums/index.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/fileNames.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/index.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/interfaces/index.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/messages/debug.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/messages/error.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/messages/index.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/messages/info.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/messages/warn.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/operations.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/common/types/index.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/components/LottieExample.test.tsx - Frontend template file.
- templates/garry-frontend-template/tests/src/main.test.tsx - Frontend template file.
- templates/garry-frontend-template/tests/src/store/index.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/store/todoSlice.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/utils/index.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/utils/lodashUtils.test.ts - Frontend template file.
- templates/garry-frontend-template/tests/src/utils/loggerUtils.test.ts - Frontend template file.
- templates/garry-frontend-template/tsconfig.json - Frontend template file.

## File inventory (backend template)
- templates/garry-backend-template/README.HINTS.md - Backend template file.
- templates/garry-backend-template/README.md - Backend template file.
- templates/garry-backend-template/config/client.json - Backend template file.
- templates/garry-backend-template/config/env.json - Backend template file.
- templates/garry-backend-template/config/theme.json - Backend template file.
- templates/garry-backend-template/docs/PROJECT-DOCS.md - Backend template file.
- templates/garry-backend-template/jest.config.cjs - Backend template file.
- templates/garry-backend-template/jest.setup.js - Backend template file.
- templates/garry-backend-template/package.json - Backend template file.
- templates/garry-backend-template/scripts/db/seed.ts - Backend template file.
- templates/garry-backend-template/scripts/db/sync.ts - Backend template file.
- templates/garry-backend-template/scripts/inject-badge.js - Backend template file.
- templates/garry-backend-template/scripts/precommit/ensure-changeset.js - Backend template file.
- templates/garry-backend-template/scripts/precommit/validate-branch.js - Backend template file.
- templates/garry-backend-template/scripts/verify-tests.js - Backend template file.
- templates/garry-backend-template/src/apis/index.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/businessValidation.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/handlers/getUser.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/handlers/index.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/index.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/logic.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/postOperation.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/preOperation.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/requestSchema.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/responseSchema.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/sql.ts - Backend template file.
- templates/garry-backend-template/src/apis/users/validation.ts - Backend template file.
- templates/garry-backend-template/src/apis/withWrap.ts - Backend template file.
- templates/garry-backend-template/src/common/constants/index.ts - Backend template file.
- templates/garry-backend-template/src/common/enums/index.ts - Backend template file.
- templates/garry-backend-template/src/common/fileNames.ts - Backend template file.
- templates/garry-backend-template/src/common/index.ts - Backend template file.
- templates/garry-backend-template/src/common/interfaces/index.ts - Backend template file.
- templates/garry-backend-template/src/common/messages/debug.ts - Backend template file.
- templates/garry-backend-template/src/common/messages/error.ts - Backend template file.
- templates/garry-backend-template/src/common/messages/index.ts - Backend template file.
- templates/garry-backend-template/src/common/messages/info.ts - Backend template file.
- templates/garry-backend-template/src/common/messages/warn.ts - Backend template file.
- templates/garry-backend-template/src/common/operations.ts - Backend template file.
- templates/garry-backend-template/src/common/types/index.ts - Backend template file.
- templates/garry-backend-template/src/db/index.ts - Backend template file.
- templates/garry-backend-template/src/index.ts - Backend template file.
- templates/garry-backend-template/src/models/user.ts - Backend template file.
- templates/garry-backend-template/src/openapi/openapi.yaml - Backend template file.
- templates/garry-backend-template/src/utils/index.ts - Backend template file.
- templates/garry-backend-template/src/utils/lodashUtils.ts - Backend template file.
- templates/garry-backend-template/src/utils/loggerUtils.ts - Backend template file.
- templates/garry-backend-template/tests/mock/index.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/businessValidation.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/handlers/getUser.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/handlers/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/logic.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/postOperation.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/preOperation.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/requestSchema.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/responseSchema.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/sql.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/users/validation.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/apis/withWrap.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/constants/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/enums/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/fileNames.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/interfaces/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/messages/debug.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/messages/error.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/messages/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/messages/info.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/messages/warn.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/operations.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/common/types/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/db/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/models/user.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/utils/index.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/utils/lodashUtils.test.ts - Backend template file.
- templates/garry-backend-template/tests/src/utils/loggerUtils.test.ts - Backend template file.
- templates/garry-backend-template/tsconfig.json - Backend template file.

## Test case matrix (expanded)
- FE-001 Bootstrap - verify expected behavior for scenario 1.
- FE-002 Theme - verify expected behavior for scenario 2.
- FE-003 Config - verify expected behavior for scenario 3.
- FE-004 Logging - verify expected behavior for scenario 4.
- FE-005 Lottie - verify expected behavior for scenario 5.
- FE-006 Routing - verify expected behavior for scenario 6.
- FE-007 Store - verify expected behavior for scenario 7.
- FE-008 Utils - verify expected behavior for scenario 8.
- FE-009 API client - verify expected behavior for scenario 9.
- FE-010 Build - verify expected behavior for scenario 10.
- FE-011 Bootstrap - verify expected behavior for scenario 11.
- FE-012 Theme - verify expected behavior for scenario 12.
- FE-013 Config - verify expected behavior for scenario 13.
- FE-014 Logging - verify expected behavior for scenario 14.
- FE-015 Lottie - verify expected behavior for scenario 15.
- FE-016 Routing - verify expected behavior for scenario 16.
- FE-017 Store - verify expected behavior for scenario 17.
- FE-018 Utils - verify expected behavior for scenario 18.
- FE-019 API client - verify expected behavior for scenario 19.
- FE-020 Build - verify expected behavior for scenario 20.
- FE-021 Bootstrap - verify expected behavior for scenario 21.
- FE-022 Theme - verify expected behavior for scenario 22.
- FE-023 Config - verify expected behavior for scenario 23.
- FE-024 Logging - verify expected behavior for scenario 24.
- FE-025 Lottie - verify expected behavior for scenario 25.
- FE-026 Routing - verify expected behavior for scenario 26.
- FE-027 Store - verify expected behavior for scenario 27.
- FE-028 Utils - verify expected behavior for scenario 28.
- FE-029 API client - verify expected behavior for scenario 29.
- FE-030 Build - verify expected behavior for scenario 30.
- FE-031 Bootstrap - verify expected behavior for scenario 31.
- FE-032 Theme - verify expected behavior for scenario 32.
- FE-033 Config - verify expected behavior for scenario 33.
- FE-034 Logging - verify expected behavior for scenario 34.
- FE-035 Lottie - verify expected behavior for scenario 35.
- FE-036 Routing - verify expected behavior for scenario 36.
- FE-037 Store - verify expected behavior for scenario 37.
- FE-038 Utils - verify expected behavior for scenario 38.
- FE-039 API client - verify expected behavior for scenario 39.
- FE-040 Build - verify expected behavior for scenario 40.
- FE-041 Bootstrap - verify expected behavior for scenario 41.
- FE-042 Theme - verify expected behavior for scenario 42.
- FE-043 Config - verify expected behavior for scenario 43.
- FE-044 Logging - verify expected behavior for scenario 44.
- FE-045 Lottie - verify expected behavior for scenario 45.
- FE-046 Routing - verify expected behavior for scenario 46.
- FE-047 Store - verify expected behavior for scenario 47.
- FE-048 Utils - verify expected behavior for scenario 48.
- FE-049 API client - verify expected behavior for scenario 49.
- FE-050 Build - verify expected behavior for scenario 50.
- FE-051 Bootstrap - verify expected behavior for scenario 51.
- FE-052 Theme - verify expected behavior for scenario 52.
- FE-053 Config - verify expected behavior for scenario 53.
- FE-054 Logging - verify expected behavior for scenario 54.
- FE-055 Lottie - verify expected behavior for scenario 55.
- FE-056 Routing - verify expected behavior for scenario 56.
- FE-057 Store - verify expected behavior for scenario 57.
- FE-058 Utils - verify expected behavior for scenario 58.
- FE-059 API client - verify expected behavior for scenario 59.
- FE-060 Build - verify expected behavior for scenario 60.
- FE-061 Bootstrap - verify expected behavior for scenario 61.
- FE-062 Theme - verify expected behavior for scenario 62.
- FE-063 Config - verify expected behavior for scenario 63.
- FE-064 Logging - verify expected behavior for scenario 64.
- FE-065 Lottie - verify expected behavior for scenario 65.
- FE-066 Routing - verify expected behavior for scenario 66.
- FE-067 Store - verify expected behavior for scenario 67.
- FE-068 Utils - verify expected behavior for scenario 68.
- FE-069 API client - verify expected behavior for scenario 69.
- FE-070 Build - verify expected behavior for scenario 70.
- FE-071 Bootstrap - verify expected behavior for scenario 71.
- FE-072 Theme - verify expected behavior for scenario 72.
- FE-073 Config - verify expected behavior for scenario 73.
- FE-074 Logging - verify expected behavior for scenario 74.
- FE-075 Lottie - verify expected behavior for scenario 75.
- FE-076 Routing - verify expected behavior for scenario 76.
- FE-077 Store - verify expected behavior for scenario 77.
- FE-078 Utils - verify expected behavior for scenario 78.
- FE-079 API client - verify expected behavior for scenario 79.
- FE-080 Build - verify expected behavior for scenario 80.
- FE-081 Bootstrap - verify expected behavior for scenario 81.
- FE-082 Theme - verify expected behavior for scenario 82.
- FE-083 Config - verify expected behavior for scenario 83.
- FE-084 Logging - verify expected behavior for scenario 84.
- FE-085 Lottie - verify expected behavior for scenario 85.
- FE-086 Routing - verify expected behavior for scenario 86.
- FE-087 Store - verify expected behavior for scenario 87.
- FE-088 Utils - verify expected behavior for scenario 88.
- FE-089 API client - verify expected behavior for scenario 89.
- FE-090 Build - verify expected behavior for scenario 90.
- FE-091 Bootstrap - verify expected behavior for scenario 91.
- FE-092 Theme - verify expected behavior for scenario 92.
- FE-093 Config - verify expected behavior for scenario 93.
- FE-094 Logging - verify expected behavior for scenario 94.
- FE-095 Lottie - verify expected behavior for scenario 95.
- FE-096 Routing - verify expected behavior for scenario 96.
- FE-097 Store - verify expected behavior for scenario 97.
- FE-098 Utils - verify expected behavior for scenario 98.
- FE-099 API client - verify expected behavior for scenario 99.
- FE-100 Build - verify expected behavior for scenario 100.
- FE-101 Bootstrap - verify expected behavior for scenario 101.
- FE-102 Theme - verify expected behavior for scenario 102.
- FE-103 Config - verify expected behavior for scenario 103.
- FE-104 Logging - verify expected behavior for scenario 104.
- FE-105 Lottie - verify expected behavior for scenario 105.
- FE-106 Routing - verify expected behavior for scenario 106.
- FE-107 Store - verify expected behavior for scenario 107.
- FE-108 Utils - verify expected behavior for scenario 108.
- FE-109 API client - verify expected behavior for scenario 109.
- FE-110 Build - verify expected behavior for scenario 110.
- FE-111 Bootstrap - verify expected behavior for scenario 111.
- FE-112 Theme - verify expected behavior for scenario 112.
- FE-113 Config - verify expected behavior for scenario 113.
- FE-114 Logging - verify expected behavior for scenario 114.
- FE-115 Lottie - verify expected behavior for scenario 115.
- FE-116 Routing - verify expected behavior for scenario 116.
- FE-117 Store - verify expected behavior for scenario 117.
- FE-118 Utils - verify expected behavior for scenario 118.
- FE-119 API client - verify expected behavior for scenario 119.
- FE-120 Build - verify expected behavior for scenario 120.
- FE-121 Bootstrap - verify expected behavior for scenario 121.
- FE-122 Theme - verify expected behavior for scenario 122.
- FE-123 Config - verify expected behavior for scenario 123.
- FE-124 Logging - verify expected behavior for scenario 124.
- FE-125 Lottie - verify expected behavior for scenario 125.
- FE-126 Routing - verify expected behavior for scenario 126.
- FE-127 Store - verify expected behavior for scenario 127.
- FE-128 Utils - verify expected behavior for scenario 128.
- FE-129 API client - verify expected behavior for scenario 129.
- FE-130 Build - verify expected behavior for scenario 130.
- FE-131 Bootstrap - verify expected behavior for scenario 131.
- FE-132 Theme - verify expected behavior for scenario 132.
- FE-133 Config - verify expected behavior for scenario 133.
- FE-134 Logging - verify expected behavior for scenario 134.
- FE-135 Lottie - verify expected behavior for scenario 135.
- FE-136 Routing - verify expected behavior for scenario 136.
- FE-137 Store - verify expected behavior for scenario 137.
- FE-138 Utils - verify expected behavior for scenario 138.
- FE-139 API client - verify expected behavior for scenario 139.
- FE-140 Build - verify expected behavior for scenario 140.
- FE-141 Bootstrap - verify expected behavior for scenario 141.
- FE-142 Theme - verify expected behavior for scenario 142.
- FE-143 Config - verify expected behavior for scenario 143.
- FE-144 Logging - verify expected behavior for scenario 144.
- FE-145 Lottie - verify expected behavior for scenario 145.
- FE-146 Routing - verify expected behavior for scenario 146.
- FE-147 Store - verify expected behavior for scenario 147.
- FE-148 Utils - verify expected behavior for scenario 148.
- FE-149 API client - verify expected behavior for scenario 149.
- FE-150 Build - verify expected behavior for scenario 150.
- FE-151 Bootstrap - verify expected behavior for scenario 151.
- FE-152 Theme - verify expected behavior for scenario 152.
- FE-153 Config - verify expected behavior for scenario 153.
- FE-154 Logging - verify expected behavior for scenario 154.
- FE-155 Lottie - verify expected behavior for scenario 155.
- FE-156 Routing - verify expected behavior for scenario 156.
- FE-157 Store - verify expected behavior for scenario 157.
- FE-158 Utils - verify expected behavior for scenario 158.
- FE-159 API client - verify expected behavior for scenario 159.
- FE-160 Build - verify expected behavior for scenario 160.
- FE-161 Bootstrap - verify expected behavior for scenario 161.
- FE-162 Theme - verify expected behavior for scenario 162.
- FE-163 Config - verify expected behavior for scenario 163.
- FE-164 Logging - verify expected behavior for scenario 164.
- FE-165 Lottie - verify expected behavior for scenario 165.
- FE-166 Routing - verify expected behavior for scenario 166.
- FE-167 Store - verify expected behavior for scenario 167.
- FE-168 Utils - verify expected behavior for scenario 168.
- FE-169 API client - verify expected behavior for scenario 169.
- FE-170 Build - verify expected behavior for scenario 170.
- FE-171 Bootstrap - verify expected behavior for scenario 171.
- FE-172 Theme - verify expected behavior for scenario 172.
- FE-173 Config - verify expected behavior for scenario 173.
- FE-174 Logging - verify expected behavior for scenario 174.
- FE-175 Lottie - verify expected behavior for scenario 175.
- FE-176 Routing - verify expected behavior for scenario 176.
- FE-177 Store - verify expected behavior for scenario 177.
- FE-178 Utils - verify expected behavior for scenario 178.
- FE-179 API client - verify expected behavior for scenario 179.
- FE-180 Build - verify expected behavior for scenario 180.
- FE-181 Bootstrap - verify expected behavior for scenario 181.
- FE-182 Theme - verify expected behavior for scenario 182.
- FE-183 Config - verify expected behavior for scenario 183.
- FE-184 Logging - verify expected behavior for scenario 184.
- FE-185 Lottie - verify expected behavior for scenario 185.
- FE-186 Routing - verify expected behavior for scenario 186.
- FE-187 Store - verify expected behavior for scenario 187.
- FE-188 Utils - verify expected behavior for scenario 188.
- FE-189 API client - verify expected behavior for scenario 189.
- FE-190 Build - verify expected behavior for scenario 190.
- FE-191 Bootstrap - verify expected behavior for scenario 191.
- FE-192 Theme - verify expected behavior for scenario 192.
- FE-193 Config - verify expected behavior for scenario 193.
- FE-194 Logging - verify expected behavior for scenario 194.
- FE-195 Lottie - verify expected behavior for scenario 195.
- FE-196 Routing - verify expected behavior for scenario 196.
- FE-197 Store - verify expected behavior for scenario 197.
- FE-198 Utils - verify expected behavior for scenario 198.
- FE-199 API client - verify expected behavior for scenario 199.
- FE-200 Build - verify expected behavior for scenario 200.

- BE-001 Schema validation - verify expected behavior for scenario 1.
- BE-002 Business validation - verify expected behavior for scenario 2.
- BE-003 withWrap - verify expected behavior for scenario 3.
- BE-004 DB sync - verify expected behavior for scenario 4.
- BE-005 DB seed - verify expected behavior for scenario 5.
- BE-006 Swagger UI - verify expected behavior for scenario 6.
- BE-007 Logging - verify expected behavior for scenario 7.
- BE-008 Config - verify expected behavior for scenario 8.
- BE-009 Error handling - verify expected behavior for scenario 9.
- BE-010 Build - verify expected behavior for scenario 10.
- BE-011 Schema validation - verify expected behavior for scenario 11.
- BE-012 Business validation - verify expected behavior for scenario 12.
- BE-013 withWrap - verify expected behavior for scenario 13.
- BE-014 DB sync - verify expected behavior for scenario 14.
- BE-015 DB seed - verify expected behavior for scenario 15.
- BE-016 Swagger UI - verify expected behavior for scenario 16.
- BE-017 Logging - verify expected behavior for scenario 17.
- BE-018 Config - verify expected behavior for scenario 18.
- BE-019 Error handling - verify expected behavior for scenario 19.
- BE-020 Build - verify expected behavior for scenario 20.
- BE-021 Schema validation - verify expected behavior for scenario 21.
- BE-022 Business validation - verify expected behavior for scenario 22.
- BE-023 withWrap - verify expected behavior for scenario 23.
- BE-024 DB sync - verify expected behavior for scenario 24.
- BE-025 DB seed - verify expected behavior for scenario 25.
- BE-026 Swagger UI - verify expected behavior for scenario 26.
- BE-027 Logging - verify expected behavior for scenario 27.
- BE-028 Config - verify expected behavior for scenario 28.
- BE-029 Error handling - verify expected behavior for scenario 29.
- BE-030 Build - verify expected behavior for scenario 30.
- BE-031 Schema validation - verify expected behavior for scenario 31.
- BE-032 Business validation - verify expected behavior for scenario 32.
- BE-033 withWrap - verify expected behavior for scenario 33.
- BE-034 DB sync - verify expected behavior for scenario 34.
- BE-035 DB seed - verify expected behavior for scenario 35.
- BE-036 Swagger UI - verify expected behavior for scenario 36.
- BE-037 Logging - verify expected behavior for scenario 37.
- BE-038 Config - verify expected behavior for scenario 38.
- BE-039 Error handling - verify expected behavior for scenario 39.
- BE-040 Build - verify expected behavior for scenario 40.
- BE-041 Schema validation - verify expected behavior for scenario 41.
- BE-042 Business validation - verify expected behavior for scenario 42.
- BE-043 withWrap - verify expected behavior for scenario 43.
- BE-044 DB sync - verify expected behavior for scenario 44.
- BE-045 DB seed - verify expected behavior for scenario 45.
- BE-046 Swagger UI - verify expected behavior for scenario 46.
- BE-047 Logging - verify expected behavior for scenario 47.
- BE-048 Config - verify expected behavior for scenario 48.
- BE-049 Error handling - verify expected behavior for scenario 49.
- BE-050 Build - verify expected behavior for scenario 50.
- BE-051 Schema validation - verify expected behavior for scenario 51.
- BE-052 Business validation - verify expected behavior for scenario 52.
- BE-053 withWrap - verify expected behavior for scenario 53.
- BE-054 DB sync - verify expected behavior for scenario 54.
- BE-055 DB seed - verify expected behavior for scenario 55.
- BE-056 Swagger UI - verify expected behavior for scenario 56.
- BE-057 Logging - verify expected behavior for scenario 57.
- BE-058 Config - verify expected behavior for scenario 58.
- BE-059 Error handling - verify expected behavior for scenario 59.
- BE-060 Build - verify expected behavior for scenario 60.
- BE-061 Schema validation - verify expected behavior for scenario 61.
- BE-062 Business validation - verify expected behavior for scenario 62.
- BE-063 withWrap - verify expected behavior for scenario 63.
- BE-064 DB sync - verify expected behavior for scenario 64.
- BE-065 DB seed - verify expected behavior for scenario 65.
- BE-066 Swagger UI - verify expected behavior for scenario 66.
- BE-067 Logging - verify expected behavior for scenario 67.
- BE-068 Config - verify expected behavior for scenario 68.
- BE-069 Error handling - verify expected behavior for scenario 69.
- BE-070 Build - verify expected behavior for scenario 70.
- BE-071 Schema validation - verify expected behavior for scenario 71.
- BE-072 Business validation - verify expected behavior for scenario 72.
- BE-073 withWrap - verify expected behavior for scenario 73.
- BE-074 DB sync - verify expected behavior for scenario 74.
- BE-075 DB seed - verify expected behavior for scenario 75.
- BE-076 Swagger UI - verify expected behavior for scenario 76.
- BE-077 Logging - verify expected behavior for scenario 77.
- BE-078 Config - verify expected behavior for scenario 78.
- BE-079 Error handling - verify expected behavior for scenario 79.
- BE-080 Build - verify expected behavior for scenario 80.
- BE-081 Schema validation - verify expected behavior for scenario 81.
- BE-082 Business validation - verify expected behavior for scenario 82.
- BE-083 withWrap - verify expected behavior for scenario 83.
- BE-084 DB sync - verify expected behavior for scenario 84.
- BE-085 DB seed - verify expected behavior for scenario 85.
- BE-086 Swagger UI - verify expected behavior for scenario 86.
- BE-087 Logging - verify expected behavior for scenario 87.
- BE-088 Config - verify expected behavior for scenario 88.
- BE-089 Error handling - verify expected behavior for scenario 89.
- BE-090 Build - verify expected behavior for scenario 90.
- BE-091 Schema validation - verify expected behavior for scenario 91.
- BE-092 Business validation - verify expected behavior for scenario 92.
- BE-093 withWrap - verify expected behavior for scenario 93.
- BE-094 DB sync - verify expected behavior for scenario 94.
- BE-095 DB seed - verify expected behavior for scenario 95.
- BE-096 Swagger UI - verify expected behavior for scenario 96.
- BE-097 Logging - verify expected behavior for scenario 97.
- BE-098 Config - verify expected behavior for scenario 98.
- BE-099 Error handling - verify expected behavior for scenario 99.
- BE-100 Build - verify expected behavior for scenario 100.
- BE-101 Schema validation - verify expected behavior for scenario 101.
- BE-102 Business validation - verify expected behavior for scenario 102.
- BE-103 withWrap - verify expected behavior for scenario 103.
- BE-104 DB sync - verify expected behavior for scenario 104.
- BE-105 DB seed - verify expected behavior for scenario 105.
- BE-106 Swagger UI - verify expected behavior for scenario 106.
- BE-107 Logging - verify expected behavior for scenario 107.
- BE-108 Config - verify expected behavior for scenario 108.
- BE-109 Error handling - verify expected behavior for scenario 109.
- BE-110 Build - verify expected behavior for scenario 110.
- BE-111 Schema validation - verify expected behavior for scenario 111.
- BE-112 Business validation - verify expected behavior for scenario 112.
- BE-113 withWrap - verify expected behavior for scenario 113.
- BE-114 DB sync - verify expected behavior for scenario 114.
- BE-115 DB seed - verify expected behavior for scenario 115.
- BE-116 Swagger UI - verify expected behavior for scenario 116.
- BE-117 Logging - verify expected behavior for scenario 117.
- BE-118 Config - verify expected behavior for scenario 118.
- BE-119 Error handling - verify expected behavior for scenario 119.
- BE-120 Build - verify expected behavior for scenario 120.
- BE-121 Schema validation - verify expected behavior for scenario 121.
- BE-122 Business validation - verify expected behavior for scenario 122.
- BE-123 withWrap - verify expected behavior for scenario 123.
- BE-124 DB sync - verify expected behavior for scenario 124.
- BE-125 DB seed - verify expected behavior for scenario 125.
- BE-126 Swagger UI - verify expected behavior for scenario 126.
- BE-127 Logging - verify expected behavior for scenario 127.
- BE-128 Config - verify expected behavior for scenario 128.
- BE-129 Error handling - verify expected behavior for scenario 129.
- BE-130 Build - verify expected behavior for scenario 130.
- BE-131 Schema validation - verify expected behavior for scenario 131.
- BE-132 Business validation - verify expected behavior for scenario 132.
- BE-133 withWrap - verify expected behavior for scenario 133.
- BE-134 DB sync - verify expected behavior for scenario 134.
- BE-135 DB seed - verify expected behavior for scenario 135.
- BE-136 Swagger UI - verify expected behavior for scenario 136.
- BE-137 Logging - verify expected behavior for scenario 137.
- BE-138 Config - verify expected behavior for scenario 138.
- BE-139 Error handling - verify expected behavior for scenario 139.
- BE-140 Build - verify expected behavior for scenario 140.
- BE-141 Schema validation - verify expected behavior for scenario 141.
- BE-142 Business validation - verify expected behavior for scenario 142.
- BE-143 withWrap - verify expected behavior for scenario 143.
- BE-144 DB sync - verify expected behavior for scenario 144.
- BE-145 DB seed - verify expected behavior for scenario 145.
- BE-146 Swagger UI - verify expected behavior for scenario 146.
- BE-147 Logging - verify expected behavior for scenario 147.
- BE-148 Config - verify expected behavior for scenario 148.
- BE-149 Error handling - verify expected behavior for scenario 149.
- BE-150 Build - verify expected behavior for scenario 150.
- BE-151 Schema validation - verify expected behavior for scenario 151.
- BE-152 Business validation - verify expected behavior for scenario 152.
- BE-153 withWrap - verify expected behavior for scenario 153.
- BE-154 DB sync - verify expected behavior for scenario 154.
- BE-155 DB seed - verify expected behavior for scenario 155.
- BE-156 Swagger UI - verify expected behavior for scenario 156.
- BE-157 Logging - verify expected behavior for scenario 157.
- BE-158 Config - verify expected behavior for scenario 158.
- BE-159 Error handling - verify expected behavior for scenario 159.
- BE-160 Build - verify expected behavior for scenario 160.
- BE-161 Schema validation - verify expected behavior for scenario 161.
- BE-162 Business validation - verify expected behavior for scenario 162.
- BE-163 withWrap - verify expected behavior for scenario 163.
- BE-164 DB sync - verify expected behavior for scenario 164.
- BE-165 DB seed - verify expected behavior for scenario 165.
- BE-166 Swagger UI - verify expected behavior for scenario 166.
- BE-167 Logging - verify expected behavior for scenario 167.
- BE-168 Config - verify expected behavior for scenario 168.
- BE-169 Error handling - verify expected behavior for scenario 169.
- BE-170 Build - verify expected behavior for scenario 170.
- BE-171 Schema validation - verify expected behavior for scenario 171.
- BE-172 Business validation - verify expected behavior for scenario 172.
- BE-173 withWrap - verify expected behavior for scenario 173.
- BE-174 DB sync - verify expected behavior for scenario 174.
- BE-175 DB seed - verify expected behavior for scenario 175.
- BE-176 Swagger UI - verify expected behavior for scenario 176.
- BE-177 Logging - verify expected behavior for scenario 177.
- BE-178 Config - verify expected behavior for scenario 178.
- BE-179 Error handling - verify expected behavior for scenario 179.
- BE-180 Build - verify expected behavior for scenario 180.
- BE-181 Schema validation - verify expected behavior for scenario 181.
- BE-182 Business validation - verify expected behavior for scenario 182.
- BE-183 withWrap - verify expected behavior for scenario 183.
- BE-184 DB sync - verify expected behavior for scenario 184.
- BE-185 DB seed - verify expected behavior for scenario 185.
- BE-186 Swagger UI - verify expected behavior for scenario 186.
- BE-187 Logging - verify expected behavior for scenario 187.
- BE-188 Config - verify expected behavior for scenario 188.
- BE-189 Error handling - verify expected behavior for scenario 189.
- BE-190 Build - verify expected behavior for scenario 190.
- BE-191 Schema validation - verify expected behavior for scenario 191.
- BE-192 Business validation - verify expected behavior for scenario 192.
- BE-193 withWrap - verify expected behavior for scenario 193.
- BE-194 DB sync - verify expected behavior for scenario 194.
- BE-195 DB seed - verify expected behavior for scenario 195.
- BE-196 Swagger UI - verify expected behavior for scenario 196.
- BE-197 Logging - verify expected behavior for scenario 197.
- BE-198 Config - verify expected behavior for scenario 198.
- BE-199 Error handling - verify expected behavior for scenario 199.
- BE-200 Build - verify expected behavior for scenario 200.

## Checklists by role
Manager checklist
- MG-001 Confirm scope and requirements are documented.
- MG-002 Confirm architecture aligns with constraints.
- MG-003 Confirm testing strategy is defined and enforced.
- MG-004 Confirm CI gates mirror pre-commit rules.
- MG-005 Confirm release runbook is followed.
- MG-006 Confirm documentation updated for changes.
- MG-007 Confirm config files have no secrets.
- MG-008 Confirm code uses src/common types and constants.
- MG-009 Confirm immutability rules are respected.
- MG-010 Confirm logging schema is used consistently.
- MG-011 Confirm scope and requirements are documented.
- MG-012 Confirm architecture aligns with constraints.
- MG-013 Confirm testing strategy is defined and enforced.
- MG-014 Confirm CI gates mirror pre-commit rules.
- MG-015 Confirm release runbook is followed.
- MG-016 Confirm documentation updated for changes.
- MG-017 Confirm config files have no secrets.
- MG-018 Confirm code uses src/common types and constants.
- MG-019 Confirm immutability rules are respected.
- MG-020 Confirm logging schema is used consistently.
- MG-021 Confirm scope and requirements are documented.
- MG-022 Confirm architecture aligns with constraints.
- MG-023 Confirm testing strategy is defined and enforced.
- MG-024 Confirm CI gates mirror pre-commit rules.
- MG-025 Confirm release runbook is followed.
- MG-026 Confirm documentation updated for changes.
- MG-027 Confirm config files have no secrets.
- MG-028 Confirm code uses src/common types and constants.
- MG-029 Confirm immutability rules are respected.
- MG-030 Confirm logging schema is used consistently.
- MG-031 Confirm scope and requirements are documented.
- MG-032 Confirm architecture aligns with constraints.
- MG-033 Confirm testing strategy is defined and enforced.
- MG-034 Confirm CI gates mirror pre-commit rules.
- MG-035 Confirm release runbook is followed.
- MG-036 Confirm documentation updated for changes.
- MG-037 Confirm config files have no secrets.
- MG-038 Confirm code uses src/common types and constants.
- MG-039 Confirm immutability rules are respected.
- MG-040 Confirm logging schema is used consistently.
- MG-041 Confirm scope and requirements are documented.
- MG-042 Confirm architecture aligns with constraints.
- MG-043 Confirm testing strategy is defined and enforced.
- MG-044 Confirm CI gates mirror pre-commit rules.
- MG-045 Confirm release runbook is followed.
- MG-046 Confirm documentation updated for changes.
- MG-047 Confirm config files have no secrets.
- MG-048 Confirm code uses src/common types and constants.
- MG-049 Confirm immutability rules are respected.
- MG-050 Confirm logging schema is used consistently.
- MG-051 Confirm scope and requirements are documented.
- MG-052 Confirm architecture aligns with constraints.
- MG-053 Confirm testing strategy is defined and enforced.
- MG-054 Confirm CI gates mirror pre-commit rules.
- MG-055 Confirm release runbook is followed.
- MG-056 Confirm documentation updated for changes.
- MG-057 Confirm config files have no secrets.
- MG-058 Confirm code uses src/common types and constants.
- MG-059 Confirm immutability rules are respected.
- MG-060 Confirm logging schema is used consistently.
- MG-061 Confirm scope and requirements are documented.
- MG-062 Confirm architecture aligns with constraints.
- MG-063 Confirm testing strategy is defined and enforced.
- MG-064 Confirm CI gates mirror pre-commit rules.
- MG-065 Confirm release runbook is followed.
- MG-066 Confirm documentation updated for changes.
- MG-067 Confirm config files have no secrets.
- MG-068 Confirm code uses src/common types and constants.
- MG-069 Confirm immutability rules are respected.
- MG-070 Confirm logging schema is used consistently.
- MG-071 Confirm scope and requirements are documented.
- MG-072 Confirm architecture aligns with constraints.
- MG-073 Confirm testing strategy is defined and enforced.
- MG-074 Confirm CI gates mirror pre-commit rules.
- MG-075 Confirm release runbook is followed.
- MG-076 Confirm documentation updated for changes.
- MG-077 Confirm config files have no secrets.
- MG-078 Confirm code uses src/common types and constants.
- MG-079 Confirm immutability rules are respected.
- MG-080 Confirm logging schema is used consistently.

Architect checklist
- AR-001 Confirm scope and requirements are documented.
- AR-002 Confirm architecture aligns with constraints.
- AR-003 Confirm testing strategy is defined and enforced.
- AR-004 Confirm CI gates mirror pre-commit rules.
- AR-005 Confirm release runbook is followed.
- AR-006 Confirm documentation updated for changes.
- AR-007 Confirm config files have no secrets.
- AR-008 Confirm code uses src/common types and constants.
- AR-009 Confirm immutability rules are respected.
- AR-010 Confirm logging schema is used consistently.
- AR-011 Confirm scope and requirements are documented.
- AR-012 Confirm architecture aligns with constraints.
- AR-013 Confirm testing strategy is defined and enforced.
- AR-014 Confirm CI gates mirror pre-commit rules.
- AR-015 Confirm release runbook is followed.
- AR-016 Confirm documentation updated for changes.
- AR-017 Confirm config files have no secrets.
- AR-018 Confirm code uses src/common types and constants.
- AR-019 Confirm immutability rules are respected.
- AR-020 Confirm logging schema is used consistently.
- AR-021 Confirm scope and requirements are documented.
- AR-022 Confirm architecture aligns with constraints.
- AR-023 Confirm testing strategy is defined and enforced.
- AR-024 Confirm CI gates mirror pre-commit rules.
- AR-025 Confirm release runbook is followed.
- AR-026 Confirm documentation updated for changes.
- AR-027 Confirm config files have no secrets.
- AR-028 Confirm code uses src/common types and constants.
- AR-029 Confirm immutability rules are respected.
- AR-030 Confirm logging schema is used consistently.
- AR-031 Confirm scope and requirements are documented.
- AR-032 Confirm architecture aligns with constraints.
- AR-033 Confirm testing strategy is defined and enforced.
- AR-034 Confirm CI gates mirror pre-commit rules.
- AR-035 Confirm release runbook is followed.
- AR-036 Confirm documentation updated for changes.
- AR-037 Confirm config files have no secrets.
- AR-038 Confirm code uses src/common types and constants.
- AR-039 Confirm immutability rules are respected.
- AR-040 Confirm logging schema is used consistently.
- AR-041 Confirm scope and requirements are documented.
- AR-042 Confirm architecture aligns with constraints.
- AR-043 Confirm testing strategy is defined and enforced.
- AR-044 Confirm CI gates mirror pre-commit rules.
- AR-045 Confirm release runbook is followed.
- AR-046 Confirm documentation updated for changes.
- AR-047 Confirm config files have no secrets.
- AR-048 Confirm code uses src/common types and constants.
- AR-049 Confirm immutability rules are respected.
- AR-050 Confirm logging schema is used consistently.
- AR-051 Confirm scope and requirements are documented.
- AR-052 Confirm architecture aligns with constraints.
- AR-053 Confirm testing strategy is defined and enforced.
- AR-054 Confirm CI gates mirror pre-commit rules.
- AR-055 Confirm release runbook is followed.
- AR-056 Confirm documentation updated for changes.
- AR-057 Confirm config files have no secrets.
- AR-058 Confirm code uses src/common types and constants.
- AR-059 Confirm immutability rules are respected.
- AR-060 Confirm logging schema is used consistently.
- AR-061 Confirm scope and requirements are documented.
- AR-062 Confirm architecture aligns with constraints.
- AR-063 Confirm testing strategy is defined and enforced.
- AR-064 Confirm CI gates mirror pre-commit rules.
- AR-065 Confirm release runbook is followed.
- AR-066 Confirm documentation updated for changes.
- AR-067 Confirm config files have no secrets.
- AR-068 Confirm code uses src/common types and constants.
- AR-069 Confirm immutability rules are respected.
- AR-070 Confirm logging schema is used consistently.
- AR-071 Confirm scope and requirements are documented.
- AR-072 Confirm architecture aligns with constraints.
- AR-073 Confirm testing strategy is defined and enforced.
- AR-074 Confirm CI gates mirror pre-commit rules.
- AR-075 Confirm release runbook is followed.
- AR-076 Confirm documentation updated for changes.
- AR-077 Confirm config files have no secrets.
- AR-078 Confirm code uses src/common types and constants.
- AR-079 Confirm immutability rules are respected.
- AR-080 Confirm logging schema is used consistently.

Business analyst checklist
- BA-001 Confirm scope and requirements are documented.
- BA-002 Confirm architecture aligns with constraints.
- BA-003 Confirm testing strategy is defined and enforced.
- BA-004 Confirm CI gates mirror pre-commit rules.
- BA-005 Confirm release runbook is followed.
- BA-006 Confirm documentation updated for changes.
- BA-007 Confirm config files have no secrets.
- BA-008 Confirm code uses src/common types and constants.
- BA-009 Confirm immutability rules are respected.
- BA-010 Confirm logging schema is used consistently.
- BA-011 Confirm scope and requirements are documented.
- BA-012 Confirm architecture aligns with constraints.
- BA-013 Confirm testing strategy is defined and enforced.
- BA-014 Confirm CI gates mirror pre-commit rules.
- BA-015 Confirm release runbook is followed.
- BA-016 Confirm documentation updated for changes.
- BA-017 Confirm config files have no secrets.
- BA-018 Confirm code uses src/common types and constants.
- BA-019 Confirm immutability rules are respected.
- BA-020 Confirm logging schema is used consistently.
- BA-021 Confirm scope and requirements are documented.
- BA-022 Confirm architecture aligns with constraints.
- BA-023 Confirm testing strategy is defined and enforced.
- BA-024 Confirm CI gates mirror pre-commit rules.
- BA-025 Confirm release runbook is followed.
- BA-026 Confirm documentation updated for changes.
- BA-027 Confirm config files have no secrets.
- BA-028 Confirm code uses src/common types and constants.
- BA-029 Confirm immutability rules are respected.
- BA-030 Confirm logging schema is used consistently.
- BA-031 Confirm scope and requirements are documented.
- BA-032 Confirm architecture aligns with constraints.
- BA-033 Confirm testing strategy is defined and enforced.
- BA-034 Confirm CI gates mirror pre-commit rules.
- BA-035 Confirm release runbook is followed.
- BA-036 Confirm documentation updated for changes.
- BA-037 Confirm config files have no secrets.
- BA-038 Confirm code uses src/common types and constants.
- BA-039 Confirm immutability rules are respected.
- BA-040 Confirm logging schema is used consistently.
- BA-041 Confirm scope and requirements are documented.
- BA-042 Confirm architecture aligns with constraints.
- BA-043 Confirm testing strategy is defined and enforced.
- BA-044 Confirm CI gates mirror pre-commit rules.
- BA-045 Confirm release runbook is followed.
- BA-046 Confirm documentation updated for changes.
- BA-047 Confirm config files have no secrets.
- BA-048 Confirm code uses src/common types and constants.
- BA-049 Confirm immutability rules are respected.
- BA-050 Confirm logging schema is used consistently.
- BA-051 Confirm scope and requirements are documented.
- BA-052 Confirm architecture aligns with constraints.
- BA-053 Confirm testing strategy is defined and enforced.
- BA-054 Confirm CI gates mirror pre-commit rules.
- BA-055 Confirm release runbook is followed.
- BA-056 Confirm documentation updated for changes.
- BA-057 Confirm config files have no secrets.
- BA-058 Confirm code uses src/common types and constants.
- BA-059 Confirm immutability rules are respected.
- BA-060 Confirm logging schema is used consistently.
- BA-061 Confirm scope and requirements are documented.
- BA-062 Confirm architecture aligns with constraints.
- BA-063 Confirm testing strategy is defined and enforced.
- BA-064 Confirm CI gates mirror pre-commit rules.
- BA-065 Confirm release runbook is followed.
- BA-066 Confirm documentation updated for changes.
- BA-067 Confirm config files have no secrets.
- BA-068 Confirm code uses src/common types and constants.
- BA-069 Confirm immutability rules are respected.
- BA-070 Confirm logging schema is used consistently.
- BA-071 Confirm scope and requirements are documented.
- BA-072 Confirm architecture aligns with constraints.
- BA-073 Confirm testing strategy is defined and enforced.
- BA-074 Confirm CI gates mirror pre-commit rules.
- BA-075 Confirm release runbook is followed.
- BA-076 Confirm documentation updated for changes.
- BA-077 Confirm config files have no secrets.
- BA-078 Confirm code uses src/common types and constants.
- BA-079 Confirm immutability rules are respected.
- BA-080 Confirm logging schema is used consistently.

Developer checklist
- DV-001 Confirm scope and requirements are documented.
- DV-002 Confirm architecture aligns with constraints.
- DV-003 Confirm testing strategy is defined and enforced.
- DV-004 Confirm CI gates mirror pre-commit rules.
- DV-005 Confirm release runbook is followed.
- DV-006 Confirm documentation updated for changes.
- DV-007 Confirm config files have no secrets.
- DV-008 Confirm code uses src/common types and constants.
- DV-009 Confirm immutability rules are respected.
- DV-010 Confirm logging schema is used consistently.
- DV-011 Confirm scope and requirements are documented.
- DV-012 Confirm architecture aligns with constraints.
- DV-013 Confirm testing strategy is defined and enforced.
- DV-014 Confirm CI gates mirror pre-commit rules.
- DV-015 Confirm release runbook is followed.
- DV-016 Confirm documentation updated for changes.
- DV-017 Confirm config files have no secrets.
- DV-018 Confirm code uses src/common types and constants.
- DV-019 Confirm immutability rules are respected.
- DV-020 Confirm logging schema is used consistently.
- DV-021 Confirm scope and requirements are documented.
- DV-022 Confirm architecture aligns with constraints.
- DV-023 Confirm testing strategy is defined and enforced.
- DV-024 Confirm CI gates mirror pre-commit rules.
- DV-025 Confirm release runbook is followed.
- DV-026 Confirm documentation updated for changes.
- DV-027 Confirm config files have no secrets.
- DV-028 Confirm code uses src/common types and constants.
- DV-029 Confirm immutability rules are respected.
- DV-030 Confirm logging schema is used consistently.
- DV-031 Confirm scope and requirements are documented.
- DV-032 Confirm architecture aligns with constraints.
- DV-033 Confirm testing strategy is defined and enforced.
- DV-034 Confirm CI gates mirror pre-commit rules.
- DV-035 Confirm release runbook is followed.
- DV-036 Confirm documentation updated for changes.
- DV-037 Confirm config files have no secrets.
- DV-038 Confirm code uses src/common types and constants.
- DV-039 Confirm immutability rules are respected.
- DV-040 Confirm logging schema is used consistently.
- DV-041 Confirm scope and requirements are documented.
- DV-042 Confirm architecture aligns with constraints.
- DV-043 Confirm testing strategy is defined and enforced.
- DV-044 Confirm CI gates mirror pre-commit rules.
- DV-045 Confirm release runbook is followed.
- DV-046 Confirm documentation updated for changes.
- DV-047 Confirm config files have no secrets.
- DV-048 Confirm code uses src/common types and constants.
- DV-049 Confirm immutability rules are respected.
- DV-050 Confirm logging schema is used consistently.
- DV-051 Confirm scope and requirements are documented.
- DV-052 Confirm architecture aligns with constraints.
- DV-053 Confirm testing strategy is defined and enforced.
- DV-054 Confirm CI gates mirror pre-commit rules.
- DV-055 Confirm release runbook is followed.
- DV-056 Confirm documentation updated for changes.
- DV-057 Confirm config files have no secrets.
- DV-058 Confirm code uses src/common types and constants.
- DV-059 Confirm immutability rules are respected.
- DV-060 Confirm logging schema is used consistently.
- DV-061 Confirm scope and requirements are documented.
- DV-062 Confirm architecture aligns with constraints.
- DV-063 Confirm testing strategy is defined and enforced.
- DV-064 Confirm CI gates mirror pre-commit rules.
- DV-065 Confirm release runbook is followed.
- DV-066 Confirm documentation updated for changes.
- DV-067 Confirm config files have no secrets.
- DV-068 Confirm code uses src/common types and constants.
- DV-069 Confirm immutability rules are respected.
- DV-070 Confirm logging schema is used consistently.
- DV-071 Confirm scope and requirements are documented.
- DV-072 Confirm architecture aligns with constraints.
- DV-073 Confirm testing strategy is defined and enforced.
- DV-074 Confirm CI gates mirror pre-commit rules.
- DV-075 Confirm release runbook is followed.
- DV-076 Confirm documentation updated for changes.
- DV-077 Confirm config files have no secrets.
- DV-078 Confirm code uses src/common types and constants.
- DV-079 Confirm immutability rules are respected.
- DV-080 Confirm logging schema is used consistently.

QA checklist (expanded)
- QA-001 Confirm scope and requirements are documented.
- QA-002 Confirm architecture aligns with constraints.
- QA-003 Confirm testing strategy is defined and enforced.
- QA-004 Confirm CI gates mirror pre-commit rules.
- QA-005 Confirm release runbook is followed.
- QA-006 Confirm documentation updated for changes.
- QA-007 Confirm config files have no secrets.
- QA-008 Confirm code uses src/common types and constants.
- QA-009 Confirm immutability rules are respected.
- QA-010 Confirm logging schema is used consistently.
- QA-011 Confirm scope and requirements are documented.
- QA-012 Confirm architecture aligns with constraints.
- QA-013 Confirm testing strategy is defined and enforced.
- QA-014 Confirm CI gates mirror pre-commit rules.
- QA-015 Confirm release runbook is followed.
- QA-016 Confirm documentation updated for changes.
- QA-017 Confirm config files have no secrets.
- QA-018 Confirm code uses src/common types and constants.
- QA-019 Confirm immutability rules are respected.
- QA-020 Confirm logging schema is used consistently.
- QA-021 Confirm scope and requirements are documented.
- QA-022 Confirm architecture aligns with constraints.
- QA-023 Confirm testing strategy is defined and enforced.
- QA-024 Confirm CI gates mirror pre-commit rules.
- QA-025 Confirm release runbook is followed.
- QA-026 Confirm documentation updated for changes.
- QA-027 Confirm config files have no secrets.
- QA-028 Confirm code uses src/common types and constants.
- QA-029 Confirm immutability rules are respected.
- QA-030 Confirm logging schema is used consistently.
- QA-031 Confirm scope and requirements are documented.
- QA-032 Confirm architecture aligns with constraints.
- QA-033 Confirm testing strategy is defined and enforced.
- QA-034 Confirm CI gates mirror pre-commit rules.
- QA-035 Confirm release runbook is followed.
- QA-036 Confirm documentation updated for changes.
- QA-037 Confirm config files have no secrets.
- QA-038 Confirm code uses src/common types and constants.
- QA-039 Confirm immutability rules are respected.
- QA-040 Confirm logging schema is used consistently.
- QA-041 Confirm scope and requirements are documented.
- QA-042 Confirm architecture aligns with constraints.
- QA-043 Confirm testing strategy is defined and enforced.
- QA-044 Confirm CI gates mirror pre-commit rules.
- QA-045 Confirm release runbook is followed.
- QA-046 Confirm documentation updated for changes.
- QA-047 Confirm config files have no secrets.
- QA-048 Confirm code uses src/common types and constants.
- QA-049 Confirm immutability rules are respected.
- QA-050 Confirm logging schema is used consistently.
- QA-051 Confirm scope and requirements are documented.
- QA-052 Confirm architecture aligns with constraints.
- QA-053 Confirm testing strategy is defined and enforced.
- QA-054 Confirm CI gates mirror pre-commit rules.
- QA-055 Confirm release runbook is followed.
- QA-056 Confirm documentation updated for changes.
- QA-057 Confirm config files have no secrets.
- QA-058 Confirm code uses src/common types and constants.
- QA-059 Confirm immutability rules are respected.
- QA-060 Confirm logging schema is used consistently.
- QA-061 Confirm scope and requirements are documented.
- QA-062 Confirm architecture aligns with constraints.
- QA-063 Confirm testing strategy is defined and enforced.
- QA-064 Confirm CI gates mirror pre-commit rules.
- QA-065 Confirm release runbook is followed.
- QA-066 Confirm documentation updated for changes.
- QA-067 Confirm config files have no secrets.
- QA-068 Confirm code uses src/common types and constants.
- QA-069 Confirm immutability rules are respected.
- QA-070 Confirm logging schema is used consistently.
- QA-071 Confirm scope and requirements are documented.
- QA-072 Confirm architecture aligns with constraints.
- QA-073 Confirm testing strategy is defined and enforced.
- QA-074 Confirm CI gates mirror pre-commit rules.
- QA-075 Confirm release runbook is followed.
- QA-076 Confirm documentation updated for changes.
- QA-077 Confirm config files have no secrets.
- QA-078 Confirm code uses src/common types and constants.
- QA-079 Confirm immutability rules are respected.
- QA-080 Confirm logging schema is used consistently.

DevOps checklist (expanded)
- DO-001 Confirm scope and requirements are documented.
- DO-002 Confirm architecture aligns with constraints.
- DO-003 Confirm testing strategy is defined and enforced.
- DO-004 Confirm CI gates mirror pre-commit rules.
- DO-005 Confirm release runbook is followed.
- DO-006 Confirm documentation updated for changes.
- DO-007 Confirm config files have no secrets.
- DO-008 Confirm code uses src/common types and constants.
- DO-009 Confirm immutability rules are respected.
- DO-010 Confirm logging schema is used consistently.
- DO-011 Confirm scope and requirements are documented.
- DO-012 Confirm architecture aligns with constraints.
- DO-013 Confirm testing strategy is defined and enforced.
- DO-014 Confirm CI gates mirror pre-commit rules.
- DO-015 Confirm release runbook is followed.
- DO-016 Confirm documentation updated for changes.
- DO-017 Confirm config files have no secrets.
- DO-018 Confirm code uses src/common types and constants.
- DO-019 Confirm immutability rules are respected.
- DO-020 Confirm logging schema is used consistently.
- DO-021 Confirm scope and requirements are documented.
- DO-022 Confirm architecture aligns with constraints.
- DO-023 Confirm testing strategy is defined and enforced.
- DO-024 Confirm CI gates mirror pre-commit rules.
- DO-025 Confirm release runbook is followed.
- DO-026 Confirm documentation updated for changes.
- DO-027 Confirm config files have no secrets.
- DO-028 Confirm code uses src/common types and constants.
- DO-029 Confirm immutability rules are respected.
- DO-030 Confirm logging schema is used consistently.
- DO-031 Confirm scope and requirements are documented.
- DO-032 Confirm architecture aligns with constraints.
- DO-033 Confirm testing strategy is defined and enforced.
- DO-034 Confirm CI gates mirror pre-commit rules.
- DO-035 Confirm release runbook is followed.
- DO-036 Confirm documentation updated for changes.
- DO-037 Confirm config files have no secrets.
- DO-038 Confirm code uses src/common types and constants.
- DO-039 Confirm immutability rules are respected.
- DO-040 Confirm logging schema is used consistently.
- DO-041 Confirm scope and requirements are documented.
- DO-042 Confirm architecture aligns with constraints.
- DO-043 Confirm testing strategy is defined and enforced.
- DO-044 Confirm CI gates mirror pre-commit rules.
- DO-045 Confirm release runbook is followed.
- DO-046 Confirm documentation updated for changes.
- DO-047 Confirm config files have no secrets.
- DO-048 Confirm code uses src/common types and constants.
- DO-049 Confirm immutability rules are respected.
- DO-050 Confirm logging schema is used consistently.
- DO-051 Confirm scope and requirements are documented.
- DO-052 Confirm architecture aligns with constraints.
- DO-053 Confirm testing strategy is defined and enforced.
- DO-054 Confirm CI gates mirror pre-commit rules.
- DO-055 Confirm release runbook is followed.
- DO-056 Confirm documentation updated for changes.
- DO-057 Confirm config files have no secrets.
- DO-058 Confirm code uses src/common types and constants.
- DO-059 Confirm immutability rules are respected.
- DO-060 Confirm logging schema is used consistently.
- DO-061 Confirm scope and requirements are documented.
- DO-062 Confirm architecture aligns with constraints.
- DO-063 Confirm testing strategy is defined and enforced.
- DO-064 Confirm CI gates mirror pre-commit rules.
- DO-065 Confirm release runbook is followed.
- DO-066 Confirm documentation updated for changes.
- DO-067 Confirm config files have no secrets.
- DO-068 Confirm code uses src/common types and constants.
- DO-069 Confirm immutability rules are respected.
- DO-070 Confirm logging schema is used consistently.
- DO-071 Confirm scope and requirements are documented.
- DO-072 Confirm architecture aligns with constraints.
- DO-073 Confirm testing strategy is defined and enforced.
- DO-074 Confirm CI gates mirror pre-commit rules.
- DO-075 Confirm release runbook is followed.
- DO-076 Confirm documentation updated for changes.
- DO-077 Confirm config files have no secrets.
- DO-078 Confirm code uses src/common types and constants.
- DO-079 Confirm immutability rules are respected.
- DO-080 Confirm logging schema is used consistently.

## Appendix A: Sample configs
theme.json
```
{ "mode": "dark", "colors": { "primary": "#0ea5e9", "background": "#0b0b0b" } }
```

client.json
```
{ "name": "Garry Client", "domain": "example.com" }
```

env.json
```
{ "API_BASE_URL": "VITE_API_BASE_URL" }
```

## Appendix B: Sample commands
- npm install
- npm run dev
- npm run build
- npm run test
- npm run test:structure
- npm run lint
- npm run format
- npm run changeset

## Appendix C: Decision log
- TypeScript only.
- Changesets required per commit.
- Strict lint rules with no warnings.

## References
- README.md
- templates/garry-frontend-template/docs/PROJECT-DOCS.md
- templates/garry-backend-template/docs/PROJECT-DOCS.md

Last updated: 2026-01-04
