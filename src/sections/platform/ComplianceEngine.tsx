import Reveal from '@/components/effects/Reveal'
import { payeBands, surcharge, nssf } from '@/data/platform'
import { ShieldCheck, Calculator, Percent } from 'lucide-react'

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

const bandWidths = [18, 28, 38, 100]

export default function ComplianceEngine() {
  const bands = [...payeBands]

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <p className="section-label text-teal-primary">Compliance engine</p>
            <h2 className="mt-4 max-w-lg font-heading text-3xl font-bold leading-[1.15] tracking-tight text-ink text-balance sm:text-[2rem] lg:text-4xl">
              URA-ready PAYE, NSSF &amp; WHT — calculated for you
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-slate-muted">
              Official Uganda Revenue Authority bands, NSSF Act rates, and configurable withholding
              tax. No manual spreadsheets. No last-minute surprises.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Calculator, label: 'Auto PAYE', sub: 'Banded monthly' },
                { icon: Percent, label: 'NSSF split', sub: `${nssf.employee}% / ${nssf.employer}%` },
                { icon: ShieldCheck, label: 'Audit ready', sub: 'Export anytime' },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-ink/[0.06] bg-offwhite p-4 shadow-soft"
                >
                  <Icon className="h-5 w-5 text-teal-primary" />
                  <p className="mt-3 text-sm font-semibold text-ink">{label}</p>
                  <p className="mt-0.5 text-xs text-slate-muted">{sub}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="overflow-hidden rounded-[1.75rem] border border-ink/[0.06] bg-offwhite shadow-card-lg">
              <div className="border-b border-ink/[0.05] bg-white px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-soft">
                  PAYE bands · UGX / month
                </p>
              </div>

              <div className="space-y-4 p-6">
                {bands.map((b, i) => {
                  const isLast = i === bands.length - 1
                  return (
                    <div key={`${b.min}-${b.max}`}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="font-medium text-ink/70">
                          {isLast ? `${fmt(b.min)}+` : `${fmt(b.min)} – ${fmt(b.max!)}`}
                        </span>
                        <span className="font-heading font-bold text-teal-primary">{b.rate}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-ink/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-primary to-cyan-accent"
                          style={{ width: `${bandWidths[i]}%`, opacity: 0.35 + i * 0.2 }}
                        />
                      </div>
                    </div>
                  )
                })}

                <div className="flex items-center justify-between rounded-xl border border-cyan-accent/20 bg-cyan-accent/10 px-4 py-3.5">
                  <div>
                    <p className="text-xs font-semibold text-teal-primary">Super-earner surcharge</p>
                    <p className="mt-0.5 text-[0.7rem] text-slate-muted">
                      Above UGX {fmt(surcharge.threshold)}
                    </p>
                  </div>
                  <p className="font-heading text-lg font-bold text-ink">+{surcharge.rate}%</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white p-4 shadow-soft">
                    <p className="text-xs text-slate-soft">NSSF employee</p>
                    <p className="mt-1 font-heading text-2xl font-bold text-teal-deep">
                      {nssf.employee}%
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4 shadow-soft">
                    <p className="text-xs text-slate-soft">NSSF employer</p>
                    <p className="mt-1 font-heading text-2xl font-bold text-teal-deep">
                      {nssf.employer}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
