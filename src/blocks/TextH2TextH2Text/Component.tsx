'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { TextH2TextH2Text as BlockType } from '@/payload-types'
import { staggerContainer, staggerItem } from '@/utilities/animations'

export const TextH2TextH2Text: React.FC<BlockType> = ({
  intro,
  intro2,
  heading1,
  body1,
  heading2,
  body2,
}) => {
  return (
    <motion.section
      className="container py-12 md:py-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Top paragraph */}
      <motion.p
        className="max-w-4xl text-base md:text-lg leading-relaxed text-black"
        variants={staggerItem}
      >
        {intro}
      </motion.p>

      <motion.p
        className="max-w-4xl text-base md:text-lg leading-relaxed text-black"
        variants={staggerItem}
      >
        {intro2}
      </motion.p>
      {/* Section 1 */}
      <motion.div className="mt-10 md:mt-12" variants={staggerItem}>
        <h2 className="text-2xl md:text-3xl lg:text-4xl ">{heading1}</h2>
        <p className="mt-4 max-w-4xl text-base md:text-lg leading-relaxed text-black">{body1}</p>
      </motion.div>

      {/* Section 2 */}
      <motion.div className="mt-10 md:mt-12" variants={staggerItem}>
        <h2 className="text-2xl md:text-3xl lg:text-4xl ">{heading2}</h2>
        <p className="mt-4 max-w-4xl text-base md:text-lg leading-relaxed text-black">{body2}</p>
      </motion.div>
    </motion.section>
  )
}

export default TextH2TextH2Text
