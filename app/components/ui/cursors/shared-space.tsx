'use client'

import { useEffect, useState } from 'react'

import { useCursors } from './cursors-context'
import OtherCursor from './other-cursor'
import SelfCursor from './self-cursor'

export default function SharedSpace() {
  const { others, self } = useCursors()
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const onResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const count = Object.keys(others).length + (self ? 1 : 0)

  return (
    <>
      {count > 0 && (
        <p className="text-neutral-400 dark:text-neutral-600">
          {count} x person also browsing
        </p>
      )}

      <div className="relative z-50">
        {Object.keys(others).map((id) => (
          <div key={id}>
            <OtherCursor
              id={id}
              windowDimensions={windowDimensions}
              fill="#06f"
            />
          </div>
        ))}

        {self?.pointer === 'touch' && (
          <SelfCursor windowDimensions={windowDimensions} />
        )}
      </div>
    </>
  )
}
