import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import TiltCard from '@/components/effects/TiltCard'
import { SectionHeading } from '@/components/ui/primitives'
import { coreServices } from '@/data/services'

export default function ServicesTeaser() {
  const featured = coreServices.slice(0, 3)
  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="WHAT WE DO"
            title="Consulting that strengthens people systems"
            description="Practical HR services tailored to each organization's size, sector, and operating environment."
          />
          <Link
            to="/services"
            className="btn btn-outline btn-md shrink-0"
          >
            All services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <TiltCard className="h-full rounded-3xl" max={5}>
                <div className="flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-7 shadow-card transition-shadow hover:shadow-card-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-accent/10">
                    <service.icon className="h-6 w-6 text-teal-primary" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-ink">{service.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-muted">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {service.areas.slice(0, 3).map((area) => (
                      <li key={area} className="flex items-start gap-2.5 text-xs text-slate-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-accent" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
