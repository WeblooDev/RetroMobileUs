'use client'

import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { MerchShowcase as MerchShowcaseBlock } from '@/payload-types'

const MerchShowcase: React.FC<MerchShowcaseBlock> = ({ title, description, items }) => {
  const cards = items ?? []

  return (
    <section className="container py-12 md:py-20">
      <div className="max-w-4xl">
        <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>
        {description && <p className="mt-3 text-sm md:text-base text-black/70">{description}</p>}
      </div>

      <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {cards.map((card, i) => {
          const [primary] = (card?.links ?? [])
            .map((row: any) => row?.link)
            .filter((l: any) => l && l.label && l.url && l.url.trim())

          return (
            <div key={card?.id ?? i} className="flex flex-col">
              <div className="relative w-full aspect-[320/487] overflow-hidden rounded-md">
                {card?.image && (
                  <Media resource={card.image} fill priority={i < 2} imgClassName="object-cover" />
                )}

                {card?.title && (
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-white flex justify-center items-center">
                    <p className="text-sm md:text-xl text-center w-[50%]">{card.title}</p>
                  </div>
                )}
              </div>

              {primary && (
                <div className="mt-4 flex justify-center">
                  <CTAButton
                    href={primary.url!}
                    variant="olive"
                    size="big"
                    aria-label={primary.label}
                  >
                    {primary.label}
                  </CTAButton>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default MerchShowcase
