import type { Job } from '@/types/jobs'
import { JOBS_ENDPOINT } from '@/lib/constants'

export function normalizeJobsPayload(payload: unknown): Job[] {
  let rawList: unknown[] = []

  if (Array.isArray(payload)) {
    rawList = payload
  } else if (
    payload &&
    typeof payload === 'object' &&
    Array.isArray((payload as { jobs?: unknown }).jobs)
  ) {
    rawList = (payload as { jobs: unknown[] }).jobs
  }

  return rawList.map((item, index) => {
    const raw = item as Record<string, unknown>
    const id = raw.id != null ? String(raw.id) : String(index + 1)
    const slug = String(raw.slug || `job-${id}`)
    const title = String(raw.title || 'Open Mandate')
    const location = (raw.location as string) ?? null
    const employmentType =
      (raw.employmentType as string) ?? (raw.type as string) ?? 'Full-time'
    const summary = (raw.summary as string) ?? null
    const description = (raw.description as string) ?? null
    const requirements = (raw.requirements as string) ?? null
    const salaryMin = typeof raw.salaryMin === 'number' ? raw.salaryMin : null
    const salaryMax = typeof raw.salaryMax === 'number' ? raw.salaryMax : null
    const postedAt =
      (raw.postedAt as string) ?? (raw.posted as string) ?? null
    const closesAt = (raw.closesAt as string) ?? null
    const company = (raw.company as string) ?? 'Corporate Client'
    const category = (raw.category as string) ?? 'General Management'
    const applyUrl = (raw.applyUrl as string) ?? undefined
    const rawQuestions = Array.isArray(raw.screeningQuestions)
      ? raw.screeningQuestions
      : Array.isArray(raw.screening_questions)
      ? raw.screening_questions
      : undefined

    const screeningQuestions = rawQuestions
      ? rawQuestions.map((q: any) => ({
          id: String(q.id || `q_${Math.random()}`),
          question: String(q.question || ''),
          type: (q.type as 'text' | 'number' | 'select' | 'boolean') || 'text',
          required: Boolean(q.required),
          options: Array.isArray(q.options) ? q.options.map(String) : undefined,
        }))
      : undefined

    const responsibilities = Array.isArray(raw.responsibilities)
      ? (raw.responsibilities as string[])
      : typeof raw.responsibilities === 'string'
      ? (raw.responsibilities as string).split('\n').map((s) => s.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean)
      : undefined

    const benefits = Array.isArray(raw.benefits)
      ? (raw.benefits as string[])
      : typeof raw.benefits === 'string'
      ? (raw.benefits as string).split('\n').map((s) => s.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean)
      : undefined

    return {
      id,
      slug,
      title,
      location,
      employmentType,
      summary,
      description,
      requirements,
      responsibilities,
      benefits,
      salaryMin,
      salaryMax,
      screeningQuestions,
      postedAt,
      closesAt,
      company,
      category,
      applyUrl,
      type: employmentType,
      posted: postedAt ?? undefined,
    }
  })
}

export async function fetchJobs(signal?: AbortSignal): Promise<Job[]> {
  try {
    const response = await fetch(JOBS_ENDPOINT, {
      method: 'GET',
      signal,
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to load jobs: ${response.status}`)
    }

    const payload = (await response.json()) as unknown
    const normalized = normalizeJobsPayload(payload)

    return normalized
  } catch (err) {
    if (signal?.aborted) throw err
    return []
  }
}

export async function fetchJobBySlug(slug: string, signal?: AbortSignal): Promise<Job | null> {
  const jobs = await fetchJobs(signal)
  return jobs.find((j) => j.slug === slug) ?? null
}
