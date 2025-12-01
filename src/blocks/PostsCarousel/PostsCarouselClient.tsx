'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import type { Media as MediaType } from '@/payload-types'
import type { LitePost } from './Component'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { motion } from 'framer-motion'

type TagLite = {
  id?: string | number | null
  slug?: string | null
  title?: string | null
}

type NormalizedTag = { slug: string; title: string }

const normalizeTags = (tags: (string | TagLite)[] | null | undefined): NormalizedTag[] =>
  (tags ?? []).map((t) =>
    typeof t === 'string'
      ? { slug: t, title: t }
      : {
          slug: (t?.slug ?? String(t?.id ?? '')).toString(),
          title: (t?.title ?? t?.slug ?? String(t?.id ?? '')).toString(),
        },
  )

type CMSLinkProps = React.ComponentProps<typeof CMSLink>
type ViewAllItem = { link: CMSLinkProps }

const PostsCarouselClient: React.FC<{
  title?: string | null
  viewAll?: ViewAllItem[] | null
  posts: LitePost[]
}> = ({ title, viewAll, posts }) => {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const router = useRouter()

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

  const viewAllLinks: ViewAllItem[] = Array.isArray(viewAll) ? viewAll : []

  const linkBtnClass =
    '!font-inter inline-flex items-center rounded-full bg-black px-4 py-2 text-white text-sm md:text-base border border-white hover:bg-white hover:text-black transition-colors duration-300'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  const carouselItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  const navButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <motion.section
      className="container mx-auto px-4 py-10 md:py-12 lg:py-14"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <motion.div
        className="flex items-center justify-between gap-4 py-6 md:py-8"
        variants={headerVariants}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl">{title}</h2>
        <div className="flex gap-3 flex-wrap">
          {viewAllLinks.map((l: ViewAllItem, i: number) => (
            <CMSLink key={i} {...l.link} type="custom" appearance="black" size="ctaBig" />
          ))}
        </div>
      </motion.div>

      <motion.div variants={carouselItemVariants}>
        <Carousel
          setApi={setApi}
          opts={{ align: 'start', loop: false, dragFree: true, containScroll: 'keepSnaps' }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {posts.map((p, index) => {
              const slug = `/news/${p.slug}`
              const thumb: MediaType | null | undefined = p.thumbnail ?? null
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

              const tags = normalizeTags(p.tags)

              return (
                <CarouselItem
                  key={p.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 min-w-0"
                >
                  <motion.article
                    className="group relative h-full overflow-hidden cursor-pointer"
                    role="link"
                    tabIndex={0}
                    onClick={go}
                    onKeyDown={onKey}
                    aria-label={`${p.title}${isExternal ? ' (external)' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    whileHover={{ y: -8 }}
                  >
                    <div className="relative aspect-[16/9] w-full">
                      {thumb && (
                        <Media
                          resource={thumb}
                          fill
                          imgClassName="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300 will-change-[filter]"
                        />
                      )}

                      {tags.length > 0 && (
                        <motion.div
                          className="pointer-events-none absolute left-4 bottom-4 z-10 flex max-w-[92%] flex-wrap gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          {tags.map((t, tagIndex) => (
                            <motion.span
                              key={`${p.id}-${t.slug}`}
                              className="pointer-events-none rounded-full bg-white backdrop-blur px-5 py-2 text-xl "
                              title={t.title}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.3,
                                delay: 0.3 + tagIndex * 0.1,
                                ease: [0.22, 1, 0.36, 1] as const,
                              }}
                            >
                              {t.title}
                            </motion.span>
                          ))}
                        </motion.div>
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
                              className={linkBtnClass}
                              onClick={(e) => e.stopPropagation()}
                            >
                              Read More
                            </Link>
                          ) : (
                            <Link href={href} className={linkBtnClass}>
                              Read More
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </motion.div>

      <motion.div
        className="mt-6 md:mt-8 flex items-center justify-center gap-6"
        variants={navButtonVariants}
      >
        <motion.button
          onClick={() => api?.scrollPrev()}
          className={clsx(
            'group inline-flex items-center gap-2 text-sm md:text-base transition-opacity',
            atStart ? 'opacity-30 pointer-events-none' : 'opacity-100',
          )}
          aria-label="Previous"
          aria-disabled={atStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>

        <motion.button
          onClick={() => api?.scrollNext()}
          className={clsx(
            'group inline-flex items-center gap-2 text-sm md:text-base transition-opacity',
            atEnd ? 'opacity-30 pointer-events-none' : 'opacity-100',
          )}
          aria-label="Next"
          aria-disabled={atEnd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default PostsCarouselClient
