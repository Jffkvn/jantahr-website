import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Check, ShieldCheck, Calculator, Users } from 'lucide-react'
import GradientMesh from '@/components/effects/GradientMesh'
import Reveal from '@/components/effects/Reveal'

const highlights = [
  { icon: Calculator, text: 'Automated PAYE, NSSF & WHT calculations' },
  { icon: Users, text: 'Employee dossiers & self-service portal' },
  { icon: ShieldCheck, text: 'Row-level security & audit trail' },
]

export default function PlatformTeaser() {
  return (
    <section className="relative overflow-hidden bg-teal-deep py-24 text-white lg:py-32">
      <GradientMesh variant="dark" />
      <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay" aria-hidden />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <Reveal>
              <p className="section-label text-cyan-accent">THE PLATFORM</p>
              <h2 className="mt-4 font-heading text-3xl font-bold text-balance lg:text-[2.75rem] lg:leading-[1.1]">
                The HR &amp; payroll platform our consultants built — for your team.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75 text-pretty">
                Run monthly payroll in minutes with statutory deductions handled automatically.
                Manage employee records, leave, advances, and performance — all in one compliant,
                secure workspace.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-3">
                {highlights.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-white/85">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-accent/15">
                      <Icon className="h-4.5 w-4.5 text-cyan-accent" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link to="/platform" className="btn btn-primary btn-lg group">
                  See all features
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg">
                  Request a demo
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: animated payroll calculation card */}
          <Reveal direction="left" delay={0.1}>
            <div className="relative mx-auto w-full max-w-md">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-card-lg backdrop-blur-xl"
              >
                <div className="rounded-[18px] bg-offwhite p-6 text-ink">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-soft">Payslip preview</p>
                      <p className="font-heading text-lg font-bold">A. Nakato</p>
                    </div>
                    <span className="rounded-full bg-teal-primary/10 px-3 py-1 text-xs font-semibold text-teal-primary">
                      Local employee
                    </span>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {[
                      { label: 'Gross salary', value: '4,200,000', strong: true },
                      { label: 'Overtime', value: '120,000' },
                      { label: 'PAYE', value: '−582,000', neg: true },
                      { label: 'NSSF (5%)', value: '−216,000', neg: true },
                    ].map((row, i) => (
                      <motion.div
                        key={row.label}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className={row.strong ? 'font-semibold text-ink' : 'text-slate-muted'}>
                          {row.label}
                        </span>
                        <span className={`font-heading font-semibold ${row.neg ? 'text-red-500' : 'text-ink'}`}>
                          UGX {row.value}
                        </span>
                      </motion.div>
                    ))}
                    <div className="!mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
                      <span className="font-heading font-bold text-ink">Net pay</span>
                      <span className="font-heading text-xl font-bold text-teal-primary">UGX 3,522,000</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-cyan-accent/10 px-3 py-2.5">
                    <Check className="h-4 w-4 text-teal-primary" />
                    <span className="text-xs font-medium text-teal-primary">
                      Auto-calculated · URA-compliant
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-4 -bottom-4 rounded-2xl border border-white/10 bg-teal-deep px-4 py-3 shadow-card-lg sm:-right-8"
              >
                <p className="text-[0.6rem] uppercase tracking-wide text-white/50">Audit log</p>
                <p className="font-heading text-sm font-bold text-cyan-accent">+1 entry</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
