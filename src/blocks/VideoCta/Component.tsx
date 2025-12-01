'use client'

import { motion } from 'framer-motion'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { VideoCta as VideoCtaFields } from '@/payload-types'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

export default function VideoCtaBlock({ image, title, paragraph, link }: VideoCtaFields) {
  return (
    <section className="container py-16">
      <div className="flex flex-col lg:flex-row gap-10 items-center w-full">
        <motion.div
          className="w-full lg:w-[50%] relative overflow-hidden"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div className="w-full max-h-[634px]" variants={imageReveal}>
            <Media resource={image} className="w-full h-auto block object-cover rounded-xl" />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 w-full lg:w-[50%] px-0 lg:px-10"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {title && <h2 className="text-3xl md:text-4xl lg:text-4xl">{title}</h2>}
          {paragraph && <p className="text-sm md:text-base w-[80%]">{paragraph}</p>}

          <div>
            <CMSLink {...link} appearance="olive" size="ctaBig" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
