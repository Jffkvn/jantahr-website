import { Link } from 'react-router-dom'
import { ArrowRight, Check, Sparkles, PhoneCall } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import PageHero from '@/components/ui/PageHero'
import { coreServices, aiServices } from '@/data/services'

const serviceImages: Record<string, { src: string; alt: string }> = {
  'Corporate Staff Training & Development': {
    src: '/images/services/training-workshop.jpg',
    alt: 'Leadership development and corporate training workshop in Kampala',
  },
  'Recruitment Process Outsourcing': {
    src: '/images/services/recruitment-interview.jpg',
    alt: 'Executive interview and talent recruitment panel in modern office',
  },
  'Compensation & Benefits Consulting': {
    src: '/images/services/compensation-meeting.jpg',
    alt: 'HR directors analyzing statutory compensation and salary benchmarks',
  },
  'HR Technology Consulting': {
    src: '/images/services/hr-technology.jpg',
    alt: 'HR specialist using modern cloud HR and payroll software',
  },
  'HR Outsourcing': {
    src: '/images/services/hr-outsourcing.jpg',
    alt: 'Strategic HR partnership and corporate handshake in Kampala',
  },
  'HR Compliance': {
    src: '/images/services/compliance-review.jpg',
    alt: 'HR legal compliance review and labour law consultation',
  },
}

export default function Services() {
  return (
    <div className="bg-offwhite text-ink">
      <PageHero
        eyebrow="Human Capital Solutions"
        title="People-First HR Consulting for East Africa"
        description="We partner with organizations to build strong people systems, nurture high-calibre leadership, and ensure rigorous statutory compliance across Uganda."
      />

      {/* Services List - Alternating Editorial Photographic Rows */}
      <section className="section-pad">
        <div className="container-page space-y-20 lg:space-y-28">
          {coreServices.map((service, idx) => {
            const isEven = idx % 2 === 1
            const imageInfo = serviceImages[service.title] || {
              src: '/images/services/training-workshop.jpg',
              alt: service.title,
            }

            return (
              <div
                key={service.title}
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image Column */}
                <Reveal
                  direction={isEven ? 'right' : 'left'}
                  duration={0.8}
                  className={isEven ? 'lg:col-start-2' : ''}
                >
                  <div className="group relative overflow-hidden rounded-3xl border border-ink/[0.08] bg-white shadow-card-lg">
                    <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
                      <img
                        src={imageInfo.src}
                        alt={imageInfo.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/50 via-transparent to-transparent opacity-40" />
                    <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-teal-deep/85 px-3.5 py-1.5 backdrop-blur-md">
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-accent">
                        Pillar {idx + 1} of 6
                      </span>
                    </div>
                  </div>
                </Reveal>

                {/* Text Column */}
                <Reveal
                  direction={isEven ? 'left' : 'right'}
                  duration={0.8}
                  delay={0.1}
                  className={isEven ? 'lg:col-start-1' : ''}
                >
                  <div className="max-w-xl">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-primary/10 text-teal-primary">
                      <service.icon className="h-6 w-6" />
                    </div>

                    <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                      {service.title}
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-slate-muted sm:text-lg">
                      {service.description}
                    </p>

                    <div className="mt-6 border-t border-ink/[0.06] pt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                        Focus Areas &amp; Deliverables
                      </p>
                      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {service.areas.map((area) => (
                          <li key={area} className="flex items-start gap-2.5 text-sm text-ink/80">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-primary" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex items-center gap-4">
                      <Link to="/contact" className="btn btn-primary btn-md">
                        Inquire About This Service
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            )
          })}
        </div>
      </section>

      {/* Applied AI Section */}
      <section className="relative overflow-hidden bg-teal-deep py-20 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-mesh-dark opacity-90" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.07] mix-blend-overlay" />
        <div className="container-page relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-accent/25 bg-cyan-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  Next-Gen Workforce
                </span>
                <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  Applied AI for the Workplace
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
                  We empower East African teams to responsibly adopt generative artificial intelligence. Build practical confidence, streamline customer communications, and automate routine HR tasks without compromising data governance.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/ai-training" className="btn btn-primary btn-lg">
                    Explore AI Cohorts &amp; Curriculum
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contact" className="btn btn-outline-light btn-lg">
                    Book Team Readiness Session
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-md sm:p-8">
                <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl">
                  <img
                    src="/images/ai-training/ai-training-hero.jpg"
                    alt="AI workplace training session in Kampala"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-4 text-xs font-medium text-white/90">
                    Live interactive cohort in Kampala
                  </p>
                </div>

                <h3 className="font-heading text-lg font-semibold text-white">
                  Practical Capabilities Covered
                </h3>
                <ul className="mt-4 space-y-3">
                  {aiServices.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-white/80">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-accent" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-ink/[0.06] bg-white py-16 lg:py-24">
        <div className="container-page text-center">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Not sure which service fits your organization best?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-muted sm:text-base">
            Our principal HR consultants will review your structure, current challenges, and growth goals during an exploratory consultation.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/contact" className="btn btn-primary btn-lg inline-flex items-center gap-2">
              <PhoneCall className="h-4 w-4" />
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
