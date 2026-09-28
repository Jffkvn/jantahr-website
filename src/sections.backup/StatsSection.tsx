import Reveal from '@/components/effects/Reveal'
import Counter from '@/components/effects/Counter'
import { homeStats } from '@/data/team'

export default function StatsSection() {
  return (
    <section className="bg-offwhite py-20 lg:py-24">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {homeStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="rounded-2xl border border-ink/5 bg-white p-6 text-center shadow-card">
                <p className="font-heading text-4xl font-bold text-teal-primary lg:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-slate-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
