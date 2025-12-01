'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { ImageTextCTA as ImageTextCTABlock } from '@/payload-types'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

const ImageTextCTA: React.FC<ImageTextCTABlock> = ({
  image,
  title,
  description,
  ctas,
  reverse,
}) => {
  // linkGroup rows: [{ link, id? }, ...]
  const primary = ctas?.[0]?.link
  const primaryUrl =
    typeof primary?.url === 'string' && primary.url.trim() ? primary.url : undefined

  return (
    <section className="p-4 md:p-8 lg:p-0 w-full my-12">
      <div
        className={`flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center ${reverse ? 'flex-row-reverse' : ''}`}
      >
        {/* Image */}
        <motion.div
          className="w-full lg:w-[45%]"
          variants={reverse ? fadeInRight : fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div
            className="relative w-full aspect-[4/3] rounded-lg shadow overflow-hidden"
            variants={imageReveal}
          >
            <Media resource={image} fill imgClassName="object-cover" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="flex flex-col gap-6 w-full lg:w-[55%] justify-center"
          variants={reverse ? fadeInLeft : fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl">{title}</h2>
          {description && <p className="text-base md:text-base md:w-1/2">{description}</p>}

          {primary?.label && primaryUrl && (
            <Link href={primaryUrl} aria-label={primary.label}>
              <CTAButton variant="olive" size="big">
                {primary.label}
              </CTAButton>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default ImageTextCTA
