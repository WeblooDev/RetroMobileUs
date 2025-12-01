'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { TextLeftImageRight as BlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

export const TextLeftImageRight: React.FC<BlockType> = ({ title, body, image, paragraph2 }) => {
  return (
    <section className="container  py-8 md:py-12 ">
      <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
        <motion.div
          className="flex flex-col gap-6 items-center text-center w-full md:w-[50%]"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className=" text-2xl md:text-3xl lg:text-4xl">{title}</h2>
          <p className=" text-sm md:text-base text-black">{body}</p>
          <p className=" text-sm md:text-base text-black">{paragraph2}</p>
        </motion.div>

        <motion.div
          className="w-full md:w-[50%] flex justify-center items-center"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={imageReveal}>
            <Media resource={image} imgClassName="object-contain max-w-[402px]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TextLeftImageRight
