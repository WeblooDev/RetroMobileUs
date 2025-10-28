'use client'

import * as React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import type { LogosCarousel as LogosCarouselBlock, Media } from '@/payload-types'

const mediaUrl = (m: Media) => (m as any)?.url as string
const mediaAlt = (m: Media) =>
  ((m as any)?.alt as string) || ((m as any)?.filename as string) || 'Logo'

export default function LogosCarousel({ items }: LogosCarouselBlock) {
  const logos = Array.isArray(items) ? items : []
  const [api, setApi] = React.useState<CarouselApi | null>(null)

  if (!logos.length) return null

  const prev = () => api?.scrollPrev()
  const next = () => api?.scrollNext()

  return (
    <section className="py-20">
      <div className="container mx-auto relative">
        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className="
            absolute left-0 top-1/2 z-10 -translate-y-1/2 p-2
            transition-transform duration-200
            hover:-translate-x-1 hover:scale-105
            active:scale-95
            disabled:opacity-30
          "
        >
          <Image src="/icon-prev.svg" alt="previous" width={28} height={28} />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className="
            absolute right-0 top-1/2 z-10 -translate-y-1/2 p-2
            transition-transform duration-200
            hover:translate-x-1 hover:scale-105
            active:scale-95
            disabled:opacity-30
          "
        >
          <Image src="/icon-next.svg" alt="next" width={28} height={28} />
        </button>

        <Carousel
          opts={{ align: 'start', containScroll: 'trimSnaps', loop: true }}
          setApi={setApi}
          className="px-10" 
        >
          <CarouselContent className="-ml-8">
            {logos.map((row, i) => {
              const img = row?.image as Media | undefined
              if (!img) return null
              const src = mediaUrl(img)
              const alt = mediaAlt(img)

              return (
                <CarouselItem
                  key={(row as any)?.id ?? i}
                  className=" pl-8  basis-1/2 sm:basis-1/3 md:basis-1/4  flex items-center justify-center
                  "
                >
                  <div className="relative w-full max-w-[220px] h-[90px]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      priority={false}
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
