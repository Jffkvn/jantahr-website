import { useState } from 'react'
import { Check, ArrowRight, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '@/components/effects/Reveal'
import { platformFeatures } from '@/data/platform'
import { cn } from '@/lib/utils'

const featureScreenshots: Record<string, string> = {
  'Employee Dossiers': '/images/platform/record-1200.jpg',
  'Automated Payroll Runs': '/images/platform/payroll-1200.jpg',
  'Leave Management': '/images/platform/leave-1200.jpg',
  'Salary Advances': '/images/platform/dashboard-1200.jpg',
  'Pay Grades': '/images/platform/employees-1200.jpg',
  'Performance Reviews': '/images/platform/record-1200.jpg',
  'Audit Log': '/images/platform/reports-1200.jpg',
  'Reports & Analytics': '/images/platform/reports-1200.jpg',
}

export default function FeatureShowcase() {
  const [active, setActive] = useState(0)
  const feature = platformFeatures[active]
  const currentImg = featureScreenshots[feature.title] || '/images/platform/dashboard-1200.jpg'

  return (
    <section id="features" className="section-pad scroll-mt-28 bg-offwhite">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal-primary">
              <Layers className="h-3.5 w-3.5" />
              Interactive Product Tour
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink text-balance sm:text-[2rem] lg:text-4xl">
              Everything Your People Team Needs
            </h2>
            <p className="mt-4 text-slate-muted text-pretty">
              Explore the eight integrated modules powering JantaHR OneHub — designed for East African compliance from the ground up.
            </p>
          </div>
        </Reveal>

        {/* Feature Selector & Visual UI Showcase */}
        <div className="mt-12 hidden gap-8 lg:mt-16 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          {/* Navigation Pill List */}
          <Reveal direction="left">
            <div className="space-y-2">
              {platformFeatures.map((f, i) => {
                const Icon = f.icon
                const isActive = i === active
                return (
                  <button
                    key={f.title}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all duration-200',
                      isActive
                        ? 'border-teal-primary bg-white shadow-card-lg ring-1 ring-teal-primary/20'
                        : 'border-transparent bg-transparent hover:bg-white/70 text-slate-muted',
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                          isActive ? 'bg-teal-primary text-white' : 'bg-ink/[0.04] text-ink/50',
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <span
                          className={cn(
                            'block font-heading text-sm font-semibold',
                            isActive ? 'text-ink' : 'text-ink/70',
                          )}
                        >
                          {f.title}
                        </span>
                        <span className="text-[0.65rem] text-slate-muted">
                          {f.bullets.slice(0, 2).join(' · ')}
                        </span>
                      </div>
                    </div>
                    {isActive && (
                      <span className="flex h-2 w-2 rounded-full bg-cyan-accent" />
                    )}
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* Interactive Screen Viewer */}
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-[2rem] border border-ink/[0.08] bg-white p-6 shadow-card-lg lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Real UI Screenshot */}
                  <div className="group relative overflow-hidden rounded-2xl border border-ink/[0.08] bg-slate-50 shadow-inner">
                    <img
                      src={currentImg}
                      alt={`JantaHR ${feature.title} user interface`}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 right-3 rounded-lg border border-black/10 bg-black/60 px-3 py-1 text-[0.65rem] font-medium text-white backdrop-blur-md">
                      Live Software UI
                    </div>
                  </div>

                  {/* Feature Details */}
                  <div>
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-slate-muted">
                      {feature.description}
                    </p>

                    <div className="mt-5 border-t border-ink/[0.06] pt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                        Capabilities &amp; Compliance Controls
                      </p>
                      <ul className="mt-3 grid grid-cols-2 gap-3">
                        {feature.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2 text-sm text-ink/80">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-primary/10 text-teal-primary">
                              <Check className="h-3 w-3" />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        {/* Mobile View - Stacked Cards with Screenshots */}
        <div className="mt-10 grid gap-6 lg:hidden">
          {platformFeatures.map((f, i) => {
            const Icon = f.icon
            const screenshot = featureScreenshots[f.title] || '/images/platform/dashboard-1200.jpg'
            return (
              <Reveal key={f.title} delay={i * 0.05}>
                <article className="overflow-hidden rounded-3xl border border-ink/[0.08] bg-white shadow-card">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={screenshot}
                      alt={f.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-primary/10 text-teal-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-ink">{f.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-muted">{f.description}</p>
                    <ul className="mt-4 space-y-2 border-t border-ink/[0.06] pt-3">
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-xs text-ink/75">
                          <Check className="h-3.5 w-3.5 shrink-0 text-teal-primary" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div className="mt-14 text-center">
            <Link to="/contact" className="btn btn-primary btn-lg inline-flex items-center gap-2">
              Request Full Platform Walkthrough
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
