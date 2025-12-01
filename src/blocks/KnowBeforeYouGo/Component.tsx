'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { KnowBeforeYouGo as KnowBeforeYouGoBlock } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

const KnowBeforeYouGo: React.FC<KnowBeforeYouGoBlock> = ({ title, description, items, cta }) => {
  const cards = Array.isArray(items) ? items.slice(0, 4) : []

  return (
    <section className="py-12 md:py-20 my-20 bg-[#8B9B5C] text-white">
      <motion.div
        className="container mx-auto flex flex-col lg:flex-row justify-between gap-2 md:gap-4 items-start "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="w-full lg:w-[40%] text-3xl md:text-4xl lg:text-4xl leading-tight">
          {title}
        </h2>
        <p className="w-full lg:w-[30%] text-sm md:text-base  md:pt-3">{description}</p>
      </motion.div>

      <motion.div
        className="container mx-auto mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-0 lg:grid-cols-4 "
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {cards.map((card, i) => (
          <motion.article key={card?.id ?? i} className="group" variants={staggerItem}>
            <div className="mb-3 md:mb-4">
              <span className="block h-[1px] w-16 bg-white/60 mb-2" />
              <p className="text-sm md:text-lg ">{card?.title}</p>
            </div>

            <div className="relative aspect-[360/421] w-full overflow-hidden">
              {card?.image && <Media resource={card.image} fill imgClassName="object-cover" />}
            </div>
          </motion.article>
        ))}
      </motion.div>

      {Array.isArray(cta) && cta[0]?.link && (
        <motion.div
          className="mt-10 md:mt-14 flex justify-center px-6 md:px-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CMSLink {...cta[0].link} type="custom" appearance="transparent" size="ctaBig" />
        </motion.div>
      )}
    </section>
  )
}

export default KnowBeforeYouGo
