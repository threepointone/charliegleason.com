import type { ReactNode } from 'react'
import Title from '~/components/ui/title'

type Props = {
  id: string
  title?: string
  wide?: boolean
  children: ReactNode
}

export default function Block({ id, title, children, wide }: Props) {
  return (
    <div
      id={id}
      className={`space-y-4 text-xs text-neutral-800 dark:text-neutral-300 ${
        !title ? 'mt-4 sm:mt-8' : ''
      }`}
    >
      {title ? (
        <Title className={`${wide ? 'sm:whitespace-nowrap' : ''}`}>
          {title}
        </Title>
      ) : null}
      {children}
    </div>
  )
}
