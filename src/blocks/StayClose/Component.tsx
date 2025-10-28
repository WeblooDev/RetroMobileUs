'use client'

import * as React from 'react'
import { Media } from '@/components/Media'
import type { StayClose as StayCloseBlock } from '@/payload-types'
import Autoplay from 'embla-carousel-autoplay'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import Image from 'next/image'

const StayClose: React.FC<StayCloseBlock> = ({ title, description, slides }) => {
  const items = Array.isArray(slides) ? slides : []
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    onSelect()
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const handlePrev = () => api?.scrollPrev()
  const handleNext = () => api?.scrollNext()

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="px-6 md:px-0">
          <h2 className="text-4xl md:text-7xl leading-tight">{title}</h2>
          {description && (
            <p className="mt-4 text-base md:text-lg text-muted-foreground">{description}</p>
          )}
        
        </div>

        <div>
        <Carousel
    setApi={setApi}
    opts={{ align: 'start', dragFree: true, loop: true, containScroll: 'keepSnaps' }}
    plugins={[
      Autoplay({ delay: 3000, stopOnInteraction: true })
    ]}
    className="min-h-[480px]" 
  >
    <CarouselContent className="-ml-2 md:-ml-4">
   {items.map((card, i) => {
  const isActive = i === selectedIndex
  return (
    <CarouselItem
      key={card?.id ?? i}
      className="pl-2 md:pl-4 basis-[85%] sm:basis-[100%] md:basis-1/2"
    >
      <article className="w-full overflow-hidden">
        <div
          className={`relative w-full transition-all duration-300 ${
            isActive ? 'md:aspect-[350/480]' : 'md:aspect-[350/400]'
          } aspect-[350/480]`} 
        >
          {card?.image && (
            <Media resource={card.image} fill imgClassName="object-cover" />
          )}
        </div>
      </article>

      {card?.title && (
        <p
          className={`mt-3 text-xs md:text-sm opacity-80 ${
            isActive ? 'block' : 'hidden md:block'
          }`}
        >
          {card.title}
        </p>
      )}
    </CarouselItem>
  )
})}

    </CarouselContent>
  </Carousel>

          <div className="mt-6 flex items-center justify-center gap-8">
                <button
                onClick={handlePrev}
                className="group inline-flex items-center gap-2 text-sm transition"
                aria-label="Previous"
                >
                <Image
                    src="/prev.svg"     
                    alt="prev" 
                    width={16}
                    height={16}
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                />
                <span>Prev</span>
                </button>

                <button
                onClick={handleNext}
                className="group inline-flex items-center gap-2 text-sm transition"
                aria-label="Next"
                >
                <span>Next</span>
                <Image
                    src="/next.svg"         
                    alt="next"
                    width={16}
                    height={16}
                    aria-hidden
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
                </button>

          </div>
        </div>
      </div>
    </section>
  )
}

export default StayClose
