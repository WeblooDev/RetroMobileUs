'use client'

import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { ImageStepsRight as ImageStepsRightBlock } from '@/payload-types'

const ImageStepsRight: React.FC<ImageStepsRightBlock> = ({ title, steps, links, image }) => {
  const [primary] = (links ?? [])
    .map((row: any) => row?.link)
    .filter((l: any) => l && l.label && l.url && l.url.trim())

  const items = steps ?? []

  return (
    <section className="w-[90%] mr-auto py-12 md:py-20">
      <div className="flex items-center gap-8 md:gap-20">
        {/* Left: image */}
        <div className="relative aspect-[674/414] overflow-hidden w-[50%] ">
          {image && <Media resource={image} fill imgClassName="object-cover" />}
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left justify-center">
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>

          <div className="mt-6 md:mt-8 grid grid-cols-4 gap-6 md:gap-10">
            {items.map((s, i) => (
              <div key={s?.id ?? i} className="flex flex-col items-center md:items-center">
                {s?.heading && (
                  <h3 className="font-ivar text-4xl md:text-5xl leading-none">{s.heading}</h3>
                )}
                {s?.text && <p className="mt-2 text-xs md:text-sm text-black/80">{s.text}</p>}
              </div>
            ))}
          </div>

          {primary && (
            <div className="mt-8">
              <CTAButton href={primary.url!} variant="olive" size="big" aria-label={primary.label}>
                {primary.label}
              </CTAButton>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ImageStepsRight
