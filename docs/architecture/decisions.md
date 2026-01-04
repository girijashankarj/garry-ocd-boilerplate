# Architecture Decisions

Introduction
This document records architecture decisions with context and trade-offs.

## Contents
- Decision list
- Decision rationale
- Consequences
- References
- Last updated

## Decision list
1. TypeScript-only templates
2. AJV validation
3. Changesets per commit
4. Immutable/pure function policy
5. Strict linting with warnings as errors

## Decision rationale
TS-only
- Context: mixed JS/TS caused inconsistent reviews.
- Decision: TS-only.
- Rationale: strictness, type safety, standardized tooling.

AJV validation
- Context: inconsistent validation libraries.
- Decision: AJV + JSON schema.
- Rationale: portability and schema standardization.

Changesets per commit
- Context: release notes missing.
- Decision: require changeset per commit.
- Rationale: auditability and release discipline.

Immutable/pure functions
- Context: mutation introduced regression bugs.
- Decision: enforce immutability.
- Rationale: predictable behavior and easier testing.

Strict linting
- Context: warnings were ignored.
- Decision: treat warnings as errors.
- Rationale: fail fast and improve code quality.

## Consequences
- Higher discipline overhead.
- Clearer architecture, fewer regressions.

## Review cadence
- Review decisions quarterly.
- Update this doc if tooling or policy changes.

## References
- docs/requirements/overview.md
- docs/architecture/data-flow.md

Last updated: 2025-01-04
