"use client"

import { CTAButton } from "@/components/CTAButton"

type TextWithCTAsProps = {
  title: string
  primaryButton?: { label: string; url: string }
  secondaryButton?: { label: string; url: string }
}

export default function TextWithCTAs({
  title,
  primaryButton,
  secondaryButton,
}: TextWithCTAsProps) {
  return (
    <section className="container py-12">
      <div className="flex items-center gap-6">
        {/* Left: text */}
        <h2 className=" text-2xl md:text-6xl w-[50%]">
          {title}
        </h2>

        {/* Right: CTAs */}
        <div className="flex md:justify-end gap-3 w-[50%]">
          {primaryButton && (
            <CTAButton href={primaryButton.url} variant="olive" aria-label={primaryButton.label} size="big">
              {primaryButton.label}
            </CTAButton>
          )}

          {secondaryButton && (
            // Use CTAButton but override colors to match green outline
            <CTAButton
              href={secondaryButton.url}
              variant="outlineWhite"
              aria-label={secondaryButton.label}
              size="big"
              className="border-[#8B9B5C] text-[#8B9B5C] hover:bg-[#8B9B5C] hover:text-white"
            >
              {secondaryButton.label}
            </CTAButton>
          )}
        </div>
      </div>
    </section>
  )
}
