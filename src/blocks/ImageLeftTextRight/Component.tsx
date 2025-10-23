"use client"

import { Media } from "@/components/Media"
import type { ImageLeftTextRight as ImageLeftTextRightBlock } from "@/payload-types"

const ImageLeftTextRight: React.FC<ImageLeftTextRightBlock> = ({ title, description, image }) => {
  return (
    <section className="container py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
        {/* Left: image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
          {image && <Media resource={image} fill imgClassName="object-cover" />}
        </div>

        {/* Right: text */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>
          {description && (
            <p className="mt-4 text-sm md:text-base text-black/75 max-w-prose md:max-w-[46ch] mx-auto md:mx-0">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ImageLeftTextRight
