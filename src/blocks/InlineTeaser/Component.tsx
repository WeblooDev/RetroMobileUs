"use client"

import { Media } from "@/components/Media"
// If your CMSLink lives elsewhere, adjust the import:
import { CMSLink } from "@/components/Link"
import type { InlineTeaser as InlineTeaserBlock } from "@/payload-types"
import arrowRight from "../../../public/arrowright.svg"

const InlineTeaser: React.FC<InlineTeaserBlock> = ({ image, title, description, links }) => {
  const link =
    (links ?? [])
      .map((row: any) => row?.link)
      .find((l: any) => l && l.url && l.url.trim())

  return (
    <section className="container py-6 md:py-8">
      <div className="flex items-center gap-4 md:gap-8">
        {/* Left image */}
        <div className="relative w-[150px] md:w-[220px] aspect-[4/3] overflow-hidden rounded-md shrink-0">
          {image && <Media resource={image} fill imgClassName="object-cover" />}
        </div>

        {/* Middle copy */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl leading-tight">{title}</h3>
          {description && (
            <p className="mt-1 text-sm md:text-base text-black/70 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* Right link with arrow (optional) */}
        {link && (
          <CMSLink
            className="inline-flex items-center gap-2 text-sm md:text-base font-medium hover:opacity-80 transition"
            {...link}
            aria-label={link.label || "View details"}
          >
            {link.label || "VIEW DETAILS"}
            <img
              src={(arrowRight as any).src ?? (arrowRight as any)}
              alt=""
              className="h-4 w-4"
            />
          </CMSLink>
        )}
      </div>
    </section>
  )
}

export default InlineTeaser
