'use client'

import { Media } from '@/components/Media'
import type { ImageOverlayText as ImageOverlayTextBlock } from '@/payload-types'

const ImageOverlayText: React.FC<ImageOverlayTextBlock> = ({ title, description, image }) => {
  return (
    <section className="container py-8 md:py-12">
      <div className="relative w-full min-h-[597px] overflow-hidden ">
        {image && <Media resource={image} fill imgClassName="object-cover" />}

        <div className="absolute inset-0 flex items-end p-12">
          <div className=" max-w-4xl text-white">
            <h2 className="text-3xl md:text-8xl leading-tight">{title}</h2>
            {description && (
              <p className="mt-3 text-sm md:text-base text-white w-[70%]">{description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageOverlayText
