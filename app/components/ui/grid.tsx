import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  cols?: 3 | 6
}

export default function Grid({ children, cols = 3 }: Props) {
  const variantsCols = {
    3: 'sm:grid-cols-3',
    6: 'xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2',
  }
  return (
    <div
      className={`grid sm:gap-10 grid-cols-1 ${variantsCols[cols]} space-y-8 sm:space-y-0`}
    >
      {children}
    </div>
  )
}
