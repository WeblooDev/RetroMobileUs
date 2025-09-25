'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Media } from '@/components/Media'
import type { CustomHeroBlock as CustomHeroBlockProps } from '@/payload-types'

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
      <div className="absolute inset-0 w-full h-full">
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
      </div>

      {/* Content */}
      <div className="relative z-20 text-white h-full w-full flex flex-col justify-between md:p-10">
        {/* Top Row */}
        <div className="pt-[150px] flex flex-col xl:flex-row items-center xl:items-center justify-between gap-4 xl:gap-0 text-center xl:text-left w-full">
          <span className=" text-2xl md:text-[48px]">{leftText}</span>

          <div className="hidden md:block w-1/4 h-px bg-white xl:mx-4" />

          <span className="font-sans text-sm w-[80%] xl:w-[20%] text-[16px]">{rightSmallText}</span>
        </div>

        {/* Title */}
        <div className="text-center mb-16">
          <h1 className=" text-[36px] md:text-[52px] xl:text-[96px] leading-[118%] text-center">
            {titleLine1}
            <br />
            {titleLine2}
          </h1>
        </div>

        {/* CTA Button */}
        {link && (
          <div className="absolute bottom-6 right-6 md:bottom-[15%] md:right-10">
            <Link
              href={link}
              className="font-sans text-[16px] uppercase flex items-center gap-2 text-white hover:text-white/80 transition-colors"
            >
              <span>{linkText || 'Discover More'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
