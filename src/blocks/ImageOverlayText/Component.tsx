'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { ImageOverlayText as ImageOverlayTextBlock } from '@/payload-types'
import { imageReveal, fadeInUp } from '@/utilities/animations'

const ImageOverlayText: React.FC<ImageOverlayTextBlock> = ({ title, description, image }) => {
  return (
    <section className="container py-8 md:py-12">
      <motion.div
        className="relative w-full min-h-[597px] overflow-hidden "
        variants={imageReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {image && <Media resource={image} fill imgClassName="object-cover" />}

        <motion.div
          className="absolute inset-0 flex items-end p-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className=" max-w-4xl text-white">
            <h2 className="text-2xl md:text-3xl lg:text-6xl leading-tight">{title}</h2>
            {description && (
              <p className="mt-3 text-sm md:text-base text-white w-[70%]">{description}</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ImageOverlayText
