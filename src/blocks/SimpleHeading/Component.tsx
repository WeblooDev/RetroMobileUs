'use client'

import { motion } from 'framer-motion'
import type { SimpleHeading as SimpleHeadingBlock } from '@/payload-types'
import { fadeInLeft } from '@/utilities/animations'

const SimpleHeading: React.FC<SimpleHeadingBlock> = ({ title, backgroundColor }) => {
  const bg = backgroundColor?.trim() ? backgroundColor : '#8B9B5C'

  return (
    <section className="flex justify-start items-start my-4">
      <motion.h3
        className="text-white text-2xl md:text-3xl lg:text-4xl py-8 px-12"
        style={{ backgroundColor: bg }}
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {title}
      </motion.h3>
    </section>
  )
}

export default SimpleHeading
