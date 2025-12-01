'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import type { CustomHeroBlock as CustomHeroBlockProps } from '@/payload-types'
import { fadeIn, heroTitle, heroSubtitle, buttonAnimation, lineGrow } from '@/utilities/animations'

export const CustomHeroBlock: React.FC<CustomHeroBlockProps> = ({
  backgroundImage,
  leftText,
  rightSmallText,
  titleLine1,
  titleLine2,
  link,
  linkText,
}) => {
  return (
    <div className="relative w-full h-screen min-h-screen p-4 md:p-8 xl:p-12">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {backgroundImage && typeof backgroundImage === 'object' && backgroundImage.id ? (
          <Media
            fill
            priority
            alt="hero section"
            resource={backgroundImage}
            imgClassName="z-0 object-cover"
          />
        ) : (
          <div className="w-full h-full bg-black" />
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-white h-full w-full flex flex-col justify-between md:p-10">
        {/* Top Row */}
        <motion.div
          className="pt-[150px] flex flex-col xl:flex-row items-center xl:items-center justify-between gap-4 xl:gap-0 text-center xl:text-left w-full"
          variants={heroSubtitle}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className=" text-2xl md:text-[48px]"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {leftText}
          </motion.span>

          <motion.div
            className="hidden md:block w-1/4 h-px bg-white xl:mx-4"
            variants={lineGrow}
            initial="hidden"
            animate="visible"
          />

          <motion.span
            className="font-sans text-sm w-[80%] xl:w-[20%] text-[16px]"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {rightSmallText}
          </motion.span>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-16"
          variants={heroTitle}
          initial="hidden"
          animate="visible"
        >
          <h1 className=" text-[36px] md:text-[52px] xl:text-[96px] leading-[118%] text-center">
            {titleLine1}
            <br />
            {titleLine2}
          </h1>
        </motion.div>

        {/* CTA Button */}
        {link && (
          <motion.div
            className="absolute bottom-6 right-6 md:bottom-[15%] md:right-10"
            variants={buttonAnimation}
            initial="hidden"
            animate="visible"
          >
            <Link
              href={link}
              className="font-sans text-[16px] uppercase flex items-center gap-2 text-white hover:text-white/80 transition-colors"
            >
              <span>{linkText || 'Discover More'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
