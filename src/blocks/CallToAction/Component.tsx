'use client'

import React from 'react'
import { motion } from 'framer-motion'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <motion.div
      className="container"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <motion.div
        className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center"
        variants={staggerContainer}
      >
        <motion.div className="max-w-[48rem] flex items-center" variants={staggerItem}>
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </motion.div>
        <motion.div className="flex flex-col gap-8" variants={staggerItem}>
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} appearance="default" />
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
