'use client'

import { useEffect, useState, useRef } from 'react'

import { useCursors } from './cursors-context'
import OtherCursor from './other-cursor'
import SelfCursor from './self-cursor'

export default function SharedSpace() {
  const { others, self } = useCursors()
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  })
  const svgRef = useRef<SVGSVGElement>(null)
  const svgParentRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    // Add the class 'overflow-hidden' on body to prevent scrolling
    document.body.classList.add('overflow-hidden')
    // Scroll to top
    window.scrollTo(0, 0)
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  const count = Object.keys(others).length + (self ? 1 : 0)

  return (
    <>
      <div
        ref={svgParentRef}
        className="-z-10 absolute top-0 left-0 w-full h-full bg-stone-200 overflow-clip"
      >
        {count > 0 && (
          <div className="absolute top-4 left-4 pointer-events-none flex items-center">
            <span className="text-2xl">{count}&times;</span>
            <span className="text-5xl">🎈</span>
          </div>
        )}
        <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <pattern
              id="diagonal-stripe-1"
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
            >
              <image
                xlinkHref="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J2JsYWNrJyBzdHJva2Utd2lkdGg9JzEnLz4KPC9zdmc+Cg=="
                x="0"
                y="0"
                width="10"
                height="10"
              ></image>
            </pattern>
            <pattern
              id="diagonal-stripe-4"
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
            >
              <image
                xlinkHref="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSdibGFjaycvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J3doaXRlJyBzdHJva2Utd2lkdGg9JzMnLz4KPC9zdmc+"
                x="0"
                y="0"
                width="10"
                height="10"
              ></image>
            </pattern>
          </defs>
        </svg>
      </div>

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
    </>
  )
}
