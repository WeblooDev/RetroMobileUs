'use client'

import { Media } from '@/components/Media'
import type { PartnerBenefits as PartnerBenefitsBlock } from '@/payload-types'

const PartnerBenefits: React.FC<PartnerBenefitsBlock> = ({ title, description, cards }) => {
  const items = cards ?? []

  return (
    <section className="w-full">
      <div className="container  pt-10 md:pt-16">
        <h2 className="font-ivar text-4xl md:text-6xl ">{title}</h2>
        {description && <p className="mt-4 text-base ">{description}</p>}
      </div>

      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((card, i) => (
            <div key={card.id ?? i} className="relative min-h-[200px] p-12 lg:aspect-[228/487] overflow-hidden shadow-lg">
              <div className="absolute inset-0">
                <Media resource={card.image} fill priority={i < 2} imgClassName="object-cover" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 py-16 px-8 text-center text-white h-full flex flex-col justify-center items-center ">
                <h3 className=" text-6xl lg:text-[180px]">{card.heading}</h3>
                {card.body && <p className="text-sm lg:text-base ">{card.body}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerBenefits
