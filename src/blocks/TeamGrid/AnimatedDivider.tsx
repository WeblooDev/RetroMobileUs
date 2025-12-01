'use client'

import React, { useEffect, useRef, useState } from 'react'
type AnimatedDividerProps = {
  className?: string
  durationMs?: number
  delayMs?: number
}
const AnimatedDivider: React.FC<AnimatedDividerProps> = ({
  className,
  durationMs = 2600,
  delayMs = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [inView, setInView] = useState(false)
  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first && first.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.55, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[2px] overflow-hidden ${className ?? ''}`}
      style={{ contain: 'layout paint', willChange: 'transform, opacity' }}
    >
      <div
        style={{
          transitionProperty: 'transform, opacity',
          transitionDuration: `${durationMs}ms`,
          transitionDelay: `${delayMs}ms`,
        }}
        className={[
          'absolute inset-0 bg-[#D7D7D7]',
          'transform-gpu origin-center',
          'opacity-0 scale-x-0',
          'motion-safe:ease-in',
          mounted && inView ? 'opacity-100 scale-x-100' : '',
          'motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none',
        ].join(' ')}
      />
    </div>
  )
}
export default AnimatedDivider
