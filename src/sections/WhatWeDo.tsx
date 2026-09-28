import { Link } from 'react-router-dom'
import { Users, Brain, ArrowRight, Monitor, Check } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import TiltCard from '@/components/effects/TiltCard'

const coreHrServices = [
  'Corporate staff training & leadership development',
  'Recruitment Process Outsourcing (RPO)',
  'Uganda statutory compensation & benefits design',
  'Labour compliance & policy advisory',
]

const aiServices = [
  'Applied AI awareness & workplace readiness',
  'Customer service & response acceleration',
  'Sales, marketing & proposal workflows',
  'Data privacy & ethical AI governance',
]

const platformFeatures = [
  '100% URA-compliant PAYE & NSSF calculations',
  'Digital employee dossiers & leave calendars',
  'Salary advances with auto-payroll deductions',
  'One-click PDF payslips & Excel bank exports',
]

export default function WhatWeDo() {
  return (
    <section className="bg-offwhite pb-20 pt-4 sm:pb-24 lg:pb-28">
      <div className="container-page">
        <Reveal>
          <p className="section-label mx-auto justify-center text-teal-primary">Our three pillars</p>
          <h2 className="mt-4 text-center font-heading text-3xl font-bold text-ink text-balance sm:text-[2rem] lg:text-4xl">
            What We Do
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-muted text-pretty">
            Combining deep East African human resource advisory with modern payroll software and future-ready workforce training.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {/* Card 1: Core HR Services */}
          <Reveal direction="up" delay={0.04}>
            <TiltCard max={3} className="h-full rounded-3xl">
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/[0.06] bg-white shadow-card transition-shadow duration-300 hover:shadow-card-lg">
                <div className="relative h-56 w-full overflow-hidden bg-slate-100 sm:h-64">
                  <img
                    src="/images/services/training-workshop.jpg"
                    alt="Corporate training and HR consultation in Kampala"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-primary text-white shadow-md">
                      <Users className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      Advisory &amp; People
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-ink">
                    Core HR Consulting
                  </h3>
                  <p className="mt-2 text-sm text-slate-muted">
                    Hands-on organizational strategy, corporate training, and talent acquisition delivered by seasoned HR directors.
                  </p>
                  <ul className="mt-4 flex-1 space-y-2 border-t border-ink/[0.06] pt-4">
                    {coreHrServices.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-xs text-slate-muted sm:text-sm">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/services" className="link-arrow-dark mt-6">
                    Explore consulting services <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Card 2: HR Technology Platform */}
          <Reveal direction="up" delay={0.12}>
            <TiltCard max={3} className="h-full rounded-3xl">
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-teal-primary/30 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-lg ring-2 ring-teal-primary/10">
                <div className="relative h-56 w-full overflow-hidden bg-teal-deep sm:h-64">
                  <img
                    src="/images/platform/dashboard-1200.jpg"
                    alt="JantaHR OneHub HR & Payroll platform dashboard"
                    className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-transparent to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full border border-cyan-accent/30 bg-teal-deep/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cyan-accent backdrop-blur-sm">
                    Proprietary Software
                  </span>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-accent text-teal-deep shadow-md">
                      <Monitor className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      JantaHR OneHub
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-ink">
                    HR &amp; Payroll Software
                  </h3>
                  <p className="mt-2 text-sm text-slate-muted">
                    Automate monthly payroll, statutory URA PAYE/NSSF calculations, and employee self-service records in one unified hub.
                  </p>
                  <ul className="mt-4 flex-1 space-y-2 border-t border-ink/[0.06] pt-4">
                    {platformFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-slate-muted sm:text-sm">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/platform" className="link-arrow-dark mt-6 text-teal-primary font-semibold">
                    See platform capabilities <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Card 3: Applied AI Training */}
          <Reveal direction="up" delay={0.2}>
            <TiltCard max={3} className="h-full rounded-3xl">
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/[0.06] bg-white shadow-card transition-shadow duration-300 hover:shadow-card-lg">
                <div className="relative h-56 w-full overflow-hidden bg-slate-100 sm:h-64">
                  <img
                    src="/images/ai-training/ai-training-session.jpg"
                    alt="Workplace AI training workshop for East African teams"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-deep text-cyan-accent shadow-md">
                      <Brain className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      Workforce Readiness
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-ink">
                    Applied AI Training
                  </h3>
                  <p className="mt-2 text-sm text-slate-muted">
                    Upskill your administrative, sales, and service staff to use modern AI securely and boost daily team productivity.
                  </p>
                  <ul className="mt-4 flex-1 space-y-2 border-t border-ink/[0.06] pt-4">
                    {aiServices.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-xs text-slate-muted sm:text-sm">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/ai-training" className="link-arrow-dark mt-6">
                    View AI training curriculum <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
