export interface ScreeningQuestion {
  id: string
  question: string
  type: 'text' | 'number' | 'select' | 'boolean'
  required: boolean
  options?: string[]
}

export interface Job {
  id: string | number
  slug: string
  title: string
  location: string | null
  employmentType: string | null
  summary: string | null
  description: string | null
  requirements: string | null
  salaryMin: number | null
  salaryMax: number | null
  screeningQuestions?: ScreeningQuestion[]
  postedAt: string | null
  closesAt: string | null
  // Legacy / fallback compatibility fields from static jobs.json
  company?: string
  type?: string
  posted?: string
  category?: string
  applyUrl?: string
  responsibilities?: string[]
  benefits?: string[]
}
