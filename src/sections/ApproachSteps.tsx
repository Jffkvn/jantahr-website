import Reveal from '@/components/effects/Reveal'

const steps = [
  {
    number: '01',
    title: 'Understand',
    description:
      "We learn your goals, culture, and constraints. Every engagement begins with understanding your organization's unique context and challenges.",
  },
  {
    number: '02',
    title: 'Design',
    description:
      'We build practical, measurable solutions tailored to your specific needs and aligned with your business objectives.',
  },
  {
    number: '03',
    title: 'Deliver',
    description:
      'We implement with your team and refine as you grow, ensuring solutions are sustainable and evolve with your organization.',
  },
]

export default function ApproachSteps() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <Reveal>
          <p className="section-label text-teal-primary">Our approach</p>
          <h2 className="mt-4 max-w-lg font-heading text-3xl font-bold leading-[1.15] text-ink sm:text-[2rem] lg:text-4xl">
            How we work with you
          </h2>
          <p className="mt-4 max-w-lg text-slate-muted">
            A clear, collaborative process — from first conversation to lasting impact.
          </p>
        </Reveal>

        <div className="relative mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6 lg:gap-8">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-[2.75rem] hidden h-px bg-gradient-to-r from-cyan-accent/0 via-cyan-accent/35 to-cyan-accent/0 md:block"
            aria-hidden
          />

          {steps.map((step, i) => (
            <Reveal key={step.number} direction="up" delay={i * 0.1} className="relative">
              <article className="group relative h-full rounded-3xl border border-ink/[0.06] bg-offwhite p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-accent/25 hover:bg-white hover:shadow-card-lg sm:p-8">
                <span
                  className="absolute left-8 top-0 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-accent shadow-[0_0_0_4px_rgba(46,195,229,0.16)] md:block"
                  aria-hidden
                />
                <span className="font-heading text-5xl font-extrabold leading-none tracking-tight text-teal-deep/[0.08] transition-colors group-hover:text-cyan-accent/15 lg:text-6xl">
                  {step.number}
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold tracking-tight text-teal-deep">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-muted">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
