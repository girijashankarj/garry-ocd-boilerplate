# Testing Conventions

Introduction
This document defines the naming and structural conventions for tests so that coverage is predictable and enforceable.

## Contents
- Naming rules
- Folder rules
- Test style
- Mocking conventions
- ASCII examples
- References
- Last updated

## Naming rules
- src/path/file.ts  -> tests/src/path/file.test.ts
- src/path/file.tsx -> tests/src/path/file.test.tsx

## Folder rules
- tests/src mirrors src exactly.
- tests/mock stores fixtures and factories.
- No tests under src/__tests__.

## Test style
- Arrange / Act / Assert structure.
- Deterministic tests only.
- Avoid snapshots unless required.

## Mocking conventions
- External APIs mocked in jest.setup.js.
- Use factory functions for complex fixtures.

## ASCII examples
```
src/apis/users/logic.ts
tests/src/apis/users/logic.test.ts
```

## References
- docs/testing/strategy.md

Last updated: 2025-01-04
