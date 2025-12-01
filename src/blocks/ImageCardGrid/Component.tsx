'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { ImageCardGrid as ImageCardGridBlock } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

const ImageCardGrid: React.FC<ImageCardGridBlock> = ({ title, items = [] }) => {
  return (
    <section className="container py-12 md:py-16">
      <motion.h2
        className="mb-6 text-center text-2xl leading-tight md:mb-8 md:text-4xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {items.map((card) => {
          const { id, image, text, link } = card

          return (
            <motion.article
              key={(id as string) ?? text}
              className="flex w-full flex-col items-center border p-8 justify-center gap-4"
              variants={staggerItem}
            >
              <CMSLink {...link} className="group  w-full h-auto flex flex-col items-center">
                <Media
                  resource={image}
                  imgClassName="h-auto max-h-[150px] max-w-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </CMSLink>

              <p className="mt-3 text-center text-sm text-black md:text-base">{text}</p>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

export default ImageCardGrid
