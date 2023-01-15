import type { ReactNode } from 'react'
import HorizontalRule from './hr'

type Props = {
  children: ReactNode[]
}

export default function Sections({ children }: Props) {
  return (
    <div className="space-y-12">
      {children.length > 1
        ? children.map((child, i) => [<HorizontalRule key={i} />, child])
        : children}
    </div>
  )
}
