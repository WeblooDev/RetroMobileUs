// src/blocks/TwoColumnHero/Component.tsx
'use client'

import { motion } from 'framer-motion'
import type { TwoColumnHero as TwoColumnHeroBlock, Media as MediaType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import {
  fadeIn,
  heroTitle,
  heroSubtitle,
  staggerContainer,
  staggerItem,
} from '@/utilities/animations'

export default function TwoColumnHero(props: TwoColumnHeroBlock) {
  const {
    backgroundImage,
    leftTitle,
    primaryButton,
    secondaryButton,
    rightHeading,
    rightParagraph,
  } = props

  const bg = backgroundImage as MediaType | null

  return (
    <section className="relative flex items-center my-16">
      {bg && (
        <motion.div
          className="absolute inset-0"
          aria-hidden
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <Media resource={bg} fill imgClassName="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      )}

      <div className="container mx-auto relative z-10 w-full flex flex-col lg:flex-row justify-between gap-4 md:gap-16 lg:gap-12 py-24">
        <motion.div
          className="flex flex-col gap-6 w-full lg:w-[55%]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl text-white w-full lg:w-[70%]"
            variants={staggerItem}
          >
            {leftTitle}
          </motion.h2>

          <motion.div
            className="flex flex-col items-start sm:flex-row gap-4"
            variants={staggerItem}
          >
            {primaryButton && primaryButton.url && primaryButton.label && (
              <CMSLink {...primaryButton} appearance="olive" size="ctaBig" />
            )}

            {secondaryButton && secondaryButton.url && secondaryButton.label && (
              <CMSLink {...secondaryButton} appearance="black" size="ctaBig" />
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-row lg:flex-col gap-4 items-center justify-start lg:justify-end w-full lg:w-[45%]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-8xl leading-[8rem] lg:leading-[6rem] text-white"
            variants={heroTitle}
          >
            {rightHeading}
          </motion.h1>
          <motion.h3
            className="text-2xl md:text-3xl lg:text-4xl text-white uppercase"
            variants={heroSubtitle}
          >
            {rightParagraph}
          </motion.h3>
        </motion.div>
      </div>
    </section>
  )
}
