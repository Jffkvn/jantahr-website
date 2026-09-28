import { Link } from 'react-router-dom'
import { Linkedin, Mail } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'
import PageHero from '@/components/ui/PageHero'
import { teamMembers } from '@/data/team'
import { BRAND } from '@/lib/constants'

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Meet our people"
        description="Our team brings experience across human resources, training, recruitment, and organizational development. We combine professional expertise with a practical understanding of local and regional business environments."
      />

      <section className="section-pad bg-offwhite">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {teamMembers.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <article className="group overflow-hidden rounded-3xl border border-ink/[0.06] bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-lg">
                  <div className="aspect-square overflow-hidden bg-offwhite">
                    <img
                      src={member.image}
                      alt={member.name}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      decoding="async"
                      style={member.objectPosition ? { objectPosition: member.objectPosition } : undefined}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-ink">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-teal-primary">{member.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-muted">{member.bio}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <a
                        href={member.linkedinUrl || '#'}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.04] text-ink/70 transition-colors hover:bg-cyan-accent/15 hover:text-teal-primary"
                        aria-label={`${member.name}'s LinkedIn`}
                        target={member.linkedinUrl ? '_blank' : undefined}
                        rel={member.linkedinUrl ? 'noreferrer' : undefined}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={`mailto:${BRAND.email}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.04] text-ink/70 transition-colors hover:bg-cyan-accent/15 hover:text-teal-primary"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-teal-deep p-8 text-center sm:rounded-[2rem] sm:p-12">
            <div className="absolute inset-0 bg-mesh-dark opacity-80" aria-hidden />
            <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" aria-hidden />
            <div className="relative">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-white lg:text-3xl">
                Join our team
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-white/65">
                We&apos;re always looking for talented professionals passionate about helping
                organizations build better workplaces.
              </p>
              <Link to="/jobs" className="btn btn-primary btn-lg mt-8">
                Explore Client Vacancies &amp; Mandates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
