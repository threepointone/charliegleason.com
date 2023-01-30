import type { ReactNode } from 'react'

type Props = {
  className?: string
  children: ReactNode
}

export default function Title({ className = '', children }: Props) {
  return (
    <h2
      className={`tracking-widest text-xs font-display uppercase text-yellow-700 dark:text-yellow-500 ${className}`}
    >
      {children}
    </h2>
  )
}
