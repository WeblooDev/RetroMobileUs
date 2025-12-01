'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { SideImageInfo as SideImageInfoBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

const SideImageInfoComponent: React.FC<SideImageInfoBlock> = ({ title, description, image }) => {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <motion.div
            className="md:col-span-7"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div
              className="relative aspect-[16/9] md:aspect-[3/2] lg:aspect-[2/1] w-full overflow-hidden"
              variants={imageReveal}
            >
              <Media resource={image} fill imgClassName="object-cover" priority />
            </motion.div>
          </motion.div>

          <motion.div
            className="md:col-span-5"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {title && (
              <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-8 leading-tight">
                {title}
              </h2>
            )}

            {description && (
              <p className="text-sm md:text-base leading-relaxed text-center md:text-left whitespace-pre-line">
                {description}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SideImageInfoComponent
