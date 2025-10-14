'use client'

import { CTAButton } from '@/components/CTAButton'
import type { CenteredBannerCTA as CenteredBannerCTABlock } from '@/payload-types'

const CenteredBannerCTA: React.FC<CenteredBannerCTABlock> = ({
  title,
  description,
  links,
  showTopLine = true,
  showBottomLine = true,
}) => {
  const [primary] = (links ?? [])
    .map((row: any) => row?.link)
    .filter((l: any) => l && l.label && l.url && l.url.trim())

  return (
    <section className="w-full py-10 md:py-14 bg-[#8B9B5C] text-white">
      {/* Top line */}
      {showTopLine && <div className="h-px w-[96%] mx-auto bg-white" />}

      <div className="container py-8 md:py-16 flex flex-col text-center items-center gap-4">
        <h2 className="text-2xl md:text-5xl max-w-2xl">{title}</h2>

        {description && <p className=" text-xs md:text-base  max-w-2xl mx-auto">{description}</p>}

        {primary && (
          <div className="mt-6">
            <CTAButton
              href={primary.url!}
              aria-label={primary.label}
              size="big"
              variant="outlineWhite"
            >
              {primary.label}
            </CTAButton>
          </div>
        )}
      </div>

      {showBottomLine && <div className="h-px w-[96%] mx-auto bg-white" />}
    </section>
  )
}

export default CenteredBannerCTA
