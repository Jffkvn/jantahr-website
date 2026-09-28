import { CANDIDATE_ENDPOINT } from '@/lib/constants'

export interface UploadUrlResult {
  ok: boolean
  path: string
  uploadUrl: string
  uploadExpiresInSeconds?: number
  error?: string
}

export interface ApplicationPayload {
  fullName: string
  email: string
  phone: string
  headline?: string
  availability?: string
  salaryExpectation?: number
  cvPath?: string
  vacancySlug: string
  notes?: string
  screeningAnswers?: Record<string, string | number | boolean>
  honeypot?: string
  submittedAt?: string
}

export interface SubmissionResult {
  ok: boolean
  error?: string
}

export function isCandidateEndpointConfigured(): boolean {
  return Boolean(CANDIDATE_ENDPOINT && CANDIDATE_ENDPOINT.length > 0)
}

/**
 * Step 1: Request a signed upload URL for the CV into the private candidates bucket.
 * Note: public-candidates maps the `email` field to the mimeType in action='get_upload_url'.
 */
export async function getUploadUrl(
  fullName: string,
  mimeType: string,
): Promise<UploadUrlResult> {
  if (!isCandidateEndpointConfigured()) {
    throw new Error('Candidate submission endpoint is not configured.')
  }

  const response = await fetch(CANDIDATE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'get_upload_url',
      fullName,
      email: mimeType, // public-candidates checks allowlist on payload.email
    }),
  })

  const data = (await response.json()) as UploadUrlResult
  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Failed to generate CV upload URL.')
  }

  return data
}

/**
 * Step 2: Upload file directly to Supabase storage signed upload URL.
 */
export async function uploadCvFile(uploadUrl: string, file: File): Promise<void> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  })

  if (!response.ok) {
    throw new Error('Failed to upload CV file. Please try again.')
  }
}

/**
 * Step 3: Register candidate profile and attach application to vacancy.
 */
export async function submitCandidateApplication(
  payload: ApplicationPayload,
): Promise<SubmissionResult> {
  if (!isCandidateEndpointConfigured()) {
    throw new Error('Candidate submission endpoint is not configured.')
  }

  const response = await fetch(CANDIDATE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: payload.submittedAt || new Date().toISOString(),
    }),
  })

  const data = (await response.json()) as SubmissionResult
  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Failed to submit application.')
  }

  return data
}
