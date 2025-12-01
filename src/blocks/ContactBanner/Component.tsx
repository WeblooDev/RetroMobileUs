'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { ContactBanner as ContactBannerBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

const toTelHref = (phone?: string | null) =>
  phone ? `tel:${phone.trim().replace(/(?!^\+)[^\d]/g, '')}` : ''

const ContactBanner: React.FC<ContactBannerBlock> = ({
  title,
  subtitle,
  phone,
  backgroundColor,
  button,
}) => {
  const bg = backgroundColor && backgroundColor.trim() ? backgroundColor : '#8B9B5C'
  const telHref = toTelHref(phone)
  const cta = button as any

  return (
    <section className="w-full">
      <motion.div
        className="w-full py-10 flex justify-center items-center"
        style={{ backgroundColor: bg }}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <h3 className="text-white text-2xl md:text-3xl lg:text-4xl text-center">{title}</h3>
      </motion.div>

      <motion.div
        className="py-10 text-center text-sm space-y-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {subtitle?.trim() && <motion.p variants={staggerItem}>{subtitle}</motion.p>}

        {phone?.trim() && (
          <motion.p variants={staggerItem}>
            Email or call{' '}
            <a href={telHref} className="underline hover:opacity-80">
              {phone}
            </a>
          </motion.p>
        )}

        <motion.div variants={staggerItem}>
          <CMSLink {...cta} appearance="black" size="ctaBig" className="inline-flex" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ContactBanner
