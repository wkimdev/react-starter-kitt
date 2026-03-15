---
name: test setup and conventions
description: vitest setup, test file locations, npm scripts, and key configuration for the react-starter-kitt project
type: project
---

Test framework: vitest v3 with @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, jsdom.

Setup file: `src/test/setup.js` — imports `@testing-library/jest-dom`.

Vitest config: in `vite.config.js` under `test:` key. environment=jsdom, globals=true, alias `@` → `src/`.

Test file location: `src/__tests__/` directory, naming pattern `ComponentName.test.jsx`.

npm scripts added:
- `npm run test` → `vitest run`
- `npm run test:watch` → `vitest`
- `npm run test:coverage` → `vitest run --coverage`

**Why:** vitest recommended in CLAUDE.md; was not installed at project start.
**How to apply:** Always run `npm run test` to execute. New test files go in `src/__tests__/`.
