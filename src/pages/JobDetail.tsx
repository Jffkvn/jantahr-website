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
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Calendar,
  Banknote,
  ShieldCheck,
  Mail,
  Loader2,
} from 'lucide-react'
import type { Job } from '@/types/jobs'
import { fetchJobBySlug } from '@/services/jobsService'
import {
  isCandidateEndpointConfigured,
  getUploadUrl,
  uploadCvFile,
  submitCandidateApplication,
} from '@/services/applicationService'
import { formatUgandanPhone } from '@/lib/phone'

const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required (minimum 2 characters).'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(9, 'Please enter a valid phone number.')
    .regex(/^(\+?256|0)?\d{9}$/, 'Please enter a valid Ugandan phone number (e.g. 0772 123456 or +256...).'),
  headline: z.string().optional(),
  availability: z.string().optional(),
  salaryExpectation: z.string().optional(),
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

  // Application submission states
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isEndpointConfigured = isCandidateEndpointConfigured()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      headline: '',
      availability: '30_days',
      salaryExpectation: '',
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
        document.title = `${data.title} | JantaHR Client Mandates`
      }
    } catch {
      if (signal?.aborted) return
      setJob(null)
      setLoadError('Unable to load this mandate. Please check your connection and try again.')
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUgandanPhone(e.target.value)
    setValue('phone', formatted, { shouldValidate: true })
  }

  const handleFileChange = (file: File | null) => {
    setFileError(null)
    if (!file) {
      setSelectedFile(null)
      return
    }

    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      setFileError('Unsupported file type. Please upload a PDF or Microsoft Word document (.pdf, .doc, .docx).')
      setSelectedFile(null)
      return
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError('File size exceeds the 10 MB limit. Please compress your document and try again.')
      setSelectedFile(null)
      return
    }

    setSelectedFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileChange(files[0])
    }
  }

  const onSubmit = async (values: FormValues) => {
    if (!slug) return
    setSubmitError(null)

    if (values.honeypot) {
      // Spam honeypot triggered
      setSubmitSuccess(true)
      return
    }

    setIsSubmitting(true)

    try {
      let cvPath: string | undefined = undefined

      // If CV file is attached, run 2-step direct signed upload
      if (selectedFile) {
        const uploadTarget = await getUploadUrl(values.fullName, selectedFile.type)
        await uploadCvFile(uploadTarget.uploadUrl, selectedFile)
        cvPath = uploadTarget.path
      }

      // Parse salary expectation number if provided
      const parsedSalary = values.salaryExpectation
        ? Number(values.salaryExpectation.replace(/\D/g, ''))
        : undefined

      // Step 3: Register candidate profile with vacancy slug
      await submitCandidateApplication({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        headline: values.headline?.trim() || undefined,
        availability: values.availability || undefined,
        salaryExpectation: parsedSalary && Number.isFinite(parsedSalary) ? parsedSalary : undefined,
        cvPath,
        vacancySlug: slug,
        honeypot: values.honeypot || '',
        submittedAt: new Date().toISOString(),
      })

      setSubmitSuccess(true)
      reset()
      setSelectedFile(null)
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
    return 'Competitive / Commensurate with experience'
  }

  // Requirements split into bullets
  const renderRequirementsList = (reqs: string | null) => {
    if (!reqs) return null
    const lines = reqs
      .split('\n')
      .map((l) => l.replace(/^[•\-\*]\s*/, '').trim())
      .filter(Boolean)

    if (lines.length === 0) return null

    return (
      <ul className="mt-4 space-y-2.5">
        {lines.map((line, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm text-ink/80 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-primary" />
            <span>{line}</span>
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
          <p className="mt-4 text-sm font-medium text-slate-muted">Loading mandate details...</p>
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
              Back to Mandates
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
          <h2 className="mt-4 font-heading text-xl font-bold text-ink">Mandate Not Found</h2>
          <p className="mt-2 text-sm text-slate-muted">
            This executive role may have been successfully closed, filled, or updated. Please browse our active career openings.
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
    <div className="bg-offwhite text-ink">
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
                {job.category || 'Executive Search'}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                Mandate #{job.id}
              </span>
            </div>

            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              {job.title}
            </h1>

            {/* Quick Metadata Pill Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-white/80 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-cyan-accent" />
                Client: {job.company || 'Corporate Client'}
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
                  Published: {new Date(job.postedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Sticky Layout */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Role Dossier & Requirements (60–65%) */}
            <div className="space-y-10 lg:col-span-7">
              {/* Summary / Lead */}
              {job.summary && (
                <div className="rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card sm:p-8">
                  <h2 className="font-heading text-xl font-bold text-ink">Role Summary</h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-muted">
                    {job.summary}
                  </p>
                </div>
              )}

              {/* Description / Role Overview */}
              <div className="rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card sm:p-8">
                <h2 className="font-heading text-xl font-bold text-ink">Mandate Overview &amp; Context</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-muted sm:text-base">
                  {job.description ? (
                    <p className="whitespace-pre-line leading-relaxed">{job.description}</p>
                  ) : (
                    <p>
                      JantaHR has been exclusively retained to source and evaluate senior talent for this mandate. Candidates will undergo competency-based behavioral assessment, technical leadership evaluation, and credential verification.
                    </p>
                  )}
                </div>
              </div>

              {/* Requirements & Qualifications */}
              {job.requirements && (
                <div className="rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card sm:p-8">
                  <h2 className="font-heading text-xl font-bold text-ink">Key Competencies &amp; Requirements</h2>
                  <p className="mt-2 text-xs text-slate-muted">
                    Candidates meeting the following qualifications and professional experience are invited to apply:
                  </p>
                  {renderRequirementsList(job.requirements)}
                </div>
              )}

              {/* Compensation & Contract Details */}
              <div className="rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card sm:p-8">
                <h2 className="font-heading text-xl font-bold text-ink">Compensation &amp; Terms</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-ink/[0.06] bg-offwhite p-4">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-muted">
                      <Banknote className="h-4 w-4 text-teal-primary" />
                      Remuneration Structure
                    </span>
                    <p className="mt-1 text-sm font-semibold text-ink">
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-ink/[0.06] bg-offwhite p-4">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-muted">
                      <Calendar className="h-4 w-4 text-teal-primary" />
                      Closing / Target Date
                    </span>
                    <p className="mt-1 text-sm font-semibold text-ink">
                      {job.closesAt
                        ? new Date(job.closesAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                        : 'Reviewing on a rolling basis'}
                    </p>
                  </div>
                </div>
              </div>

              {/* JantaHR Assurance Banner */}
              <div className="rounded-3xl border border-teal-primary/20 bg-teal-primary/5 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-primary text-white shadow-soft">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink">
                      Confidential Candidate Representation
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-muted">
                      All applications submitted through JantaHR are handled under strict professional confidentiality. Your curriculum vitae and identifying credentials are never submitted to our corporate client without prior screening and explicit consent.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to Open Roles */}
              <div className="pt-2">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-primary transition-colors hover:text-teal-deep"
                >
                  <ArrowLeft className="h-4 w-4" />
                  View All Open Client Mandates &amp; Careers
                </Link>
              </div>
            </div>

            {/* Right Column: Sticky Application Form (35–40%) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card-lg sm:p-8">
                  {submitSuccess ? (
                    /* Submission Success State */
                    <div className="py-8 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-primary/10 text-teal-primary">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h3 className="mt-5 font-heading text-2xl font-bold text-ink">
                        Application Received!
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-muted">
                        Thank you for applying for <strong>{job.title}</strong>. Your profile and dossier have been directly registered with our talent acquisition team.
                      </p>
                      <div className="mt-4 rounded-2xl border border-ink/[0.06] bg-offwhite p-4 text-xs text-slate-muted text-left">
                        <p className="font-semibold text-ink">What happens next:</p>
                        <p className="mt-1">
                          Our recruitment practice will evaluate your profile against the client mandate. If shortlisted, a recruiter will reach out directly via telephone or email to schedule an exploratory discussion.
                        </p>
                      </div>
                      <div className="mt-6 flex flex-col gap-3">
                        <button
                          type="button"
                          onClick={() => setSubmitSuccess(false)}
                          className="btn btn-outline btn-md w-full justify-center"
                        >
                          Submit Another Profile
                        </button>
                        <Link to="/jobs" className="btn btn-primary btn-md w-full justify-center">
                          Explore Other Openings
                        </Link>
                      </div>
                    </div>
                  ) : !isEndpointConfigured ? (
                    /* Direct Email Fallback (when VITE_CANDIDATE_ENDPOINT is not yet set) */
                    <div>
                      <div className="flex items-center justify-between border-b border-ink/[0.06] pb-4">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-ink">Apply for this Role</h3>
                          <p className="text-xs text-slate-muted mt-0.5">Mandate #{job.id} · {job.title}</p>
                        </div>
                        <span className="rounded-full bg-teal-primary/10 px-2.5 py-1 text-xs font-semibold text-teal-primary">
                          Open
                        </span>
                      </div>

                      <div className="mt-6 space-y-4">
                        <p className="text-sm leading-relaxed text-slate-muted">
                          To apply for this mandate, please submit your updated Curriculum Vitae and a brief career summary directly to our recruitment team:
                        </p>

                        <div className="rounded-2xl border border-teal-primary/20 bg-teal-primary/5 p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-teal-primary">
                            Direct Application Email
                          </p>
                          <a
                            href={`mailto:hello@jantahr.com?subject=Application:%20${encodeURIComponent(job.title)}%20(Mandate%20%23${job.id})`}
                            className="mt-1 block font-heading text-base font-bold text-ink hover:text-teal-primary transition-colors"
                          >
                            hello@jantahr.com
                          </a>
                          <p className="mt-1 text-xs text-slate-muted">
                            Reference Subject: Application: {job.title}
                          </p>
                        </div>

                        <a
                          href={`mailto:hello@jantahr.com?subject=Application:%20${encodeURIComponent(job.title)}%20(Mandate%20%23${job.id})`}
                          className="btn btn-primary btn-lg w-full justify-center inline-flex items-center gap-2"
                        >
                          <Mail className="h-4 w-4" />
                          Send CV via Email
                        </a>

                        <div className="pt-2 text-center">
                          <Link to="/contact" className="text-xs font-medium text-slate-muted hover:text-teal-primary">
                            Or speak to a recruitment consultant &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Active Live Greenhouse-Style Application Form */
                    <div>
                      <div className="flex items-center justify-between border-b border-ink/[0.06] pb-4">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-ink">Apply for this Position</h3>
                          <p className="text-xs text-slate-muted mt-0.5">
                            Mandate #{job.id} · Direct Application
                          </p>
                        </div>
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                          Active Mandate
                        </span>
                      </div>

                      {submitError && (
                        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-50 p-3.5 text-xs text-red-700">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{submitError}</span>
                        </div>
                      )}

                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-5 space-y-4"
                        noValidate
                      >
                        {/* Honeypot field (hidden from view, traps spambots) */}
                        <div className="hidden" aria-hidden="true">
                          <input
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            {...register('honeypot')}
                          />
                        </div>

                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Kenneth Kato"
                            className="input-base"
                            {...register('fullName')}
                          />
                          {errors.fullName && (
                            <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Email Address <span className="text-red-500">*</span>
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

                        {/* Phone Number with Uganda formatting */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Telephone Number <span className="text-red-500">*</span>
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

                        {/* Professional Headline */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Current Headline / Role
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Senior Financial Controller (7 Yrs Exp)"
                            className="input-base"
                            {...register('headline')}
                          />
                        </div>

                        {/* Availability / Notice Period */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                              Availability
                            </label>
                            <select
                              className="input-base py-0 text-xs"
                              {...register('availability')}
                            >
                              <option value="immediate">Immediate</option>
                              <option value="two_weeks">2 Weeks</option>
                              <option value="30_days">1 Month / 30 Days</option>
                              <option value="60_days">2 Months</option>
                              <option value="not_actively_looking">Exploring</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                              Expected Salary (UGX)
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 5,000,000"
                              className="input-base"
                              {...register('salaryExpectation')}
                            />
                          </div>
                        </div>

                        {/* CV Drag-and-Drop Dropzone */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                            Curriculum Vitae / Resume (PDF or Word)
                          </label>

                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                          />

                          {selectedFile ? (
                            <div className="flex items-center justify-between rounded-2xl border border-teal-primary/30 bg-teal-primary/5 p-3.5">
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <FileText className="h-5 w-5 shrink-0 text-teal-primary" />
                                <div className="truncate">
                                  <p className="truncate text-xs font-semibold text-ink">
                                    {selectedFile.name}
                                  </p>
                                  <p className="text-[11px] text-slate-muted">
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedFile(null)
                                  if (fileInputRef.current) fileInputRef.current.value = ''
                                }}
                                className="rounded-lg p-1 text-slate-muted hover:bg-ink/[0.05] hover:text-ink transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <div
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={handleDrop}
                              onClick={() => fileInputRef.current?.click()}
                              className="cursor-pointer rounded-2xl border-2 border-dashed border-ink/15 bg-offwhite p-5 text-center transition-all hover:border-teal-primary/50 hover:bg-white"
                            >
                              <UploadCloud className="mx-auto h-7 w-7 text-slate-muted" />
                              <p className="mt-2 text-xs font-semibold text-ink">
                                Drag &amp; drop your CV or <span className="text-teal-primary underline">browse file</span>
                              </p>
                              <p className="mt-1 text-[11px] text-slate-muted">
                                PDF, DOC, DOCX up to 10 MB
                              </p>
                            </div>
                          )}

                          {fileError && (
                            <p className="mt-1 text-xs text-red-600">{fileError}</p>
                          )}
                        </div>

                        {/* Privacy Consent Checkbox */}
                        <div className="pt-2">
                          <label className="flex items-start gap-2.5 text-xs text-slate-muted cursor-pointer">
                            <input
                              type="checkbox"
                              className="mt-0.5 h-4 w-4 rounded border-ink/20 text-teal-primary focus:ring-teal-primary"
                              {...register('consent')}
                            />
                            <span>
                              I authorize JantaHR to process my credentials for this mandate under the Uganda Data Protection and Privacy Act 2019.
                            </span>
                          </label>
                          {errors.consent && (
                            <p className="mt-1 text-xs text-red-600">{errors.consent.message}</p>
                          )}
                        </div>

                        {/* Submit Action */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary btn-lg w-full justify-center"
                          >
                            {isSubmitting ? (
                              <span className="inline-flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Processing Application...
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
