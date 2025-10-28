import React from 'react'
import type { SideImageInfo as SideImageInfoBlock } from '@/payload-types'
import { Media } from '@/components/Media'

const SideImageInfoComponent: React.FC<SideImageInfoBlock> = ({ title, description, image }) => {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7">
            <div className="relative aspect-[16/9] md:aspect-[3/2] lg:aspect-[2/1] w-full overflow-hidden">
              <Media
                resource={image}
                fill
                imgClassName="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-5">
            {title && (
              <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6 md:mb-8 leading-tight">
                {title}
              </h2>
            )}
            
            {description && (
              <p className="text-sm md:text-base leading-relaxed text-center md:text-left whitespace-pre-line">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SideImageInfoComponent
