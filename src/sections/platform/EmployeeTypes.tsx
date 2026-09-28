import Reveal from '@/components/effects/Reveal'
import { employeeTypes } from '@/data/platform'
import { User, Globe2, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'

const icons = [User, Globe2, Briefcase] as const

export default function EmployeeTypes() {
  return (
    <section className="section-pad bg-offwhite">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label mx-auto justify-center text-teal-primary">Flexibility</p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink text-balance sm:text-[2rem] lg:text-4xl">
              Three employee types, one engine
            </h2>
            <p className="mt-4 text-slate-muted text-pretty">
              Local staff, expats, and contractors — each gets the right statutory treatment without
              spreadsheet gymnastics.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {employeeTypes.map((t, i) => {
            const Icon = icons[i] ?? User
            const featured = i === 0
            return (
              <Reveal key={t.key} delay={i * 0.08}>
                <article
                  className={cn(
                    'relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border p-7 sm:p-8',
                    featured
                      ? 'border-cyan-accent/25 bg-teal-deep text-white shadow-card-lg'
                      : 'border-ink/[0.06] bg-white shadow-card',
                  )}
                >
                  {featured && (
                    <span className="absolute right-5 top-5 rounded-full bg-cyan-accent/15 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-cyan-accent">
                      Default
                    </span>
                  )}
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-2xl',
                      featured ? 'bg-cyan-accent/15 text-cyan-accent' : 'bg-cyan-accent/10 text-teal-primary',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3
                    className={cn(
                      'mt-5 font-heading text-xl font-bold tracking-tight',
                      featured ? 'text-white' : 'text-ink',
                    )}
                  >
                    {t.label}
                  </h3>
                  <p
                    className={cn(
                      'mt-2.5 flex-1 text-sm leading-relaxed',
                      featured ? 'text-white/65' : 'text-slate-muted',
                    )}
                  >
                    {t.description}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t pt-5" style={{ borderColor: featured ? 'rgba(255,255,255,0.1)' : 'rgba(11,43,59,0.06)' }}>
                    {t.deductions.map((d) => (
                      <li
                        key={d}
                        className={cn(
                          'flex items-center gap-2.5 text-sm font-medium',
                          featured ? 'text-white/85' : 'text-ink/80',
                        )}
                      >
                        <span
                          className={cn(
                            'h-1.5 w-1.5 shrink-0 rounded-full',
                            featured ? 'bg-cyan-accent' : 'bg-cyan-accent',
                          )}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
