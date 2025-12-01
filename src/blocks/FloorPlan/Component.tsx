'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { FloorPlan as FloorPlanBlock } from '@/payload-types'
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  imageReveal,
} from '@/utilities/animations'

const FloorPlan: React.FC<FloorPlanBlock> = ({ title, description, items, image, links }) => {
  const normalized = (links ?? [])
    .map((row: any) => row?.link)
    .filter((l: any) => l && l.label && l.url && l.url.trim())

  const [primary, secondary] = normalized

  return (
    <section className="container py-10 md:py-20">
      <div className="flex  gap-8 md:gap-12   flex-col-reverse lg:flex-row items-stretch h-full">
        <motion.div
          className="w-full lg:w-[50%] h-auto"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div
            className="relative w-full aspect-[4/3] md:aspect-[518/759] overflow-hidden "
            variants={imageReveal}
          >
            {image && <Media resource={image} fill imgClassName="object-cover" />}
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full lg:w-[50%] flex flex-col justify-between items-start h-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div className="flex flex-col gap-6" variants={staggerItem}>
            <h2 className="text-3xl md:text-4xl leading-tight">{title}</h2>
            {description && <p className="mt-2 md:mt-3 text-base  ">{description}</p>}
          </motion.div>

          <motion.div className="mt-6 flex flex-col gap-6 items-start" variants={staggerItem}>
            {(items ?? []).map((it, i) => (
              <div key={it?.id ?? i} className="flex flex-col items-start gap-3">
                <p className="text-base md:text-lg lg:text-[24px] leading-[32px] font-lighter ">
                  {it?.subtitle}
                </p>
                <span className="h-[1px] w-16 md:w-24 bg-black" />
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex  flex-col md:flex-row items-start lg:items-center gap-3 mt-16"
            variants={staggerItem}
          >
            {primary && (
              <CTAButton href={primary.url!} aria-label={primary.label} size="big" variant="olive">
                {primary.label}
              </CTAButton>
            )}
            {secondary && (
              <CTAButton
                href={secondary.url!}
                aria-label={secondary.label}
                size="big"
                variant="black"
              >
                {secondary.label}
              </CTAButton>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default FloorPlan
