import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Media } from '@/components/Media'
import type { ImageSectionBlock } from '@/payload-types'

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
        <div className="absolute inset-0 w-full h-full z-0">
          <Media
            fill
            alt="Image Section Background"
            priority
            resource={backgroundImage}
            imgClassName="object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10  text-black">
          <h2 className=" text-[36px] md:text-[48px] xl:text-[72px] leading-[100%] mb-8 w-auto md:w-[70%]">
            {heading}
          </h2>
          <p className="font-inter text-sm text-[18px] w-auto md:w-[40%]">{description}</p>
        </div>

        {/* CTA Button */}
        <div className="relative z-10 inline-block">
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
        </div>
      </div>
    </section>
  )
}
