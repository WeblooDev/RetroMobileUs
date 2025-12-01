'use client'

import { Media } from '@/components/Media'
import { motion } from 'framer-motion'
import type { MissionGallery as MissionGalleryBlock } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem, imageReveal } from '@/utilities/animations'

const MissionGallery: React.FC<MissionGalleryBlock> = ({
  title,
  description,
  image1,
  image2,
  image3,
}) => {
  const items = [{ resource: image1 }, { resource: image2 }, { resource: image3 }]

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-10 md:mb-14"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl">{title}</h2>
        {description && (
          <p className="mt-4 text-sm md:text-base w-full md:w-[85%] mx-auto">{description}</p>
        )}
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-6 md:gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {items.map((it, idx) => (
          <motion.div
            key={idx}
            className={idx === 1 ? 'w-full md:basis-[22%]' : 'w-full md:basis-[39%]'}
            variants={staggerItem}
          >
            <motion.div
              className="relative w-full h-[220px] md:h-[250px] rounded-lg overflow-hidden bg-muted"
              variants={imageReveal}
            >
              <Media resource={it.resource} fill imgClassName="object-cover" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default MissionGallery
