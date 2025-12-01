'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { EventLocation as EventLocationBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { fadeIn, fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

const isWebLink = (l: unknown): l is { url: string; label: string } =>
  !!l &&
  typeof (l as any).label === 'string' &&
  typeof (l as any).url === 'string' &&
  (l as any).url.trim().length > 0

const EventLocation: React.FC<EventLocationBlock> = ({
  backgroundImage,
  ribbonText,
  title,
  secondtitle,
  ctas,
  description,
}) => {
  const rows = ctas ?? []
  const primary = rows[0]?.link
  const secondary = rows[1]?.link

  return (
    <section
      id="eventLocation"
      className="scroll-mt-[30vh] md:scroll-mt-[35vh] relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center my-16"
    >
      <motion.div
        className="absolute inset-0"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Media resource={backgroundImage} fill priority imgClassName="object-cover" />
      </motion.div>

      <motion.div
        className="absolute -top-10 left-0 px-10 py-8 bg-[#8B9B5C] text-white font-ivar text-3xl md:text-4xl lg:text-5xl"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        {ribbonText}
      </motion.div>

      <motion.div
        className="relative z-10 text-white px-6 flex flex-col items-center gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl text-center " variants={staggerItem}>
          {title}
        </motion.h2>
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl text-center" variants={staggerItem}>
          {secondtitle}
        </motion.h2>
        <motion.p className="text-base lg:text-lg text-center w-[80%]" variants={staggerItem}>
          {description}
        </motion.p>

        <motion.div className="flex gap-3" variants={staggerItem}>
          {isWebLink(primary) && (
            <CMSLink
              url={primary.url}
              label={primary.label}
              appearance="olive"
              size="ctaBig"
              newTab
            />
          )}

          {isWebLink(secondary) && (
            <CMSLink
              url={secondary.url}
              label={secondary.label}
              appearance="outlineWhite"
              size="ctaBig"
              newTab
            />
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default EventLocation
