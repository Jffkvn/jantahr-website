import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('card', className)} {...rest}>
      {children}
    </div>
  )
}

export function Badge({
  children,
  className,
  tone = 'cyan',
}: {
  children: ReactNode
  className?: string
  tone?: 'cyan' | 'teal' | 'light' | 'dark'
}) {
  const tones = {
    cyan: 'bg-cyan-accent/12 text-teal-primary',
    teal: 'bg-teal-primary/10 text-teal-primary',
    light: 'bg-white/10 text-white',
    dark: 'bg-ink/5 text-ink',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'section-label mb-4',
            tone === 'light' ? 'text-cyan-accent' : 'text-teal-primary',
            align === 'center' && 'justify-center',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-heading text-3xl font-bold leading-[1.15] text-balance sm:text-[2rem] lg:text-4xl',
          tone === 'light' ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed text-pretty sm:text-lg',
            tone === 'light' ? 'text-white/70' : 'text-slate-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
