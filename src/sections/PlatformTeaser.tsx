import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Calculator } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'

export default function PlatformTeaser() {
  return (
    <section className="relative overflow-hidden bg-teal-deep py-20 text-white lg:py-28">
      {/* Background glow and grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-accent/[0.1] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-teal-primary/30 blur-3xl"
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay" />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[48%_52%] lg:gap-16">
          {/* Left Text Column */}
          <Reveal direction="left">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-accent/25 bg-cyan-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-accent">
                <Zap className="h-3.5 w-3.5" />
                Featured Software Platform
              </span>

              <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                JantaHR OneHub <br />
                <span className="text-cyan-accent">HR that runs itself.</span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                Because we run HR operations for client companies across Uganda, we built our own platform to do it flawlessly. Automated monthly payroll, statutory URA computations, employee dossiers, and leave management — all in one place.
              </p>

              {/* Feature pills */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  'Automated PAYE & NSSF',
                  'Staff Advances & Deductions',
                  'Leave & Absence Tracking',
                  'Digital Employee Dossiers',
                  'One-Click PDF Payslips',
                ].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-accent" />
                    {pill}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link to="/platform" className="btn btn-primary btn-lg group">
                  Explore JantaHR OneHub
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/pricing" className="btn btn-outline-light btn-lg">
                  View Pricing Plans
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 text-xs text-white/60">
                <ShieldCheck className="h-4 w-4 text-cyan-accent" />
                <span>Encrypted tenant isolation · Built for the Income Tax Act &amp; NSSF Act</span>
              </div>
            </div>
          </Reveal>

          {/* Right Floating 3D Screenshot */}
          <Reveal direction="right" delay={0.15}>
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative rounded-3xl p-2 sm:p-4">
                {/* 3D Tilted container */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="group relative overflow-hidden rounded-2xl border border-white/20 bg-teal-deep/90 shadow-2xl transition-all duration-500 hover:shadow-cyan-accent/20 lg:[transform:perspective(1200px)_rotateY(-6deg)_rotateX(3deg)] lg:hover:[transform:perspective(1200px)_rotateY(0deg)_rotateX(0deg)]"
                >
                  <img
                    src="/images/platform/dashboard-1200.jpg"
                    alt="JantaHR OneHub Dashboard Screenshot"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-transparent to-transparent opacity-60" />

                  {/* Floating floating chip on top of screenshot */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/20 bg-teal-deep/90 p-3.5 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-accent/20 text-cyan-accent">
                        <Calculator className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Uganda Statutory Calculations</p>
                        <p className="text-[0.65rem] text-white/60">Zero manual PAYE, NSSF, or surcharge errors</p>
                      </div>
                    </div>
                    <Link
                      to="/platform#calculator"
                      className="rounded-lg bg-cyan-accent px-3 py-1.5 text-xs font-bold text-teal-deep transition-colors hover:bg-white"
                    >
                      Try Math
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
