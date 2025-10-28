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
      <div className="max-w-[1500px] mx-auto p-4">
        <CategoryFilter categories={categories} active={active} onChange={(id) => setActive(id)} />

        {filtered.length === 0 ? (
          <p className="text-muted-foreground mt-12">No sponsors found for this category.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12">
            {filtered.map((p) => {
              const bg = mediaUrl(p.backgroundImage)
              const logo = mediaUrl(p.logo)
              return (
                <article key={p.id} className="group relative overflow-hidden rounded border border-[#B9B9B9] bg-white">
                  <div className="relative aspect-[296/469] w-full">
                    <div className="absolute inset-0 -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                      <Image
                        src={bg}
                        alt={p.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
                    </div>

                    <div className="absolute left-1/2 top-4 -translate-x-1/2 px-4">
                      <Image
                        src={logo}
                        alt={`${p.name} logo`}
                        width={240}
                        height={110}
                        className="h-auto w-auto max-h-28 object-contain"
                      />
                    </div>

                    {showDescriptions && (
                      <div className="absolute inset-x-0 bottom-0">
                        <div className="m-4 rounded px-3 py-2 text-xs md:text-sm text-black transition-colors duration-500 ease-out group-hover:text-white">
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
