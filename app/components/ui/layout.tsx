import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => (
  <div className="sm:p-10 max-w-2xl ml-auto mr-auto space-y-12">{children}</div>
)
export default Layout
