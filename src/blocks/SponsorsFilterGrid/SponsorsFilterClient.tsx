'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import CategoryFilter from './CategoryFilter'

type Cat = { id: string; name: string; slug: string }
type Item = {
  id: string
  name: string
  description: string
  categories: Cat[]
  logo: Media
  backgroundImage: Media
}

const mediaUrl = (m: Media) => (m as any)?.url as string

export default function SponsorsFilterClient({
  categories,
  items,
  showDescriptions = true,
}: {
  categories: Cat[]
  items: Item[]
  showDescriptions?: boolean
}) {
  const [active, setActive] = useState<string | null>(categories[0]?.id ?? null)

  const filtered = useMemo(() => {
    if (!active) return items
    return items.filter((p) => p.categories?.some((c) => String(c.id) === String(active)))
  }, [items, active])

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto p-4">
        <CategoryFilter categories={categories} active={active} onChange={(id) => setActive(id)} />

        {filtered.length === 0 ? (
          <p className="text-muted-foreground mt-12">No sponsors found for this category.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-8">
            {filtered.map((p) => {
              const bg = mediaUrl(p.backgroundImage)
              const logo = mediaUrl(p.logo)
              return (
                <article
                  key={p.id}
                  className="group relative overflow-hidden rounded border border-[#B9B9B9] bg-white"
                >
                  <div className="relative aspect-[280/100] w-full flex flex-col justify-center items-center">
                    <div className="relative px-4">
                      <Image
                        src={logo}
                        alt={`${p.name} logo`}
                        width={240}
                        height={110}
                        className="h-auto w-auto max-h-28 object-contain"
                      />
                    </div>

                    {showDescriptions && (
                      <div className="flex justify-center">
                        <div className="m-4 rounded px-3 py-2 text-xs md:text-sm text-black transition-colors duration-500 ease-out  text-center w-[80%]">
                          {p.description}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
