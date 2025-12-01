'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { ProgramHighlight as ProgramHighlightBlock } from '@/payload-types'
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  imageReveal,
} from '@/utilities/animations'

const ProgramHighlight: React.FC<ProgramHighlightBlock> = ({ title, intro, bullets, image }) => {
  return (
    <section className="container py-16 md:py-24">
      <div className="flex flex-col lg:flex-row gap-10 items-stretch h-full">
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center gap-6 h-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl leading-tight mb-6"
            variants={staggerItem}
          >
            {title}
          </motion.h2>

          <motion.p className="text-sm md:text-base" variants={staggerItem}>
            {intro}
          </motion.p>

          <motion.ul
            className="list-disc pl-6 space-y-4 text-sm md:text-base"
            variants={staggerItem}
          >
            {bullets.map((b, i) => (
              <li key={b.id ?? i} className="leading-relaxed">
                {b.text}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div
            className="relative w-full aspect-[608/524]  overflow-hidden"
            variants={imageReveal}
          >
            <Media resource={image as any} fill imgClassName="object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProgramHighlight
