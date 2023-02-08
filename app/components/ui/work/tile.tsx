import { useRef, useEffect } from 'react'

import css from './tile.module.css'

export default function Tile({ title, href }: { title: string; href: string }) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current.style.setProperty('--x', '100px')
    ref.current.style.setProperty('--y', '100px')
  }, [])
  return (
    <a
      href={href}
      className={`block space-y-4 transition-transform transform-gpu ${css.tile}`}
    >
      <div className="relative">
        <img
          ref={ref}
          src="https://placehold.co/600x400"
          className="rounded-lg shadow-lg"
          alt=""
        />
        <img
          src="https://placehold.co/96x96"
          className="rounded-lg shadow-lg absolute bottom-4 -left-4"
          alt=""
        />
      </div>
      <div className="flex">
        <h2 className="">{title}</h2>
      </div>
    </a>
  )
}
