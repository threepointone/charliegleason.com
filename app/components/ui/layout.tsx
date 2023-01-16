import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  wide?: boolean
}

export default function Layout({ children, wide }: Props) {
  const classes = wide ? 'max-w-screen-2xl' : 'max-w-2xl'
  return (
    <div
      className={`lg:px-10 py-8 sm:py-10 ml-auto mr-auto space-y-12 h-full ${classes}`}
    >
      {children}
    </div>
  )
}
