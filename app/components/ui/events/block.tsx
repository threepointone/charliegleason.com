import type { ReactNode } from 'react'

type Props = {
  id: string
  title?: string
  children: ReactNode
}

export default function Block({ id, title, children }: Props) {
  return (
    <div
      id={id}
      className={`space-y-4 text-xs text-neutral-800 dark:text-neutral-300 ${
        !title && 'mt-4 sm:mt-8'
      }`}
    >
      {title ? (
        <h2 className="tracking-widest font-display uppercase text-yellow-700 dark:text-yellow-500 truncate">
          {title}
        </h2>
      ) : null}
      {children}
    </div>
  )
}
