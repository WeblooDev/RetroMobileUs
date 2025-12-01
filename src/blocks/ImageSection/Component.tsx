'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { ImageSectionBlock } from '@/payload-types'
import { fadeIn, fadeInUp, buttonAnimation } from '@/utilities/animations'

export const ImageSectionBlockComponent: React.FC<ImageSectionBlock> = ({
  backgroundImage,
  heading,
  description,
  link,
  linkText,
}) => {
  return (
    <section className="container">
      <div
        className=" relative h-[80vh] bg-cover bg-center flex flex-col justify-between 
        p-8 md:p-8 lg:p-12 xl:p-12 my-8"
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Media
            fill
            alt="Image Section Background"
            priority
            resource={backgroundImage}
            imgClassName="object-cover"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="relative z-10  text-black"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className=" text-[36px] md:text-[48px] xl:text-[72px] leading-[100%] mb-8 w-auto md:w-[70%]">
            {heading}
          </h2>
          <p className="font-inter text-sm text-[18px] w-auto md:w-[40%]">{description}</p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="relative z-10 inline-block"
          variants={buttonAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <Link
            href={link}
            className="relative cursor-pointer inline-flex items-center gap-2 px-6 py-3 border border-black bg-transparent font-sans transition-all duration-300 overflow-hidden group"
          >
            <span className="font-inter  relative z-10 text-black group-hover:text-white transition-colors duration-300">
              {linkText}
            </span>
            <ArrowRight
              className="h-4 w-4 relative z-10 text-black group-hover:text-white transition-colors duration-300"
              stroke="currentColor"
            />
            <span className="absolute left-0 top-0 h-full w-full bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
