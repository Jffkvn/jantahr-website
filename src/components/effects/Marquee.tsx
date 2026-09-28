import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  items: ReactNode[]
  className?: string
  itemClassName?: string
  speed?: number
}

export default function Marquee({ items, className, itemClassName, speed = 40 }: Props) {
  const doubled = [...items, ...items]
  return (
    <div className={cn('group relative overflow-hidden mask-fade-x', className)}>
      <div
        className="flex w-max items-center gap-12 group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <div key={i} className={cn('shrink-0', itemClassName)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
