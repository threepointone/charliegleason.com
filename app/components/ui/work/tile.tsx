import { useRef, useState, useEffect } from 'react'

import css from './tile.module.css'

export const useMousePosition = (ref: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const reference = ref.current
    var counter = 0
    var updateRate = 5
    var isTimeToUpdate = function () {
      return counter++ % updateRate === 0
    }

    const setFromEvent = (e: MouseEvent) => {
      if (isTimeToUpdate()) {
        var rect = (e.target as HTMLAnchorElement).getBoundingClientRect()

        const _x = reference.offsetLeft + Math.floor(reference.offsetWidth / 2)
        const _y = reference.offsetTop + Math.floor(reference.offsetHeight / 2)

        const x = e.clientX - rect.left - _x
        const y = (e.clientY - rect.top - _y) * -1

        setPosition({
          x: (y * -1) / (reference.offsetHeight / 2),
          y: (x * -1) / (reference.offsetWidth / 2),
        })
      }
    }

    const setToZero = (e: MouseEvent) => {
      setPosition({ x: 0, y: 0 })
    }
    reference.addEventListener('mousemove', setFromEvent)
    reference.addEventListener('mouseleave', setToZero)
    return () => {
      reference.removeEventListener('mousemove', setFromEvent)
      reference.removeEventListener('mouseleave', setToZero)
    }
  }, [ref])

  return position
}

export default function Tile({ title, href }: { title: string; href: string }) {
  const ref = useRef<HTMLImageElement>(null)
  const position = useMousePosition(ref)

  useEffect(() => {
    ref.current?.style.setProperty('--x', `${position.x.toFixed(2)}deg`)
    ref.current?.style.setProperty('--y', `${position.y.toFixed(2)}deg`)
  }, [position.x, position.y])
  return (
    <a href={href} className={`block space-y-4 ${css.tile}`}>
      <div className="relative [perspective:100px]">
        <img
          ref={ref}
          src="https://placehold.co/600x400"
          className="rounded-lg shadow-lg transition-transform duration-500 ease-out"
          alt=""
        />
        <img
          src="https://placehold.co/96x96"
          className="rounded-lg shadow-lg absolute bottom-4 -left-4 pointer-events-none"
          alt=""
        />
      </div>
      <div className="flex">
        <h2 className="">{title}</h2>
      </div>
    </a>
  )
}
