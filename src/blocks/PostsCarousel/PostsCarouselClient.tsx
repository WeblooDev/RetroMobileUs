'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import type { Media as MediaType } from '@/payload-types'
import type { LitePost } from './Component'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const PostsCarouselClient: React.FC<{
  title?: string | null
  viewAll?: any
  posts: LitePost[]
}> = ({ title, viewAll, posts }) => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const computeEdges = useCallback(() => {
    if (!api) return
    const snaps = api.scrollSnapList().length
    const selected = api.selectedScrollSnap()
    const inView = Math.max(api.slidesInView().length, 1)
    setAtStart(selected <= 0)
    setAtEnd(selected >= Math.max(snaps - inView, 0))
  }, [api])

  useEffect(() => {
    if (!api) return
    computeEdges()
    api.on('select', computeEdges)
    api.on('reInit', computeEdges)
    api.on('settle', computeEdges)
    return () => {
      api.off('select', computeEdges)
      api.off('reInit', computeEdges)
      api.off('settle', computeEdges)
    }
  }, [api, computeEdges])

  const viewAllLinks = Array.isArray(viewAll) ? viewAll : []
const router = useRouter()

  return (
    <section className="container">
      <div className="flex items-center justify-between gap-4 py-6 md:py-8">
        <h2 className="text-2xl md:text-4xl ">{title}</h2>
        <div className="flex gap-3">
          {viewAllLinks.map((l: any, i: number) => (
            <CMSLink key={i} {...l.link} type="custom" appearance="black" size="ctaBig" />
          ))}
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ align: 'start', loop: false, dragFree: true, containScroll: 'keepSnaps' }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
     {posts.map((p) => {
  const slug = `/news/${p.slug}`
  const thumb: MediaType | null | undefined = p.thumbnail

  // ✅ override logic
  const overrideUrl = p.readMore?.url?.trim()
  const href = overrideUrl || slug
  const isExternal = /^https?:\/\//i.test(href)
  const newTab = !!p.readMore?.newTab

  const go = () => {
    if (isExternal) {
      if (newTab) window.open(href, '_blank', 'noopener,noreferrer')
      else window.location.href = href
    } else {
      router.push(href)
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      go()
    }
  }

  return (
    <CarouselItem
      key={p.id}
      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 min-w-0"
    >
      <article
        className="group relative h-full overflow-hidden cursor-pointer"
        role="link"
        tabIndex={0}
        onClick={go}
        onKeyDown={onKey}
        aria-label={`${p.title}${isExternal ? ' (external)' : ''}`}
      >
        <div className="relative aspect-[16/9] w-full">
          {thumb && (
            <Media
              resource={thumb}
              fill
              imgClassName="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300 will-change-[filter]"
            />
          )}
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0 bg-black opacity-0 -translate-y-full transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0" />
          <div className="relative z-10 p-4 md:p-6 flex flex-col gap-3">
            <h3 className="text-lg md:text-xl transition-colors duration-300 group-hover:text-white">
              {p.title}
            </h3>
            {p.excerpt && (
              <p className="text-sm md:text-base line-clamp-3 transition-colors duration-300 group-hover:text-white">
                {p.excerpt}
              </p>
            )}

            <div className="pt-2 transition-all duration-300 ease-out opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
              {isExternal ? (
                <Link
                  href={href}
                  target={newTab ? '_blank' : undefined}
                  rel={newTab ? 'noopener noreferrer' : undefined}
                  className="!font-inter inline-flex items-center rounded-full bg-black px-4 py-2 text-white text-sm md:text-base border border-white hover:bg-white hover:text-black transition-colors duration-300" 
                  onClick={(e) => e.stopPropagation()} 
                >
                  Read More
                </Link>
              ) : (
                <span onClick={(e) => e.stopPropagation()} className="!font-inter inline-flex">
                  <Link href={href}  className="!font-helvetica inline-flex items-center rounded-full bg-black px-4 py-2 text-white text-sm md:text-base border border-white hover:bg-white hover:text-black transition-colors duration-300" 
>
                    Read More
                  </Link>
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </CarouselItem>
  )
})}

        </CarouselContent>
      </Carousel>

      <div className="mt-6 md:mt-8 flex items-center justify-center gap-6">
        <button
          onClick={() => api?.scrollPrev()}
          className={`group inline-flex items-center gap-2 text-sm md:text-base transition-opacity ${
            atStart ? 'opacity-30 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Previous"
          aria-disabled={atStart}
        >
          <Image
            src="/prev.svg"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-x-1"
            aria-hidden
          />
          <span>Prev</span>
        </button>

        <button
          onClick={() => api?.scrollNext()}
          className={`group inline-flex items-center gap-2 text-sm md:text-base transition-opacity ${
            atEnd ? 'opacity-30 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Next"
          aria-disabled={atEnd}
        >
          <span>Next</span>
          <Image
            src="/next.svg"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
            aria-hidden
          />
        </button>
      </div>
    </section>
  )
}

export default PostsCarouselClient
