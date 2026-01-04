# Project Structure (ASCII)

Introduction
This document provides a static tree view of the scaffolder and generated templates.

## Contents
- Scaffolder repository
- Generated frontend project
- Generated backend project
- References
- Last updated

Scaffolder repository
```
garry-ocd-boilerplate/
├── bin/
│   └── cli.js
├── docs/
│   ├── agents/
│   ├── analysis/
│   ├── api/
│   ├── architecture/
│   ├── infrastructure/
│   ├── plan/
│   ├── requirements/
│   ├── testing/
│   ├── workflows/
│   ├── garry-ocd-requirements.md
│   └── structure-tree.md
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

Generated project (frontend)
```
my-app/
├── .github/workflows/pr-check.yml
├── config/
├── docs/
├── public/
├── scripts/
├── src/
├── tests/
├── .husky/
├── package.json
└── README.md
```

Generated project (backend)
```
my-api/
├── .github/workflows/pr-check.yml
├── config/
├── docs/
├── scripts/
├── src/
├── tests/
├── .husky/
├── package.json
└── README.md
```

## References
- docs/requirements/overview.md

Last updated: 2025-01-04
