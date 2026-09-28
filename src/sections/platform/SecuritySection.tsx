import Reveal from '@/components/effects/Reveal'
import { securityFeatures } from '@/data/platform'

export default function SecuritySection() {
  return (
    <section className="relative overflow-hidden bg-teal-deep py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-mesh-dark opacity-90" aria-hidden />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 50% 45% at 80% 20%, rgba(46,195,229,0.12), transparent 55%)',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" aria-hidden />

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-label mx-auto justify-center text-cyan-accent">Security &amp; trust</p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-[2rem] lg:text-4xl">
              Your payroll data stays yours
            </h2>
            <p className="mt-4 text-white/65 text-pretty">
              Organization data is isolated at the database layer. Every change is attributed. Nothing
              changes silently.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {securityFeatures.map((feat, i) => (
            <Reveal key={feat.title} delay={i * 0.07}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.08] sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-accent/15">
                  <feat.icon className="h-5 w-5 text-cyan-accent" />
                </div>
                <h3 className="mt-5 font-heading text-base font-bold tracking-tight text-white">
                  {feat.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{feat.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
