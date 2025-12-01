'use client'

import { useEffect, useState, useCallback, useRef, useLayoutEffect } from 'react'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'

type Props = {
  title?: string
  openAtVh?: number
  buyUrl?: string
}

const DURATION_MS = 500

export default function FloatingTicketCTA({
  title = 'TICKETS',
  openAtVh = 80,
  buyUrl = '#',
}: Props) {
  const [minimized, setMinimized] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [showLine, setShowLine] = useState(true)
  const [userInteracted, setUserInteracted] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const [contentMax, setContentMax] = useState(0)

  const openTimeout = useRef<number | null>(null)
  const lineInTimeout = useRef<number | null>(null)

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentMax(contentRef.current.scrollHeight)
    }
  }, [])

  const clearTimers = () => {
    if (openTimeout.current) window.clearTimeout(openTimeout.current)
    if (lineInTimeout.current) window.clearTimeout(lineInTimeout.current)
  }

  const openSequence = (markInteraction: boolean) => {
    clearTimers()
    if (markInteraction) setUserInteracted(true)

    setShowLine(false)
    setShowContent(false)
    setMinimized(false)

    openTimeout.current = window.setTimeout(() => {
      if (contentRef.current) {
        setContentMax(contentRef.current.scrollHeight)
      }
      setShowContent(true)
    }, DURATION_MS)
  }

  const closeSequence = (markInteraction: boolean) => {
    clearTimers()
    if (markInteraction) setUserInteracted(true)

    setShowContent(false)
    requestAnimationFrame(() => {
      setMinimized(true)
      lineInTimeout.current = window.setTimeout(() => {
        setShowLine(true)
      }, DURATION_MS)
    })
  }

  const onScroll = useCallback(() => {
    if (userInteracted) return
    const openPx = window.innerHeight * (openAtVh / 100)
    if (window.scrollY >= openPx && minimized) {
      openSequence(false)
    }
  }, [userInteracted, openAtVh, minimized])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', onScroll)
      }
    }
  }, [onScroll])

  useEffect(
    () => () => {
      clearTimers()
    },
    [],
  )

  // ✅ no "if (!mounted) return null"

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
          minimized ? 'w-12 h-12 p-0' : 'w-[220px] md:w-[260px] px-4 py-3',
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
            onClick={() => openSequence(true)}
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
                maxHeight: showContent ? (contentMax ? `${contentMax}px` : '1000px') : 0,
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'scale(1)' : 'scale(0.98)',
              }}
            >
              <h3 className="text-xl tracking-wide leading-none">{title}</h3>

              <CMSLink
                type="custom"
                url="https://unitytickets.com/se/RETROMOBILE2026/Ticket"
                newTab={true}
                ariaLabel="Buy tickets"
                className=" inline-flex items-center gap-2 text-base underline-offset-4 hover:underline"
              >
                <span className="inline-flex items-center gap-2">
                  Buy now
                  <Image src="/arrowright.svg" alt="" width={14} height={14} />
                </span>
              </CMSLink>
            </div>

            <button
              type="button"
              aria-label="Close ticket banner"
              onClick={() => closeSequence(true)}
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
