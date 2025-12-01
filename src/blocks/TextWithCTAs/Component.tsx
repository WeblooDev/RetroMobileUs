'use client'

import { motion } from 'framer-motion'
import { CMSLink } from '@/components/Link'
import type { TextWithCTAs as TextWithCTAsBlock } from '@/payload-types'
import { fadeInLeft, fadeInRight } from '@/utilities/animations'

const TextWithCTAs: React.FC<TextWithCTAsBlock> = ({ title, links }) => {
  const normalized = (links ?? [])
    .map((row: any) => row?.link)
    .filter((l: any) => l && l.label && l.url && l.url.trim())

  const [primary, secondary] = normalized

  return (
    <section className="container py-12">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl w-full lg:w-[50%]"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="flex items-start  flex-col md:flex-row justify-start lg:justify-end gap-2 lg:gap-6 w-full lg:w-[50%]"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {primary && (
            <CMSLink url={primary.url!} label={primary.label} appearance="black" size="ctaBig" />
          )}

          {secondary && (
            <CMSLink
              url={secondary.url!}
              label={secondary.label}
              appearance="olive"
              size="ctaBig"
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default TextWithCTAs
