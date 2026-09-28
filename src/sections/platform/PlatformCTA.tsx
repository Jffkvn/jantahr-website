import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import Counter from '@/components/effects/Counter'
import { platformStats } from '@/data/platform'

export default function PlatformCTA() {
  return (
    <section className="section-pad bg-offwhite">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-teal-deep shadow-card-lg sm:rounded-[2rem]">
            <div className="absolute inset-0 bg-mesh-dark opacity-80" aria-hidden />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 50% 55% at 15% 30%, rgba(46,195,229,0.14), transparent 60%), radial-gradient(ellipse 40% 45% at 90% 80%, rgba(13,61,79,0.4), transparent 55%)',
              }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" aria-hidden />

            <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:p-14">
              <div>
                <p className="section-label text-cyan-accent">Get started</p>
                <h2 className="mt-4 max-w-md font-heading text-3xl font-bold leading-[1.12] tracking-tight text-white text-balance sm:text-4xl">
                  Ready to see it in action?
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-white/65">
                  Book a walkthrough tailored to your organization. No commitment — just a clear look
                  at how payroll and HR run on JantaHR.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/contact" className="btn btn-primary btn-lg group">
                    Request a demo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link to="/services" className="btn btn-outline-light btn-lg">
                    Explore consulting
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {platformStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-center backdrop-blur-sm sm:p-6"
                  >
                    <p className="font-heading text-3xl font-bold tracking-tight text-cyan-accent sm:text-4xl">
                      <Counter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-2 text-xs font-medium text-white/55 sm:text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
