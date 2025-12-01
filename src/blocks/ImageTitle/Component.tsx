'use client'

import { motion } from 'framer-motion'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { ImageTitle as ImageTitleFields } from '@/payload-types'
import { fadeInLeft, fadeInRight, imageReveal, fadeInUp } from '@/utilities/animations'

export default function ImageTitle({
  eyebrow,
  title,
  description,
  image,
  button,
}: ImageTitleFields) {
  const cta = button as any

  return (
    <section className="container py-10 md:py-12">
      {eyebrow && (
        <motion.div
          className="flex justify-center items-center gap-2 "
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <p className="text-xs md:text-base italic">{eyebrow}</p>
        </motion.div>
      )}

      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12">
        <motion.div
          className="flex flex-col text-start items-start gap-6 w-full lg:w-[50%]"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-4xl leading-tight">{title}</h2>

          {description && <p className="mt-2 text-sm md:text-base max-w-prose">{description}</p>}

          {cta && (
            <div className="mt-2">
              <CMSLink {...cta} appearance="olive" size="ctaBig" className="inline-flex" />
            </div>
          )}
        </motion.div>

        <motion.div
          className="relative w-full lg:w-[50%] aspect-[692/446] overflow-hidden"
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
