'use client'

import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { PartnerBenefits as PartnerBenefitsBlock } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, imageReveal } from '@/utilities/animations'

const PartnerBenefits: React.FC<PartnerBenefitsBlock> = ({ title, description, cards }) => {
  const items = cards ?? []

  return (
    <section className="w-full">
      <motion.div
        className="container  pt-10 md:pt-16"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl ">{title}</h2>
        {description && <p className="mt-4 text-base w-full md:w-[40%]">{description}</p>}
      </motion.div>

      <div className="container py-10 md:py-14">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {items.map((card, i) => (
            <motion.div
              key={card.id ?? i}
              className="relative min-h-[200px] p-12 lg:aspect-[228/467] overflow-hidden shadow-lg"
              variants={staggerItem}
            >
              <motion.div className="absolute inset-0" variants={imageReveal}>
                <Media resource={card.image} fill priority={i < 2} imgClassName="object-cover" />
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 py-16 px-2 text-center text-white h-full flex flex-col justify-center items-center ">
                <h3 className=" text-6xl lg:text-[140px]">{card.heading}</h3>
                {card.body && <p className="text-sm lg:text-base ">{card.body}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default PartnerBenefits
