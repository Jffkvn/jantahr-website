export type AiTrainingRegistrationPayload = {
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  trainingUnit: string;
  notes?: string;
  honeypot?: string;
  sourcePage?: string;
  metadata?: Record<string, unknown> | null;
  submittedAt?: string;
};

type PublicLeadSubmissionPayload = {
  leadType: 'ai_training';
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  trainingUnit: string;
  message?: string;
  honeypot?: string;
  sourcePage?: string;
  metadata?: Record<string, unknown> | null;
  submittedAt: string;
};

function isGoogleAppsScriptEndpoint(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname.endsWith('script.google.com') ||
      parsed.hostname.endsWith('script.googleusercontent.com')
    );
  } catch {
    return false;
  }
}

export async function submitAiTrainingRegistration(
  payload: AiTrainingRegistrationPayload,
): Promise<void> {
  const endpoint = import.meta.env.VITE_AI_TRAINING_REGISTRATION_ENDPOINT?.trim();
  const submissionPayload: PublicLeadSubmissionPayload = {
    leadType: 'ai_training',
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    organization: payload.organization,
    trainingUnit: payload.trainingUnit,
    message: payload.notes,
    honeypot: payload.honeypot,
    sourcePage: payload.sourcePage ?? '/ai-training',
    metadata: payload.metadata ?? null,
    submittedAt: payload.submittedAt ?? new Date().toISOString(),
  };

  if (!endpoint) {
    console.log('AI training registration (no endpoint configured):', submissionPayload);
    return;
  }

  if (isGoogleAppsScriptEndpoint(endpoint)) {
    let response: Response;

    try {
      // Keep this as a "simple request" to avoid preflight while still reading JSON response.
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(submissionPayload),
      });
    } catch {
      throw new Error('Network error while submitting AI training registration.');
    }

    if (!response.ok) {
      throw new Error(
        `AI training registration failed with status ${response.status}. Please verify Apps Script deployment access.`,
      );
    }

    const responseText = await response.text();
    if (!responseText) {
      return;
    }

    try {
      const data = JSON.parse(responseText) as { ok?: boolean; error?: string };
      if (data.ok === false) {
        throw new Error(data.error || 'AI training registration failed.');
      }
    } catch {
      // Non-JSON success responses are acceptable for webhooks.
    }

    return;
  }

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionPayload),
    });
  } catch {
    throw new Error('Network error while submitting AI training registration.');
  }

  if (!response.ok) {
    let errorMessage = `AI training registration failed with status ${response.status}.`;

    try {
      const data = (await response.json()) as { error?: string };
      if (data?.error) {
        errorMessage = data.error;
      }
    } catch {
      // Ignore non-JSON error bodies.
    }

    throw new Error(errorMessage);
  }

  const responseText = await response.text();
  if (!responseText) {
    return;
  }

  try {
    const data = JSON.parse(responseText) as { ok?: boolean; error?: string };
    if (data.ok === false) {
      throw new Error(data.error || 'AI training registration failed.');
    }
  } catch {
    // Non-JSON success responses are acceptable for webhooks.
  }
}
