'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Media } from '@/components/Media'
import type { LinkBanner as LinkBannerBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'

const LinkBanner: React.FC<LinkBannerBlock> = ({
  title,
  ctas,
  linkBgColor,
  paragraph,
  image,
}) => {
  const link = ctas?.[0]?.link
  const bg = (linkBgColor && linkBgColor.trim()) || '#8B9B5C'
  const hasWebUrl = typeof link?.url === 'string' && link.url.trim().length > 0

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-10">
      <div className="flex flex-col lg:flex-row justify-between items-start md:items-center gap-6 md:gap-8 lg:gap-10">
        {/* Left text */}
        <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-[55%] items-center justify-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-center">{title}</h3>
          {paragraph && (
            <p className="text-base w-full  xl:w-[60%] text-center">
              {paragraph}
            </p>
          )}
            <CMSLink
              {...link}
              appearance="olive"
              size="ctaBig"
              className="inline-flex"
              newTab
            />
      
        </div>

        <div className="flex flex-col items-start justify-start md:justify-start gap-6 w-full lg:w-[45%]">
          {image && (
            <div className="relative w-full aspect-[400/283]">
              <Media resource={image} fill imgClassName="object-cover" />
            </div>
          )}



         
        </div>
      </div>
    </section>
  )
}

export default LinkBanner
