'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Media as MediaCmp } from '@/components/Media'
import type { CharityCards as CharityCardsBlock, Media } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, fadeIn } from '@/utilities/animations'

const CharityCardsComponent: React.FC<CharityCardsBlock> = ({ title, backgroundImage, cards }) => {
  const bgUrl =
    backgroundImage && typeof backgroundImage === 'object'
      ? (backgroundImage as Media)?.url
      : undefined

  return (
    <section className="container relative w-full py-14">
      <motion.h2
        className="text-4xl md:text-6xl font-ivar mb-10"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {title}
      </motion.h2>

      <div className="relative w-full px-8 py-12 flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MediaCmp resource={backgroundImage} fill priority imgClassName="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col lg:flex-row gap-6 px-6 max-w-6xl w-full justify-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {cards?.map((card, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-white/10 border border-white text-center text-white p-8 backdrop-blur-sm"
              variants={staggerItem}
            >
              <h3 className="font-ivar text-2xl mb-2">{card.title}</h3>
              <p className="text-xl">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CharityCardsComponent
