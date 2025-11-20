'use client'

import { useState, useId } from 'react'
import arrowRight from '../../../public/arowright.svg'
import RichText from '@/components/RichText'
import type { Faq } from '@/payload-types'

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(' ')
}

type Cat = { id: number; name: string }
type Item = { id: number; question: string; answer2: NonNullable<Faq['answer2']> }

type FaqTabsClientProps = {
  categories: [Cat, ...Cat[]]
  itemsByCategory: Record<number, Item[]>
  accentColor: string
}

const PAGE_SIZE = 6

export default function FaqTabsClient({
  categories,
  itemsByCategory,
  accentColor,
}: FaqTabsClientProps) {
  const baseId = useId()
  const accent = accentColor

  const [activeId, setActiveId] = useState<number>(categories[0].id)
  const [openIdx, setOpenIdx] = useState<number>(-1)
  const [page, setPage] = useState<number>(1)

  const items = itemsByCategory[activeId]!
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const pageItems = items.slice(start, end)

  const handleChangeCategory = (catId: number) => {
    setActiveId(catId)
    setOpenIdx(-1)
    setPage(1)
  }

  const handlePrev = () => {
    setOpenIdx(-1)
    setPage((p) => (p > 1 ? p - 1 : p))
  }

  const handleNext = () => {
    setOpenIdx(-1)
    setPage((p) => (p < pageCount ? p + 1 : p))
  }

  return (
    <section className="container py-10 md:py-14">
      <div className="mb-8 flex flex-col md:flex-row justify-between gap-6 md:gap-12">
        {categories.map((c) => {
          const isActive = c.id === activeId
          return (
            <button
              key={c.id}
              onClick={() => handleChangeCategory(c.id)}
              className={clsx(
                '!font-ivar border-[2px] border-[#8B9B5C] px-8 py-6 text-xl md:text-2xl transition-colors w-full',
                isActive ? 'text-white' : 'bg-white text-black hover:bg-black/5',
              )}
              style={isActive ? { backgroundColor: accent, borderColor: accent } : undefined}
              aria-pressed={isActive}
            >
              {c.name}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-12">
        {pageItems.map((row, i) => {
          const globalIndex = start + i
          const isOpen = openIdx === globalIndex
          const qId = `${baseId}-q-${globalIndex}`
          const aId = `${baseId}-a-${globalIndex}`

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
                onClick={() =>
                  setOpenIdx((prev) => (prev === globalIndex ? -1 : globalIndex))
                }
                className="w-full flex items-center justify-between gap-6 px-5 md:px-7 py-5 md:py-8 text-left"
              >
                <span className="text-base md:text-lg lg:text-2xl">{row.question}</span>

                <div
                  className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full p-2 shadow-lg transition-colors duration-300 flex items-center justify-center"
                  style={{ backgroundColor: isOpen ? accent : '#FFFFFF' }}
                >
                  <span
                    aria-hidden
                    className={clsx(
                      'block h-4 w-4 transition-transform duration-300',
                      isOpen ? 'rotate-90' : 'rotate-0',
                    )}
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
                className="overflow-hidden transition-[max-height,opacity] duration-300"
                style={{ maxHeight: isOpen ? 700 : 0, opacity: isOpen ? 1 : 0 }}
              >
                <div className="px-5 md:px-7 pb-5 md:pb-6 mt-2 text-sm md:text-base lg:text-lg text-black w-[90%]">
                  <RichText data={row.answer2} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={page === 1}
            className={clsx(
              'font-ivar px-4 py-2 border text-sm md:text-base',
              page === 1
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-black hover:bg-black hover:text-white',
            )}
          >
            Previous
          </button>

          <p className="text-sm">
            Page {page} of {pageCount}
          </p>

          <button
            type="button"
            onClick={handleNext}
            disabled={page === pageCount}
            className={clsx(
              'font-ivar px-4 py-2 border text-sm md:text-base',
              page === pageCount
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-black hover:bg-black hover:text-white',
            )}
          >
            Next
          </button>
        </div>
      )}
    </section>
  )
}
