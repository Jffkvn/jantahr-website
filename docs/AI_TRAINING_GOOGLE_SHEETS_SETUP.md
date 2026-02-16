# AI Training -> Google Sheets + Email Setup

This setup sends AI training registrations from the website to:

1. A Google Sheet (owned by `jantahrconsult@gmail.com`)
2. An email notification (`jantahrconsult@gmail.com`)

The script is hardened for maintainability with:

1. Script-property based config (no hardcoded ops settings)
2. Duplicate submission protection window
3. Optional backup notification recipient
4. Notification status columns in the sheet

## 1) Create the Google Sheet

1. Log in to Google using `jantahrconsult@gmail.com`.
2. Create a new Google Sheet (name example: `JantaHR AI Training Leads`).
3. Open the sheet.

## 2) Add Apps Script

1. In the sheet, go to `Extensions` -> `Apps Script`.
2. Replace the default script with:
   - `/Users/jeffadhaya/Downloads/app 2/docs/apps-script/ai_training_webhook.gs`
3. Save the project.

## 3) Initialize script properties (one-time)

1. In Apps Script, run `setupAiTrainingWebhookDefaults_()` once.
2. Open `Project Settings` -> `Script properties`.
3. Confirm/update these keys:

| Key | Example value | Required | Notes |
|---|---|---|---|
| `AI_TRAINING_SHEET_NAME` | `AI Training Leads` | Yes | Destination tab name |
| `AI_TRAINING_SPREADSHEET_ID` | `1UPL5tn_s2sk7L92EDXa-2rM0MG7umEgc0cd1J0UGRJQ` | Optional | Use if script is standalone or sheet can change |
| `AI_TRAINING_NOTIFY_EMAIL` | `jantahrconsult@gmail.com` | Yes | Primary notification recipient |
| `AI_TRAINING_BACKUP_NOTIFY_EMAIL` | `ops@yourdomain.com` | Optional | Secondary recipient |
| `AI_TRAINING_DEDUPE_WINDOW_MINUTES` | `10` | Optional | Set `0` to disable dedupe |

Important: runtime values come from `Script properties` first. `DEFAULT_CONFIG` in code is only fallback when a property is missing.

## 4) Deploy as Web App

1. Click `Deploy` -> `New deployment`.
2. Choose type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Click `Deploy`.
6. Copy the generated Web App URL.

## 5) Configure the website endpoint

In the website project, set:

`/Users/jeffadhaya/Downloads/app 2/.env`

```env
VITE_AI_TRAINING_REGISTRATION_ENDPOINT=PASTE_WEB_APP_URL_HERE
```

Then restart local dev/build process.

## 6) Test end-to-end

1. Open `/ai-training` on the website.
2. Submit a test registration.
3. Confirm:
   - a new row appears in the `AI Training Leads` tab.
   - an email arrives at `jantahrconsult@gmail.com`.
   - row columns `notificationStatus` and `notificationError` are populated.

## 7) Operational checks

1. Run `sendTestLeadNotification_()` any time you want to verify email delivery without creating a lead row.
2. Run `getAiTrainingWebhookConfig_()` to quickly inspect current runtime config values.
3. If someone opens the `/exec` URL in a browser, `doGet` may show as failed in Executions. That does not affect form `doPost` submissions.

## Notes for maintainers

- Website submission contract is in:
  - `/Users/jeffadhaya/Downloads/app 2/src/services/aiTrainingRegistration.ts`
- The service auto-detects Google Apps Script URLs and uses a browser-safe request mode.
- If `VITE_AI_TRAINING_REGISTRATION_ENDPOINT` is missing, submissions are logged locally only.
