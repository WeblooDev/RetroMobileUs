'use client'

import { CTAButton } from '@/components/CTAButton'

type Split4060Props = {
  title: string
  description: string
  button?: { label: string; url: string }
  image?: { url?: string }
  imageAlt?: string
  reverse?: boolean
}

export default function Split4060({
  title,
  description,
  button,
  image,
  imageAlt,
  reverse = false,
}: Split4060Props) {
  // swap columns on desktop while keeping text at 40% and image at 60%
  const textOrder = reverse ? 'md:order-2' : 'md:order-1'
  const imageOrder = reverse ? 'md:order-1' : 'md:order-2'

  return (
    <section className="container  py-14">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
        {/* Text column (40%) */}
        <div
          className={`w-full flex flex-col gap-6 items-start ${textOrder}`}
          style={{ flexBasis: '45%' }}
        >
          <h2 className="font-ivar text-3xl md:text-6xl">{title}</h2>
          <p className="text-sm md:text-base ">{description}</p>

          {button && (
            <CTAButton href={button.url} variant="black" aria-label={button.label} size="big">
              {button.label}
            </CTAButton>
          )}
        </div>

        {/* Image column (60%) */}
        <div className={`w-full ${imageOrder}`} style={{ flexBasis: '55%' }}>
          {image?.url ? (
            <div className="w-full overflow-hidden">
              <img
                src={image.url}
                alt={imageAlt || title}
                className="w-full h-[220px] md:h-[300px] lg:h-[340px] object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full h-[220px] md:h-[300px] lg:h-[340px] bg-muted" />
          )}
        </div>
      </div>
    </section>
  )
}
