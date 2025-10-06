"use client"

import { Media } from "@/components/Media"
import type { TextImageBlock as TextImageBlockType } from "@/payload-types"

const TextImageBlock: React.FC<TextImageBlockType> = ({
  title,
  description,
  image,
  reverse,
}) => {
  // For grid, use order utilities on children when reverse is true
  const textOrder = reverse ? "md:order-2" : "md:order-1"
  const imageOrder = reverse ? "md:order-1" : "md:order-2"

  return (
    <section className="w-full bg-[#8B9B5C] text-white px-6 md:px-12 lg:px-24 py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text side */}
        <div className={`flex flex-col gap-4 ${textOrder}`}>
          <h2 className="font-ivar text-xl md:text-3xl lg:text-6xl">{title}</h2>
          {description && <p className="text-base">{description}</p>}
        </div>

        {/* Image side */}
        <div className={imageOrder}>
          <div className="relative w-full rounded-md overflow-hidden">
            <Media resource={image} imgClassName="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TextImageBlock
