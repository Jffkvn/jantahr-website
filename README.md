# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Updating Jobs
The Jobs page pulls from a simple data file:

- `src/data/jobs.ts`

To update listings:

1. Add or remove entries in the `jobs` array.
2. Run `npm run build`.
3. Upload the new `dist/` folder to your hosting.

If the `jobs` array is empty, the site shows the “No openings available” message with a CV submission CTA.

## AI Training Registration Endpoint

The AI Training page submits through:

- `src/services/aiTrainingRegistration.ts`

Configure the destination webhook/API using:

- `VITE_AI_TRAINING_REGISTRATION_ENDPOINT`

Google Sheets + email setup guide:

- `docs/AI_TRAINING_GOOGLE_SHEETS_SETUP.md`

Behavior:

1. If the endpoint is configured, the website sends a JSON payload to it.
2. If not configured, the submission is logged locally and treated as successful.

Expected payload contract (used for the internal public leads relay):

```json
{
  "leadType": "ai_training",
  "fullName": "Jane Doe",
  "email": "jane@company.com",
  "phone": "+256700000000",
  "organization": "Acme Uganda",
  "trainingUnit": "AI Awareness and Workplace Readiness",
  "message": "Optional notes from registrant",
  "sourcePage": "/ai-training",
  "submittedAt": "2026-02-11T12:00:00.000Z",
  "honeypot": ""
}
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
