'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { ImageLeftTextRightSimple as BlockType } from '@/payload-types'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

export const ImageLeftTextRightSimple: React.FC<BlockType> = ({
  image,
  paragraph1,
  paragraph2,
}) => {
  return (
    <section className="container py-12 md:py-16">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <motion.div
          className="relative aspect-[681/313] w-full overflow-hidden"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={imageReveal}>
            <Media resource={image} fill imgClassName="object-cover" />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col text-center md:text-start"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <p className="text-sm md:text-base text-black mb-4 whitespace-pre-line">{paragraph1}</p>

          <p className="text-sm md:text-base text-black ">{paragraph2}</p>
        </motion.div>
      </div>
    </section>
  )
}

export default ImageLeftTextRightSimple
