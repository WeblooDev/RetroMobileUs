import type { TwoColumnHero as TwoColumnHeroBlock, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export default function TwoColumnHero(props: TwoColumnHeroBlock) {
  const { backgroundImage, leftTitle, primaryButton, secondaryButton, rightHeading, rightParagraph } = props

  const bg = backgroundImage as Media | null
  const bgUrl = (bg as any)?.url as string | undefined

  return (
    <section className="relative flex items-center my-16">
      {bgUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="container mx-auto relative z-10 w-full flex flex-col lg:flex-row justify-between gap-0 lg:gap-12 py-24">
        <div className="flex flex-col gap-6 w-full lg:w-[70%]">
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-white w-full lg:w-[70%]">
            {leftTitle}
          </h2>

          <div className="flex flex-col items-start sm:flex-row gap-4">
            {primaryButton?.url && primaryButton?.label && (
              <CMSLink
                type="custom"
                url={primaryButton.url}
                label={primaryButton.label}
                appearance="olive"
                size="ctaBig"
                className="inline-flex"
              />
            )}
            {secondaryButton?.url && secondaryButton?.label && (
              <CMSLink
                type="custom"
                url={secondaryButton.url}
                label={secondaryButton.label}
                appearance="black"
                size="ctaBig"
                className="inline-flex"
              />
            )}
          </div>
        </div>

        <div className="flex flex-row lg:flex-col gap-4 items-center justify-start lg:justify-end w-full lg:w-[30%]">
          <h1 className="text-7xl md:text-9xl lg:text-[200px] leading-[8rem] lg:leading-[12rem] text-white">
            {rightHeading}
          </h1>
          <h3 className="text-3xl md:text-5xl  text-white/90 uppercase">
            {rightParagraph}
          </h3>
        </div>
      </div>
    </section>
  )
}
