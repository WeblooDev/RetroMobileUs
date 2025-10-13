'use client'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { HelpfulLinksGrid as HelpfulLinksGridBlock } from '@/payload-types'

const HelpfulLinksGrid: React.FC<HelpfulLinksGridBlock> = ({ title, items }) => {
  const cards = items ?? []

  return (
    <section className="py-12 md:py-20">
      <h2 className="container mx-auto text-3xl md:text-6xl p-12">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {cards.map((card, i) => {
          const links = Array.isArray(card?.links) ? card.links : []
          return (
            <div key={card?.id ?? i} className="relative w-full aspect-[16/9] overflow-hidden">
              {card?.image && <Media resource={card.image} fill imgClassName="object-cover" />}
              <div className="absolute inset-0 flex items-end">
                <div className="p-5 md:p-14 text-white max-w-3xl">
                  <h3 className="text-2xl md:text-5xl leading-tight">{card.title}</h3>
                  <p className="mt-4 text-xs md:text-base text-white">{card.description}</p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {links.map((link, index) => (
                      <CMSLink
                        key={index}
                        {...link.link}
                        appearance="outlineWhite"
                        size="ctaBig"
                        className="inline-flex"
                      />
                    ))}

                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HelpfulLinksGrid
