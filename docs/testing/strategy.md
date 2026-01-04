# Testing Strategy

Introduction
This document defines the testing policy and enforcement rules for all generated projects. It is intended for developers and QA to ensure consistent coverage and structure.

## Contents
- Policy
- Coverage targets
- Test types
- Mocking rules
- Enforcement points
- ASCII structure diagram
- References
- Last updated

## Policy
- Every src file must have a matching test.
- tests/src mirrors src exactly.
- test:structure is enforced in pre-commit and CI.
- Tests and mocks are linted and formatted.
- Tests and mocks are excluded from build outputs.

## Coverage targets
- 70% minimum for lines/branches/functions/statements.
- New features must include tests for all new logic paths.

## Test types
Unit tests
- utilities, logic, pure functions.

Component tests (frontend)
- React UI using React Testing Library.

Schema tests (backend)
- AJV validation for request/response schemas.

DB tests (backend)
- sqlite in-memory for models and sync scripts.

## Mocking rules
- External APIs and SDKs mocked in jest.setup.js.
- Shared fixtures and factories in tests/mock.
- No external network calls in unit tests.

## Enforcement points
- Pre-commit runs test:structure.
- CI runs test:structure + tests before merge.

## Test case matrix (sample)
| ID | Area | Scope | Steps | Expected result |
| --- | --- | --- | --- | --- |
| FE-001 | UI | App bootstrap | Run `npm run dev`, open app | App loads without console errors |
| FE-002 | Theme | Theme toggle | Toggle dark/light | Colors switch and persist per config |
| FE-003 | Config | Theme config | Remove required key, run build | Build fails with validation error |
| FE-004 | Tests | Structure | Run `npm run test:structure` | Fails if any src file lacks test |
| BE-001 | API | Request schema | Send invalid payload | 400 with validation error |
| BE-002 | API | Business validation | Violate domain rule | 400 with business validation error |
| BE-003 | DB | Sync | Run `npm run db:sync` | Tables created successfully |
| BE-004 | Logs | Logger schema | Trigger error path | Log includes level, message, context, file, function |

## ASCII structure diagram
```
src/feature/file.ts  --> tests/src/feature/file.test.ts
src/utils/x.ts       --> tests/src/utils/x.test.ts
```

## References
- docs/testing/conventions.md
- docs/workflows/ci.md

Last updated: 2025-01-04
