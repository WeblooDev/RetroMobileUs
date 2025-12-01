'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { TextCTAImageRight as TextCTAImageRightBlock } from '@/payload-types'
import TixpubButton from '@/components/TixpubButton'
import { CMSLink } from '@/components/Link'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'
const TextCTAImageRight: React.FC<TextCTAImageRightBlock> = ({
  title,
  description,
  boldLine,
  links,
  image,
}) => {
  const [primary] = (links ?? []).map((row: any) => row?.link).filter((l: any) => l && l.label)
  return (
    <section className="w-[90%] ml-auto py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-20">
        <motion.div
          className="w-full lg:w-[50%]"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl leading-[1.9rem] md:leading-[2.2rem]">
            {title}
          </h2>
          {description && <p className="mt-4 text-sm md:text-base w-[90%]">{description}</p>}
          {boldLine && <p className="mt-3 font-semibold text-sm md:text-base">{boldLine}</p>}
          {primary && (
            <div className="mt-6">
              <CMSLink {...primary} appearance="olive" size="ctaBig" className="" />
            </div>
          )}
        </motion.div>
        <motion.div
          className="relative aspect-[674/414] w-full lg:w-[50%]"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={imageReveal}>
            {image && <Media resource={image} fill imgClassName="object-cover" />}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
export default TextCTAImageRight
