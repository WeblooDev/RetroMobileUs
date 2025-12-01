'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { AudienceGrid as AudienceGridBlock } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, imageReveal } from '@/utilities/animations'

const AudienceGrid: React.FC<AudienceGridBlock> = ({ title, cards }) => {
  const items = cards ?? []

  return (
    <section className="container py-12  md:pb-20 md:py-8 ">
      <motion.h2
        className="text-3xl md:text-5xl lg:text-6xl leading-tight mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {items.map((card, i) => (
          <motion.div
            key={card?.id ?? i}
            className="relative w-full h-[350px] lg:h-auto lg:aspect-[276/387] overflow-hidden "
            variants={staggerItem}
          >
            <motion.div variants={imageReveal}>
              {card?.image && (
                <Media resource={card.image} fill priority={i < 2} imgClassName="object-cover" />
              )}
            </motion.div>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
              style={{
                background:
                  'linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)',
              }}
              aria-hidden
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center  text-center px-4 text-white">
              {card?.heading && (
                <h3 className="font-ivar text-7xl md:text-[180px] ">{card.heading}</h3>
              )}
              {card?.text && (
                <p className="text-sm md:text-base text-center w-[80%]">{card.text}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default AudienceGrid
