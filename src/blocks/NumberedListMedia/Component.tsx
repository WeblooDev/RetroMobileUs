'use client'

import { Media } from '@/components/Media'
import type { NumberedListMedia as NumberedListMediaBlock } from '@/payload-types'

const NumberedListMedia: React.FC<NumberedListMediaBlock> = ({
  title,
  subtext,
  bullets,
  image,
}) => {
  return (
    <section className="py-16 md:py-24 bg-[#7b8d53] text-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch h-full">
          <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4">
            <h2 className="font-ivar text-4xl md:text-6xl leading-tight mb-6">
              {title}
            </h2>

            <p className="text-xs md:text-sm opacity-90 mb-6">
              {subtext}
            </p>

            <ul className="space-y-5">
              {bullets.map((b, i) => {
                const num = String(i + 1).padStart(2, '0')
                return (
                  <li key={b.id ?? i} className="flex items-center gap-4">
                    <span className="w-[1px] h-4 bg-white/50" aria-hidden />
                    <span className="w-8 tabular-nums text-white/90">{num}</span>
                    <span className="text-sm md:text-base leading-relaxed">
                      {b.text}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[576/385] overflow-hidden">
              <Media resource={image as any} fill imgClassName="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NumberedListMedia
