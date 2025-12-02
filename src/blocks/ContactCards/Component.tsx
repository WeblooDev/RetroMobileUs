// src/blocks/ContactCards/index.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { ContactCards as ContactCardsBlock } from '@/payload-types'
import { staggerContainer, staggerItem } from '@/utilities/animations'

const ContactCards: React.FC<ContactCardsBlock> = ({ cards = [] }) => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
 

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
