# Garry OCD Requirements

Introduction
This document is the master requirements specification for the scaffolder.

## Contents
- CLI behavior
- Template expectations
- Testing and quality
- Branch and CI rules
- References
- Last updated

## CLI behavior
- Prompt for project name, type, module system, and path.
- Display dependency + structure summary.
- Require confirmation before writing files.
- Optionally run npm install + npm test after scaffolding (prompted in interactive mode, auto with --yes).

## Template expectations
- TypeScript only.
- Strict linting and formatting.
- Tests mirror src with test:structure enforcement.
- Changesets required on every commit.
- config/theme.json, config/client.json, config/env.json required in all templates.

## Testing and quality
- Jest coverage minimum 70%.
- External APIs mocked in jest.setup.js.

## Branch and CI rules
- Branch name validation for all commits.
- CI checks: lint, format:check, test:structure, tests, build.

## References
- docs/requirements/overview.md
- docs/workflows/ci.md

Last updated: 2025-01-04
