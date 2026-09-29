import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Reveal from '@/components/effects/Reveal'

export default function WhoWeAre() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section className="section-pad bg-offwhite">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="left" duration={0.8}>
            <div ref={ref} className="relative mx-auto max-w-lg lg:mx-0 lg:max-w-none">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-accent/20 via-transparent to-teal-primary/10 blur-sm" aria-hidden />
              <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-card-lg ring-1 ring-ink/[0.06]">
                <motion.picture style={{ y: imageY }} className="block h-[112%] w-full">
                  <source
                    type="image/webp"
                    srcSet="/images/optimized/who-we-are-640.webp 640w, /images/optimized/who-we-are-960.webp 960w"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <img
                    src="/images/optimized/who-we-are-960.jpg"
                    srcSet="/images/optimized/who-we-are-640.jpg 640w, /images/optimized/who-we-are-960.jpg 960w"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    alt="African HR executive leading organizational development in East Africa"
                    width={960}
                    height={716}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </motion.picture>
              </div>
              <div className="absolute -bottom-4 -right-2 hidden rounded-2xl border border-white/50 bg-white/90 px-5 py-4 shadow-card backdrop-blur-md sm:block lg:-right-4">
                <p className="font-heading text-2xl font-bold tracking-tight text-teal-deep">15+ yrs</p>
                <p className="mt-0.5 text-xs font-medium text-slate-muted">of HR leadership</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" duration={0.8} delay={0.08} className="lg:pl-2">
            <p className="section-label text-teal-primary">Who we are</p>
            <h2 className="mt-4 max-w-md font-heading text-3xl font-bold leading-[1.15] text-ink text-balance sm:text-[2rem] lg:text-4xl">
              We partner with organizations to build strong people systems.
            </h2>
            <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-slate-muted sm:text-base">
              <p>
                JantaHR Consulting is a human resources consultancy supporting small and medium
                enterprises, growing startups, and established organizations across Uganda and the
                region. We help businesses strengthen their people practices, improve performance,
                and remain compliant while preparing for the future of work.
              </p>
              <p>
                Our approach is practical and people-focused. We work closely with leadership teams
                to understand their context and challenges, then deliver tailored solutions that
                make a real difference in day-to-day operations.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
