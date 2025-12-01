'use client'

import { motion } from 'framer-motion'
import type { CenteredHero as CenteredHeroFields, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { fadeIn, heroTitle, heroSubtitle } from '@/utilities/animations'

export default function CenteredHero({ backgroundImage, title, description }: CenteredHeroFields) {
  const bg = typeof backgroundImage === 'string' ? null : (backgroundImage as MediaType | null)

  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-start text-start mt-[50px]">
      {bg && (
        <motion.div
          className="absolute inset-0"
          aria-hidden="true"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <Media resource={bg} fill imgClassName="object-cover" />
        </motion.div>
      )}

      <div className="relative z-10  container mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl leading-[4rem] md:leading-[6rem] text-white mb-6"
          variants={heroTitle}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="text-lg md:text-xl text-white/90"
            variants={heroSubtitle}
            initial="hidden"
            animate="visible"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
