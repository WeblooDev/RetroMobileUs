'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type Img = { id: string; media: MediaType | null }

export default function GalleryLightbox({ images }: { images: Img[] }) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)

  const openAt = (i: number) => {
    setIdx(i)
    setOpen(true)
  }

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, next, prev])

  return (
    <>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={img.id || i}
            onClick={() => openAt(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded"
            aria-label="Open image in carousel"
          >
            {img.media && <Media resource={img.media} fill imgClassName="object-cover" />}
            <div className="absolute inset-0 pointer-events-none transition-colors group-hover:bg-black/60" />
            <div className="absolute inset-0 flex items-end justify-center p-6 pointer-events-none">
              <span
                className="pointer-events-auto rounded-full bg-white px-6 py-2 text-base font-semibold uppercase 
                           opacity-0 group-hover:opacity-100 transition-[opacity,background-color,color] duration-200
                           hover:bg-[#8B9B5C] hover:text-white"
              >
                Click to view
              </span>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 bg-black rounded-full p-4 hover:bg-[#8B9B5C]"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <Image src="/closebuttongallery.svg" alt="Close" width={15} height={15} priority />
          </button>

          {/* Desktop/tablet side arrows (hidden on mobile) */}
          <button
            className="hidden md:flex absolute left-4 md:left-6 w-14 h-14 rounded-full bg-black hover:bg-[#8B9B5C] items-center justify-center"
            onClick={prev}
            aria-label="Previous image"
          >
            <Image src="/arroeleftwhite.svg" alt="Previous image" width={32} height={32} />
          </button>
          <button
            className="hidden md:flex absolute right-4 md:right-6 w-14 h-14 rounded-full bg-black hover:bg-[#8B9B5C] items-center justify-center"
            onClick={next}
            aria-label="Next image"
          >
            <Image src="/arrowrightwhite.svg" alt="Next image" width={32} height={32} />
          </button>

          {/* Mobile bottom controls (only on mobile) */}
          <div className="md:hidden fixed bottom-4 inset-x-0 flex items-center justify-between px-4">
            <button
              className="w-14 h-14 rounded-full bg-black hover:bg-[#8B9B5C] flex items-center justify-center"
              onClick={prev}
              aria-label="Previous image"
            >
              <Image src="/arroeleftwhite.svg" alt="Previous image" width={32} height={32} />
            </button>
            <button
              className="w-14 h-14 rounded-full bg-black hover:bg-[#8B9B5C] flex items-center justify-center"
              onClick={next}
              aria-label="Next image"
            >
              <Image src="/arrowrightwhite.svg" alt="Next image" width={32} height={32} />
            </button>
          </div>

          {/* Image */}
          <div className="relative w-[80%] aspect-[929/619] max-h-[619px]">
            {images[idx]?.media && (
              <Media resource={images[idx].media!} fill imgClassName="object-contain" />
            )}
          </div>
        </div>
      )}
    </>
  )
}
