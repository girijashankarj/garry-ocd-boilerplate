# Requirements Overview

Introduction
This document captures the business and technical requirements for the scaffolder and templates.

## Contents
- Business goals
- Scope
- Constraints
- Acceptance criteria
- ASCII overview diagram
- References
- Last updated

## Business goals
- Reduce onboarding time for new projects.
- Enforce repeatable quality standards.
- Guarantee release discipline via changesets.

## Scope
- Frontend and backend templates (TypeScript only).
- Strict linting, formatting, and testing rules.
- Changesets required for every commit.

## Constraints
- TypeScript only (no JS templates).
- Tests mirror src (tests/src).
- No storybook.

## Acceptance criteria
- Generated project runs after npm install.
- Hooks and CI enforce lint/format/test/test:structure.
- Tests exist for every src file.

## ASCII overview diagram
```
[CLI] -> [Template Copy] -> [Apply Flags] -> [Confirm] -> [Create Project]
```

## References
- docs/garry-ocd-requirements.md
- docs/testing/strategy.md
- docs/workflows/ci.md

Last updated: 2025-01-04
