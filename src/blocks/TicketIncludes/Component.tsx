'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { TicketIncludes as TicketIncludesBlock } from '@/payload-types'
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  imageReveal,
} from '@/utilities/animations'

const TicketIncludes: React.FC<TicketIncludesBlock> = ({ title, items, image, links }) => {
  const [primary] = (links ?? [])
    .map((row: any) => row?.link)
    .filter((l: any) => l && l.label && l.url && l.url.trim())

  return (
    <section className="container py-10 md:py-16">
      <div className="flex flex-col lg:flex-row items-stretch gap-8 md:gap-12">
        <motion.div
          className="flex flex-col items-center lg:items-start justify-between w-full lg:w-[60%] gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.h2 className="text-3xl md:text-5xl leading-tight" variants={staggerItem}>
            {title}
          </motion.h2>

          <motion.div
            className="flex flex-col  gap-4 text-center  items-center lg:items-start lg:text-start"
            variants={staggerItem}
          >
            {(items ?? []).map((it, i) => (
              <div
                key={it?.id ?? i}
                className="flex flex-col gap-4 items-center lg:items-start lg:text-start"
              >
                <div>
                  {it?.subtitle && (
                    <h3 className="font-medium text-base md:text-3xl">{it.subtitle}</h3>
                  )}
                  {it?.text && (
                    <p className="text-sm md:text-base font-light text-black">{it.text}</p>
                  )}
                </div>
                <div className="h-px w-2/5 md:w-1/2 bg-black mb-3" />
              </div>
            ))}
          </motion.div>

          {primary && (
            <motion.div className="mt-6 md:mt-8" variants={staggerItem}>
              <CTAButton href={primary.url!} aria-label={primary.label} size="big" variant="olive">
                {primary.label}
              </CTAButton>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="w-full lg:w-[40%]"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div
            className="relative w-full aspect-[480/641] md:aspect-[3/4] overflow-hidden rounded-md"
            variants={imageReveal}
          >
            {image && <Media resource={image} fill imgClassName="object-cover" />}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TicketIncludes
