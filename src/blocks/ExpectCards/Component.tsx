'use client'

import Link from 'next/link'
import { Media } from '@/components/Media'
import type { ExpectCards as ExpectCardsBlock } from '@/payload-types'

const ExpectCards: React.FC<ExpectCardsBlock> = ({ title, cards }) => {
  const items = cards ?? []

  return (
    <section className="container py-12">
      <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((card, i) => {
          const inner = (
            <div className="relative group h-[320px] md:h-[476px] w-full">
              {/* Image via Media (handles id or populated doc) */}
              <div className="absolute inset-0">
                <Media resource={card.image} fill imgClassName="object-cover" />
              </div>

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 text-white p-8 flex flex-col gap-2 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-xl md:text-2xl lg:text-3xl">{card.title}</h3>
                <p className="mt-1 text-xs md:text-base text-white/90">{card.description}</p>
              </div>
            </div>
          )

          const href = typeof card.url === 'string' && card.url.trim() ? card.url : undefined
          return href ? (
            <Link
              key={i}
              href={href}
              className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/40"
              aria-label={card.title}
            >
              {inner}
            </Link>
          ) : (
            <div key={i}>{inner}</div>
          )
        })}
      </div>
    </section>
  )
}

export default ExpectCards
