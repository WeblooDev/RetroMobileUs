// src/blocks/TwoColumnHero/Component.tsx
import type { TwoColumnHero as TwoColumnHeroBlock, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export default function TwoColumnHero(props: TwoColumnHeroBlock) {
  const {
    backgroundImage,
    leftTitle,
    primaryButton,
    secondaryButton,
    rightHeading,
    rightParagraph,
  } = props

  const bg = backgroundImage as Media | null
  const bgUrl = (bg as Media)?.url as string | undefined

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

      <div className="container mx-auto relative z-10 w-full flex flex-col lg:flex-row justify-between gap-4 md:gap-16 lg:gap-12 py-24">
        <div className="flex flex-col gap-6 w-full lg:w-[55%]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white w-full lg:w-[70%]">
            {leftTitle}
          </h2>

          <div className="flex flex-col items-start sm:flex-row gap-4">
            {primaryButton && (primaryButton ).url && (primaryButton ).label && (
              <CMSLink
                {...primaryButton}
                appearance="olive"
                size="ctaBig" 
              />
            )}

            {secondaryButton && (secondaryButton ).url && (secondaryButton ).label && (
              <CMSLink
                {...secondaryButton}
                appearance="black"
                size="ctaBig"
              />
            )}
          </div>
        </div>

        <div className="flex flex-row lg:flex-col gap-4 items-center justify-start lg:justify-end w-full lg:w-[45%]">
          <h1 className="text-4xl md:text-5xl lg:text-8xl leading-[8rem] lg:leading-[6rem] text-white">
            {rightHeading}
          </h1>
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white uppercase">
            {rightParagraph}
          </h3>
        </div>
      </div>
    </section>
  )
}
