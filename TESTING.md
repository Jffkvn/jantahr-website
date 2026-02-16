# Testing Guide

This repository uses a layered test strategy:

- `Vitest + React Testing Library + MSW` for unit/component/integration tests
- `Playwright` for end-to-end browser tests (desktop + mobile, Chromium + Firefox + WebKit)
- `axe-core` inside Playwright for accessibility checks
- `Lighthouse CI` for performance/SEO quality gates

## 1) Install Dependencies

```bash
npm ci
```

## 2) Run Tests Locally

Run unit/component/integration tests:

```bash
npm run test:unit
```

Run E2E tests headless:

```bash
npm run test:e2e
```

Run E2E tests with Playwright UI:

```bash
npm run test:e2e:ui
```

Run Lighthouse CI assertions:

```bash
npm run test:lighthouse
```

Run lint and type checks:

```bash
npm run lint
npm run typecheck
```

## 3) Visual Snapshot Baselines

Visual snapshots are maintained for:

- Home page
- Services page
- Jobs page

Baselines are created on Chromium desktop/mobile projects.

To intentionally update snapshots:

```bash
npm run test:e2e -- --project=chromium-desktop --project=chromium-mobile --update-snapshots tests/e2e/visual.spec.ts
```

Review the updated files under:

- `tests/e2e/visual.spec.ts-snapshots/`

## 4) Run E2E Against Netlify Preview Deployments

By default, Playwright starts the local dev server.

To run against a remote preview URL (for example Netlify deploy preview), set `PLAYWRIGHT_BASE_URL`:

```bash
PLAYWRIGHT_BASE_URL=https://<your-preview-url> npm run test:e2e
```

When `PLAYWRIGHT_BASE_URL` is set, Playwright will not start a local web server.

## 5) CI Quality Gates

GitHub Actions (`.github/workflows/quality-gates.yml`) runs on pull requests:

1. install dependencies
2. lint
3. typecheck
4. unit/integration tests
5. Playwright E2E tests
6. Lighthouse CI assertions

Playwright reports and traces/videos are uploaded as artifacts when failures occur.

## Accessibility Note

The automated axe checks currently exclude the `color-contrast` rule in E2E tests to avoid blocking releases while legacy palette contrast is being improved.
All other serious/critical axe violations still fail the pipeline.
