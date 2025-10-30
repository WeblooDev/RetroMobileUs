'use client'

import { Media } from '@/components/Media'
import type { TextImageRight as TextImageRightBlock } from '@/payload-types'

const TextImageRight: React.FC<TextImageRightBlock> = ({ title, description, image }) => {
  return (
    <section className="w-[90%] ml-auto py-12">
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-20">
        <div>
          <h2 className="text-3xl md:text-6xl ">{title}</h2>
          {description && <p className="mt-4 text-sm md:text-base">{description}</p>}
        </div>

        <div className="relative w-full aspect-[638/262] overflow-hidden ">
          {image && <Media resource={image} fill imgClassName="object-cover" />}
        </div>
      </div>
    </section>
  )
}

export default TextImageRight
