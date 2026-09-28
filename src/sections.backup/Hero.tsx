import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import ParticleCanvas from '@/components/effects/ParticleCanvas'
import GradientMesh from '@/components/effects/GradientMesh'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-teal-deep text-white">
      {/* Background layers */}
      <GradientMesh variant="dark" />
      <ParticleCanvas className="absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay" aria-hidden />

      {/* Floating gradient orbs */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-cyan-accent/20 blur-3xl animate-float" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-teal-primary/30 blur-3xl animate-float [animation-delay:2s]" aria-hidden />

      <div className="container-page relative flex min-h-screen flex-col justify-center pt-28 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-cyan-accent backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                HR consulting + payroll platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-6 font-heading text-4xl font-bold leading-[1.05] text-balance sm:text-5xl lg:text-[3.5rem]"
            >
              Human-centered HR,
              <span className="block">
                <span className="gradient-text">built for East Africa.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 text-pretty"
            >
              We partner with organizations to build strong people systems and capable teams — and
              we ship the platform to do it: URA-compliant payroll, employee dossiers, leave, and
              performance in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/contact" className="btn btn-primary btn-lg group">
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/platform" className="btn btn-outline-light btn-lg group">
                <Play className="h-4 w-4" />
                Explore the platform
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/50"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent" /> URA-compliant PAYE &amp; NSSF
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent" /> Row-level data security
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent" /> Built by HR practitioners
              </span>
            </motion.div>
          </div>

          {/* Right: floating dashboard mock */}
          <HeroDashboard />
        </div>
      </div>

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-offwhite" aria-hidden />
    </section>
  )
}

function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md lg:max-w-lg"
    >
      <div className="relative rounded-3xl border border-white/10 bg-white/5 p-2 shadow-card-lg backdrop-blur-xl">
        <div className="rounded-[20px] bg-offwhite p-5 text-ink">
          {/* Window chrome */}
          <div className="mb-4 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 text-xs font-medium text-slate-muted">JantaHR · Payroll run</span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: 'Gross', value: 'UGX 48.2M', tone: 'text-ink' },
              { label: 'PAYE', value: 'UGX 6.1M', tone: 'text-teal-primary' },
              { label: 'Net', value: 'UGX 39.4M', tone: 'text-teal-primary' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white p-3 shadow-sm">
                <p className="text-[0.65rem] uppercase tracking-wide text-slate-soft">{s.label}</p>
                <p className={`mt-1 font-heading text-sm font-bold ${s.tone}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-ink">Monthly payroll trend</p>
              <span className="rounded-full bg-cyan-accent/15 px-2 py-0.5 text-[0.6rem] font-semibold text-teal-primary">
                +8.4%
              </span>
            </div>
            <div className="mt-3 flex h-20 items-end gap-1.5">
              {[42, 55, 48, 62, 58, 70, 65, 78, 72, 85, 80, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.04 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-teal-primary/40 to-cyan-accent"
                />
              ))}
            </div>
          </div>

          {/* List row */}
          <div className="mt-4 space-y-2">
            {[
              { n: 'A. Nakato', r: 'Finance Manager', t: 'UGX 4.2M' },
              { n: 'J. Mukasa', r: 'Developer', t: 'UGX 3.5M' },
            ].map((row) => (
              <div key={row.n} className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-primary/10 text-xs font-bold text-teal-primary">
                  {row.n.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-ink">{row.n}</p>
                  <p className="text-[0.65rem] text-slate-soft">{row.r}</p>
                </div>
                <p className="font-heading text-xs font-bold text-ink">{row.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute -right-3 -top-3 rounded-2xl border border-white/10 bg-teal-deep px-3 py-2 shadow-card-lg sm:-right-6"
      >
        <p className="text-[0.6rem] uppercase tracking-wide text-white/50">Run time</p>
        <p className="font-heading text-sm font-bold text-cyan-accent">2.4s</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute -bottom-4 -left-3 rounded-2xl border border-white/10 bg-teal-deep px-3 py-2 shadow-card-lg sm:-left-6"
      >
        <p className="text-[0.6rem] uppercase tracking-wide text-white/50">Compliance</p>
        <p className="font-heading text-sm font-bold text-cyan-accent">URA ✓</p>
      </motion.div>
    </motion.div>
  )
}
