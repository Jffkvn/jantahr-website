import type { Job } from '@/types/jobs'
import { JOBS_ENDPOINT } from '@/lib/constants'

const EMPLOYMENT_LABELS: Record<string, string> = {
  full_time: 'Full time',
  'full-time': 'Full time',
  part_time: 'Part time',
  'part-time': 'Part time',
  contract: 'Contract',
  temporary: 'Temporary',
  internship: 'Internship',
}

function formatEmploymentType(raw: unknown): string {
  if (typeof raw !== 'string' || !raw.trim()) return 'Full time'
  const key = raw.trim().toLowerCase()
  return EMPLOYMENT_LABELS[key] ?? raw.replace(/_/g, ' ')
}

function parseDescriptionAndMeta(
  rawDesc: string | null,
  title: string,
  explicitCategory?: string,
  explicitCompany?: string,
  explicitResponsibilities?: string[],
): {
  category: string
  company: string
  description: string | null
  responsibilities: string[] | undefined
} {
  let text = (rawDesc ?? '').replace(/\r\n/g, '\n').trim()
  let parsedCategory = explicitCategory ?? ''
  let parsedCompany = explicitCompany ?? ''

  const catMatch = /^\[Category:\s*([^\]]+)\]\s*\n?/i.exec(text)
  if (catMatch) {
    parsedCategory = (catMatch[1] ?? '').trim()
    text = text.slice(catMatch[0].length).trim()
  }

  const clientMatch = /^\[Client:\s*([^\]]+)\]\s*\n?/i.exec(text)
  if (clientMatch) {
    parsedCompany = (clientMatch[1] ?? '').trim()
    text = text.slice(clientMatch[0].length).trim()
  }

  // Strip redundant leading "About the Role" heading if present
  text = text.replace(/^about\s+the\s+role\s*\n+/i, '').trim()

  let aboutRole = text
  let extractedResponsibilities: string[] | undefined = explicitResponsibilities

  const splitRegex =
    /\n+(?:###\s*What You['’]ll Do|What You['’]ll Do|###\s*Key Responsibilities|Key Responsibilities)\s*\n+/i
  const parts = text.split(splitRegex)
  if (parts.length >= 2) {
    aboutRole = (parts[0] ?? '').trim()
    const bullets = parts
      .slice(1)
      .join('\n')
      .split('\n')
      .map((line) => line.replace(/^[•\-*]\s*/, '').trim())
      .filter(Boolean)
    if (!extractedResponsibilities && bullets.length > 0) {
      extractedResponsibilities = bullets
    }
  }

  if (!parsedCategory) {
    const t = title.toLowerCase()
    if (/\b(hr|human resource|people|talent|recruit)\b/.test(t)) {
      parsedCategory = 'Human Resources'
    } else if (/\b(finance|account|audit|tax|payroll|cfo)\b/.test(t)) {
      parsedCategory = 'Finance & Accounting'
    } else if (/\b(engineer|developer|software|tech|it|data|devops)\b/.test(t)) {
      parsedCategory = 'Technology & Engineering'
    } else if (/\b(sales|business development|account manager|commercial|marketing)\b/.test(t)) {
      parsedCategory = 'Sales & Business Development'
    } else {
      parsedCategory = 'Human Resources'
    }
  }

  return {
    category: parsedCategory,
    company: parsedCompany || 'Confidential Client',
    description: aboutRole || null,
    responsibilities: extractedResponsibilities,
  }
}

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
    const employmentType = formatEmploymentType(raw.employmentType ?? raw.type)
    const summary = (raw.summary as string) ?? null
    const rawDescription = (raw.description as string) ?? null
    const requirements = (raw.requirements as string) ?? null
    const salaryMin = typeof raw.salaryMin === 'number' ? raw.salaryMin : null
    const salaryMax = typeof raw.salaryMax === 'number' ? raw.salaryMax : null
    const postedAt =
      (raw.postedAt as string) ?? (raw.posted as string) ?? null
    const closesAt = (raw.closesAt as string) ?? null
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

    const explicitResponsibilities = Array.isArray(raw.responsibilities)
      ? (raw.responsibilities as string[])
      : typeof raw.responsibilities === 'string'
      ? (raw.responsibilities as string)
          .split('\n')
          .map((s) => s.replace(/^[•\-\*]\s*/, '').trim())
          .filter(Boolean)
      : undefined

    const parsed = parseDescriptionAndMeta(
      rawDescription,
      title,
      typeof raw.category === 'string' ? raw.category : undefined,
      typeof raw.company === 'string' ? raw.company : undefined,
      explicitResponsibilities,
    )

    const benefits = Array.isArray(raw.benefits)
      ? (raw.benefits as string[])
      : typeof raw.benefits === 'string'
      ? (raw.benefits as string)
          .split('\n')
          .map((s) => s.replace(/^[•\-\*]\s*/, '').trim())
          .filter(Boolean)
      : undefined

    return {
      id,
      slug,
      title,
      location,
      employmentType,
      summary,
      description: parsed.description,
      requirements,
      responsibilities: parsed.responsibilities,
      benefits,
      salaryMin,
      salaryMax,
      screeningQuestions,
      postedAt,
      closesAt,
      company: parsed.company,
      category: parsed.category,
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
