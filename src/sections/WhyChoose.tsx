import { Check, Handshake, Scale, Sparkles, Building2, HeartHandshake } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'

const benefits = [
  {
    icon: Sparkles,
    text: 'Practical HR solutions tailored to your business needs',
  },
  {
    icon: Scale,
    text: 'Strong focus on inclusion, equity, and ethical practice',
  },
  {
    icon: Building2,
    text: 'Experience working with SMEs and corporate teams',
  },
  {
    icon: Check,
    text: 'Responsible integration of technology and AI',
  },
  {
    icon: HeartHandshake,
    text: 'Long-term partnerships built on trust and results',
  },
]

export default function WhyChoose() {
  return (
    <section className="section-pad relative overflow-hidden bg-offwhite">
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-cyan-accent/8 blur-3xl"
        aria-hidden
      />
      <div className="container-page relative">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal direction="left" duration={0.8}>
            <p className="section-label text-teal-primary">What sets us apart</p>
            <h2 className="mt-4 max-w-md font-heading text-3xl font-bold leading-[1.15] text-ink text-balance sm:text-[2rem] lg:text-4xl">
              Why organizations choose JantaHR
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-slate-muted">
              We combine practitioner experience with modern tools — so your people systems are both
              human and high-performing.
            </p>
            <div className="mt-8 hidden items-center gap-3 rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-soft lg:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-accent/12">
                <Handshake className="h-5 w-5 text-teal-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Partnership-first</p>
                <p className="text-xs text-slate-muted">We embed with your team — not just advise from afar</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {benefits.map((b, i) => (
              <Reveal key={b.text} direction="right" duration={0.5} delay={i * 0.06}>
                <div className="group flex items-start gap-4 rounded-2xl border border-ink/[0.05] bg-white p-4 shadow-soft transition-all duration-300 hover:border-cyan-accent/20 hover:shadow-card sm:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-accent/12 text-teal-primary transition-colors group-hover:bg-cyan-accent/18">
                    <b.icon className="h-4.5 w-4.5 h-[1.1rem] w-[1.1rem]" />
                  </span>
                  <span className="pt-2 text-[0.95rem] leading-snug text-ink/80 sm:text-base">{b.text}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
