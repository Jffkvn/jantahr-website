import Reveal from '@/components/effects/Reveal'
import { SectionHeading } from '@/components/ui/primitives'
import { Target, Eye } from 'lucide-react'

export default function ApproachSection() {
  return (
    <section className="bg-offwhite py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="HOW WE WORK"
          title="Built from practice, not theory."
          description="We don't just advise on HR — we run it. Our platform and consulting are shaped by real payroll runs, real employee challenges, and real organizations."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-ink/5 bg-white p-8 shadow-card lg:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-primary/10">
                <Target className="h-7 w-7 text-teal-primary" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold text-ink">Our mission</h3>
              <p className="mt-3 leading-relaxed text-slate-muted">
                To provide innovative, inclusive, and practical human resources solutions that
                empower organizations to succeed through strong people practices and responsible
                use of technology.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-ink/5 bg-white p-8 shadow-card lg:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-primary/10">
                <Eye className="h-7 w-7 text-teal-primary" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold text-ink">Our vision</h3>
              <p className="mt-3 leading-relaxed text-slate-muted">
                To be a leading human resources consultancy in East Africa, supporting organizations
                to build inclusive cultures, high-performing teams, and future-ready workforces.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
