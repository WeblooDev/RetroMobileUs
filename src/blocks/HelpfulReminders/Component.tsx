'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { HelpfulReminders as HelpfulRemindersBlock } from '@/payload-types'
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  imageReveal,
} from '@/utilities/animations'

const HelpfulReminders: React.FC<HelpfulRemindersBlock> = ({
  title,
  intro,
  items,
  image,
  links,
}) => {
  const [primary] = (links ?? [])
    .map((row: any) => row?.link)
    .filter((l: any) => l && l.label && l.url && l.url.trim())

  return (
    <section className="w-full bg-[#8B9B5C]">
      <div className=" container mx-auto py-10">
        <div className=" py-8 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <motion.div
            className="w-full lg:w-[50%] "
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.h2
              className="text-2xl md:text-4xl lg:text-4xl leading-tight text-white"
              variants={staggerItem}
            >
              {title}
            </motion.h2>

            {intro && (
              <motion.p className="mt-2 text-sm md:text-base text-white" variants={staggerItem}>
                {intro}
              </motion.p>
            )}

            <motion.div
              className="mt-5 md:mt-12 flex flex-col gap-4 items-start"
              variants={staggerItem}
            >
              {(items ?? []).map((it, i) => (
                <div key={it?.id ?? i} className="flex flex-col items-start gap-4">
                  <p className="text-lg md:text-[24px] font-light text-white">{it?.subtitle}</p>
                  <div className="h-px w-24 md:w-28 bg-white" />
                </div>
              ))}
            </motion.div>

            {primary && (
              <motion.div className="mt-6" variants={staggerItem}>
                <CTAButton
                  href={primary.url!}
                  aria-label={primary.label}
                  size="big"
                  variant="black"
                >
                  {primary.label}
                </CTAButton>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className=" w-full lg:w-[50%]"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div
              className="relative w-full aspect-[691/382] overflow-hidden rounded-md"
              variants={imageReveal}
            >
              {image && <Media resource={image} fill imgClassName="object-cover" />}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HelpfulReminders
