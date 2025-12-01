'use client'

import { motion } from 'framer-motion'
import type { PackagesGrid as PackagesGridBlock } from '@/payload-types'
import { fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

const PackagesGrid: React.FC<PackagesGridBlock> = ({
  title,
  topRow,
  bottomRow,
  showBottomDivider = true,
}) => {
  const renderRow = (items?: PackagesGridBlock['topRow']) => {
    const list = items ?? []
    return (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {list.map((item, i) => {
          const bg = item?.backgroundColor || '#E8F0E7'
          const fg = item?.textColor || '#111111'
          return (
            <motion.div
              key={i}
              className=" p-6 md:p-8 flex justify-center items-center"
              style={{ backgroundColor: bg, color: fg }}
              variants={staggerItem}
            >
              <h3 className="text-2xl leading-relaxed text-center ">{item?.text}</h3>
            </motion.div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <section className="container py-12 md:py-8">
      <motion.h2
        className="text-3xl md:text-5xl lg:text-6xl leading-tight border-b border-b-[#0000004D] w-fit pb-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {title}
      </motion.h2>

      <div className="mt-6 md:mt-8">{renderRow(topRow)}</div>

      <div className="my-8 md:my-10 h-px bg-black/30 w-[50%] ml-auto" />

      <div>{renderRow(bottomRow)}</div>

      {showBottomDivider && <div className="my-8 md:my-10 h-px bg-black/30 w-[50%] " />}
    </section>
  )
}

export default PackagesGrid
