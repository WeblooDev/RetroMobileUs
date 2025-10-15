"use client"

import { Media } from "@/components/Media"
import { CTAButton } from "@/components/CTAButton"
import type { HelpfulLinksGrid as HelpfulLinksGridBlock } from "@/payload-types"

const HelpfulLinksGrid: React.FC<HelpfulLinksGridBlock> = ({ title, items }) => {
  const cards = items ?? []

  return (
    <section className=" py-12 md:py-20">
      {/* Title */}
      <h2 className="container mx-auto text-3xl md:text-6xl p-12">{title}</h2>

      {/* Grid */}
      <div className=" grid grid-cols-1 md:grid-cols-2 ">
        {cards.map((card, i) => {
          // first valid link becomes CTA
          const [primary] =
            (card?.links ?? [])
              .map((row: any) => row?.link)
              .filter((l: any) => l && l.label && l.url && l.url.trim())

          return (
            <div key={card?.id ?? i} className="relative w-full aspect-[16/9] overflow-hidden ">
              {/* Background image */}
              {card?.image && <Media resource={card.image} fill imgClassName="object-cover" />}

              {/* Dark gradient for readability */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.10) 100%)",
                }}
                aria-hidden
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-end">
                <div className="p-5 md:p-14 text-white max-w-3xl">
                  {card?.title && (
                    <h3 className="text-2xl md:text-5xl leading-tight">{card.title}</h3>
                  )}
                  {card?.description && (
                    <p className="mt-4 text-xs md:text-base text-white">{card.description}</p>
                  )}

                  {primary && (
                    <div className="mt-4">
                      <CTAButton
                        href={primary.url!}
                        aria-label={primary.label}
                        size="big"
                        variant="outlineWhite"
                      >
                        {primary.label}
                      </CTAButton>
                    </div>
                  )}
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
