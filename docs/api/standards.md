# API Standards

Introduction
This document defines the backend API structure and rules.

## Contents
- Directory structure
- Validation flow
- Error handling
- ASCII diagram
- References
- Last updated

## Directory structure
- handlers/
- requestSchema.ts
- responseSchema.ts
- logic.ts
- preOperation.ts
- postOperation.ts
- validation.ts
- businessValidation.ts
- sql.ts

## Validation flow
- AJV schemas compiled in validation.ts.
- Business validation in businessValidation.ts.

## Error handling
- Use withWrap for all handlers.
- Return consistent error shape: { error: <message_key> }.

## ASCII diagram
```
request -> schema -> business -> pre -> logic -> post -> response
```

## References
- docs/architecture/data-flow.md
- docs/logging.md

Last updated: 2025-01-04
