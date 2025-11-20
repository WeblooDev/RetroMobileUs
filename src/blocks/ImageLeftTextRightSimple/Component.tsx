'use client'

import React from 'react'
import { Media } from '@/components/Media'
import type { ImageLeftTextRightSimple as BlockType } from '@/payload-types'

export const ImageLeftTextRightSimple: React.FC<BlockType> = ({
  image,
  paragraph1,
  paragraph2,
}) => {
  return (
    <section className="container py-12 md:py-16">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="relative aspect-[681/313] w-full overflow-hidden">
          <Media resource={image} fill imgClassName="object-cover" />
        </div>

        <div className="flex flex-col text-center md:text-start">

          <p className="text-sm md:text-base text-black mb-4 whitespace-pre-line">
            {paragraph1}
          </p>

            <p className="text-sm md:text-base text-black ">
              {paragraph2}
            </p>
         
        </div>
      </div>
    </section>
  )
}

export default ImageLeftTextRightSimple
