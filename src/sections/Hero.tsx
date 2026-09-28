import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, ShieldCheck, Building2, Users } from 'lucide-react'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-teal-deep">
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-[52%_48%]">
        {/* Photo panel */}
        <motion.div
          className="relative h-[48vh] overflow-hidden sm:h-[52vh] lg:h-auto lg:min-h-[100svh]"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.picture style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
            <source
              type="image/webp"
              srcSet="/images/optimized/hero-office-640.webp 640w, /images/optimized/hero-office-960.webp 960w, /images/optimized/hero-office-1280.webp 1280w"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
            <img
              src="/images/optimized/hero-office-1280.jpg"
              srcSet="/images/optimized/hero-office-640.jpg 640w, /images/optimized/hero-office-960.jpg 960w, /images/optimized/hero-office-1280.jpg 1280w"
              sizes="(max-width: 1024px) 100vw, 52vw"
              alt="Professionals collaborating in a modern office"
              width={1280}
              height={853}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </motion.picture>

          <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.1] mix-blend-overlay" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-teal-deep/90 max-lg:hidden"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-deep via-teal-deep/40 to-transparent lg:hidden"
            aria-hidden
          />
        </motion.div>

        {/* Content panel */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative flex items-center bg-teal-deep px-5 pb-20 pt-8 sm:px-8 sm:pb-24 lg:px-12 lg:py-0 xl:px-16"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 20% 35%, rgba(46,195,229,0.1), transparent 65%), radial-gradient(ellipse 50% 40% at 95% 85%, rgba(13,61,79,0.45), transparent 70%)',
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" aria-hidden />

          <div className="relative w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.08] px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/95 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-accent" />
                </span>
                HR Consulting · East Africa
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-heading text-[2rem] font-bold leading-tight tracking-tight text-balance text-white sm:text-[2.5rem] sm:leading-[1.18] lg:text-[2.85rem] lg:leading-[1.2] xl:text-[3.15rem]"
            >
              Human-Centered HR Solutions for Today&apos;s Workplace
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.36 }}
              className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/70 text-pretty sm:text-base lg:text-lg"
            >
              JantaHR partners with organizations to build strong people systems, develop capable
              teams, and create inclusive, high-performing workplaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.48 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link to="/contact" className="btn btn-primary btn-lg group">
                Talk to Us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/services" className="btn btn-outline-light btn-lg">
                Explore Our Services
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-8"
            >
              {[
                { icon: Building2, label: '120+ organizations' },
                { icon: Users, label: '15+ industries' },
                { icon: ShieldCheck, label: 'URA-ready payroll' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-white/55">
                  <Icon className="h-4 w-4 shrink-0 text-cyan-accent/90" aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>

      {/* Seamless fade into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-offwhite/40 to-offwhite"
        aria-hidden
      />
    </section>
  )
}
