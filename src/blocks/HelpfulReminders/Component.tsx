"use client"

import { Media } from "@/components/Media"
import { CTAButton } from "@/components/CTAButton"
import type { HelpfulReminders as HelpfulRemindersBlock } from "@/payload-types"

const HelpfulReminders: React.FC<HelpfulRemindersBlock> = ({
  title,
  intro,              // <-- NEW: optional text under the title
  items,
  image,
  links,
  backgroundColor = "#7A8E57",
}) => {
  const [primary] =
    (links ?? [])
      .map((row: any) => row?.link)
      .filter((l: any) => l && l.label && l.url && l.url.trim())

  return (
    <section className="w-full">
      <div
        className="container rounded-none md:rounded-none"
        style={{ backgroundColor: (backgroundColor ?? "#7A8E57") as React.CSSProperties["backgroundColor"] }}
      >
        <div className="py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Left column */}
          <div className="px-4 md:px-6">
            <h2 className="text-2xl md:text-4xl leading-tight text-white">{title}</h2>

            {intro && (
              <p className="mt-2 text-xs md:text-sm text-white/85 max-w-[60ch]">
                {intro}
              </p>
            )}

            <div className="mt-5 md:mt-7 space-y-5">
              {(items ?? []).map((it, i) => (
                <div key={it?.id ?? i}>
                  <div className="h-px w-24 md:w-28 bg-white/40 mb-3" />
                  <p className="text-sm md:text-base text-white/90">{it?.subtitle}</p>
                </div>
              ))}
            </div>

            {/* CTA is optional; renders only if provided */}
            {primary && (
              <div className="mt-6">
                <CTAButton
                  href={primary.url!}
                  aria-label={primary.label}
                  size="big"
                  variant="black"
                >
                  {primary.label}
                </CTAButton>
              </div>
            )}
          </div>

          {/* Right column: image */}
          <div className="px-4 md:px-0">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
              {image && <Media resource={image} fill imgClassName="object-cover" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HelpfulReminders
