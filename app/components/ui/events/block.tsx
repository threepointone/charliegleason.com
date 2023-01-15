import type { ReactNode } from 'react'

type Props = {
  id: string
  title: string
  children: ReactNode
}

export default function Block({ id, title, children }: Props) {
  return (
    <div
      id={id}
      className="space-y-4 text-xs text-neutral-800 dark:text-neutral-300"
    >
      <h2 className="tracking-widest font-display uppercase text-yellow-700 dark:text-yellow-500">
        {title}
      </h2>
      {children}
    </div>
  )
}
