'use client'

import React from 'react'
import { Media } from '@/components/Media'
import type { FeatureSectionBlock } from '@/payload-types'
import { CTAButton } from '@/components/Button/CTAButton'
import { Icons } from '@/components/Inventory/InventoryHeader'

export const FeatureSectionBlockComponent: React.FC<FeatureSectionBlock> = ({
  backgroundImage,
  heading,
  description,
  features,
  buttonText,
  link,
}) => {
  return (
    <section className="relative py-16 md:py-20 lg:py-28 bg-cover bg-center text-white">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Media
          resource={backgroundImage}
          alt="feature section"
          fill
          priority
          imgClassName="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className=" text-4xl md:text-5xl lg:text-6xl mb-4">{heading}</h2>
          <p className="font-inter text-sm md:text-base">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12">
          <Icons />
        </div>

        <div className="mx-auto">
          <CTAButton
            href={link || '#'}
            text={buttonText || ''}
            variant="transparent-light"
            arrow={true}
          />
        </div>
      </div>
    </section>
  )
}
