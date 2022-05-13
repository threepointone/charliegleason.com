import type { ReactNode } from 'react'
import HorizontalRule from './hr'

type Props = {
  children: ReactNode[]
}

const Sections = ({ children }: Props) => (
  <div className="space-y-12">
    {children &&
      children.map((child, i) => [<HorizontalRule key={i} />, child])}
  </div>
)
export default Sections
