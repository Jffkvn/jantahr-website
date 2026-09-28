import { Link } from 'react-router-dom'
import { ArrowRight, Users, LayoutDashboard } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import TiltCard from '@/components/effects/TiltCard'

/**
 * The bridge: visually ties the consultancy to the platform.
 */
export default function BridgeSection() {
  return (
    <section className="relative overflow-hidden bg-offwhite py-24 lg:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-ink/15 to-transparent"
      />
      <div className="container-page">
        <Reveal align="center" className="mx-auto max-w-3xl text-center">
          <p className="section-label text-teal-primary">WHY JANTAHR</p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-ink text-balance lg:text-[2.75rem] lg:leading-[1.1]">
            Two ways to work with us. One people-first philosophy.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-muted text-pretty">
            We run HR for real organizations — and we built our own platform to do it better.
            Whether you want expert consultants in your corner or the software to run it yourself,
            we&apos;ve got you covered.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Consulting path */}
          <Reveal direction="left">
            <TiltCard className="h-full rounded-3xl" max={4}>
              <Link
                to="/services"
                className="group block h-full rounded-3xl border border-ink/5 bg-white p-8 shadow-card transition-shadow hover:shadow-card-lg lg:p-10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-primary/10">
                  <Users className="h-7 w-7 text-teal-primary" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-ink">
                  HR Consulting &amp; Training
                </h3>
                <p className="mt-3 leading-relaxed text-slate-muted">
                  Recruitment, compensation, compliance, staff training, and applied AI programs —
                  delivered by practitioners who know East African workplaces.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-slate-muted">
                  {['Recruitment process outsourcing', 'Compensation & benefits', 'Compliance & training', 'AI readiness programs'].map((t) => (
                    <li key={t} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent" />
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 font-medium text-teal-primary transition-all group-hover:gap-3">
                  Explore services
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </TiltCard>
          </Reveal>

          {/* Platform path */}
          <Reveal direction="right">
            <TiltCard className="h-full rounded-3xl" max={4}>
              <Link
                to="/platform"
                className="group relative block h-full overflow-hidden rounded-3xl bg-teal-deep p-8 text-white shadow-card transition-shadow hover:shadow-card-lg lg:p-10"
              >
                <div className="absolute inset-0 bg-mesh-dark opacity-80" aria-hidden />
                <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" aria-hidden />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-accent/15">
                    <LayoutDashboard className="h-7 w-7 text-cyan-accent" />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold">JantaHR Platform</h3>
                  <p className="mt-3 leading-relaxed text-white/75">
                    An integrated HR &amp; payroll platform with automated PAYE &amp; NSSF,
                    employee dossiers, leave, advances, performance, and audit trail — built for
                    Ugandan compliance.
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm text-white/75">
                    {['Automated monthly payroll runs', 'URA-compliant PAYE & NSSF engine', 'Employee self-service portal', 'Immutable audit logging'].map((t) => (
                      <li key={t} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 font-medium text-cyan-accent transition-all group-hover:gap-3">
                    Explore the platform
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
