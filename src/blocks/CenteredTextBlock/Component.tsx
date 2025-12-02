"use client"

import { motion } from 'framer-motion'
import type { CenteredText as CenteredTextFields } from '@/payload-types'
import { fadeInUp } from '@/utilities/animations'

export default function CenteredText({ text }: CenteredTextFields) {
  return (
    <section className="container mx-auto px-4 py-10">
      <motion.div
        className=" flex items-center justify-center bg-[#8B9B5C] text-white p-2"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <p className="text-center text-base md:text-lg lg:text-xl leading-relaxed uppercase p-4 border border-white w-full">
          {text}
        </p>
      </motion.div>
    </section>
  )
}
