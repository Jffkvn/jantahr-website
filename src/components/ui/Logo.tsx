import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Props = {
  /** `dark` = ink logo for light backgrounds; `light` = white logo for dark backgrounds */
  variant?: 'dark' | 'light'
  className?: string
  /** Image height class, e.g. h-8 */
  heightClass?: string
  asLink?: boolean
}

/**
 * Transparent wordmark — the source logo.png has a solid teal fill which
 * rendered as a white box when inverted. Use logo-dark / logo-light instead.
 */
export default function Logo({
  variant = 'dark',
  className,
  heightClass = 'h-8 sm:h-9',
  asLink = true,
}: Props) {
  const src = variant === 'light' ? '/logo-light.png' : '/logo-dark.png'

  const img = (
    <img
      src={src}
      alt="JantaHR"
      width={190}
      height={126}
      decoding="async"
      className={cn(
        'w-auto object-contain object-left',
        heightClass,
        className,
      )}
    />
  )

  if (!asLink) return img

  return (
    <Link to="/" className="inline-flex items-center" aria-label="JantaHR home">
      {img}
    </Link>
  )
}
