import * as React from 'react'
import type { ImageHero as ImageHeroBlock, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export default function ImageHero(props: ImageHeroBlock) {
  const { backgroundImage, title, description, button } = props

  const bg = backgroundImage as Media | null
  const bgUrl = (bg as any)?.url as string | undefined

  return (
    <section className="container relative py-20 px-4 min-h-auto md:min-h-[60vh] lg:min-h-[80vh] flex items-center my-12">
      {bgUrl && (
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${bgUrl})` }}
          aria-hidden
        >

                    <div className="absolute inset-0 bg-black/25" />

        </div>
      )}

      <div className="relative z-10 w-[90%] lg:w-[60%] px-6 ">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mb-6">{title}</h1>
        <p className="text-base lg:text-lg text-white mb-8 w-[90%] lg:w-[70%]">{description}</p>

        {button?.url && button?.label && (
          <CMSLink
            type="custom"
            url={button.url}
            label={button.label}
            appearance="olive"     
            size="ctaBig"        
            className="inline-flex"
          />
        )}
      </div>
    </section>
  )
}
