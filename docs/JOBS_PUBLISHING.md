# Jobs Publishing Guide

This guide shows the fastest, lowest-risk way to publish jobs on the JantaHR website with minimal code changes.

## Where jobs are stored

Edit this file:

`public/data/jobs.json`

The Jobs page and Job detail page already read from this JSON file automatically.

## Quick publish flow

1. Open `public/data/jobs.json`.
2. Add or update job objects in the JSON array.
3. Validate JSON format.
4. Commit and push to `main`.
5. Netlify auto-deploys the update.

## Job object format

Required fields:

- `id` (number, unique)
- `slug` (string, unique, URL-safe)
- `title`
- `company`
- `location`
- `type`
- `posted`
- `category`
- `summary`
- `description`

Optional fields:

- `responsibilities` (string array)
- `requirements` (string array)
- `benefits` (string array)
- `applyUrl` (string URL; if omitted, Google Form prefill is used)

## Copy-paste template

```json
[
  {
    "id": 101,
    "slug": "customer-success-associate",
    "title": "Customer Success Associate",
    "company": "JantaHR Client",
    "location": "Kampala, Uganda",
    "type": "Full-time",
    "posted": "16 Feb 2026",
    "category": "Customer Success",
    "summary": "Support client onboarding and retention.",
    "description": "You will manage onboarding and customer follow-up.",
    "responsibilities": [
      "Manage onboarding calls",
      "Track customer issues"
    ],
    "requirements": [
      "2+ years customer support experience"
    ],
    "benefits": [
      "Health cover",
      "Professional development"
    ],
    "applyUrl": "https://example.com/apply/customer-success-associate"
  }
]
```

## Rules to avoid breaks

- Keep valid JSON at all times (no trailing commas, double quotes only).
- Make every `id` unique.
- Make every `slug` unique.
- Use lowercase-hyphen slug style, for example `hr-business-partner`.
- If you remove `applyUrl`, users still can apply through the default Google Form flow.

## Local validation before push

From project root:

```bash
jq empty public/data/jobs.json
```

If there is no output and no error, JSON is valid.

Optional checks:

```bash
npm run lint
npm run test:unit
```

## Publish commands

```bash
git add public/data/jobs.json
git commit -m "Add new job openings"
git push
```

## Rollback (if needed)

If a bad jobs edit goes live, revert quickly:

```bash
git log --oneline
git revert <bad_commit_sha>
git push
```

## Troubleshooting

If Jobs page shows "Unable to load jobs":

- Confirm `public/data/jobs.json` is valid JSON.
- Confirm Netlify build completed successfully.
- Confirm file exists in deployed output at `/data/jobs.json`.

If Job detail page says "Job Not Found":

- Confirm the job's `slug` matches the URL path exactly.
- Confirm there are no duplicate slugs in the JSON array.

## Current data source behavior

- Default source: `/data/jobs.json` (this file in `public`).
- Optional override: `VITE_JOBS_ENDPOINT` environment variable.
- Recommendation: keep using `/data/jobs.json` for now for the simplest workflow.
