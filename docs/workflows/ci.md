continue


# CI Workflow

Introduction
This document defines the CI checks required for every pull request and how templates are validated. It ensures local hook behavior matches PR enforcement.

## Contents
- Required checks
- Template validation
- Failure policy
- ASCII pipeline
- References
- Last updated

## Required checks
Baseline checks
- lint (no warnings)
- format:check
- test:structure
- tests (coverage >= 70%)
- build (frontend only)

Quality gates
- Any failing check blocks merge.
- Checks must be green before merging to develop/qa/main.

## Template validation
Generated template checks
- Generate project from template
- Install dependencies
- Run lint, tests, and build
- Backend: db:sync + db:seed

Purpose
- Ensure templates remain valid after changes.
- Prevent drift between template and generated output.

## Failure policy
- Any failure blocks merge.
- No bypass without manager approval.
- Re-run CI after fixes and attach results to PR.

## ASCII pipeline
```
[PR] -> [lint] -> [format] -> [test:structure] -> [tests] -> [build]
        |                                        |
        +-> template generation + verification   +-> release gate
```

## References
- docs/workflows/git-workflow.md
- docs/testing/strategy.md
- docs/workflows/release.md

Last updated: 2025-01-04
