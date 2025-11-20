import Image from 'next/image'
import type { CardGrid as CardGridFields } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export default function CardGrid({
  columnsDesktop = '2',
  cards = [],
}: CardGridFields) {
  const gridCols =
    columnsDesktop === '1' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'

  return (
    <section className="container sm:px-6 py-12">
      <div className={`grid ${gridCols} gap-10`}>
        {cards?.map((card, i) => {
          const src =
            typeof card.image === 'string' ? '' : (card.image?.url ?? '')

          return (
            <article key={i} className={card.spanFullOnDesktop ? 'md:col-span-2' : ''}>
              {src && (
                <div className="w-full overflow-hidden">
                  <Image
                    src={src}
                    alt={card.title}
                    width={1600}
                    height={900}
                    className="h-full w-full object-cover max-h-[364px]"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="pt-5 text-center">
                <h3 className="font-ivar text-2xl md:text-3xl text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-sm max-w-prose mx-auto mb-5">{card.description}</p>

                {card.button && (
               
                 <CMSLink
               {...card.button}
               appearance="olive"
                size="ctaBig"
              >
              </CMSLink>                     


                  
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
