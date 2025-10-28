'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Cat = { id: string; name: string; slug: string }

function useIsDesktop1200() {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(min-width: 1200px)').matches
  })
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1200px)')
    const handler = () => setIsDesktop(mql.matches)
    handler()
    mql.addEventListener?.('change', handler)
    return () => mql.removeEventListener?.('change', handler)
  }, [])
  return isDesktop
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
  className,
}: {
  categories: Cat[]
  active: string | null
  onChange: (id: string) => void
  className?: string
}) {
  const isDesktop = useIsDesktop1200()

  if (isDesktop) {
    return (
      <DesktopTabs categories={categories} active={active} onChange={onChange} className={className} />
    )
  }
  return (
    <MobileCarousel categories={categories} active={active} onChange={onChange} className={className} />
  )
}

function DesktopTabs({
  categories,
  active,
  onChange,
  className,
}: {
  categories: Cat[]
  active: string | null
  onChange: (id: string) => void
  className?: string
}) {
  const rowRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 })

  const computeIndicator = () => {
    if (!rowRef.current || !active) return
    const rowBox = rowRef.current.getBoundingClientRect()
    const idx = categories.findIndex((c) => c.id === active)
    const el = tabRefs.current[idx]
    if (!el) return
    const box = el.getBoundingClientRect()
    setIndicator({ left: box.left - rowBox.left, width: box.width })
  }

  useEffect(() => {
    computeIndicator()
    const ro = new ResizeObserver(() => computeIndicator())
    if (rowRef.current) ro.observe(rowRef.current)
    tabRefs.current.forEach((el) => el && ro.observe(el))
    const onWin = () => computeIndicator()
    window.addEventListener('resize', onWin)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onWin)
    }
  }, [active, categories])

  return (
    <div
      ref={rowRef}
      role="tablist"
      aria-label="Sponsor categories"
      className={[
        'relative flex w-full items-center justify-between gap-10 overflow-x-auto pb-3',
        className ?? '',
      ].join(' ')}
    >
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] bg-[#E5E5E5]" />
      <div
        className="pointer-events-none absolute bottom-0 h-[2px] bg-[#8B9B5C] transition-all duration-300 ease-out"
        style={{ left: indicator.left, width: indicator.width }}
      />

      {categories.map((c, i) => {
        const isActive = active === c.id
        return (
          <button
            key={c.id}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(c.id)}
            className={[
              'font-ivar relative pb-2 text-lg lg:text-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B9B5C]/40 focus-visible:rounded',
              isActive ? 'text-[#8B9B5C]' : 'text-gray-400 hover:text-black',
            ].join(' ')}
          >
            {c.name}
          </button>
        )
      })}
    </div>
  )
}

function MobileCarousel({
  categories,
  active,
  onChange,
  className,
}: {
  categories: Cat[]
  active: string | null
  onChange: (id: string) => void
  className?: string
}) {
  const [emblaViewportRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    containScroll: 'trimSnaps',
  })

  const viewportNodeRef = useRef<HTMLDivElement | null>(null)
  const setViewportRefs = useCallback((el: HTMLDivElement | null) => {
    emblaViewportRef(el)
    viewportNodeRef.current = el
  }, [emblaViewportRef])

  const slides = useMemo(() => categories, [categories])

  const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 })
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const computeIndicator = () => {
    const vp = viewportNodeRef.current
    if (!vp || !active) return
    const vpBox = vp.getBoundingClientRect()
    const idx = categories.findIndex((c) => c.id === active)
    const el = itemRefs.current[idx]
    if (!el) return
    const box = el.getBoundingClientRect()
    setIndicator({ left: box.left - vpBox.left + vp.scrollLeft, width: box.width })
  }

  useEffect(() => {
    computeIndicator()
    const onResize = () => computeIndicator()
    window.addEventListener('resize', onResize)
    const ro = new ResizeObserver(() => computeIndicator())
    itemRefs.current.forEach((el) => el && ro.observe(el))
    if (viewportNodeRef.current) ro.observe(viewportNodeRef.current)
    return () => {
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [active, categories])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const scrollToActive = () => {
    const idx = categories.findIndex((c) => c.id === active)
    if (idx >= 0) emblaApi?.scrollTo(idx)
  }

  useEffect(() => {
    scrollToActive()
  }, [active, emblaApi])

  return (
    <div className={['relative ', className ?? ''].join(' ')}>
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] bg-[#E5E5E5] z-0" />
      <div
        className="pointer-events-none absolute bottom-0 h-[2px] bg-[#8B9B5C] transition-all duration-300 ease-out z-10"
        style={{ left: indicator.left, width: indicator.width }}
      />

      <button
        aria-label="Previous"
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 border shadow"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
      <button
        aria-label="Next"
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 border shadow"
      >
        <ArrowRight className="h-4 w-4" />
      </button>

      <div ref={setViewportRefs} className="w-[80%] mx-auto overflow-hidden p-6 ">
        <div className="flex gap-6">
          {slides.map((c, i) => {
            const isActive = active === c.id
            return (
              <div key={c.id} className="shrink-0">
                <button
                  ref={(el) => {
                    itemRefs.current[i] = el
                  }}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onChange(c.id)}
                  className={[
                    'font-ivar relative pb-2 text-lg transition-colors mx-2',
                    isActive ? 'text-[#8B9B5C]' : 'text-gray-400 hover:text-black',
                  ].join(' ')}
                >
                  {c.name}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
