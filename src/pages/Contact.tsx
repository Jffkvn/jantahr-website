import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Send, CheckCircle, Briefcase } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import PageHero from '@/components/ui/PageHero'
import { BRAND, FORMSPREE_ENDPOINT } from '@/lib/constants'
import { trackEvent } from '@/components/AnalyticsManager'

type ContactForm = {
  name: string
  email: string
  company: string
  phone: string
  interest: string
  message: string
}

const initial: ContactForm = {
  name: '', email: '', company: '', phone: '', interest: '', message: '',
}

type Errors = Partial<Pick<ContactForm, 'name' | 'email' | 'message'>>

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState('')

  const set = (field: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (field in errors) setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const validate = (): Errors => {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.message.trim()) e.message = 'Please tell us about your needs.'
    return e
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setSendError('')
    setSent(false)

    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return

    setSending(true)
    try {
      const fd = new FormData()
      fd.append('name', form.name.trim())
      fd.append('email', form.email.trim())
      fd.append('company', form.company.trim())
      fd.append('phone', form.phone.trim())
      fd.append('interest', form.interest)
      fd.append('message', form.message.trim())
      fd.append('_subject', `JantaHR inquiry: ${form.interest || 'General'}`)
      fd.append('_gotcha', (ev.currentTarget as HTMLFormElement).querySelector('[name="_gotcha"]')?.getAttribute('value') || '')

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      })

      if (!res.ok) throw new Error(`Failed with status ${res.status}`)

      trackEvent('generate_lead', {
        event_category: 'Contact',
        event_label: form.interest || 'General',
      })

      setForm(initial)
      setErrors({})
      setSent(true)
    } catch {
      setSendError('Unable to send. Please try again or email us directly.')
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    { icon: Phone, title: 'Phone', lines: BRAND.phones },
    { icon: Mail, title: 'Email', lines: [BRAND.email] },
    { icon: MapPin, title: 'Office', lines: [BRAND.location] },
  ]

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's start a conversation."
        description="We welcome inquiries from organizations seeking HR support, training, a platform demo, or advisory services."
      />

      <section className="section-pad bg-offwhite">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-ink lg:text-3xl">
                Contact information
              </h2>
              <p className="mt-4 leading-relaxed text-slate-muted">
                Reach out through any of these channels. Our team is ready to discuss how we can
                support your organization&apos;s HR needs.
              </p>
              <div className="mt-10 space-y-5">
                {contactInfo.map(({ icon: Icon, title, lines }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 rounded-2xl border border-ink/[0.05] bg-white p-4 shadow-soft"
                  >
                    <div className="icon-tile shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-ink">{title}</h3>
                      {lines.map((l) =>
                        title === 'Email' ? (
                          <a key={l} href={`mailto:${l}`} className="mt-0.5 block text-sm text-slate-muted transition-colors hover:text-teal-primary">
                            {l}
                          </a>
                        ) : title === 'Phone' ? (
                          <a key={l} href={`tel:${l.replace(/\s/g, '')}`} className="mt-0.5 block text-sm text-slate-muted transition-colors hover:text-teal-primary">
                            {l}
                          </a>
                        ) : (
                          <p key={l} className="mt-0.5 text-sm text-slate-muted">{l}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-heading font-semibold text-ink">Follow us</h3>
                <div className="mt-3 flex items-center gap-2.5">
                  {[
                    { Icon: Linkedin, href: BRAND.socials.linkedin, label: 'LinkedIn' },
                    { Icon: Instagram, href: BRAND.socials.instagram, label: 'Instagram' },
                    { Icon: Twitter, href: BRAND.socials.twitter, label: 'X' },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`JantaHR on ${label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/[0.06] bg-white text-ink/70 shadow-soft transition-colors hover:border-cyan-accent/30 hover:bg-cyan-accent/10 hover:text-teal-primary"
                    >
                      <Icon className="h-4.5 w-4.5 h-[1.1rem] w-[1.1rem]" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
                <h3 className="font-heading font-semibold text-ink">Working hours</h3>
                <div className="mt-4 space-y-2.5 text-sm text-slate-muted">
                  {BRAND.hours.map(({ day, time }) => (
                    <div key={day} className="flex justify-between gap-6">
                      <span>{day}</span>
                      <span className="font-medium text-ink/70">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="rounded-3xl border border-ink/[0.06] bg-white p-7 shadow-card-lg sm:p-9">
                {sent ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-accent/12">
                      <CheckCircle className="h-8 w-8 text-teal-primary" />
                    </div>
                    <h3 className="mt-6 font-heading text-2xl font-bold text-ink">Message sent!</h3>
                    <p className="mt-3 text-slate-muted">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-ink">
                      Send us a message
                    </h2>

                    <div className="mt-5 flex items-start gap-3 rounded-2xl border border-teal-primary/20 bg-teal-primary/5 p-4 text-xs text-ink/80">
                      <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-teal-primary" />
                      <div>
                        <span className="font-semibold text-teal-primary">Looking to submit your CV or join our Talent Pool?</span>
                        <p className="mt-0.5 text-slate-muted">
                          This contact form is for client and business inquiries. Jobseekers and professionals should use our{' '}
                          <Link to="/jobs#cv-upload" className="font-semibold text-teal-primary underline hover:text-teal-deep">
                            Direct CV Upload Form on the Careers page &rarr;
                          </Link>
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                      <input type="hidden" name="_subject" value="New Contact Form Submission" />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Full name *" id="name" error={errors.name}>
                          <input id="name" name="name" value={form.name} onChange={set('name')} placeholder="Your name" required
                            className="input-base" />
                        </Field>
                        <Field label="Email *" id="email" error={errors.email}>
                          <input id="email" name="email" type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" required
                            className="input-base" />
                        </Field>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Company" id="company">
                          <input id="company" name="company" value={form.company} onChange={set('company')} placeholder="Your company" className="input-base" />
                        </Field>
                        <Field label="Phone" id="c-phone">
                          <input id="c-phone" name="phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+256..." className="input-base" />
                        </Field>
                      </div>

                      <Field label="What do you need?" id="interest">
                        <select id="interest" name="interest" value={form.interest} onChange={set('interest')} className="input-base">
                          <option value="">Select an option</option>
                          <option value="HR consulting">HR consulting</option>
                          <option value="AI training">AI training</option>
                          <option value="Platform demo">JantaHR Platform demo</option>
                          <option value="Recruitment">Recruitment support</option>
                          <option value="General">General inquiry</option>
                        </select>
                      </Field>

                      <Field label="Message *" id="c-message" error={errors.message}>
                        <textarea id="c-message" name="message" value={form.message} onChange={set('message')} rows={5} required
                          placeholder="Tell us about your HR needs..." className="input-base h-auto resize-none py-3" />
                      </Field>

                      <button type="submit" disabled={sending} className="btn btn-primary btn-lg w-full">
                        {sending ? 'Sending...' : 'Send message'}
                        <Send className="h-4 w-4" />
                      </button>
                      {sendError && <p className="text-sm text-red-600" role="alert">{sendError}</p>}
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, id, error, children }: {
  label: string; id: string; error?: string; children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-ink">{label}</label>
      {children}
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
    </div>
  )
}
