import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <section ref={ref} className="relative overflow-hidden bg-offwhite py-10 lg:py-16">
      <div className="container-page">
        <motion.div
          style={{ y, scale }}
          className="relative overflow-hidden rounded-3xl bg-teal-deep p-10 text-white lg:p-16"
        >
          <div className="absolute inset-0 bg-mesh-dark opacity-80" aria-hidden />
          <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay" aria-hidden />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="font-heading text-3xl font-bold text-balance lg:text-4xl lg:leading-[1.1]">
                Ready to build a stronger, more capable workplace?
              </h2>
              <p className="mt-4 max-w-lg text-lg text-white/75 text-pretty">
                Whether you&apos;re strengthening your HR foundation or deploying a payroll platform,
                we&apos;re ready to support you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="btn btn-primary btn-lg group">
                  Talk to us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link to="/platform" className="btn btn-outline-light btn-lg">
                  Explore the platform
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-card-lg">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/images/optimized/cta-team-640.webp 640w, /images/optimized/cta-team-960.webp 960w"
                    sizes="40vw"
                  />
                  <img
                    src="/images/optimized/cta-team-960.jpg"
                    srcSet="/images/optimized/cta-team-640.jpg 640w, /images/optimized/cta-team-960.jpg 960w"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    alt="Black professionals planning during a team strategy session"
                    width={960}
                    height={1440}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
