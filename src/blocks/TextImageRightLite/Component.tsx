"use client"

import { Media } from "@/components/Media"
import type { TextImageRightLite as TextImageRightLiteBlock } from "@/payload-types"

const TextImageRightLite: React.FC<TextImageRightLiteBlock> = ({ title, description, image }) => {
  return (
    <section className="container py-10 md:py-16">
      <div className="flex items-center justify-center gap-8 md:gap-14">
        <div>
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>
          {description && (
            <p className="mt-4 text-sm md:text-base text-black/75 max-w-prose">
              {description}
            </p>
          )}
        </div>

        <div className="justify-self-end w-full max-w-[520px]">
          <div className="relative w-full aspect-[507/331] overflow-hidden rounded-lg shadow-xl">
            {image && <Media resource={image} fill imgClassName="object-cover" />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TextImageRightLite
