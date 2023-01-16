import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  wide?: boolean
}

export function LayoutWide({ children }: Props) {
  return (
    <div className="sm:p-10 max-w-screen-2xl ml-auto mr-auto space-y-12">
      {children}
    </div>
  )
}

export default function Layout({ children, wide }: Props) {
  const classes = wide ? 'max-w-screen-2xl' : 'max-w-2xl'
  return (
    <div className={`sm:p-10 ml-auto mr-auto space-y-12 ${classes}`}>
      {children}
    </div>
  )
}
