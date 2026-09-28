import { motion } from 'motion/react'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'

const highlights = [
  'URA-compliant PAYE & NSSF',
  'Employee dossiers & leave',
  'Secure multi-tenant workspace',
]

const bars = [38, 52, 44, 68, 58, 74, 62, 80, 70, 88, 76, 92]

export default function PlatformHero() {
  return (
    <section className="relative overflow-hidden bg-teal-deep pt-28 text-white sm:pt-32">
      <div className="absolute inset-0 bg-mesh-dark opacity-90" aria-hidden />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 12% 20%, rgba(46,195,229,0.16), transparent 55%), radial-gradient(ellipse 45% 40% at 90% 70%, rgba(0,108,139,0.25), transparent 50%)',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" aria-hidden />

      <div className="container-page relative pb-16 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Copy */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cyan-accent backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                JantaHR Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mt-6 font-heading text-[2.1rem] font-bold leading-[1.2] tracking-tight text-balance sm:text-4xl sm:leading-[1.22] lg:text-[2.85rem] xl:text-[3.15rem]"
            >
              Payroll &amp; HR software
              <span className="mt-3 block text-cyan-accent sm:mt-4">built for East Africa.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-white/70 text-pretty sm:text-lg"
            >
              Run monthly payroll with automatic statutory deductions. Manage people, leave,
              advances, and performance — in one secure workspace designed for Ugandan compliance.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-7 space-y-2.5"
            >
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/75">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-accent/15">
                    <Check className="h-3 w-3 text-cyan-accent" />
                  </span>
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink to="/contact" variant="primary" size="lg">
                Request a demo
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <a href="#features" className="btn btn-outline-light btn-lg">
                Explore features
              </a>
            </motion.div>
          </div>

          {/* Product mock */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute -inset-6 rounded-[2rem] bg-cyan-accent/10 blur-3xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#0a2432]/95 shadow-[0_40px_80px_rgba(0,0,0,0.4)] ring-1 ring-white/5 sm:rounded-[1.75rem]">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.03] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.65rem] font-medium tracking-wide text-white/35">
                  payroll · july 2026
                </span>
              </div>

              <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[0.9fr_1.1fr]">
                {/* Side nav mock */}
                <div className="hidden space-y-1.5 rounded-xl bg-white/[0.03] p-3 sm:block">
                  {['Dashboard', 'Employees', 'Payroll', 'Leave', 'Reports'].map((item, i) => (
                    <div
                      key={item}
                      className={`rounded-lg px-3 py-2 text-xs font-medium ${
                        i === 2
                          ? 'bg-cyan-accent/15 text-cyan-accent'
                          : 'text-white/40'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main panel */}
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Gross', value: '48.2M' },
                      { label: 'PAYE', value: '6.1M' },
                      { label: 'Net', value: '39.4M' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-white/8 bg-white/[0.04] px-2.5 py-3 text-center"
                      >
                        <p className="text-[0.55rem] font-medium uppercase tracking-wider text-white/35">
                          {s.label}
                        </p>
                        <p className="mt-1 font-heading text-sm font-bold text-cyan-accent sm:text-base">
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/8 bg-white/[0.04] p-3.5">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-medium text-white/50">Payroll trend</p>
                      <span className="rounded-md bg-cyan-accent/15 px-2 py-0.5 text-[0.6rem] font-bold text-cyan-accent">
                        URA ready
                      </span>
                    </div>
                    <div className="flex h-24 items-end gap-1.5">
                      {bars.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-cyan-accent/20 to-cyan-accent/90"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: 'Amina Okello', role: 'Local', net: 'UGX 2.4M' },
                      { name: 'James Wright', role: 'Expat', net: 'UGX 8.1M' },
                      { name: 'K. Contractors', role: 'WHT', net: 'UGX 1.2M' },
                    ].map((row) => (
                      <div
                        key={row.name}
                        className="flex items-center justify-between rounded-lg border border-white/6 bg-white/[0.03] px-3 py-2.5"
                      >
                        <div>
                          <p className="text-xs font-medium text-white/85">{row.name}</p>
                          <p className="text-[0.65rem] text-white/35">{row.role}</p>
                        </div>
                        <p className="text-xs font-semibold text-white/70">{row.net}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-offwhite"
        aria-hidden
      />
    </section>
  )
}
