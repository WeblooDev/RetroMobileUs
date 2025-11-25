'use client'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { LogoTextCTA as LogoTextCTABlock } from '@/payload-types'

const LogoTextCTA: React.FC<LogoTextCTABlock> = ({
  image,
  title,
  description,
  cta,
  reverse,
}) => {
  return (
    <section className="container py-12">
      <div
        className={`flex flex-col lg:flex-row gap-6 lg:gap-10 items-center justify-between ${reverse ? 'flex-row-reverse' : ''}`}
      >
        <div className="w-full lg:w-[45%]">
          <div className="flex justify-start lg:justify-center w-full ">
            <Media resource={image}  imgClassName="object-cover max-w-[358px]" />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 w-full lg:w-[55%]">
          <h2 className="font-ivar text-2xl md:text-3xl lg:text-4xl text-foreground">{title}</h2>

          {description && (
            <div className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose whitespace-pre-line">
              {description}
            </div>
          )}

          {cta && (
            <div className="pt-2">
              <CMSLink
                {...cta}
                appearance="black"
                size="ctaBig"
                className="inline-flex"
                newTab
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LogoTextCTA
