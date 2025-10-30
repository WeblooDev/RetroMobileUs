import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { KnowBeforeYouGo as KnowBeforeYouGoBlock } from '@/payload-types'

const KnowBeforeYouGo: React.FC<KnowBeforeYouGoBlock> = ({
  title,
  description,
  items,
  cta,
}) => {
  const cards = Array.isArray(items) ? items.slice(0, 4) : []

  return (
    <section className="py-12 md:py-20 my-20 bg-[#8B9B5C] text-white">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-2 md:gap-4 items-start ">
        <h2 className="w-full lg:w-[40%] text-3xl md:text-4xl lg:text-5xl leading-tight">{title}</h2>
        <p className="w-full lg:w-[30%] text-sm md:text-base  md:pt-3">{description}</p>
      </div>

      <div className="container mx-auto mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-0 lg:grid-cols-4 ">
        {cards.map((card, i) => (
          <article key={card?.id ?? i} className="group">
            <div className="mb-3 md:mb-4">
              <span className="block h-[1px] w-16 bg-white/60 mb-2" />
              <p className="text-sm md:text-lg ">{card?.title}</p>
            </div>

            <div className="relative aspect-[360/421] w-full overflow-hidden">
              {card?.image && <Media resource={card.image} fill imgClassName="object-cover" />}
            </div>
          </article>
        ))}
      </div>

      {Array.isArray(cta) && cta[0]?.link && (
        <div className="mt-10 md:mt-14 flex justify-center px-6 md:px-12">
          <CMSLink {...cta[0].link} type="custom" appearance="transparent" size="ctaBig" />
        </div>
      )}
    </section>
  )
}

export default KnowBeforeYouGo
