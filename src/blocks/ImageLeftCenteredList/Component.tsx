'use client'

import { Media } from '@/components/Media'
import type { ImageLeftCenteredList as ImageLeftCenteredListBlock } from '@/payload-types'

const ImageLeftCenteredList: React.FC<ImageLeftCenteredListBlock> = ({ title, items, image }) => {
  const list = items ?? []

  return (
    <section className="container py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
        <div className="relative w-full aspect-[692/446] overflow-hidden l">
          {image && <Media resource={image} fill imgClassName="object-cover" />}
        </div>

        <div className="flex flex-col items-center text-center justify-center">
          <div className="w-[70%]">
            <h2 className="text-3xl md:text-5xl leading-tight">{title}</h2>

            <ul className="mt-8 space-y-6 md:space-y-7 max-w-2xl">
              {list.map((it, i) => (
                <li key={it?.id ?? i} className="flex items-start justify-center gap-3 ">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/70 shrink-0" />
                  <p className="text-base md:text-lg text-black">{it?.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageLeftCenteredList
