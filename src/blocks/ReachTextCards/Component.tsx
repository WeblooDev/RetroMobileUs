'use client'

import type { ReachTextCards as ReachTextCardsBlock } from '@/payload-types'

const ReachTextCards: React.FC<ReachTextCardsBlock> = ({ title, description, cards }) => {
  const items = cards ?? []

  return (
    <section className="w-full">
      <div className="container pt-10 md:pt-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl ">{title}</h2>
        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-[minmax(0,560px)_1fr] items-start gap-6">
          {description ? (
            <p className="text-base md:text-lg text-black/80 max-w-[560px]">{description}</p>
          ) : (
            <div />
          )}
          <div className="hidden md:block h-px w-full self-center bg-black/10 mt-6 md:mt-3" />
        </div>
      </div>

      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((card, i) => {
            const bg =
              typeof card.backgroundColor === 'string' && card.backgroundColor.trim()
                ? card.backgroundColor
                : '#8B9B5C'
            const color =
              typeof card.textColor === 'string' && card.textColor.trim()
                ? card.textColor
                : '#FFFFFF'

            return (
              <div
                key={i}
                className="flex items-center justify-center text-center px-6 md:px-10 py-10 md:py-14"
                style={{ backgroundColor: bg }}
              >
                <h3 className="font-ivar text-lg md:text-xl " style={{ color }}>
                  {card.text}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ReachTextCards
