"use client"

import { Media } from "@/components/Media"
import { CTAButton } from "@/components/CTAButton"
import type { FloorPlan as FloorPlanBlock } from "@/payload-types"

const FloorPlan: React.FC<FloorPlanBlock> = ({
  title,
  description,
  items,
  image,
  links,
}) => {
  const normalized =
    (links ?? [])
      .map((row: any) => row?.link)
      .filter((l: any) => l && l.label && l.url && l.url.trim())

  const [primary, secondary] = normalized

  return (
    <section className="container py-10 md:py-20">
      <div
        className="flex  gap-8 md:gap-12   flex-col-reverse lg:flex-row items-stretch h-full" 
      >



         <div className="w-full lg:w-[50%] h-auto">
          <div className="relative w-full aspect-[4/3] md:aspect-[518/759] overflow-hidden ">
            {image && <Media resource={image} fill imgClassName="object-cover" />}
          </div>
        </div>

        <div className="w-full lg:w-[50%] flex flex-col justify-between items-start h-auto">

          <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>
          {description && (
            <p className="mt-2 md:mt-3 text-base  ">
              {description}
            </p>
          )}
          </div>

          <div className="mt-6 flex flex-col gap-6 items-start">
            {(items ?? []).map((it, i) => (
              <div key={it?.id ?? i} className="flex flex-col items-start gap-3">
                <p className="text-base md:text-lg lg:text-[24px] leading-[32px] font-lighter ">{it?.subtitle}</p>
              <span className="h-[1px] w-16 md:w-24 bg-black" />

              </div>
            ))}
          </div>

          <div className="flex  flex-col md:flex-row items-start lg:items-center gap-3 mt-16">
            {primary && (
              <CTAButton
                href={primary.url!}
                aria-label={primary.label}
                size="big"
                variant="olive"
              >
                {primary.label}
              </CTAButton>
            )}
            {secondary && (
              <CTAButton
                href={secondary.url!}
                aria-label={secondary.label}
                size="big"
                variant="black"
              >
                {secondary.label}
              </CTAButton>
            )}
          </div>
        </div>

       
      </div>
    </section>
  )
}

export default FloorPlan
