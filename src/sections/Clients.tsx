import Reveal from '@/components/effects/Reveal'
import Counter from '@/components/effects/Counter'

const sectors = [
  'Technology',
  'Healthcare',
  'Finance',
  'Telecommunications',
  'Manufacturing',
  'Professional Services',
  'Non-Profit',
  'Education',
]

export default function Clients() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal direction="left" duration={0.8}>
            <p className="section-label text-teal-primary">Clients</p>
            <h2 className="mt-4 max-w-md font-heading text-3xl font-bold leading-[1.15] text-ink text-balance sm:text-[2rem] lg:text-4xl">
              Serving diverse organizations
            </h2>
            <p className="mt-5 leading-relaxed text-slate-muted">
              We support clients across sectors, from local businesses to organizations with regional
              and international operations. Our experience spans multiple industries, allowing us to
              bring best practices and fresh perspectives to every engagement.
            </p>
          </Reveal>

          <div>
            <Reveal direction="right" duration={0.8}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-ink/[0.06] bg-offwhite p-6 shadow-soft sm:p-8">
                  <p className="font-heading text-4xl font-extrabold tracking-tight text-teal-deep sm:text-5xl lg:text-[3.25rem]">
                    <Counter value={20} suffix="+" />
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-muted">Organizations supported</p>
                </div>
                <div className="rounded-3xl border border-ink/[0.06] bg-offwhite p-6 shadow-soft sm:p-8">
                  <p className="font-heading text-4xl font-extrabold tracking-tight text-teal-deep sm:text-5xl lg:text-[3.25rem]">
                    <Counter value={15} suffix="+" />
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-muted">Industries served</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" duration={0.8} delay={0.12}>
              <div className="mt-6 flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-ink/[0.06] bg-white px-3.5 py-1.5 text-sm font-medium text-teal-deep shadow-soft transition-colors hover:border-cyan-accent/30 hover:bg-cyan-accent/5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
