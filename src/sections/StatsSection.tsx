import Reveal from '@/components/effects/Reveal'
import Counter from '@/components/effects/Counter'

const STATS = [
  { value: 15, suffix: '+', label: 'Years of HR leadership in East Africa' },
  { value: 120, suffix: '+', label: 'Organizations served across sectors' },
  { value: 8, suffix: '+', label: 'Integrated JantaHR OneHub modules' },
  { value: 100, suffix: '%', label: 'Statutory URA & NSSF compliant math' },
]

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden py-24 text-white lg:py-32">
      {/* Background with real office photography & dark teal overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/services/training-workshop.jpg"
          alt="JantaHR leadership and workshop participants"
          className="h-full w-full object-cover filter brightness-[0.25] blur-[1px]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-teal-deep/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-grain opacity-10 mix-blend-overlay" />
      </div>

      <div className="container-page relative z-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-accent backdrop-blur-md">
              Proven Impact
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Grounded in Experience, Powered by Precision
            </h2>
            <p className="mt-3 text-sm text-white/70 sm:text-base">
              From fast-scaling Kampala startups to multi-national NGOs, we equip teams with compliant payroll and transformative workplace strategies.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="group rounded-3xl border border-white/15 bg-white/[0.07] p-6 text-center shadow-card-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-accent/30 hover:bg-white/[0.12] sm:p-8">
                <p className="font-heading text-4xl font-extrabold text-cyan-accent lg:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-xs font-medium text-white/80 sm:text-sm">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
