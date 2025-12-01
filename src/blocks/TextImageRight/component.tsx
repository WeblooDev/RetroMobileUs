'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { TextImageRight as TextImageRightBlock } from '@/payload-types'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

const TextImageRight: React.FC<TextImageRightBlock> = ({ title, description, image }) => {
  return (
    <section className="w-[90%] ml-auto py-12">
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-20">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="text-3xl md:text-6xl ">{title}</h2>
          {description && <p className="mt-4 text-sm md:text-base">{description}</p>}
        </motion.div>

        <motion.div
          className="relative w-full aspect-[638/262] overflow-hidden "
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={imageReveal}>
            {image && <Media resource={image} fill imgClassName="object-cover" />}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TextImageRight
