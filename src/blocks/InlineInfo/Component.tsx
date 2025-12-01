'use client'

import { motion } from 'framer-motion'
import type { InlineInfo as InlineInfoBlock } from '@/payload-types'
import { staggerContainer, staggerItem } from '@/utilities/animations'

const InlineInfo: React.FC<InlineInfoBlock> = ({ items }) => {
  const rows = items ?? []

  return (
    <section className="py-6 md:py-20 flex flex-col  gap-20">
      <div className="w-[50%] mr-auto h-[0.5px] bg-black"></div>

      <div className="container">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {rows.map((it, i) => (
            <motion.div
              key={it?.id ?? i}
              className="bg-[#8B9B5C] text-white  px-6 py-4 md:px-8 md:py-6 flex flex-col items-center justify-center gap-4 "
              variants={staggerItem}
            >
              <h3 className="text-xl md:text-3xl leading-tight text-center">{it.title}</h3>

              {it.description && (
                <p className="mt-1 text-xl md:text-2xl font-light  text-center">{it.description}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="w-[50%] ml-auto h-[0.5px] bg-black"></div>
    </section>
  )
}

export default InlineInfo
