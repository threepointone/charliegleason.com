import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Grid({ children }: Props) {
  return (
    <div className="grid gap-10 grid-cols-1 sm:grid-cols-2">{children}</div>
  )
}
