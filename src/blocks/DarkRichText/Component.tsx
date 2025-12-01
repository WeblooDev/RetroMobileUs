// blocks/DarkRichText/Component.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import RichText from '@/components/RichText'
import type { DarkRichText as DarkRichTextBlock } from '@/payload-types'
import { fadeInUp } from '@/utilities/animations'

const DarkRichText: React.FC<DarkRichTextBlock> = ({ content }) => {
  return (
    <section className="bg-white !text-black py-16">
      <motion.div
        className="container"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div
          className="prose prose-invert max-w-none
                        prose-headings:font-semibold
                        prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4
                        !prose-a:text-black hover:prose-a:bg-[#8B9B5C]"
        >
          <RichText data={content} className="!text-black" />
        </div>
      </motion.div>
    </section>
  )
}

export default DarkRichText
