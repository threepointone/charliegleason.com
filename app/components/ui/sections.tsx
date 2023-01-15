import type { ReactNode } from 'react'
import HorizontalRule from './hr'

type Props = {
  children: ReactNode[]
}

const Sections = ({ children }: Props) => (
  <div className="space-y-12">
    {children.length > 1
      ? children.map((child, i) => [<HorizontalRule key={i} />, child])
      : children}
  </div>
)
export default Sections
