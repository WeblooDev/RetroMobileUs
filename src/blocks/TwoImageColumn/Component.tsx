'use client'

import React from 'react'
import type { TwoImageColumn as TwoImageColumnProps } from '@/payload-types'

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
        <div className="flex w-full">
          <h1 className="w-full text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-ivar text-white">
            {topTitle}
          </h1>
        </div>
        <div className="flex justify-start md:justify-end">
          <p className="font-inter text-sm md:text-base w-full sm:w-[70%]">{topText}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[600px]">
        {/* Left Image */}
        <div className="relative w-auto md:w-[30%] h-full">
          {typeof image1 === 'object' && image1?.url && (
            <img
              src={image1.url}
              alt="Left visual"
              className="w-full h-[300px] md:h-full object-cover"
            />
          )}
        </div>

        {/* Text Block */}
        <div className="flex flex-col w-auto md:w-[35%] h-full">
          <div className="h-[65%] p-8 flex flex-col justify-center bg-[white]">
            <h2 className="mb-3 text-4xl md:text-5xl xl:text-6xl font-ivar text-black">
              {approachTitle}
            </h2>
            <p className="font-inter text-sm md:text-base text-black">{approachText}</p>
          </div>
          <div className="flex flex-col justify-center font-inter h-[35%] bg-black p-8 text-sm md:text-base text-white">
            <p>{quote}</p>
            {quoteAttribution && <span className="mt-2 italic">{quoteAttribution}</span>}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex flex-col w-auto md:w-[35%] h-full">
          {typeof image2 === 'object' && image2?.url && (
            <img
              src={image2.url}
              alt="Right visual"
              className="w-full h-[300px] md:h-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  )
}
