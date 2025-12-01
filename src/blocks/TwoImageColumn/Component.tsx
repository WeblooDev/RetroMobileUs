'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { TwoImageColumn as TwoImageColumnProps } from '@/payload-types'
import { fadeInLeft, fadeInRight, fadeInUp, imageReveal } from '@/utilities/animations'

export const TwoImageColumn: React.FC<TwoImageColumnProps> = ({
  topTitle,
  topText,
  image1,
  image2,
  approachTitle,
  approachText,
  quote,
  quoteAttribution,
}) => {
  return (
    <section className="">
      {/* Top section */}
      <div className="flex flex-col gap-5 md:flex-row p-6 md:pb-16 justify-between items-center">
        <motion.div
          className="flex w-full"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h1 className="w-full text-3xl md:text-4xl lg:text-5xl xl:text-6xl  text-white">
            {topTitle}
          </h1>
        </motion.div>
        <motion.div
          className="flex justify-start md:justify-end"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <p className="font-inter text-sm md:text-base w-full sm:w-[70%]">{topText}</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[600px]">
        {/* Left Image */}
        <motion.div
          className="relative w-auto md:w-[30%] h-full"
          variants={imageReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {typeof image1 === 'object' && image1?.url && (
            <img
              src={image1.url}
              alt="Left visual"
              className="w-full h-[300px] md:h-full object-cover"
            />
          )}
        </motion.div>

        {/* Text Block */}
        <motion.div
          className="flex flex-col w-auto md:w-[35%] h-full"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="h-[65%] p-8 flex flex-col justify-center bg-[white]">
            <h2 className="mb-3 text-4xl md:text-5xl xl:text-6xl  text-black">{approachTitle}</h2>
            <p className="font-inter text-sm md:text-base text-black">{approachText}</p>
          </div>
          <div className="flex flex-col justify-center font-inter h-[35%] bg-black p-8 text-sm md:text-base text-white">
            <p>{quote}</p>
            {quoteAttribution && <span className="mt-2 italic">{quoteAttribution}</span>}
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex flex-col w-auto md:w-[35%] h-full"
          variants={imageReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {typeof image2 === 'object' && image2?.url && (
            <img
              src={image2.url}
              alt="Right visual"
              className="w-full h-[300px] md:h-full object-cover"
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}
