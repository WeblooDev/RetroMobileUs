// src/blocks/ContactCards/index.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { ContactCards as ContactCardsBlock } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

const ContactCards: React.FC<ContactCardsBlock> = ({ title, cards = [] }) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <motion.h2
        className="mb-12 text-3xl md:text-4xl"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {cards.map((c, i) => {
          const firstRow = (c as any).link?.[0]
          const cardLink = firstRow?.link ?? firstRow

          return (
            <motion.article key={i} className="space-y-3" variants={staggerItem}>
              {c.image && (
                <div className="relative aspect-[388/330] w-full overflow-hidden rounded">
                  <Media resource={c.image} fill className="object-cover" />
                </div>
              )}

              <div className="flex flex-col items-start gap-2 text-start">
                <h3 className="text-xl md:text-2xl">{c.cardTitle}</h3>

                {c.email && (
                  <Link href={`mailto:${c.email}`} className="font-semibold">
                    {c.email}
                  </Link>
                )}

                {cardLink?.label && (
                  <CMSLink
                    {...cardLink}
                    className="border-none font-semibold p-0 h-auto text-base"
                  />
                )}
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

export default ContactCards
