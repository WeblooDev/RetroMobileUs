'use client'

import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { RightImageCTA as RightImageCTABlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'

const RightImageCTA: React.FC<RightImageCTABlock> = ({ title, description, image, cta }) => {
  const primary = cta?.[0]?.link
  const url = typeof primary?.url === 'string' && primary.url.trim() ? primary.url : undefined

  return (
    <section className="w-full">
      <div className="container  lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-ivar text-2xl md:text-3xl lg:text-4xl leading-tight">{title}</h2>

            {description && (
              <p className="mt-6 max-w-[560px] text-sm md:text-base text-black/80">{description}</p>
            )}

            {primary?.label && url && (
              <div className="mt-8">
                <CMSLink {...primary} appearance="olive" size="ctaBig" />
           
              
              </div>
            )}
          </div>

          <div className="relative w-full aspect-[4/3] md:aspect-[5/4] overflow-hidden">
            <Media resource={image} fill imgClassName="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default RightImageCTA
