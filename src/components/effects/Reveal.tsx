import { type ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: Direction
  distance?: number
  once?: boolean
  as?: 'div' | 'section' | 'li' | 'span'
  /** ignored — kept for backward compat */
  align?: string
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance }
    case 'down':
      return { y: -distance }
    case 'left':
      return { x: distance }
    case 'right':
      return { x: -distance }
    default:
      return {}
  }
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 28,
  once = true,
  as = 'div',
}: Props) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
    >
      {children}
    </MotionTag>
  )
}
