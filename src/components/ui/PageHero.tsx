import { type ReactNode } from 'react'
import Reveal from '@/components/effects/Reveal'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  className?: string
  children?: ReactNode
}

/**
 * Shared premium hero for inner pages — deep teal + mesh + grain.
 * Keeps navbar contrast consistent across the site.
 */
export default function PageHero({ eyebrow, title, description, className, children }: Props) {
  return (
    <section className={cn('page-hero', className)}>
      <div className="page-hero-bg bg-mesh-dark opacity-90" aria-hidden />
      <div
        className="page-hero-bg opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 15% 20%, rgba(46,195,229,0.14), transparent 60%), radial-gradient(ellipse 40% 45% at 90% 80%, rgba(0,108,139,0.2), transparent 55%)',
        }}
        aria-hidden
      />
      <div className="page-hero-bg bg-grain opacity-[0.07] mix-blend-overlay" aria-hidden />

      <div className="container-page relative">
        <Reveal>
          <p className="section-label text-cyan-accent">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-heading text-[2rem] font-bold leading-[1.1] text-balance sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 text-pretty sm:text-lg">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </div>

      {/* Soft transition into page body */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-offwhite/20"
        aria-hidden
      />
    </section>
  )
}
