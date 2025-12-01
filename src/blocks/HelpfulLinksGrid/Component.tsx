'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { HelpfulLinksGrid as HelpfulLinksGridBlock } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, imageReveal } from '@/utilities/animations'

const HelpfulLinksGrid: React.FC<HelpfulLinksGridBlock> = ({ title, items }) => {
  const cards = items ?? []

  return (
    <section className="py-12 md:py-20">
      <motion.h2
        className="container mx-auto text-3xl md:text-6xl p-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {cards.map((card, i) => {
          const links = Array.isArray(card?.links) ? card.links : []
          return (
            <motion.div
              key={card?.id ?? i}
              className="relative w-full aspect-[16/9] overflow-hidden"
              variants={staggerItem}
            >
              <motion.div variants={imageReveal}>
                {card?.image && <Media resource={card.image} fill imgClassName="object-cover" />}
              </motion.div>
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
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

export default HelpfulLinksGrid
