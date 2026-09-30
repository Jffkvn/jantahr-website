import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Loader2,
  ShieldCheck,
  UserCheck,
  Send,
  Linkedin,
  PenTool,
} from 'lucide-react'
import {
  getUploadUrl,
  uploadCvFile,
  submitCandidateApplication,
} from '@/services/applicationService'
import { formatUgandanPhone } from '@/lib/phone'
import { trackEvent } from '@/components/AnalyticsManager'

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB

const talentFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(9, 'Please enter a valid phone number.')
    .regex(/^(\+?256|0)?\d{9}$/, 'Please enter a valid phone number (e.g. 0772 123456 or +256...).'),
  country: z.string().min(2, 'Please select your country of residence.'),
  headline: z.string().min(2, 'Current professional role / headline is required.'),
  discipline: z.string().min(2, 'Please select your primary functional discipline.'),
  experience: z.string().optional(),
  availability: z.string().optional(),
  salaryExpectation: z.string().optional(),
  linkedinUrl: z.string().optional(),
  coverLetter: z.string().optional(),
  honeypot: z.string().max(0, 'Spam detected').optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the data protection consent to join the talent pool.' }),
  }),
})

type TalentFormData = z.infer<typeof talentFormSchema>

interface TalentPoolFormProps {
  onClose?: () => void
}

export default function TalentPoolForm({ onClose }: TalentPoolFormProps) {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvError, setCvError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [coverMode, setCoverMode] = useState<'text' | 'file' | 'skip'>('skip')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const [submitting, setSubmitting] = useState(false)
  const [submitStep, setSubmitStep] = useState<string>('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedCandidate, setSubmittedCandidate] = useState<{ name: string; discipline: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TalentFormData>({
    resolver: zodResolver(talentFormSchema),
    defaultValues: {
      country: 'Uganda',
      discipline: 'Human Resources & People Operations',
      experience: '4 - 7 years',
      availability: '1 Month Notice',
      consent: true,
    },
  })

  const validateCvFile = (file: File): boolean => {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setCvError('Unsupported format. Please upload a PDF or Microsoft Word document (.pdf, .doc, .docx).')
      return false
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setCvError('File size exceeds 10 MB limit. Please compress or select a smaller file.')
      return false
    }
    setCvError(null)
    return true
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateCvFile(file)) {
      setCvFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && validateCvFile(file)) {
      setCvFile(file)
    }
  }

  const onSubmit = async (data: TalentFormData) => {
    if (!cvFile) {
      setCvError('Please upload your Resume or CV to join the talent pool.')
      return
    }

    setSubmitting(true)
    setSubmitError(null)

    try {
      const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`
      const normalizedPhone = formatUgandanPhone(data.phone)

      // Step 1 & 2: Upload CV file to private storage
      setSubmitStep('Generating secure CV upload channel...')
      const uploadTarget = await getUploadUrl(fullName, cvFile.type)

      setSubmitStep('Uploading your Curriculum Vitae...')
      await uploadCvFile(uploadTarget.uploadUrl, cvFile)

      // Step 3: Parse salary expectation if provided
      let parsedSalary: number | undefined
      if (data.salaryExpectation) {
        const cleaned = data.salaryExpectation.replace(/[^0-9]/g, '')
        if (cleaned) parsedSalary = parseInt(cleaned, 10)
      }

      // Step 4: Register candidate into private talent pool
      setSubmitStep('Registering profile in talent pool...')
      const notesParts: string[] = []
      notesParts.push(`Functional Discipline: ${data.discipline}`)
      notesParts.push(`Country of Residence: ${data.country}`)
      if (data.experience) notesParts.push(`Experience Level: ${data.experience}`)
      if (data.linkedinUrl) notesParts.push(`LinkedIn Profile: ${data.linkedinUrl}`)
      if (coverFile) notesParts.push(`Uploaded Separate Cover Letter: ${coverFile.name}`)
      if (data.coverLetter && data.coverLetter.trim()) {
        notesParts.push(`\nCareer Summary / Cover Note:\n${data.coverLetter.trim()}`)
      }

      await submitCandidateApplication({
        fullName,
        email: data.email.trim().toLowerCase(),
        phone: normalizedPhone,
        headline: data.headline.trim(),
        availability: data.availability || undefined,
        salaryExpectation: parsedSalary,
        cvPath: uploadTarget.path,
        vacancySlug: 'general-talent-pool',
        notes: notesParts.join('\n'),
        screeningAnswers: {
          discipline: data.discipline,
          country: data.country,
          experience: data.experience || '',
          linkedinUrl: data.linkedinUrl || '',
        },
        honeypot: data.honeypot,
      })

      trackEvent('submit_application', {
        event_category: 'Recruitment',
        event_label: data.discipline,
        country: data.country,
      })

      setSubmittedCandidate({ name: fullName, discipline: data.discipline })
      setIsSuccess(true)
      reset()
      setCvFile(null)
      setCoverFile(null)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred during submission.'
      setSubmitError(message)
    } finally {
      setSubmitting(false)
      setSubmitStep('')
    }
  }

  return (
    <div id="cv-upload" className="scroll-mt-24 rounded-3xl border border-ink/[0.08] bg-white p-6 shadow-card-lg sm:p-10 lg:p-12">
      {isSuccess ? (
        <div className="py-8 text-center sm:py-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-accent/15 text-teal-primary ring-8 ring-cyan-accent/10">
            <CheckCircle2 className="h-10 w-10 text-teal-primary" />
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-teal-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-primary">
            Profile Enrolled Successfully
          </span>
          <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Curriculum Vitae Received &amp; Registered
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-muted sm:text-base">
            Thank you, <strong className="text-ink">{submittedCandidate?.name}</strong>. Your profile has been securely placed in the confidential <strong className="text-ink">JantaHR Talent Pool</strong> under <span className="font-semibold text-teal-primary">{submittedCandidate?.discipline}</span>.
          </p>
          <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-ink/[0.06] bg-offwhite p-5 text-left text-xs leading-relaxed text-slate-muted">
            <p className="font-semibold text-ink">What happens next?</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-4">
              <li>Our talent acquisition consultants review registered profiles weekly against upcoming client roles.</li>
              <li>When a matching role aligns with your background, a JantaHR recruiter will contact you directly.</li>
              <li>Your CV and credentials remain private and will never be shared with any client organization without your prior explicit authorization.</li>
            </ul>
          </div>
          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="btn btn-primary btn-md"
            >
              Submit Another Profile
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline btn-md"
              >
                Close Form
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between border-b border-ink/[0.08] pb-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-primary">
                <UserCheck className="h-3.5 w-3.5" />
                JantaHR Talent Pool
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Submit Your CV
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-muted sm:text-base">
                Join our talent network across Uganda and East Africa. Even when public roles are not actively listed, our clients—from funded startups to established corporates—frequently ask us to shortlist talent directly from our private registry.
              </p>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-slate-muted transition-colors hover:bg-offwhite hover:text-ink"
                title="Collapse form"
                aria-label="Collapse form"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8" noValidate>
            {/* Honeypot anti-spam */}
            <input
              type="text"
              {...register('honeypot')}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Section 1: Standard Candidate Information */}
            <div>
              <h3 className="font-heading text-base font-bold text-ink">
                1. Candidate Information
              </h3>
              <p className="mt-1 text-xs text-slate-muted">
                Essential contact details so our recruitment team can reach you.
              </p>

              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="tp-firstName" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="tp-firstName"
                    type="text"
                    placeholder="e.g. Florence"
                    {...register('firstName')}
                    className="input-base mt-2"
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tp-lastName" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="tp-lastName"
                    type="text"
                    placeholder="e.g. Nakato"
                    {...register('lastName')}
                    className="input-base mt-2"
                  />
                  {errors.lastName && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="tp-email" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="tp-email"
                    type="email"
                    placeholder="florence@example.com"
                    {...register('email')}
                    className="input-base mt-2"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tp-phone" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="tp-phone"
                    type="tel"
                    placeholder="+256 700 000000 or 0772..."
                    {...register('phone')}
                    className="input-base mt-2"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="tp-country" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                    Country of Residence <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tp-country"
                    {...register('country')}
                    className="input-base mt-2"
                  >
                    <option value="Uganda">Uganda</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Other">Other / Diaspora</option>
                  </select>
                  {errors.country && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.country.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tp-linkedin" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative mt-2">
                    <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-muted" />
                    <input
                      id="tp-linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      {...register('linkedinUrl')}
                      className="input-base pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Professional Profile & Career Focus */}
            <div className="border-t border-ink/[0.08] pt-6">
              <h3 className="font-heading text-base font-bold text-ink">
                2. Role Focus &amp; Experience
              </h3>
              <p className="mt-1 text-xs text-slate-muted">
                Help us categorize your profile so we can reach out for the right roles.
              </p>

              <div className="mt-4">
                <label htmlFor="tp-headline" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                  Current Role / Professional Headline <span className="text-red-500">*</span>
                </label>
                <input
                  id="tp-headline"
                  type="text"
                  placeholder="e.g. Senior Financial Controller | Head of Human Resources | Full Stack Engineer"
                  {...register('headline')}
                  className="input-base mt-2"
                />
                {errors.headline && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.headline.message}</p>
                )}
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="tp-discipline" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                    Primary Functional Area <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tp-discipline"
                    {...register('discipline')}
                    className="input-base mt-2"
                  >
                    <option value="Human Resources & People Operations">Human Resources &amp; People Operations</option>
                    <option value="Finance, Accounting & Audit">Finance, Accounting &amp; Audit</option>
                    <option value="Leadership & General Management">Leadership &amp; General Management</option>
                    <option value="Technology, Engineering & IT">Technology, Engineering &amp; IT</option>
                    <option value="Sales, Commercial & Business Development">Sales, Commercial &amp; Business Development</option>
                    <option value="Legal, Compliance & Governance">Legal, Compliance &amp; Governance</option>
                    <option value="Supply Chain, Logistics & Operations">Supply Chain, Logistics &amp; Operations</option>
                    <option value="Non-Profit, ESG & Development Programs">Non-Profit, ESG &amp; Development Programs</option>
                    <option value="Other Professional Discipline">Other Professional Discipline</option>
                  </select>
                  {errors.discipline && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.discipline.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tp-experience" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                    Years of Professional Experience
                  </label>
                  <select
                    id="tp-experience"
                    {...register('experience')}
                    className="input-base mt-2"
                  >
                    <option value="1 - 3 years">1 - 3 years (Junior / Associate)</option>
                    <option value="4 - 7 years">4 - 7 years (Mid-Level Professional)</option>
                    <option value="8 - 12 years">8 - 12 years (Senior / Lead)</option>
                    <option value="13+ years">13+ years (Senior Leadership / C-Suite)</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="tp-availability" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                    Availability / Notice Period
                  </label>
                  <select
                    id="tp-availability"
                    {...register('availability')}
                    className="input-base mt-2"
                  >
                    <option value="Immediately Available">Immediately Available</option>
                    <option value="2 Weeks Notice">2 Weeks Notice</option>
                    <option value="1 Month Notice">1 Month Notice</option>
                    <option value="2 Months Notice">2 Months Notice</option>
                    <option value="3+ Months Notice">3+ Months Notice</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tp-salary" className="block text-xs font-semibold uppercase tracking-wider text-ink">
                    Expected Gross Compensation <span className="font-normal text-slate-muted">(Optional)</span>
                  </label>
                  <input
                    id="tp-salary"
                    type="text"
                    placeholder="e.g. UGX 6,000,000 or USD 2,500"
                    {...register('salaryExpectation')}
                    className="input-base mt-2"
                  />
                  <p className="mt-1 text-[11px] text-slate-muted">Monthly gross range to assist recruiter matching.</p>
                </div>
              </div>
            </div>

            {/* Section 3: Resume / CV Upload */}
            <div className="border-t border-ink/[0.08] pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-base font-bold text-ink">
                    3. Resume / Curriculum Vitae <span className="text-red-500">*</span>
                  </h3>
                  <p className="mt-1 text-xs text-slate-muted">
                    Upload your CV in PDF, DOC, or DOCX format (Max 10 MB).
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {cvFile ? (
                  <div className="flex items-center justify-between rounded-2xl border border-teal-primary/30 bg-teal-primary/5 p-4 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-primary/10 text-teal-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">{cvFile.name}</p>
                        <p className="text-xs text-slate-muted">
                          {(cvFile.size / 1024 / 1024).toFixed(2)} MB · {cvFile.type.split('/')[1]?.toUpperCase() || 'DOCUMENT'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCvFile(null)}
                      className="rounded-lg p-1.5 text-slate-muted hover:bg-ink/[0.05] hover:text-ink"
                      aria-label="Remove CV file"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsDragging(true)
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                      isDragging
                        ? 'border-teal-primary bg-teal-primary/5'
                        : 'border-ink/[0.12] bg-offwhite hover:border-teal-primary/50 hover:bg-teal-primary/[0.02]'
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-teal-primary shadow-soft">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-ink">
                      Drag &amp; drop your CV here, or <span className="text-teal-primary underline">browse files</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-muted">
                      Supports PDF, DOC, DOCX up to 10 MB
                    </p>
                  </div>
                )}

                {cvError && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {cvError}
                  </p>
                )}
              </div>
            </div>

            {/* Section 4: Cover Letter / Brief Introduction */}
            <div className="border-t border-ink/[0.08] pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-heading text-base font-bold text-ink">
                    4. Cover Note / Summary <span className="font-normal text-slate-muted">(Optional)</span>
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-muted">
                    Introduce yourself, highlight key achievements, or detail specific role preferences.
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-xl bg-offwhite p-1 border border-ink/[0.08]">
                  <button
                    type="button"
                    onClick={() => setCoverMode('text')}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      coverMode === 'text'
                        ? 'bg-teal-primary text-white shadow-xs'
                        : 'text-slate-muted hover:text-ink'
                    }`}
                  >
                    <PenTool className="h-3 w-3" />
                    Write Note
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverMode('file')}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      coverMode === 'file'
                        ? 'bg-teal-primary text-white shadow-xs'
                        : 'text-slate-muted hover:text-ink'
                    }`}
                  >
                    <FileText className="h-3 w-3" />
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverMode('skip')}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      coverMode === 'skip'
                        ? 'bg-ink/[0.08] text-ink'
                        : 'text-slate-muted hover:text-ink'
                    }`}
                  >
                    Skip
                  </button>
                </div>
              </div>

              {coverMode === 'text' && (
                <div className="mt-4">
                  <textarea
                    rows={4}
                    placeholder="Briefly summarize your background, core competencies, or career aspirations..."
                    {...register('coverLetter')}
                    className="input-base h-auto resize-none py-3"
                  />
                </div>
              )}

              {coverMode === 'file' && (
                <div className="mt-4">
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) setCoverFile(f)
                    }}
                    className="hidden"
                  />
                  {coverFile ? (
                    <div className="flex items-center justify-between rounded-2xl border border-teal-primary/30 bg-teal-primary/5 p-3.5">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-teal-primary" />
                        <span className="text-xs font-medium text-ink">{coverFile.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCoverFile(null)}
                        className="rounded-lg p-1 text-slate-muted hover:text-ink"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/[0.15] bg-offwhite py-4 text-xs font-medium text-slate-muted hover:border-teal-primary hover:text-teal-primary"
                    >
                      <UploadCloud className="h-4 w-4" />
                      Choose separate cover letter file (PDF or Word)
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Section 5: Data Protection & Consent */}
            <div className="border-t border-ink/[0.08] pt-6">
              <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-muted cursor-pointer">
                <input
                  type="checkbox"
                  {...register('consent')}
                  className="mt-0.5 h-4 w-4 rounded border-ink/20 text-teal-primary focus:ring-teal-primary"
                />
                <span>
                  I consent to JantaHR securely holding and processing my CV and professional details for current and future employment opportunities across East Africa in full compliance with the <strong className="text-ink">Uganda Data Protection and Privacy Act 2019</strong>. My profile will remain strictly confidential and will never be presented to a prospective client without my prior consent. <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 text-xs text-red-600">{errors.consent.message}</p>
              )}
            </div>

            {/* Error banner */}
            {submitError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-800">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <div>
                    <strong className="font-semibold">Unable to submit:</strong>
                    <p className="mt-0.5">{submitError}</p>
                    <p className="mt-2 text-slate-muted">
                      If the issue persists, please email your CV directly to{' '}
                      <a href="mailto:careers@jantahr.com" className="font-semibold text-teal-primary underline">
                        careers@jantahr.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-muted">
                <ShieldCheck className="h-4 w-4 text-teal-primary" />
                <span>Private &amp; confidential candidate submission</span>
              </div>

              <div className="flex items-center gap-3">
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-outline btn-md"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-lg inline-flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{submitStep || 'Processing...'}</span>
                    </>
                  ) : (
                    <>
                      <span>Submit CV to Talent Pool</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
