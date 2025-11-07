'use client'

import { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'

type Props = {
  title?: string
  link?: any
  topThreshold?: number
}

const DURATION_MS = 500 

export default function FloatingTicketCTA({
  title = 'TICKETS',
  link,
  topThreshold = 8,
}: Props) {
  const [mounted, setMounted] = useState(false)

  const [minimized, setMinimized] = useState(false)

  const [showContent, setShowContent] = useState(true)

  const [showLine, setShowLine] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const [contentMax, setContentMax] = useState<number>(0)

  // timeouts
  const openTimeout = useRef<number | null>(null)
  const closeTimeout = useRef<number | null>(null)
  const lineInTimeout = useRef<number | null>(null)

  useLayoutEffect(() => {
    if (contentRef.current) setContentMax(contentRef.current.scrollHeight)
  }, [])

  useEffect(() => setMounted(true), [])

  const clearTimers = () => {
    if (openTimeout.current) window.clearTimeout(openTimeout.current)
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current)
    if (lineInTimeout.current) window.clearTimeout(lineInTimeout.current)
  }

  const onScroll = useCallback(() => {
    if (window.scrollY <= topThreshold) {
      if (minimized) {
        clearTimers()
        setShowLine(false)
        setShowContent(false)
        setMinimized(false)

        openTimeout.current = window.setTimeout(() => {
          if (contentRef.current) setContentMax(contentRef.current.scrollHeight)
          setShowContent(true)
        }, DURATION_MS)
      }
    }
  }, [topThreshold, minimized])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => () => clearTimers(), [])

  if (!mounted) return null

  const handleOpen = () => {
    clearTimers()
    setShowLine(false)   
    setShowContent(false)
    setMinimized(false)  
    openTimeout.current = window.setTimeout(() => {
      if (contentRef.current) setContentMax(contentRef.current.scrollHeight)
      setShowContent(true)
    }, DURATION_MS)
  }

  const handleClose = () => {
    clearTimers()
    setShowContent(false)
    closeTimeout.current = window.setTimeout(() => {
      setMinimized(true)  
      lineInTimeout.current = window.setTimeout(() => {
        setShowLine(true)
      }, DURATION_MS)
    }, Math.min(300, DURATION_MS))
  }

  return (
    <div
      className={[
        'fixed right-4 bottom-4',
        'md:right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2',
        'z-[60]',
        minimized ? 'opacity-40 hover:opacity-100' : 'opacity-100',
        'transition-opacity duration-300',
        'pb-[env(safe-area-inset-bottom)]',
      ].join(' ')}
    >
      <div
        className={[
          'bg-[#7b8d53] text-white shadow-lg overflow-hidden',
          'transition-[border-radius,width,height,padding] duration-500 ease-out',
          minimized
            ? 'w-12 h-12 p-0'
            : 'w-[220px] md:w-[260px] px-4 py-3',
        ].join(' ')}
        style={{
          borderRadius: minimized ? 9999 : 12, 
          willChange: 'border-radius, width, height, padding',
        }}
      >
        {minimized ? (
          <button
            type="button"
            aria-label="Open ticket banner"
            onClick={handleOpen}
            className="group grid place-items-center w-12 h-12"
          >
            <span
              className={[
                'block w-6 h-[2px] bg-white',
                'transition-all duration-300 ease-out',
                showLine ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
              ].join(' ')}
            />
          </button>
        ) : (
          <div className="flex items-start justify-between gap-6">
            <div
              ref={contentRef}
              className="flex flex-col gap-2 transition-all duration-500 ease-out"
              style={{
                maxHeight: showContent
                  ? contentMax
                    ? `${contentMax}px`
                    : '1000px'
                  : 0,
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'scale(1)' : 'scale(0.98)',
              }}
            >
              <h3 className="text-xl tracking-wide leading-none">{title}</h3>

              {link ? (
                <CMSLink
                  {...link}
                  className="inline-flex items-center gap-2 text-base underline-offset-4 hover:underline"
                  aria-label="Buy tickets"
                >
                  Buy now
                  <Image src="/arrowright.svg" alt="" width={14} height={14} />
                </CMSLink>
              ) : (
                <span className="text-base opacity-80">Buy now</span>
              )}
            </div>

            <button
              type="button"
              aria-label="Close ticket banner"
              onClick={handleClose}
              className="shrink-0 mt-0.5"
            >
              <Image src="/closebutton.svg" alt="Close" width={16} height={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
