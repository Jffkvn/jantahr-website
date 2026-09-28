import { Link } from 'react-router-dom'
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'teal' | 'outline' | 'outline-light' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

const classes = (variant: Variant, size: Size, className?: string) =>
  cn('btn', `btn-${variant}`, `btn-${size}`, className)

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}

type ButtonLinkProps = CommonProps & {
  to: string
  external?: boolean
}

export function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  className,
  to,
  external,
}: ButtonLinkProps) {
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noreferrer"
        className={classes(variant, size, className)}
      >
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={classes(variant, size, className)}>
      {children}
    </Link>
  )
}
