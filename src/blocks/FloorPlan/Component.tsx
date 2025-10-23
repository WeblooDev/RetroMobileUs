"use client"

import { Media } from "@/components/Media"
import { CTAButton } from "@/components/CTAButton"
import type { FloorPlan as FloorPlanBlock } from "@/payload-types"
import { cn } from "@/utilities/ui"

const FloorPlan: React.FC<FloorPlanBlock> = ({
  title,
  description,
  items,
  image,
  links,
  reverseLayout = true, // image on right by default as requested
}) => {
  // normalize up to two CTAs
  const normalized =
    (links ?? [])
      .map((row: any) => row?.link)
      .filter((l: any) => l && l.label && l.url && l.url.trim())

  const [primary, secondary] = normalized

  return (
    <section className="container py-10 md:py-16">
      <div
        className={cn(
          "flex items-start gap-8 md:gap-12",
          reverseLayout ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse"
        )}
      >
        {/* Left panel: Title / description / list / buttons */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>
          {description && (
            <p className="mt-2 md:mt-3 text-xs md:text-[12px] tracking-wide text-black/70 max-w-[60ch]">
              {description}
            </p>
          )}

          {/* bullets with short left line */}
          <div className="mt-6 md:mt-8 space-y-4">
            {(items ?? []).map((it, i) => (
              <div key={it?.id ?? i} className="flex items-center gap-3">
                <span className="h-px w-16 md:w-24 bg-black/25" />
                <p className="text-sm md:text-base text-black/85">{it?.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
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

        {/* Right panel: Image */}
        <div className="w-full md:w-[480px] lg:w-[520px] shrink-0">
          <div className="relative w-full aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-md">
            {image && <Media resource={image} fill imgClassName="object-cover" />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FloorPlan
