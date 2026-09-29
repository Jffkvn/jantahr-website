import { useCallback, useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Briefcase,
  MapPin,
  Building2,
  Clock,
  ArrowLeft,
  ArrowDown,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Calendar,
  Banknote,
  ShieldCheck,
  Loader2,
  HelpCircle,
  Share2,
  Linkedin,
  FileCheck,
  PenTool,
} from 'lucide-react'
import type { Job, ScreeningQuestion } from '@/types/jobs'
import { fetchJobBySlug } from '@/services/jobsService'
import {
  getUploadUrl,
  uploadCvFile,
  submitCandidateApplication,
} from '@/services/applicationService'
import { formatUgandanPhone } from '@/lib/phone'

const ALLOWED_DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(9, 'Please enter a valid phone number.')
    .regex(/^(\+?256|0)?\d{9}$/, 'Please enter a valid phone number (e.g. 0772 123456 or +256...).'),
  location: z.string().min(2, 'Location (City, Country) is required.'),
  linkedinUrl: z.string().min(3, 'LinkedIn profile link is required.'),
  headline: z.string().optional(),
  availability: z.string().optional(),
  salaryExpectation: z.string().optional(),
  coverLetterText: z.string().optional(),
  honeypot: z.string().max(0, 'Spam detected').optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to data processing to submit your application.' }),
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Cover Letter Mode: 'write' (type text) or 'upload' (attach document)
  const [coverLetterMode, setCoverLetterMode] = useState<'write' | 'upload'>('write')
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
  const [coverLetterFileError, setCoverLetterFileError] = useState<string | null>(null)

  // Dynamic Screening Questions State: { [questionId]: answerValue }
  const [screeningAnswers, setScreeningAnswers] = useState<Record<string, string | number | boolean>>({})
  const [screeningErrors, setScreeningErrors] = useState<Record<string, string>>({})

  // Resume / CV submission states
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeFileError, setResumeFileError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const resumeInputRef = useRef<HTMLInputElement>(null)
  const coverLetterInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: 'Kampala, Uganda',
      linkedinUrl: '',
      headline: '',
      availability: '30_days',
      salaryExpectation: '',
      coverLetterText: '',
      honeypot: '',
      consent: true,
    },
  })

  const loadJob = useCallback(async (signal?: AbortSignal) => {
    if (!slug) {
      setJob(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setLoadError(null)

    try {
      const data = await fetchJobBySlug(slug, signal)
      if (signal?.aborted) return
      setJob(data)
      if (data) {
        document.title = `${data.title} | Careers at JantaHR`
      }
    } catch {
      if (signal?.aborted) return
      setJob(null)
      setLoadError('Unable to load this job opportunity. Please check your connection and try again.')
    } finally {
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }, [slug])

  useEffect(() => {
    const controller = new AbortController()
    void loadJob(controller.signal)
    return () => {
      controller.abort()
    }
  }, [loadJob])

  const scrollToApplyForm = () => {
    const el = document.getElementById('apply-form')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleCopyLink = () => {
    void navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUgandanPhone(e.target.value)
    setValue('phone', formatted, { shouldValidate: true })
  }

  const handleResumeChange = (file: File | null) => {
    setResumeFileError(null)
    if (!file) {
      setResumeFile(null)
      return
    }

    if (!ALLOWED_DOC_TYPES.includes(file.type)) {
      setResumeFileError('Please upload a PDF or Microsoft Word document (.pdf, .doc, .docx).')
      setResumeFile(null)
      return
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setResumeFileError('File size exceeds the 10 MB limit. Please compress your document and try again.')
      setResumeFile(null)
      return
    }

    setResumeFile(file)
  }

  const handleCoverLetterFileChange = (file: File | null) => {
    setCoverLetterFileError(null)
    if (!file) {
      setCoverLetterFile(null)
      return
    }

    if (!ALLOWED_DOC_TYPES.includes(file.type)) {
      setCoverLetterFileError('Please upload a PDF or Microsoft Word document (.pdf, .doc, .docx).')
      setCoverLetterFile(null)
      return
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setCoverLetterFileError('File size exceeds the 10 MB limit.')
      setCoverLetterFile(null)
      return
    }

    setCoverLetterFile(file)
  }

  const handleAnswerChange = (questionId: string, val: string | number | boolean) => {
    setScreeningAnswers((prev) => ({ ...prev, [questionId]: val }))
    if (screeningErrors[questionId]) {
      setScreeningErrors((prev) => {
        const next = { ...prev }
        delete next[questionId]
        return next
      })
    }
  }

  const validateScreeningQuestions = (): boolean => {
    if (!job?.screeningQuestions || job.screeningQuestions.length === 0) return true

    const errorsMap: Record<string, string> = {}
    for (const q of job.screeningQuestions) {
      if (q.required) {
        const val = screeningAnswers[q.id]
        if (val === undefined || val === null || String(val).trim() === '') {
          errorsMap[q.id] = 'This question is required.'
        }
      }
    }

    setScreeningErrors(errorsMap)
    return Object.keys(errorsMap).length === 0
  }

  const onSubmit = async (values: FormValues) => {
    if (!slug) return
    setSubmitError(null)

    if (values.honeypot) {
      setSubmitSuccess(true)
      return
    }

    if (!resumeFile) {
      setResumeFileError('A resume or CV file is required to submit your application.')
      const el = document.getElementById('resume-section')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    // Validate custom screening questions
    if (!validateScreeningQuestions()) {
      const firstErrId = Object.keys(screeningErrors)[0]
      const el = document.getElementById(`sq-field-${firstErrId}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsSubmitting(true)

    try {
      const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`
      let cvPath: string | undefined = undefined

      // Step 1: Upload Resume/CV
      const uploadTarget = await getUploadUrl(fullName, resumeFile.type)
      await uploadCvFile(uploadTarget.uploadUrl, resumeFile)
      cvPath = uploadTarget.path

      // Step 2: Upload Cover Letter if attached as a document
      let coverLetterNote = values.coverLetterText?.trim() || ''
      if (coverLetterMode === 'upload' && coverLetterFile) {
        try {
          const clTarget = await getUploadUrl(`${fullName}_CoverLetter`, coverLetterFile.type)
          await uploadCvFile(clTarget.uploadUrl, coverLetterFile)
          coverLetterNote = `Cover Letter Document Uploaded: ${clTarget.path}`
        } catch {
          // Fallback if secondary upload fails: continue application with note
          coverLetterNote = `Cover Letter File: ${coverLetterFile.name}`
        }
      }

      // Append LinkedIn and Location to application notes if helpful
      const fullNotes = [
        coverLetterNote ? `[Cover Letter]\n${coverLetterNote}` : '',
        values.linkedinUrl ? `[LinkedIn]\n${values.linkedinUrl.trim()}` : '',
        values.location ? `[Location]\n${values.location.trim()}` : '',
      ]
        .filter(Boolean)
        .join('\n\n')

      const parsedSalary = values.salaryExpectation
        ? Number(values.salaryExpectation.replace(/\D/g, ''))
        : undefined

      // Step 3: Register candidate profile with vacancy slug and screening answers
      await submitCandidateApplication({
        fullName,
        email: values.email.trim(),
        phone: values.phone.trim(),
        headline: values.headline?.trim() || undefined,
        availability: values.availability || undefined,
        salaryExpectation: parsedSalary && Number.isFinite(parsedSalary) ? parsedSalary : undefined,
        cvPath,
        vacancySlug: slug,
        screeningAnswers: Object.keys(screeningAnswers).length > 0 ? screeningAnswers : undefined,
        notes: fullNotes || undefined,
        honeypot: values.honeypot || '',
        submittedAt: new Date().toISOString(),
      })

      setSubmitSuccess(true)
      reset()
      setResumeFile(null)
      setCoverLetterFile(null)
      setScreeningAnswers({})
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Could not complete your application. Please verify your details or contact us directly.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format currency
  const formatSalary = (min: number | null, max: number | null) => {
    if (min && max) {
      return `UGX ${min.toLocaleString()} – ${max.toLocaleString()}`
    }
    if (min) return `From UGX ${min.toLocaleString()}`
    if (max) return `Up to UGX ${max.toLocaleString()}`
    return 'Competitive / Based on experience'
  }

  // Helper to render bullet lists
  const renderBulletList = (items: string[] | string | null | undefined) => {
    if (!items) return null
    const list: string[] = Array.isArray(items)
      ? items
      : items
          .split('\n')
          .map((l) => l.replace(/^[•\-\*]\s*/, '').trim())
          .filter(Boolean)

    if (list.length === 0) return null

    return (
      <ul className="mt-4 space-y-3">
        {list.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-ink/80 leading-relaxed sm:text-base">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center pt-24" role="status" aria-live="polite">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-ink/10 border-t-teal-primary" />
          <p className="mt-4 text-sm font-medium text-slate-muted">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="container-page py-28 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-ink/[0.08] bg-white p-8 shadow-card">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 font-heading text-xl font-bold text-ink">Failed to Load Role</h2>
          <p className="mt-2 text-sm text-slate-muted">{loadError}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => void loadJob()}
              className="btn btn-primary btn-md"
            >
              Try Again
            </button>
            <Link to="/jobs" className="btn btn-outline btn-md">
              Back to Roles
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container-page py-28 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-ink/[0.08] bg-white p-8 shadow-card">
          <Briefcase className="mx-auto h-12 w-12 text-slate-muted opacity-50" />
          <h2 className="mt-4 font-heading text-xl font-bold text-ink">Role Not Found</h2>
          <p className="mt-2 text-sm text-slate-muted">
            This position may have been filled or closed. Please explore our other active career openings.
          </p>
          <div className="mt-6">
            <Link to="/jobs" className="btn btn-primary btn-md inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Open Roles
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-offwhite text-ink pb-20">
      {/* Role Hero Banner */}
      <section className="relative overflow-hidden bg-teal-deep pt-28 pb-16 text-white lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-mesh-dark opacity-40" />
          <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay" />
        </div>

        <div className="container-page relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-white/70">
            <Link to="/jobs" className="transition-colors hover:text-cyan-accent flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              All Open Roles
            </Link>
            <span>/</span>
            <span className="truncate text-white/90">{job.title}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-accent/30 bg-cyan-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-accent">
                <Briefcase className="h-3.5 w-3.5" />
                {job.category || 'Professional Opportunity'}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                Job #{job.id}
              </span>
            </div>

            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              {job.title}
            </h1>

            {/* Quick Metadata Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-white/80 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-cyan-accent" />
                Company: {job.company || 'Corporate Client'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-cyan-accent" />
                {job.location || 'Kampala, Uganda'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-cyan-accent" />
                {job.employmentType || job.type || 'Full-time'}
              </span>
              {job.postedAt && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-cyan-accent" />
                  Posted: {new Date(job.postedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>

            {/* Hero CTAs: Smooth scroll to Apply Form & Share */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToApplyForm}
                className="btn btn-primary btn-lg inline-flex items-center gap-2 shadow-lg hover:shadow-cyan-accent/20 transition-all cursor-pointer"
              >
                Apply for this Role
                <ArrowDown className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="btn btn-outline btn-lg text-white border-white/20 hover:bg-white/10 inline-flex items-center gap-2 cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
                {copiedLink ? 'Link Copied!' : 'Share this Role'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Content & Anchored Form */}
      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-4xl space-y-10">

            {/* 1. About the Role */}
            <div className="rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card sm:p-10">
              <h2 className="font-heading text-2xl font-bold text-ink">About the Role</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink/80 sm:text-base">
                {job.description ? (
                  <p className="whitespace-pre-line leading-relaxed">{job.description}</p>
                ) : job.summary ? (
                  <p className="whitespace-pre-line leading-relaxed">{job.summary}</p>
                ) : (
                  <p>
                    We are hiring a {job.title} to join the team in {job.location || 'Kampala, Uganda'}. In this role, you will work closely with cross-functional leadership to drive growth, quality delivery, and strategic business outcomes.
                  </p>
                )}
              </div>
            </div>

            {/* 2. What You’ll Do (Responsibilities) */}
            {(job.responsibilities || job.summary) && (
              <div className="rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card sm:p-10">
                <h2 className="font-heading text-2xl font-bold text-ink">What You’ll Do</h2>
                <p className="mt-2 text-sm text-slate-muted">
                  Here is what you will be responsible for and leading on a day-to-day basis:
                </p>
                {job.responsibilities ? (
                  renderBulletList(job.responsibilities)
                ) : (
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3 text-sm text-ink/80 leading-relaxed sm:text-base">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-primary" />
                      <span>{job.summary}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-ink/80 leading-relaxed sm:text-base">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-primary" />
                      <span>Collaborate closely with department heads and operational teams to achieve key milestones.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-ink/80 leading-relaxed sm:text-base">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-primary" />
                      <span>Ensure statutory compliance, reporting accuracy, and operational excellence across workflows.</span>
                    </li>
                  </ul>
                )}
              </div>
            )}

            {/* 3. What We Need (Requirements) */}
            {job.requirements && (
              <div className="rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card sm:p-10">
                <h2 className="font-heading text-2xl font-bold text-ink">What We Need</h2>
                <p className="mt-2 text-sm text-slate-muted">
                  The background, skills, and qualifications we are looking for:
                </p>
                {renderBulletList(job.requirements)}
              </div>
            )}

            {/* 4. What’s In It For You (Compensation & Terms) */}
            <div className="rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card sm:p-10">
              <h2 className="font-heading text-2xl font-bold text-ink">What’s In It For You</h2>

              {/* Remuneration Stats */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-ink/[0.06] bg-offwhite p-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-muted">
                    <Banknote className="h-4 w-4 text-teal-primary" />
                    Salary Structure
                  </span>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </p>
                </div>
                <div className="rounded-2xl border border-ink/[0.06] bg-offwhite p-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-muted">
                    <Clock className="h-4 w-4 text-teal-primary" />
                    Employment Mode
                  </span>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {job.employmentType || job.type || 'Full-time'}
                  </p>
                </div>
                <div className="rounded-2xl border border-ink/[0.06] bg-offwhite p-4 sm:col-span-2 lg:col-span-1">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-muted">
                    <Calendar className="h-4 w-4 text-teal-primary" />
                    Application Window
                  </span>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {job.closesAt
                      ? new Date(job.closesAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Rolling Review'}
                  </p>
                </div>
              </div>

              {/* Perks / Benefits List if available */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="mt-6 pt-6 border-t border-ink/[0.06]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-muted mb-2">
                    Benefits &amp; Support
                  </h3>
                  {renderBulletList(job.benefits)}
                </div>
              )}
            </div>

            {/* Confidential Representation Charter */}
            <div className="rounded-3xl border border-teal-primary/20 bg-teal-primary/5 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-primary text-white shadow-soft">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-ink">
                    Confidential Representation
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-muted">
                    Your details are held in strict confidence. We never share your profile or credentials with any hiring client without your knowledge and clear agreement.
                  </p>
                </div>
              </div>
            </div>

            {/* ANCHORED APPLICATION FORM SECTION */}
            <div
              id="apply-form"
              className="scroll-mt-28 rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card-lg sm:p-10"
            >
              {submitSuccess ? (
                /* Submission Success State */
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-primary/10 text-teal-primary">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-bold text-ink sm:text-3xl">
                    Application Submitted!
                  </h3>
                  <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-muted sm:text-base">
                    Thank you for applying for <strong>{job.title}</strong>. Your profile has been received by our talent team.
                  </p>
                  <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-ink/[0.06] bg-offwhite p-5 text-xs text-slate-muted text-left sm:text-sm">
                    <p className="font-semibold text-ink">What happens next:</p>
                    <p className="mt-1.5 leading-relaxed">
                      We review all applications carefully. If your background aligns with what the hiring team needs, we will reach out to you directly to arrange an introductory conversation.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="btn btn-outline btn-md"
                    >
                      Submit Another Application
                    </button>
                    <Link to="/jobs" className="btn btn-primary btn-md">
                      View Other Open Roles
                    </Link>
                  </div>
                </div>
              ) : (
                /* Active Standard Application Form */
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.06] pb-5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-primary">
                        Application Form
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-ink sm:text-3xl mt-0.5">
                        Apply for this Job
                      </h3>
                      <p className="text-xs text-slate-muted mt-1">
                        {job.title} · Job #{job.id}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                      Active
                    </span>
                  </div>

                  {submitError && (
                    <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-50 p-4 text-xs text-red-700 sm:text-sm">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 space-y-6"
                    noValidate
                  >
                    {/* Honeypot field */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register('honeypot')}
                      />
                    </div>

                    {/* Standard Candidate Fields (Greenhouse Standard) */}
                    <div className="space-y-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-muted">
                        Personal &amp; Contact Details
                      </h4>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* First Name */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Kenneth"
                            className="input-base"
                            {...register('firstName')}
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                          )}
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Kato"
                            className="input-base"
                            {...register('lastName')}
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="e.g. kenneth@example.com"
                            className="input-base"
                            {...register('email')}
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="0772 123456 or +256 772..."
                            className="input-base"
                            {...register('phone')}
                            onChange={handlePhoneChange}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                          )}
                        </div>

                        {/* Location (City, Country) */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Location (City, Country) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Kampala, Uganda"
                            className="input-base"
                            {...register('location')}
                          />
                          {errors.location && (
                            <p className="mt-1 text-xs text-red-600">{errors.location.message}</p>
                          )}
                        </div>

                        {/* LinkedIn Profile */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            LinkedIn Profile <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="url"
                              placeholder="https://linkedin.com/in/yourname"
                              className="input-base pr-10"
                              {...register('linkedinUrl')}
                            />
                            <Linkedin className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-muted pointer-events-none" />
                          </div>
                          {errors.linkedinUrl && (
                            <p className="mt-1 text-xs text-red-600">{errors.linkedinUrl.message}</p>
                          )}
                        </div>

                        {/* Current Professional Role / Headline */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Current Professional Role / Headline
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Senior Financial Controller"
                            className="input-base"
                            {...register('headline')}
                          />
                        </div>

                        {/* Availability / Notice Period */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Availability / Notice Period
                          </label>
                          <select
                            className="input-base"
                            {...register('availability')}
                          >
                            <option value="immediate">Immediate</option>
                            <option value="two_weeks">2 Weeks</option>
                            <option value="30_days">1 Month / 30 Days</option>
                            <option value="60_days">2 Months</option>
                            <option value="not_actively_looking">Exploring opportunities</option>
                          </select>
                        </div>

                        {/* Expected Salary (UGX) */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Expected Gross Salary (UGX)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 7,000,000"
                            className="input-base"
                            {...register('salaryExpectation')}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Standard Resume / CV Upload (Mandatory) */}
                    <div id="resume-section" className="pt-6 border-t border-ink/[0.08]">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                          Resume / CV <span className="text-red-500">*</span>
                        </label>
                        <span className="text-xs text-slate-muted">PDF, DOC, DOCX up to 10 MB</span>
                      </div>

                      <input
                        type="file"
                        ref={resumeInputRef}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleResumeChange(e.target.files?.[0] || null)}
                      />

                      {resumeFile ? (
                        <div className="flex items-center justify-between rounded-2xl border border-teal-primary/30 bg-teal-primary/5 p-4">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileCheck className="h-6 w-6 shrink-0 text-teal-primary" />
                            <div className="truncate">
                              <p className="truncate text-sm font-semibold text-ink">
                                {resumeFile.name}
                              </p>
                              <p className="text-xs text-slate-muted">
                                {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB · Attached
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setResumeFile(null)
                              if (resumeInputRef.current) resumeInputRef.current.value = ''
                            }}
                            className="rounded-lg p-1.5 text-slate-muted hover:bg-ink/[0.05] hover:text-ink transition-colors cursor-pointer"
                            title="Remove file"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            const files = e.dataTransfer.files
                            if (files && files.length > 0) handleResumeChange(files[0])
                          }}
                          onClick={() => resumeInputRef.current?.click()}
                          className="cursor-pointer rounded-2xl border-2 border-dashed border-ink/15 bg-offwhite p-7 text-center transition-all hover:border-teal-primary/50 hover:bg-white"
                        >
                          <UploadCloud className="mx-auto h-8 w-8 text-teal-primary" />
                          <p className="mt-2 text-sm font-semibold text-ink">
                            Attach your CV or <span className="text-teal-primary underline">browse from your computer</span>
                          </p>
                          <p className="mt-1 text-xs text-slate-muted">
                            Accepted file types: pdf, doc, docx
                          </p>
                        </div>
                      )}

                      {resumeFileError && (
                        <p className="mt-1.5 text-xs text-red-600 font-medium">{resumeFileError}</p>
                      )}
                    </div>

                    {/* Standard Cover Letter (Write or Upload) */}
                    <div className="pt-6 border-t border-ink/[0.08]">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink">
                            Cover Letter
                          </label>
                          <p className="text-xs text-slate-muted">Optional: share why you are interested in this position.</p>
                        </div>

                        {/* Mode Switcher Buttons */}
                        <div className="inline-flex rounded-xl border border-ink/[0.08] bg-offwhite p-1 text-xs font-semibold">
                          <button
                            type="button"
                            onClick={() => setCoverLetterMode('write')}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                              coverLetterMode === 'write'
                                ? 'bg-white text-teal-primary shadow-xs'
                                : 'text-slate-muted hover:text-ink'
                            }`}
                          >
                            <PenTool className="h-3.5 w-3.5" />
                            Write Letter
                          </button>
                          <button
                            type="button"
                            onClick={() => setCoverLetterMode('upload')}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                              coverLetterMode === 'upload'
                                ? 'bg-white text-teal-primary shadow-xs'
                                : 'text-slate-muted hover:text-ink'
                            }`}
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Upload Document
                          </button>
                        </div>
                      </div>

                      {coverLetterMode === 'write' ? (
                        <textarea
                          rows={5}
                          placeholder="Write or paste your cover letter here..."
                          className="input-base py-3 leading-relaxed"
                          {...register('coverLetterText')}
                        />
                      ) : (
                        <div>
                          <input
                            type="file"
                            ref={coverLetterInputRef}
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleCoverLetterFileChange(e.target.files?.[0] || null)}
                          />

                          {coverLetterFile ? (
                            <div className="flex items-center justify-between rounded-2xl border border-teal-primary/30 bg-teal-primary/5 p-4">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <FileCheck className="h-6 w-6 shrink-0 text-teal-primary" />
                                <div className="truncate">
                                  <p className="truncate text-sm font-semibold text-ink">
                                    {coverLetterFile.name}
                                  </p>
                                  <p className="text-xs text-slate-muted">
                                    {(coverLetterFile.size / (1024 * 1024)).toFixed(2)} MB · Cover Letter Attached
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setCoverLetterFile(null)
                                  if (coverLetterInputRef.current) coverLetterInputRef.current.value = ''
                                }}
                                className="rounded-lg p-1.5 text-slate-muted hover:bg-ink/[0.05] hover:text-ink transition-colors cursor-pointer"
                                title="Remove file"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => coverLetterInputRef.current?.click()}
                              className="cursor-pointer rounded-2xl border-2 border-dashed border-ink/15 bg-offwhite p-6 text-center transition-all hover:border-teal-primary/50 hover:bg-white"
                            >
                              <UploadCloud className="mx-auto h-7 w-7 text-slate-muted" />
                              <p className="mt-2 text-sm font-semibold text-ink">
                                Attach Cover Letter document or <span className="text-teal-primary underline">browse</span>
                              </p>
                              <p className="mt-1 text-xs text-slate-muted">
                                Supported: PDF, DOC, DOCX up to 10 MB
                              </p>
                            </div>
                          )}

                          {coverLetterFileError && (
                            <p className="mt-1.5 text-xs text-red-600 font-medium">{coverLetterFileError}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* TAILORED ROLE-SPECIFIC QUESTIONS (Only if added by Hiring Manager in JantaHR OPs) */}
                    {job.screeningQuestions && job.screeningQuestions.length > 0 && (
                      <div className="pt-6 border-t border-ink/[0.08] space-y-5">
                        <div>
                          <h4 className="font-heading text-lg font-bold text-ink flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-teal-primary" />
                            Role-Specific Questions
                          </h4>
                          <p className="text-xs text-slate-muted mt-1">
                            Additional questions tailored specifically for this role:
                          </p>
                        </div>

                        <div className="space-y-4">
                          {job.screeningQuestions.map((q: ScreeningQuestion, idx: number) => {
                            const err = screeningErrors[q.id]
                            const val = screeningAnswers[q.id] ?? ''

                            return (
                              <div
                                key={q.id}
                                id={`sq-field-${q.id}`}
                                className="rounded-2xl border border-ink/[0.06] bg-offwhite p-4.5"
                              >
                                <label className="block text-sm font-semibold text-ink mb-2">
                                  <span>{idx + 1}. {q.question}</span>
                                  {q.required && <span className="text-red-500 ml-1">*</span>}
                                </label>

                                {q.type === 'number' && (
                                  <input
                                    type="number"
                                    placeholder="Enter a number (e.g. 5)"
                                    className="input-base bg-white"
                                    value={val as string | number}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                  />
                                )}

                                {q.type === 'text' && (
                                  <input
                                    type="text"
                                    placeholder="Your answer..."
                                    className="input-base bg-white"
                                    value={val as string}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                  />
                                )}

                                {q.type === 'boolean' && (
                                  <div className="flex items-center gap-6 mt-1">
                                    <label className="inline-flex items-center gap-2 text-sm text-ink cursor-pointer">
                                      <input
                                        type="radio"
                                        name={`q_${q.id}`}
                                        checked={val === true || val === 'true'}
                                        onChange={() => handleAnswerChange(q.id, true)}
                                        className="h-4 w-4 text-teal-primary focus:ring-teal-primary"
                                      />
                                      <span>Yes</span>
                                    </label>
                                    <label className="inline-flex items-center gap-2 text-sm text-ink cursor-pointer">
                                      <input
                                        type="radio"
                                        name={`q_${q.id}`}
                                        checked={val === false || val === 'false'}
                                        onChange={() => handleAnswerChange(q.id, false)}
                                        className="h-4 w-4 text-teal-primary focus:ring-teal-primary"
                                      />
                                      <span>No</span>
                                    </label>
                                  </div>
                                )}

                                {q.type === 'select' && (
                                  <select
                                    className="input-base bg-white"
                                    value={val as string}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                  >
                                    <option value="">Select an option</option>
                                    {(q.options ?? []).map((opt) => (
                                      <option key={opt} value={opt}>
                                        {opt}
                                      </option>
                                    ))}
                                  </select>
                                )}

                                {err && (
                                  <p className="mt-1.5 text-xs text-red-600 font-medium">{err}</p>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Privacy Consent Checkbox */}
                    <div className="pt-4 border-t border-ink/[0.08]">
                      <label className="flex items-start gap-3 text-xs text-slate-muted cursor-pointer sm:text-sm">
                        <input
                          type="checkbox"
                          className="mt-0.5 h-4 w-4 rounded border-ink/20 text-teal-primary focus:ring-teal-primary"
                          {...register('consent')}
                        />
                        <span>
                          I authorize JantaHR to process my credentials for this application under the Uganda Data Protection and Privacy Act 2019.
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="mt-1.5 text-xs text-red-600">{errors.consent.message}</p>
                      )}
                    </div>

                    {/* Submit Action */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary btn-lg w-full sm:w-auto px-8 justify-center cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting Application...
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            Submit Application
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Back to Open Roles Footer Navigation */}
            <div className="pt-4 text-center">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-primary transition-colors hover:text-teal-deep"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to All Open Roles &amp; Careers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
