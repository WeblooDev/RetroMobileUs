import React from 'react'
import type { TravelCards as TravelCardsBlock } from '@/payload-types'
import { Media } from '@/components/Media'

const TravelCardsComponent: React.FC<TravelCardsBlock> = ({ title, items }) => {
  const cards = Array.isArray(items) ? items : []

  return (
    <section className="py-12 md:py-20 bg-black">
      <div className="container">
        {title && (
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-8 md:mb-12 text-white">{title}</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((c, i) => (
            <article key={c?.id ?? i} className="group relative overflow-hidden">
              <div className="relative aspect-[433/440] w-full">
                {c?.image && (
                  <Media
                    resource={c.image}
                    fill
                    imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={i === 0}
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white">
                  {c?.subtitle && (
                    <h3 className="text-xl md:text-2xl  mb-2">{c.subtitle}</h3>
                  )}
                  {c?.description && (
                    <p className="text-sm md:text-base ">
                      {c.description}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TravelCardsComponent
