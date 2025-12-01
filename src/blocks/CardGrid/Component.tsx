'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { CardGrid as CardGridFields } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { staggerContainer, staggerItem, imageReveal } from '@/utilities/animations'

export default function CardGrid({ columnsDesktop = '2', cards = [] }: CardGridFields) {
  const gridCols = columnsDesktop === '1' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'

  return (
    <section className="container sm:px-6 py-12">
      <motion.div
        className={`grid ${gridCols} gap-10`}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {cards?.map((card, i) => {
          const src = typeof card.image === 'string' ? '' : (card.image?.url ?? '')

          const isComingSoon =
            card?.button?.label && card.button.label.trim().toLowerCase() === 'coming soon'

          return (
            <motion.article
              key={i}
              className={card.spanFullOnDesktop ? 'md:col-span-2' : ''}
              variants={staggerItem}
            >
              {src && (
                <motion.div className="w-full overflow-hidden" variants={imageReveal}>
                  <Image
                    src={src}
                    alt={card.title}
                    width={1600}
                    height={900}
                    className="h-full w-full object-cover max-h-[364px]"
                    loading="lazy"
                  />
                </motion.div>
              )}

              <div className="pt-5 text-center">
                <h3 className="font-ivar text-2xl md:text-3xl text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-sm max-w-prose mx-auto mb-5">{card.description}</p>

                {card.button && (
                  <>
                    {isComingSoon ? (
                      <span className="inline-flex items-center justify-center rounded-full text-white  bg-[#8B9B5C] px-8 py-3 text-base  uppercase  cursor-default">
                        {card.button.label}
                      </span>
                    ) : (
                      <CMSLink {...card.button} appearance="olive" size="ctaBig">
                        {card.button.label}
                      </CMSLink>
                    )}
                  </>
                )}
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}
