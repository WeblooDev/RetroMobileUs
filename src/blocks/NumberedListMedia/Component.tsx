'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { NumberedListMedia as NumberedListMediaBlock } from '@/payload-types'
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  imageReveal,
} from '@/utilities/animations'

const NumberedListMedia: React.FC<NumberedListMediaBlock> = ({
  title,
  subtext,
  bullets,
  image,
}) => {
  return (
    <section className="py-12 md:py-16 md:py-24 bg-[#7b8d53] text-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch h-full">
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl leading-tight mb-4"
              variants={staggerItem}
            >
              {title}
            </motion.h2>

            <motion.p className="font-ivar text-base md:text-lg " variants={staggerItem}>
              {subtext}
            </motion.p>

            <motion.ul className="space-y-4" variants={staggerItem}>
              {bullets.map((b, i) => {
                const num = String(i + 1).padStart(2, '0')
                return (
                  <li key={b.id ?? i} className="flex items-center gap-4">
                    <span className="w-[1px] h-4 bg-white/50" aria-hidden />
                    <span className="w-8 tabular-nums text-white">{num}</span>
                    <span className="text-sm md:text-base">{b.text}</span>
                  </li>
                )
              })}
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
              className="relative w-full aspect-[576/385] overflow-hidden"
              variants={imageReveal}
            >
              <Media resource={image as any} fill imgClassName="object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default NumberedListMedia
