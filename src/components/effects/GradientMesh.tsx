import { cn } from '@/lib/utils'

type Props = {
  variant?: 'light' | 'dark'
  className?: string
  animated?: boolean
}

/**
 * Layered radial-gradient mesh background. Slowly drifts when `animated`.
 */
export default function GradientMesh({
  variant = 'light',
  className,
  animated = true,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div
        className={cn(
          'absolute -inset-[20%]',
          variant === 'dark' ? 'bg-mesh-dark' : 'bg-mesh',
          animated && 'animate-mesh-drift',
        )}
      />
      {variant === 'dark' && (
        <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/40 via-transparent to-teal-deep/60" />
      )}
    </div>
  )
}
