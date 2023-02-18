import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Items({ children }: Props) {
  return <ul className="space-y-4">{children}</ul>
}
