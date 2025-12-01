'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ImageText as ImageTextBlock, Media } from '@/payload-types'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

export default function ImageText(props: ImageTextBlock) {
  const { image, imageAlt, title, text, reverse = false, textAlign = 'left' } = props

  const dir = reverse ? 'md:flex-row-reverse' : 'md:flex-row'
  const align = textAlign === 'center' ? 'text-center items-center' : 'text-left items-start'

  const media = image as Media | null
  const src = (media as any)?.url as string | undefined
  const alt = imageAlt || title

  return (
    <section className="container px-6 md:px-12 lg:px-24 py-14">
      <div className={`flex flex-col ${dir} gap-10 md:gap-16`}>
        <motion.div
          className="md:w-1/2"
          variants={reverse ? fadeInRight : fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {src && (
            <motion.div className="w-full overflow-hidden" variants={imageReveal}>
              <div className="relative w-full h-auto aspect-[695/503]">
                <Image src={src} alt={alt} fill className="object-cover" />
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className={`md:w-1/2 flex flex-col ${align} gap-5 justify-center items-center`}
          variants={reverse ? fadeInLeft : fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="font-ivar text-2xl lg:text-3xl xl:text-4xl text-center ">{title}</h2>
          <p className="text-base max-w-prose text-center">{text}</p>
        </motion.div>
      </div>
    </section>
  )
}
