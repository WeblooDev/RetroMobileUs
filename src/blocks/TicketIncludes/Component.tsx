"use client"

import { Media } from "@/components/Media"
import { CTAButton } from "@/components/CTAButton"
import type { TicketIncludes as TicketIncludesBlock } from "@/payload-types"

const TicketIncludes: React.FC<TicketIncludesBlock> = ({ title, items, image, links }) => {
  // first valid link becomes CTA
  const [primary] =
    (links ?? [])
      .map((row: any) => row?.link)
      .filter((l: any) => l && l.label && l.url && l.url.trim())

  return (
    <section className="container py-10 md:py-16">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
        {/* Left column */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl md:text-5xl leading-tight">{title}</h2>

          <div className="mt-5 md:mt-7 space-y-5 md:space-y-6">
            {(items ?? []).map((it, i) => (
              <div key={it?.id ?? i}>
                {/* short underline on the left (≈40% width on small, a bit longer on md) */}
                <div className="h-px w-2/5 md:w-1/2 bg-black/15 mb-3" />
                <div>
                  {it?.subtitle && (
                    <p className="font-medium text-base md:text-lg">{it.subtitle}</p>
                  )}
                  {it?.text && (
                    <p className="text-sm md:text-base text-black/70">{it.text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {primary && (
            <div className="mt-6 md:mt-8">
              <CTAButton
                href={primary.url!}
                aria-label={primary.label}
                size="big"
                variant="olive"
              >
                {primary.label}
              </CTAButton>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="w-full md:w-[460px] lg:w-[520px] shrink-0">
          <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-md">
            {image && <Media resource={image} fill imgClassName="object-cover" />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TicketIncludes
