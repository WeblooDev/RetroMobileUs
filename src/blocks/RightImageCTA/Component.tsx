'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { RightImageCTA as RightImageCTABlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

const RightImageCTA: React.FC<RightImageCTABlock> = ({ title, description, image, cta }) => {
  const primary = cta?.[0]?.link
  const url = typeof primary?.url === 'string' && primary.url.trim() ? primary.url : undefined

  return (
    <section className="w-full">
      <div className="container  lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <h2 className="font-ivar text-2xl md:text-3xl lg:text-4xl leading-tight">{title}</h2>

            {description && (
              <p className="mt-6 max-w-[560px] text-sm md:text-base text-black/80">{description}</p>
            )}

            {primary?.label && url && (
              <div className="mt-8">
                <CMSLink {...primary} appearance="olive" size="ctaBig" />
              </div>
            )}
          </motion.div>

          <motion.div
            className="relative w-full aspect-[4/3] md:aspect-[5/4] overflow-hidden"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div variants={imageReveal}>
              <Media resource={image} fill imgClassName="object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default RightImageCTA
