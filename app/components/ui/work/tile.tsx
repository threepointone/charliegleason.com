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
        var rect = (e.target as HTMLDivElement).getBoundingClientRect()

        const _x = reference.offsetLeft + Math.floor(reference.offsetWidth / 2)
        const _y = reference.offsetTop + Math.floor(reference.offsetHeight / 2)

        const x = e.clientX - rect.left - _x
        const y = (e.clientY - rect.top - _y) * -1

        setPosition({
          x: y / (reference.offsetHeight / 2),
          y: x / (reference.offsetWidth / 2),
        })
      }
    }

    const setToZero = () => {
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

export default function Tile({
  id,
  title,
  description,
  href,
  color,
}: {
  id: string
  title: string
  description: string
  href: string
  color: 'yellow' | 'indigo' | 'pink'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const position = useMousePosition(ref)

  const variantsColors = {
    yellow: 'from-yellow-500 to-yellow-800 dark:to-yellow-300',
    pink: 'from-pink-500 to-pink-800 dark:to-pink-300',
    indigo: 'from-indigo-500 to-indigo-800 dark:to-indigo-300',
  }

  useEffect(() => {
    ref.current?.style.setProperty('--x', `${position.x.toFixed(2)}deg`)
    ref.current?.style.setProperty('--y', `${position.y.toFixed(2)}deg`)
  }, [position.x, position.y])
  return (
    <a href={href} className={`group group:focus block space-y-4 outline-none`}>
      <div className="relative">
        <div
          className={`${css.wrapper}
        group-focus:outline-none group-focus:shadow-outline
        outline-offset-2 outline-4 group-focus:outline-yellow-600 dark:group-focus:outline-yellow-400
        rounded-md`}
          ref={ref}
        >
          <img
            src={`/assets/work/${id}/screenshot.png`}
            className={`absolute inset-0 z-10 left-4 grayscale 
            group-focus:-left-2 group-focus:grayscale-0
            group-hover:-left-2 group-hover:grayscale-0
            transition-all duration-500 ease-out`}
            alt=""
          />
          <div
            className={`${css.move} shadow-lg rounded-lg overflow-hidden transition-transform duration-500 ease-out pointer-events-none`}
          >
            <img
              src={`/assets/work/${id}/tile.png`}
              className={`max-w-full w-full grayscale
              group-hover:grayscale-0 group-focus:grayscale-0
              transition-all duration-500 ease-out`}
              alt=""
            />
          </div>
        </div>
        <img
          src={`/assets/work/${id}/icon.png`}
          className="w-[20%] h-auto rounded-lg shadow-xl absolute top-[50%] -left-4 pointer-events-none transform -translate-y-1/2"
          alt=""
        />
      </div>
      <div className="flex gap-4 justify-between items-center">
        <h2
          className={`text-transparent bg-clip-text bg-gradient-to-bl ${variantsColors[color]} font-display text-xl whitespace-nowrap`}
        >
          {title}
        </h2>
        <h2 className="text-xxs text-neutral-600 dark:text-neutral-400">
          {description}
        </h2>
      </div>
    </a>
  )
}
