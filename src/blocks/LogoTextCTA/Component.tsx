'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { LogoTextCTA as LogoTextCTABlock } from '@/payload-types'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

const LogoTextCTA: React.FC<LogoTextCTABlock> = ({ image, title, description, cta, reverse }) => {
  return (
    <section className="container py-12">
      <div
        className={`flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-between ${reverse ? 'flex-row-reverse' : ''}`}
      >
        <motion.div
          className="w-full lg:w-[45%]"
          variants={reverse ? fadeInRight : fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div
            className="flex justify-start lg:justify-center w-full "
            variants={imageReveal}
          >
            <Media resource={image} imgClassName="object-cover max-w-[358px]" />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col items-start gap-4 w-full lg:w-[55%]"
          variants={reverse ? fadeInLeft : fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="font-ivar text-2xl md:text-3xl lg:text-4xl text-foreground">{title}</h2>

          {description && (
            <div className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose whitespace-pre-line">
              {description}
            </div>
          )}

          {cta && (
            <div className="pt-2">
              <CMSLink {...cta} appearance="black" size="ctaBig" className="inline-flex" newTab />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default LogoTextCTA
