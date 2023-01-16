import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Grid({ children }: Props) {
  return (
    <div className="grid sm:gap-10 grid-cols-1 sm:grid-cols-3 space-y-8 sm:space-y-0">
      {children}
    </div>
  )
}
