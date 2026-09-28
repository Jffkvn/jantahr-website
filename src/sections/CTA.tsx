import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/effects/Reveal'

export default function CTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.1])

  return (
    <section ref={ref} className="section-pad bg-offwhite">
      <div className="container-page">
        <Reveal duration={0.8}>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-teal-deep shadow-card-lg sm:rounded-[2rem]">
            <div className="absolute inset-0 bg-mesh-dark opacity-80" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 50% 60% at 12% 30%, rgba(46,195,229,0.14), transparent 65%), radial-gradient(ellipse 45% 50% at 88% 75%, rgba(13,61,79,0.45), transparent 70%)',
              }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-grain opacity-[0.07] mix-blend-overlay" aria-hidden />

            <div className="relative grid grid-cols-1 items-center gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
              <div>
                <p className="section-label text-cyan-accent">Ready to work with us</p>
                <h2 className="mt-5 max-w-md font-heading text-3xl font-bold leading-[1.12] text-white text-balance sm:text-4xl lg:text-[2.6rem]">
                  Let&apos;s build a stronger, more capable workplace.
                </h2>
                <p className="mt-5 max-w-sm leading-relaxed text-white/65">
                  Whether you&apos;re strengthening your HR foundation or preparing for the future of
                  work, we&apos;re ready to support you.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/contact" className="btn btn-primary btn-lg group">
                    Contact Us
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link to="/platform" className="btn btn-outline-light btn-lg">
                    Explore the platform
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.32)] ring-1 ring-white/10 sm:rounded-3xl lg:aspect-auto lg:h-[28rem]">
                <motion.picture
                  style={{ y: imageY, scale: imageScale }}
                  className="absolute inset-0 h-[114%] w-full"
                >
                  <source
                    type="image/webp"
                    srcSet="/images/optimized/cta-team-640.webp 640w, /images/optimized/cta-team-960.webp 960w"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <img
                    src="/images/optimized/cta-team-960.jpg"
                    srcSet="/images/optimized/cta-team-640.jpg 640w, /images/optimized/cta-team-960.jpg 960w"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    alt="Team collaborating during a strategy session"
                    width={960}
                    height={1440}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </motion.picture>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
