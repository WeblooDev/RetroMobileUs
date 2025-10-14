'use client'

import { Media } from '@/components/Media'
import type { AudienceGrid as AudienceGridBlock } from '@/payload-types'

const AudienceGrid: React.FC<AudienceGridBlock> = ({ title, cards }) => {
  const items = cards ?? []

  return (
    <section className="container py-12  md:pb-20 md:py-8 ">
      <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight mb-12">{title}</h2>

      <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((card, i) => (
          <div key={card?.id ?? i} className="relative w-full aspect-[276/387] overflow-hidden ">
            {card?.image && (
              <Media resource={card.image} fill priority={i < 2} imgClassName="object-cover" />
            )}

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
              style={{
                background:
                  'linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)',
              }}
              aria-hidden
            />

            <div className="absolute inset-0 flex flex-col items-center justify-start text-center px-4 text-white">
              {card?.heading && (
                <h3 className="font-ivar text-[64px] md:text-[200px] ">{card.heading}</h3>
              )}
              {card?.text && <p className="mt-3 text-sm md:text-xl">{card.text}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AudienceGrid
