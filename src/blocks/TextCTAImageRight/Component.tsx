"use client"

import { Media } from "@/components/Media"
import { CTAButton } from "@/components/CTAButton"
import type { TextCTAImageRight as TextCTAImageRightBlock } from "@/payload-types"

const TextCTAImageRight: React.FC<TextCTAImageRightBlock> = ({
  title,
  description,
  boldLine,
  links,
  image,
}) => {
  const [primary] =
    (links ?? [])
      .map((row: any) => row?.link)
      .filter((l: any) => l && l.label && l.url && l.url.trim())

  return (
    <section className="w-[90%] ml-auto py-12 md:py-20">
      <div className="flex items-center gap-8 md:gap-20">
        <div className=" w-[50%]">
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>

          {description && (
            <p className="mt-4 text-sm md:text-base w-[90%]">
              {description}
            </p>
          )}

          {boldLine && (
            <p className="mt-3 font-semibold text-sm md:text-base">
              {boldLine}
            </p>
          )}

          {primary && (
            <div className="mt-6">
              <CTAButton href={primary.url!} variant="olive" size="big" aria-label={primary.label}>
                {primary.label}
              </CTAButton>
            </div>
          )}
        </div>

        <div className="relative aspect-[674/414] w-[50%]">
          {image && <Media resource={image} fill imgClassName="object-cover" />}
        </div>
      </div>
    </section>
  )
}

export default TextCTAImageRight
