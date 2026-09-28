import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

type Props = {
  className?: string
  /** particle color */
  color?: string
  /** line color */
  lineColor?: string
  density?: number
  maxDistance?: number
}

/**
 * Lightweight connected-node particle canvas.
 * Respects prefers-reduced-motion (renders nothing), pauses offscreen.
 */
export default function ParticleCanvas({
  className,
  color = 'rgba(46, 195, 229, 0.8)',
  lineColor = 'rgba(46, 195, 229, 0.18)',
  density = 0.00009,
  maxDistance = 140,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let raf = 0
    let running = true
    let width = 0
    let height = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.max(24, Math.floor(width * height * density)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
      }))
    }

    const step = () => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 1
            ctx.globalAlpha = 1 - dist / maxDistance
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting
        if (visible && !running) {
          running = true
          raf = requestAnimationFrame(step)
        } else if (!visible && running) {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    build()
    raf = requestAnimationFrame(step)

    const onResize = () => build()
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [color, lineColor, density, maxDistance])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
