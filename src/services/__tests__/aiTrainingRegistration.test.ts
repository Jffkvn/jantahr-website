import {
  submitAiTrainingRegistration,
  type AiTrainingRegistrationPayload,
} from '@/services/aiTrainingRegistration';

const basePayload: AiTrainingRegistrationPayload = {
  fullName: 'Jeff Adhaya',
  email: 'jeff@example.com',
  phone: '+256700000000',
  trainingUnit: 'AI Awareness and Workplace Readiness',
};

describe('submitAiTrainingRegistration', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('falls back to console logging when endpoint is not configured', async () => {
    vi.stubEnv('VITE_AI_TRAINING_REGISTRATION_ENDPOINT', '');
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await expect(submitAiTrainingRegistration(basePayload)).resolves.toBeUndefined();

    expect(logSpy).toHaveBeenCalledWith(
      'AI training registration (no endpoint configured):',
      expect.objectContaining({
        leadType: 'ai_training',
        trainingUnit: basePayload.trainingUnit,
      }),
    );
  });

  it('posts JSON payload to non-Google endpoints', async () => {
    vi.stubEnv('VITE_AI_TRAINING_REGISTRATION_ENDPOINT', 'https://api.example.com/leads');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await submitAiTrainingRegistration(basePayload);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/leads',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('uses simple request content type for Apps Script endpoints', async () => {
    vi.stubEnv(
      'VITE_AI_TRAINING_REGISTRATION_ENDPOINT',
      'https://script.google.com/macros/s/abc123/exec',
    );
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await submitAiTrainingRegistration(basePayload);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://script.google.com/macros/s/abc123/exec',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      }),
    );
  });

  it('throws for non-OK HTTP responses', async () => {
    vi.stubEnv('VITE_AI_TRAINING_REGISTRATION_ENDPOINT', 'https://api.example.com/leads');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: 'Server down' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(submitAiTrainingRegistration(basePayload)).rejects.toThrow('Server down');
  });

  it('throws when webhook returns explicit ok:false', async () => {
    vi.stubEnv('VITE_AI_TRAINING_REGISTRATION_ENDPOINT', 'https://api.example.com/leads');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: 'Validation failed' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(submitAiTrainingRegistration(basePayload)).rejects.toThrow('Validation failed');
  });
});
