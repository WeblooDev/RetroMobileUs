'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import firstpop from '../../../public/popupimage.webp'
import rightArrow from '../../../public/right-arrow.svg'
import { cn } from '@/utilities/ui'
import { P } from 'node_modules/framer-motion/dist/types.d-DagZKalS'

export function FirstVisitPopup({
  storageKey = 'first_visit_popup_seen_v1', // kept for compatibility, but no longer used
  title = ' Meet the Retromobile Team in Paris !',
  description = "We'll be there January 27 - February 1st to celebrate Retromobile 50th.",
  description2 = 'Come meet us on booth # 7.3C 062.',
  imageAlt = 'Welcome',
}: {
  storageKey?: string
  title?: string
  description?: string
  description2?: string
  imageAlt?: string
}) {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  // Show on every refresh
  useEffect(() => {
    setMounted(true)
    setOpen(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (open) closeBtnRef.current?.focus()
  }, [open, mounted])

  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Lock scroll when open
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  if (!mounted) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[2147483647] flex items-center justify-center p-3',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close popup overlay"
        onClick={() => setOpen(false)}
        className={cn(
          'absolute inset-0 bg-black/25 backdrop-blur-[2px] transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full max-w-[600px] overflow-hidden rounded-2xl bg-[#8B9B5C]/80 shadow-2xl transform transition-all duration-300 ease-out',
          open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.98] opacity-0',
        )}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close popup"
          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition text-xs"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center gap-6 p-4">
          <div className="w-full px-8">
            <div className="mx-auto relative overflow-hidden aspect-[399/567] max-h-[567px]">
              <Image src={firstpop} alt={imageAlt} fill className="object-cover" priority />
            </div>
          </div>

          <div className="flex flex-col p-2">
            <p className="text-base md:text-2xl text-white">{title}</p>
            <p className="text-sm md:text-base text-white">{description}</p>
            <p className="text-sm md:text-base text-white">{description2}</p>
          </div>

          <div className="pb-2">
            <Link
              href="https://calendly.com/d/ct8k-fdn-zp6/meet-the-retromobile-new-york-team?month=2026-01"
              target="_blank"
              rel="noreferrer"
              className={cn(
                'group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm md:text-base text-white transition',
              )}
            >
              <p className="text-xs md:text-base underline-offset-4 group-hover:underline text-black">
                Schedule a meeting with our sales team here
              </p>

              <span className="relative inline-flex h-4 w-4">
                <Image
                  src={rightArrow}
                  alt=""
                  fill
                  className="object-contain transition-transform duration-200 group-hover:translate-x-[2px]"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
