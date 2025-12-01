'use client'

import { motion } from 'framer-motion'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { TextImageBlock as TextImageBlockType } from '@/payload-types'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

const TextImageBlock: React.FC<TextImageBlockType> = ({
  title,
  description,
  image,
  reverse,
  consign,
}) => {
  const textOrder = reverse ? 'md:order-2' : 'md:order-1'
  const imageOrder = reverse ? 'md:order-1' : 'md:order-2'

  return (
    <section className="w-full bg-[#8B9B5C] text-white px-6 md:px-12 lg:px-24 py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          className={`flex flex-col gap-4 items-start ${textOrder}`}
          variants={reverse ? fadeInRight : fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl">{title}</h2>
          {description && <p className="text-base mb-6 w-[90%]">{description}</p>}
          <CMSLink {...consign} appearance="white" size="ctaBig" />
        </motion.div>

        <motion.div
          className={imageOrder}
          variants={reverse ? fadeInLeft : fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div className="relative w-full rounded-md overflow-hidden" variants={imageReveal}>
            <Media resource={image} imgClassName="w-full h-auto object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TextImageBlock
