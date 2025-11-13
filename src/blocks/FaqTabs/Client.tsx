'use client'

import { useState, useId } from 'react'
import arrowRight from '../../../public/arowright.svg'
import RichText from '@/components/RichText'
import type { Faq } from '@/payload-types'

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ')
}

type Cat = { id: string; name: string }
type Item = { id: string; question: string; answer2: NonNullable<Faq['answer2']> }

// fallback for empty rich text
const EMPTY_RT = {
  root: { type: 'root', children: [], direction: null, format: '', indent: 0, version: 1 },
}

export default function FaqTabsClient({
  categories,
  itemsByCategory,
  accentColor = '#7A8E57',
}: {
  categories: Cat[]
  itemsByCategory: Record<string, Item[]>
  accentColor?: string
}) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const baseId = useId()
  const accent = accentColor as string

  const activeId = categories[activeIdx]?.id ?? ''
  const items: Item[] = itemsByCategory[activeId] ?? []

  return (
    <section className="container py-10 md:py-14">
      <div className="mb-8 flex flex-col md:flex-row justify-between gap-6 md:gap-12">
        {categories.map((c, i) => {
          const isActive = i === activeIdx
          return (
            <button
              key={c.id}
              onClick={() => { setActiveIdx(i); setOpenIdx(0) }}
              className={clsx(
                '!font-ivar border-[2px] border-[#8B9B5C] px-8 py-6 text-xl md:text-2xl transition-colors w-full',
                isActive ? 'text-white' : 'bg-white text-black hover:bg-black/5'
              )}
              style={isActive ? { backgroundColor: accent, borderColor: accent } : undefined}
              aria-pressed={isActive}
            >
              {c.name}
            </button>
          )
        })}
      </div>

      {/* FAQ list */}
      <div className="flex flex-col gap-12">
        {items.map((row, i) => {
          const isOpen = openIdx === i
          const qId = `${baseId}-q-${i}`
          const aId = `${baseId}-a-${i}`

          return (
            <div
              key={row.id}
              className={clsx(
                'rounded-md shadow-lg transition-colors',
                'bg-white',
                isOpen ? 'border-[2px]' : 'border border-transparent',
              )}
              style={isOpen ? { borderColor: accent } : undefined}
            >
              <button
                id={qId}
                aria-expanded={isOpen}
                aria-controls={aId}
                onClick={() => setOpenIdx(p => (p === i ? null : i))}
                className="w-full flex items-center justify-between gap-6 px-5 md:px-7 py-5 md:py-8 text-left"
              >
                <span className="text-base md:text-lg lg:text-2xl">{row.question}</span>

                <div
                  className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full p-2 shadow-lg transition-colors duration-300 flex items-center justify-center"
                  style={{ backgroundColor: isOpen ? accent : '#FFFFFF' }}
                >
                  <span
                    aria-hidden
                    className={clsx('block h-4 w-4 transition-transform duration-300', isOpen ? 'rotate-90' : 'rotate-0')}
                    style={{
                      WebkitMaskImage: `url(${arrowRight.src})`,
                      maskImage: `url(${arrowRight.src})`,
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain',
                      backgroundColor: isOpen ? '#FFFFFF' : accent,
                      display: 'block',
                    }}
                  />
                </div>
              </button>

              <div
                id={aId}
                role="region"
                aria-labelledby={qId}
                className={clsx('overflow-hidden transition-[max-height,opacity] duration-300', isOpen ? 'opacity-100' : 'opacity-0')}
                style={{ maxHeight: isOpen ? 500 : 0 }}
              >
                <div className="px-5 md:px-7 pb-5 md:pb-6 mt-2 text-sm md:text-base lg:text-lg text-black w-[90%]">
                  {/* ✅ Just pass the Payload JSON; your RichText component should handle it */}
                  <RichText data={(row.answer2 ?? EMPTY_RT) as any} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
