'use client'

import { motion } from 'framer-motion'
import { CTAButton } from '@/components/CTAButton'
import type { CenteredBannerCTA as CenteredBannerCTABlock } from '@/payload-types'
import { staggerContainer, staggerItem } from '@/utilities/animations'

const CenteredBannerCTA: React.FC<CenteredBannerCTABlock> = ({
  title,
  description,
  links,
  showTopLine = true,
  showBottomLine = true,
}) => {
  const [primary] = (links ?? [])
    .map((row: any) => row?.link)
    .filter((l: any) => l && l.label && l.url && l.url.trim())

  return (
    <section className="w-full py-10 md:py-14 bg-[#8B9B5C] text-white">
      {/* Top line */}
      {showTopLine && <div className="h-px w-[96%] mx-auto bg-white" />}

      <motion.div
        className="container py-8 md:py-16 flex flex-col text-center items-center gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl leading-[1.9rem] md:leading-[2.2rem] max-w-2xl"
          variants={staggerItem}
        >
          {title}
        </motion.h2>

        {description && (
          <motion.p className=" text-xs md:text-base  max-w-2xl mx-auto" variants={staggerItem}>
            {description}
          </motion.p>
        )}

        {primary && (
          <motion.div className="mt-6" variants={staggerItem}>
            <CTAButton
              href={primary.url!}
              aria-label={primary.label}
              size="big"
              variant="outlineWhite"
            >
              {primary.label}
            </CTAButton>
          </motion.div>
        )}
      </motion.div>

      {showBottomLine && <div className="h-px w-[96%] mx-auto bg-white" />}
    </section>
  )
}

export default CenteredBannerCTA
