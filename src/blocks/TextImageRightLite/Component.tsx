'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { TextImageRightLite as TextImageRightLiteBlock } from '@/payload-types'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

const TextImageRightLite: React.FC<TextImageRightLiteBlock> = ({ title, description, image }) => {
  return (
    <section className="container py-10 md:py-16">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-14">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="text-3xl md:text-6xl w-full lg:w-[65%]">{title}</h2>
          {description && (
            <p className="mt-4 text-sm md:text-base text-black/75 max-w-prose">{description}</p>
          )}
        </motion.div>

        <motion.div
          className="justify-self-end w-full lg:w-[35%] max-w-[520px]"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div
            className="relative w-full aspect-[507/331] overflow-hidden rounded-lg shadow-xl"
            variants={imageReveal}
          >
            {image && <Media resource={image} fill imgClassName="object-cover" />}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TextImageRightLite
