"use client"

import { Media } from "@/components/Media"
import type { TextCTAImageRight as TextCTAImageRightBlock } from "@/payload-types"
import TixpubButton from "@/components/TixpubButton"

const TextCTAImageRight: React.FC<TextCTAImageRightBlock> = ({
  title,
  description,
  boldLine,
  links,
  image,
}) => {
  const [primary] = (links ?? [])
    .map((row: any) => row?.link)
    .filter((l: any) => l && l.label)

  return (
    <section className="w-[90%] ml-auto py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-20">
        <div className="w-full lg:w-[50%]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl leading-[1.9rem] md:leading-[2.2rem]">
            {title}
          </h2>

          {description && <p className="mt-4 text-sm md:text-base w-[90%]">{description}</p>}

          {boldLine && <p className="mt-3 font-semibold text-sm md:text-base">{boldLine}</p>}

          {primary && (
            <div className="mt-6">
              <TixpubButton
                label={primary.label || "Buy Tickets"}
                variant="olive"
                size="ctaBig"
              />

            </div>
          )}

          <a className="tixpub-buytix">Buy Tickets Link</a>

        </div>

        <div className="relative aspect-[674/414] w-full lg:w-[50%]">
          {image && <Media resource={image} fill imgClassName="object-cover" />}
        </div>
      </div>
    </section>
  )
}

export default TextCTAImageRight
