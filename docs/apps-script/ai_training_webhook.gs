const CONFIG_KEYS = {
  sheetName: "AI_TRAINING_SHEET_NAME",
  spreadsheetId: "AI_TRAINING_SPREADSHEET_ID",
  notifyEmail: "AI_TRAINING_NOTIFY_EMAIL",
  backupNotifyEmail: "AI_TRAINING_BACKUP_NOTIFY_EMAIL",
  dedupeWindowMinutes: "AI_TRAINING_DEDUPE_WINDOW_MINUTES",
};

const DEFAULT_CONFIG = {
  sheetName: "AI Training Leads",
  spreadsheetId: "",
  notifyEmail: "jantahrconsult@gmail.com",
  backupNotifyEmail: "",
  dedupeWindowMinutes: 10,
};

const REQUIRED_HEADERS = [
  "receivedAt",
  "submittedAt",
  "fullName",
  "email",
  "phone",
  "organization",
  "trainingUnit",
  "message",
  "sourcePage",
  "leadType",
  "metadata",
  "notificationStatus",
  "notificationError",
];

const DUPLICATE_LOOKBACK_ROWS = 200;

function doPost(e) {
  try {
    const payload = parsePayload_(e);

    // Bot trap: ignore hidden field submissions.
    if (payload.honeypot) {
      return jsonResponse_({ ok: true, skipped: "honeypot" });
    }

    const config = getConfig_();
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    let sheet = null;
    let appendedRow = null;
    let duplicate = false;

    try {
      sheet = getOrCreateSheet_(config.sheetName, config.spreadsheetId);
      ensureHeaderRow_(sheet);

      duplicate = isDuplicateSubmission_(sheet, payload, config.dedupeWindowMinutes);
      if (!duplicate) {
        appendedRow = appendLeadRow_(sheet, payload);
      }
    } finally {
      lock.releaseLock();
    }

    if (duplicate) {
      return jsonResponse_({ ok: true, duplicate: true, leadSaved: false });
    }

    const notificationResult = sendLeadNotification_(payload, config);
    if (sheet && appendedRow) {
      updateNotificationStatus_(sheet, appendedRow, notificationResult);
    }

    return jsonResponse_({
      ok: true,
      duplicate: false,
      leadSaved: true,
      notificationOk: notificationResult.ok,
      warning: notificationResult.ok ? notificationResult.error || null : notificationResult.error,
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

function parsePayload_(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : "";

  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (_error) {
      // Continue to parameter fallback.
    }
  }

  const parameters = (e && e.parameter) || {};
  return {
    leadType: parameters.leadType || "ai_training",
    fullName: parameters.fullName || "",
    email: parameters.email || "",
    phone: parameters.phone || "",
    organization: parameters.organization || "",
    trainingUnit: parameters.trainingUnit || "",
    message: parameters.message || "",
    sourcePage: parameters.sourcePage || "",
    submittedAt: parameters.submittedAt || "",
    honeypot: parameters.honeypot || "",
    metadata: parseMetadata_(parameters.metadata),
  };
}

function parseMetadata_(value) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (_error) {
    return { raw: String(value) };
  }
}

function getConfig_() {
  const properties = PropertiesService.getScriptProperties().getProperties();
  const parsedDedupeWindow = parseInt(
    properties[CONFIG_KEYS.dedupeWindowMinutes] || String(DEFAULT_CONFIG.dedupeWindowMinutes),
    10,
  );

  return {
    sheetName: (properties[CONFIG_KEYS.sheetName] || DEFAULT_CONFIG.sheetName).trim(),
    spreadsheetId: (properties[CONFIG_KEYS.spreadsheetId] || DEFAULT_CONFIG.spreadsheetId).trim(),
    notifyEmail: (properties[CONFIG_KEYS.notifyEmail] || DEFAULT_CONFIG.notifyEmail).trim(),
    backupNotifyEmail: (
      properties[CONFIG_KEYS.backupNotifyEmail] || DEFAULT_CONFIG.backupNotifyEmail
    ).trim(),
    dedupeWindowMinutes:
      Number.isFinite(parsedDedupeWindow) && parsedDedupeWindow >= 0
        ? parsedDedupeWindow
        : DEFAULT_CONFIG.dedupeWindowMinutes,
  };
}

function getSpreadsheet_(spreadsheetId) {
  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (activeSpreadsheet) {
    return activeSpreadsheet;
  }

  throw new Error(
    "No active spreadsheet found. Set AI_TRAINING_SPREADSHEET_ID in Script Properties.",
  );
}

function getOrCreateSheet_(sheetName, spreadsheetId) {
  const spreadsheet = getSpreadsheet_(spreadsheetId);
  const existing = spreadsheet.getSheetByName(sheetName);
  if (existing) {
    return existing;
  }

  return spreadsheet.insertSheet(sheetName);
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(REQUIRED_HEADERS);
    return;
  }

  const currentHeaderCount = Math.max(sheet.getLastColumn(), 1);
  const currentHeaders = sheet.getRange(1, 1, 1, currentHeaderCount).getValues()[0];
  const missingHeaders = REQUIRED_HEADERS.filter(function (header) {
    return currentHeaders.indexOf(header) === -1;
  });

  if (missingHeaders.length > 0) {
    sheet
      .getRange(1, currentHeaderCount + 1, 1, missingHeaders.length)
      .setValues([missingHeaders]);
  }
}

function appendLeadRow_(sheet, payload) {
  const rowIndex = sheet.getLastRow() + 1;
  sheet.appendRow([
    new Date(),
    payload.submittedAt || "",
    payload.fullName || "",
    payload.email || "",
    payload.phone || "",
    payload.organization || "",
    payload.trainingUnit || "",
    payload.message || "",
    payload.sourcePage || "",
    payload.leadType || "",
    payload.metadata ? JSON.stringify(payload.metadata) : "",
    "pending",
    "",
  ]);

  return rowIndex;
}

function updateNotificationStatus_(sheet, rowIndex, notificationResult) {
  const status = notificationResult && notificationResult.status
    ? notificationResult.status
    : notificationResult && notificationResult.ok
      ? "sent"
      : "failed";
  const error = notificationResult && notificationResult.error ? notificationResult.error : "";

  sheet
    .getRange(rowIndex, 12, 1, 2)
    .setValues([[status, error]]);
}

function isDuplicateSubmission_(sheet, payload, dedupeWindowMinutes) {
  if (dedupeWindowMinutes <= 0) {
    return false;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return false;
  }

  const startRow = Math.max(2, lastRow - DUPLICATE_LOOKBACK_ROWS + 1);
  const rowCount = lastRow - startRow + 1;
  const columnCount = Math.max(sheet.getLastColumn(), REQUIRED_HEADERS.length);
  const rows = sheet.getRange(startRow, 1, rowCount, columnCount).getValues();

  const incomingKey = buildDedupeKey_(payload);
  const now = Date.now();
  const windowMs = dedupeWindowMinutes * 60 * 1000;

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const receivedAtMs = toTimestamp_(row[0]);
    if (!receivedAtMs || now - receivedAtMs > windowMs) {
      continue;
    }

    const rowPayload = {
      leadType: row[9],
      fullName: row[2],
      email: row[3],
      phone: row[4],
      trainingUnit: row[6],
      message: row[7],
      sourcePage: row[8],
    };

    if (buildDedupeKey_(rowPayload) === incomingKey) {
      return true;
    }
  }

  return false;
}

function buildDedupeKey_(payload) {
  return [
    normalizeKeyPart_(payload.leadType || "ai_training"),
    normalizeKeyPart_(payload.fullName),
    normalizeKeyPart_(payload.email),
    normalizeKeyPart_(payload.phone),
    normalizeKeyPart_(payload.trainingUnit),
    normalizeKeyPart_(payload.message),
    normalizeKeyPart_(payload.sourcePage),
  ].join("|");
}

function normalizeKeyPart_(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function toTimestamp_(value) {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value) {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return null;
}

function sendLeadNotification_(payload, config) {
  const recipients = [];
  if (config.notifyEmail) {
    recipients.push(config.notifyEmail);
  }
  if (config.backupNotifyEmail && config.backupNotifyEmail !== config.notifyEmail) {
    recipients.push(config.backupNotifyEmail);
  }

  if (recipients.length === 0) {
    return {
      ok: false,
      status: "failed",
      error: "Lead saved, but no notification recipients are configured.",
    };
  }

  const subject = `New AI Training Registration: ${payload.fullName || "Unknown Name"}`;
  const body = [
    "A new AI training registration was submitted.",
    "",
    `Name: ${payload.fullName || "-"}`,
    `Email: ${payload.email || "-"}`,
    `Phone: ${payload.phone || "-"}`,
    `Organization: ${payload.organization || "-"}`,
    `Training Unit: ${payload.trainingUnit || "-"}`,
    `Notes: ${payload.message || "-"}`,
    `Source Page: ${payload.sourcePage || "-"}`,
    `Submitted At: ${payload.submittedAt || "-"}`,
  ].join("\n");

  const failedRecipients = [];

  for (let i = 0; i < recipients.length; i += 1) {
    const recipient = recipients[i];

    try {
      GmailApp.sendEmail(recipient, subject, body, {
        name: "JantaHR Website",
        replyTo: payload.email || undefined,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failedRecipients.push(`${recipient}: ${message}`);
      console.error("Email notification failed for " + recipient + ": " + message);
    }
  }

  if (failedRecipients.length === 0) {
    return { ok: true, status: "sent", error: null };
  }

  if (failedRecipients.length < recipients.length) {
    return {
      ok: true,
      status: "partial",
      error: "Lead saved, but one or more backup notifications failed: " + failedRecipients.join("; "),
    };
  }

  return {
    ok: false,
    status: "failed",
    error: "Lead saved, but email notification failed: " + failedRecipients.join("; "),
  };
}

function sendTestLeadNotification_() {
  const config = getConfig_();
  const testPayload = {
    fullName: "AI Training Test Lead",
    email: "test@example.com",
    phone: "+256700000000",
    organization: "JantaHR",
    trainingUnit: "AI Awareness and Workplace Readiness",
    message: "Test notification from Apps Script",
    sourcePage: "/ai-training",
    submittedAt: new Date().toISOString(),
  };

  return sendLeadNotification_(testPayload, config);
}

function setupAiTrainingWebhookDefaults_() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const currentProperties = scriptProperties.getProperties();
  const defaults = {};

  defaults[CONFIG_KEYS.sheetName] = DEFAULT_CONFIG.sheetName;
  defaults[CONFIG_KEYS.spreadsheetId] = DEFAULT_CONFIG.spreadsheetId;
  defaults[CONFIG_KEYS.notifyEmail] = DEFAULT_CONFIG.notifyEmail;
  defaults[CONFIG_KEYS.backupNotifyEmail] = DEFAULT_CONFIG.backupNotifyEmail;
  defaults[CONFIG_KEYS.dedupeWindowMinutes] = String(DEFAULT_CONFIG.dedupeWindowMinutes);

  const updates = {};
  Object.keys(defaults).forEach(function (key) {
    if (!currentProperties[key]) {
      updates[key] = defaults[key];
    }
  });

  if (Object.keys(updates).length > 0) {
    scriptProperties.setProperties(updates, false);
  }

  return getAiTrainingWebhookConfig_();
}

function getAiTrainingWebhookConfig_() {
  const config = getConfig_();
  return {
    sheetName: config.sheetName,
    spreadsheetId: config.spreadsheetId || "(bound spreadsheet)",
    notifyEmail: config.notifyEmail || "(not set)",
    backupNotifyEmail: config.backupNotifyEmail || "(none)",
    dedupeWindowMinutes: config.dedupeWindowMinutes,
  };
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
