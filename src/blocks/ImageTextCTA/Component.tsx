"use client"

import Link from "next/link"
import { Media } from "@/components/Media"
import { CTAButton } from "@/components/CTAButton"
import type { ImageTextCTA as ImageTextCTABlock } from "@/payload-types"

const ImageTextCTA: React.FC<ImageTextCTABlock> = ({
  image,
  title,
  description,
  ctas,
  reverse,
}) => {
  // linkGroup rows: [{ link, id? }, ...]
  const primary = ctas?.[0]?.link
  const primaryUrl =
    typeof primary?.url === "string" && primary.url.trim() ? primary.url : undefined

  return (
    <section className="w-full my-12">
      <div className={`flex gap-8 items-center ${reverse ? "flex-row-reverse" : ""}`}>
        {/* Image */}
        <div className="w-[45%]">
          <div className="relative w-full aspect-[4/3] rounded-lg shadow overflow-hidden">
            <Media resource={image} fill imgClassName="object-cover" />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6 w-[55%] justify-center">
          <h2 className="text-2xl md:text-6xl">{title}</h2>
          {description && <p className="text-base md:text-base md:w-1/2">{description}</p>}

          {primary?.label && primaryUrl && (
            <Link href={primaryUrl} aria-label={primary.label}>
              <CTAButton variant="olive" size="big">{primary.label}</CTAButton>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default ImageTextCTA
