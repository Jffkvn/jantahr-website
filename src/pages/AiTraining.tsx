import { useState } from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/primitives'
import {
  trainingUnits,
  aiTrainingAudience,
  aiTrainingWhy,
  trainingPricing,
  TRAINING_UNIT_OPTIONS,
  type TrainingUnitName,
} from '@/data/training'
import { AI_TRAINING_ENDPOINT } from '@/lib/constants'

const isTrainingUnitName = (v: string): v is TrainingUnitName =>
  (TRAINING_UNIT_OPTIONS as readonly string[]).includes(v)

type FormValues = {
  fullName: string
  email: string
  phone: string
  organization: string
  trainingUnit: TrainingUnitName | ''
  notes: string
}

const initialForm: FormValues = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  trainingUnit: '',
  notes: '',
}

type FormErrors = Partial<Record<'fullName' | 'email' | 'phone' | 'trainingUnit', string>>

export default function AiTraining() {
  const [form, setForm] = useState<FormValues>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const scrollToForm = () =>
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name.'
    if (!form.email.trim()) e.email = 'Please enter your work email.'
    if (!form.phone.trim()) e.phone = 'Please enter your phone (include country code).'
    if (!form.trainingUnit) e.trainingUnit = 'Please select a training unit.'
    return e
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setSubmitError(null)
    setSuccess(false)

    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return

    const fd = new FormData(ev.currentTarget)
    const honeypot = fd.get('website')?.toString().trim() ?? ''

    const payload = {
      leadType: 'ai_training',
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      organization: form.organization.trim() || undefined,
      trainingUnit: form.trainingUnit,
      message: form.notes.trim() || undefined,
      honeypot,
      sourcePage: '/ai-training',
      submittedAt: new Date().toISOString(),
    }

    setSubmitting(true)

    try {
      if (!AI_TRAINING_ENDPOINT) {
        // Fallback when endpoint is not yet configured: direct mailto client
        const subject = encodeURIComponent(`AI Training Booking: ${form.trainingUnit || 'General'}`)
        const body = encodeURIComponent(
          `Name: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nOrganization: ${form.organization}\nTraining Unit: ${form.trainingUnit}\nNotes: ${form.notes}`
        )
        window.location.href = `mailto:hello@jantahr.com?subject=${subject}&body=${body}`
        setSuccess(true)
      } else {
        const isAppsScript = new URL(AI_TRAINING_ENDPOINT).hostname.endsWith('script.google.com')
        const res = await fetch(AI_TRAINING_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': isAppsScript ? 'text/plain;charset=utf-8' : 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Failed with status ${res.status}`)
        setSuccess(true)
      }

      setForm(initialForm)
      setErrors({})
    } catch {
      setSubmitError('Something went wrong. Please try again or contact us directly at hello@jantahr.com.')
    } finally {
      setSubmitting(false)
    }
  }

  const set = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (field in errors) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero pb-16 lg:pb-20">
        <div className="page-hero-bg bg-mesh-dark opacity-90" aria-hidden />
        <div
          className="page-hero-bg opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 15% 20%, rgba(46,195,229,0.14), transparent 60%)',
          }}
          aria-hidden
        />
        <div className="page-hero-bg bg-grain opacity-[0.07] mix-blend-overlay" aria-hidden />
        <div className="container-page relative">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="section-label text-cyan-accent">AI training</p>
              <h1 className="mt-5 font-heading text-[2rem] font-bold leading-[1.1] text-balance sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
                AI Awareness &amp; Workplace Readiness
              </h1>
              <p className="mt-5 text-base leading-relaxed text-white/72 text-pretty sm:text-lg">
                Practical AI training for real workplaces. Help your teams understand AI, use it
                safely, and apply it to customer service, sales, and everyday operations across
                Kampala and East Africa.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={scrollToForm} className="btn btn-primary btn-lg">
                  Register for training
                </button>
                <ButtonLink to="/contact" variant="outline-light" size="lg">
                  Talk to us
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal>
              <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-card-lg">
                <img
                  src="/images/ai-training/ai-training-hero.jpg"
                  alt="Group of professionals learning about AI in a training room"
                  width={1280}
                  height={720}
                  decoding="async"
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-offwhite py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="WHO THIS IS FOR" title="Who this training is for" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {aiTrainingAudience.map((g, i) => (
              <Reveal key={g} delay={i * 0.1}>
                <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card">{g}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Course units */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="COURSE UNITS" title="Training structure" />
            <div className="shrink-0 rounded-xl border border-teal-primary/20 bg-teal-primary/10 px-4 py-3">
              <p className="text-sm font-semibold text-teal-primary">{trainingPricing}</p>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {trainingUnits.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-ink/5 bg-offwhite p-7 shadow-card">
                  <h3 className="font-heading text-lg font-bold text-ink">{u.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-muted">{u.description}</p>
                  <ul className="mt-5 space-y-3">
                    {u.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-slate-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-slate-muted">
            Delivery options include half-day or full-day sessions, with pricing tailored to team
            size and format.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              '/images/ai-training/ai-training-session.jpg',
              '/images/ai-training/ai-training-collaboration.jpg',
            ].map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-ink/5 shadow-card">
                  <img
                    src={src}
                    alt={i === 0 ? 'Professionals during an AI training session' : 'Team members collaborating during AI training'}
                    width={1280}
                    height={800}
                    decoding="async"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why JantaHR */}
      <section className="bg-offwhite py-16 lg:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="WHY JANTAHR" title="Why JantaHR for AI training" />
          <ul className="mt-8 space-y-4">
            {aiTrainingWhy.map((p, i) => (
              <Reveal key={p} delay={i * 0.08}>
                <li className="flex items-start gap-3 text-slate-muted">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-primary" />
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Registration form */}
      <section id="registration" className="scroll-mt-28 bg-white py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <Reveal>
              <p className="section-label text-teal-primary">REGISTRATION</p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-ink lg:text-3xl">
                Register for AI training
              </h2>
              <p className="mt-4 leading-relaxed text-slate-muted">
                Share your details and preferred unit. We&apos;ll follow up with dates, delivery
                options, and final pricing based on your team setup.
              </p>
            </Reveal>

            <div className="rounded-3xl border border-ink/5 bg-offwhite p-6 shadow-card lg:p-8">
              {success && (
                <div className="mb-6 rounded-xl bg-teal-primary/10 border border-teal-primary/20 px-4 py-3 text-teal-primary">
                  Thank you. Our team will contact you to confirm your AI training booking.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden>
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-ink">Full name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={set('fullName')}
                    placeholder="Your full name"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-err' : undefined}
                    className="h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink outline-none transition-colors focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20"
                  />
                  {errors.fullName && <p id="fullName-err" className="text-sm text-red-600" role="alert">{errors.fullName}</p>}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="workEmail" className="block text-sm font-medium text-ink">Work email *</label>
                    <input
                      id="workEmail"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@organization.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-err' : undefined}
                      className="h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink outline-none transition-colors focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20"
                    />
                    {errors.email && <p id="email-err" className="text-sm text-red-600" role="alert">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-ink">Phone (include country code) *</label>
                    <input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+256..."
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-err' : undefined}
                      className="h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink outline-none transition-colors focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20"
                    />
                    {errors.phone && <p id="phone-err" className="text-sm text-red-600" role="alert">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="org" className="block text-sm font-medium text-ink">Organization name</label>
                  <input
                    id="org"
                    name="organization"
                    value={form.organization}
                    onChange={set('organization')}
                    placeholder="Organization (optional)"
                    className="h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink outline-none transition-colors focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="unit" className="block text-sm font-medium text-ink">Training unit *</label>
                  <select
                    id="unit"
                    name="trainingUnit"
                    value={form.trainingUnit || ''}
                    onChange={(e) => {
                      const v = e.target.value
                      setForm((f) => ({ ...f, trainingUnit: isTrainingUnitName(v) ? v : '' }))
                      if (errors.trainingUnit) setErrors((e) => ({ ...e, trainingUnit: undefined }))
                    }}
                    aria-invalid={!!errors.trainingUnit}
                    className="h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-sm text-ink outline-none transition-colors focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20"
                  >
                    <option value="">Select training unit</option>
                    {TRAINING_UNIT_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  {errors.trainingUnit && <p className="text-sm text-red-600" role="alert">{errors.trainingUnit}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-ink">Goals or notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={set('notes')}
                    rows={4}
                    placeholder="Any context or outcomes your team wants from the training."
                    className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-teal-primary focus:ring-2 focus:ring-teal-primary/20 resize-none"
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn btn-primary btn-lg">
                  {submitting ? 'Submitting...' : 'Submit registration'}
                </button>

                {submitError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    {submitError}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-offwhite py-16 lg:py-20">
        <div className="container-page">
          <div className="rounded-3xl bg-teal-deep p-8 lg:p-10 text-center grain-overlay">
            <h2 className="font-heading text-2xl font-bold text-white lg:text-3xl">
              Ready to train your team?
            </h2>
            <p className="mt-3 text-white/75">
              Choose a unit and we&apos;ll tailor delivery for your organization.
            </p>
            <div className="mt-8 flex flex-col gap-3 justify-center sm:flex-row">
              <button onClick={scrollToForm} className="btn btn-primary btn-md">
                Register for training
                <ArrowRight className="h-4 w-4" />
              </button>
              <ButtonLink to="/contact" variant="outline-light" size="md">
                Talk to us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
