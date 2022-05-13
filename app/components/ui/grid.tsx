import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Grid = ({ children }: Props) => (
  <div className="grid gap-10 grid-cols-1 sm:grid-cols-2">{children}</div>
)
export default Grid
