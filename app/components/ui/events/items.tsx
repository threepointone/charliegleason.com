import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Items = ({children}:Props) => (
  <ul className="space-y-4">{children}</ul>
)

export default Items

