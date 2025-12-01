'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { ImageLeftTextRight as ImageLeftTextRightBlock } from '@/payload-types'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

const ImageLeftTextRight: React.FC<ImageLeftTextRightBlock> = ({ title, description, image }) => {
  return (
    <section className="container py-10 md:py-16">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12">
        <motion.div
          className="relative w-full lg:w-[50%] aspect-[692/446] overflow-hidden "
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={imageReveal}>
            {image && <Media resource={image} fill imgClassName="object-cover" />}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col text-center  items-center gap-6 w-[full] lg:w-[50%]"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>
          {description && <p className="mt-4 text-sm md:text-base max-w-prose">{description}</p>}
        </motion.div>
      </div>
    </section>
  )
}

export default ImageLeftTextRight
