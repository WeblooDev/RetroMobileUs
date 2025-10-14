'use client'

import { CTAButton } from '@/components/CTAButton'

type TwoColumnHeroProps = {
  backgroundImage?: { url?: string }
  leftTitle: string
  primaryButton?: { label: string; url: string }
  secondaryButton?: { label: string; url: string }
  rightHeading: string
  rightParagraph: string
}

export default function TwoColumnHero({
  backgroundImage,
  leftTitle,
  primaryButton,
  secondaryButton,
  rightHeading,
  rightParagraph,
}: TwoColumnHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center ">
      {/* Background */}
      {backgroundImage?.url && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage.url})` }}
        >
          <div className="absolute inset-0 bg-black/60" /> {/* overlay */}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex justify-between gap-12 px-6 md:px-12 lg:px-24">
        {/* Left column */}
        <div className="flex flex-col gap-6 w-[70%]">
          <h2 className="text-2xl md:text-8xl text-white w-[70%]">{leftTitle}</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {primaryButton && (
              <CTAButton
                href={primaryButton.url}
                variant="olive"
                aria-label={primaryButton.label}
                size="big"
              >
                {primaryButton.label}
              </CTAButton>
            )}
            {secondaryButton && (
              <CTAButton
                href={secondaryButton.url}
                variant="black"
                aria-label={secondaryButton.label}
                size="big"
              >
                {secondaryButton.label}
              </CTAButton>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4 items-center justify-end w-[30%]">
          <h1 className="text-4xl md:text-[300px] leading-[14rem] text-white">{rightHeading}</h1>
          <h3 className="text-lg md:text-5xl text-white/90 uppercase">{rightParagraph}</h3>
        </div>
      </div>
    </section>
  )
}
