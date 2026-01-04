# Git Workflow

Introduction
This document defines the branch strategy, commit rules, and merge expectations used by all generated projects.

## Contents
- Branch strategy
- Commit format rules
- Changeset policy
- Merge and review flow
- ASCII diagram
- References
- Last updated

## Branch strategy
Permanent branches
- main: production release branch
- qa: QA validation branch
- develop: integration branch

Temporary branches
- feature/*: new features
- fix/*: bug fixes
- hotfix/*: urgent production fixes
- release/DD-MM-YYYY: release preparation

Branch naming enforcement
- Pre-commit hook validates branch names.
- Invalid branch names block commits.

## Commit format rules
Required format
- <ticket-number>: <message>

Examples
- TKT-123: add user endpoint
- HOTFIX-9: patch auth regression

## Changeset policy
- One changeset per commit.
- Changeset must match the scope of changes.
- No merge without a changeset file staged.

## Merge and review flow
1. feature/* -> PR -> develop
2. develop -> QA validation -> qa
3. qa -> approval -> main
4. release branch used only for final checks before main

Review expectations
- PR must include tests for new src files.
- Test:structure must pass.
- Lint and format must be green.

## ASCII diagram
```
feature/*  -> develop -> qa -> main
fix/*      -> develop -> qa -> main
hotfix/*   -> qa -> main
release/*  -> main
```

## References
- docs/workflows/release.md
- docs/workflows/ci.md

Last updated: 2025-01-04
