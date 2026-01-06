'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import confetti from 'canvas-confetti'
import firstpop from '../../../public/firstpop.webp'
import { cn } from '@/utilities/ui'

export function FirstVisitPopup({
  storageKey = 'first_visit_popup_seen_v1',
  title = 'The Retromobile team wishes you a wonderful New Year',
  description = 'SEE YOU IN NEW YORK IN 2026!',
  imageAlt = 'Welcome',
}: {
  storageKey?: string
  title?: string
  description?: string
  imageAlt?: string
}) {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  // Confetti helpers
  const confettiIntervalRef = useRef<number | null>(null)
  const burst = () => {
    // 2 quick bursts (nice effect)
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.65 } })
    confetti({ particleCount: 70, spread: 120, origin: { y: 0.6 } })
  }

  const startConfetti = () => {
    burst()
    const start = Date.now()
    confettiIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start
      if (elapsed > 1800) {
        stopConfetti()
        return
      }
      confetti({
        particleCount: 12,
        spread: 80,
        startVelocity: 22,
        origin: { x: Math.random(), y: 0.1 },
      })
    }, 180)
  }

  const stopConfetti = () => {
    if (confettiIntervalRef.current) {
      window.clearInterval(confettiIntervalRef.current)
      confettiIntervalRef.current = null
    }
  }

  useEffect(() => {
    setMounted(true)
    try {
      const seen = window.localStorage.getItem(storageKey)
      if (!seen) {
        setOpen(true)
        window.localStorage.setItem(storageKey, '1')
      }
    } catch {}
  }, [storageKey])

  useEffect(() => {
    if (!mounted) return
    if (open) {
      closeBtnRef.current?.focus()
      startConfetti()
    } else {
      stopConfetti()
    }
    return () => stopConfetti()
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
        'fixed inset-0 z-[2147483647] flex items-center justify-center p-4',
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
          'relative w-full max-w-[640px] overflow-hidden rounded-2xl bg-[#8B9B5C] shadow-2xl transform transition-all duration-300 ease-out',
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

        <div className="flex flex-col items-center text-center">
          <p className="text-base md:text-lg font-semibold text-white p-6">{title}</p>

       <div className="w-full px-8">
            <div className="relative w-full overflow-hidden rounded-3xl aspect-[847/686]">
                <Image
                src={firstpop}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover"
                priority
                />
            </div>
            </div>


          <p className="mt-3 text-sm md:text-2xl font-bold leading-relaxed text-white p-6">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
