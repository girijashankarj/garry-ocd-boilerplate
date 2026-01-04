# Data Flow

Introduction
This document defines standard backend and frontend flow patterns used across all projects.

## Contents
- Backend flow (request lifecycle)
- Frontend flow (UI lifecycle)
- Error flow
- ASCII diagrams
- References
- Last updated

## Backend flow (request lifecycle)
1. Route entry -> handler (wrapped with withWrap)
2. Schema validation (AJV)
3. Business validation
4. Pre-operation (normalize input)
5. Logic execution
6. Post-operation (normalize output)
7. Response sent
8. Log completion

Rules
- Validation must occur before logic.
- No mutation of input objects.
- All errors handled by withWrap.

## Frontend flow (UI lifecycle)
- component -> hooks -> utils -> API client
- Use src/common types for all payloads
- Avoid side-effects in components

## Error flow
- Validation errors -> 400
- Business validation errors -> 400/409
- Not found -> 404
- Unexpected errors -> 500

## ASCII diagrams
```
Router -> Handler -> AJV -> Business -> Pre -> Logic -> Post -> Response
```

```
Component -> Hook -> Utils -> API
```

## References
- docs/api/standards.md
- docs/logging.md

Last updated: 2025-01-04
