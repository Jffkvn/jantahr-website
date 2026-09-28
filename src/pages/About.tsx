import { Link } from 'react-router-dom'
import { Target, Eye, ArrowRight, CheckCircle2, Building2 } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import PageHero from '@/components/ui/PageHero'
import ApproachSteps from '@/sections/ApproachSteps'
import { story, values, mission, vision } from '@/data/team'

export default function About() {
  return (
    <div className="bg-offwhite text-ink">
      <PageHero
        eyebrow="About JantaHR"
        title="Human-Centered Systems for Thriving Workplaces"
        description="We believe people are the engine of organizational success. When HR systems are fair, transparent, and technology-assisted, both individuals and enterprises flourish."
      />

      {/* Story Section with Large Photo Column */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <div className="relative overflow-hidden rounded-3xl border border-ink/[0.08] shadow-card-lg">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="/images/services/hr-outsourcing.jpg"
                    alt="JantaHR team and business partners in Kampala"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-teal-deep/85 p-4 text-white backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-accent">
                    Grounded in Practice
                  </p>
                  <p className="mt-1 text-xs text-white/80">
                    &quot;Because we run HR for real clients, we built our own platform to do it better.&quot;
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div>
                <span className="section-label text-teal-primary">Our Journey</span>
                <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Built by HR Practitioners, for East African Realities
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-muted">
                  {story.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/team" className="btn btn-primary btn-md">
                    Meet Our Leadership Team
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/contact" className="btn btn-outline btn-md">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-ink/[0.06] bg-white py-20 lg:py-24">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-ink/[0.08] bg-offwhite p-8 shadow-card sm:p-10">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-primary/10 text-teal-primary">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-ink">
                    Our Mission
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-muted">{mission}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  Practical &amp; Inclusive Impact
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-ink/[0.08] bg-offwhite p-8 shadow-card sm:p-10">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-accent/20 text-teal-primary">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight text-ink">
                    Our Vision
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-muted">{vision}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-primary">
                  <Building2 className="h-4 w-4" />
                  Leading East African Consultancy
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approach Steps (Moved from Home) */}
      <ApproachSteps />

      {/* Values Grid */}
      <section className="section-pad bg-offwhite">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label mx-auto justify-center text-teal-primary">
              Core Principles
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              What Guides Our Work
            </h2>
            <p className="mt-3 text-slate-muted">
              These shared values direct every hiring mandate, payroll run, and organizational advisory engagement.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-ink/[0.06] bg-white p-7 shadow-card transition-all duration-300 hover:shadow-card-lg">
                  <span className="inline-block h-1 w-8 rounded-full bg-cyan-accent" />
                  <h3 className="mt-4 font-heading text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-muted">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-teal-deep py-20 text-white lg:py-24">
        <div className="container-page text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Meet the consultants behind the work.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Discover our leadership team’s backgrounds in organizational development, labour compliance, and workforce AI.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/team" className="btn btn-primary btn-lg">
              Explore Our Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
