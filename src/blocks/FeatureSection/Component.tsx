'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { FeatureSectionBlock } from '@/payload-types'
import { CTAButton } from '@/components/Button/CTAButton'
import { Icons } from '@/components/Inventory/InventoryHeader'
import { fadeIn, fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

export const FeatureSectionBlockComponent: React.FC<FeatureSectionBlock> = ({
  backgroundImage,
  heading,
  description,
  features,
  buttonText,
  link,
}) => {
  return (
    <section className="relative py-16 md:py-20 lg:py-28 bg-cover bg-center text-white">
      {/* Background Image with overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <Media
          resource={backgroundImage}
          alt="feature section"
          fill
          priority
          imgClassName="object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 container mx-auto px-4 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div className="max-w-3xl mx-auto mb-12" variants={staggerItem}>
          <h2 className=" text-4xl md:text-5xl lg:text-6xl mb-4">{heading}</h2>
          <p className="font-inter text-sm md:text-base">{description}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12"
          variants={staggerItem}
        >
          <Icons />
        </motion.div>

        <motion.div className="mx-auto" variants={staggerItem}>
          <CTAButton
            href={link || '#'}
            text={buttonText || ''}
            variant="transparent-light"
            arrow={true}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
