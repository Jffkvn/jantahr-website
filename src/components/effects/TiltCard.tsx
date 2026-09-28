import { useRef, type ReactNode } from 'react'
import { cn, prefersReducedMotion } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  /** max tilt in degrees */
  max?: number
  /** optional glare highlight */
  glare?: boolean
}

/**
 * Card that tilts in 3D toward the pointer.
 * Falls back to a static card under reduced-motion / touch.
 */
export default function TiltCard({ children, className, max = 8, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * max * 2
    const ry = (px - 0.5) * max * 2

    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`

    if (glare) {
      const glareEl = el.querySelector('[data-glare]') as HTMLElement | null
      if (glareEl) {
        glareEl.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.25), transparent 55%)`
      }
    }
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)'
    const glareEl = el.querySelector('[data-glare]') as HTMLElement | null
    if (glareEl) glareEl.style.background = 'transparent'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.25s ease' }}
      className={cn('relative [transform-style:preserve-3d]', className)}
    >
      {children}
      {glare && (
        <div
          data-glare
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      )}
    </div>
  )
}
