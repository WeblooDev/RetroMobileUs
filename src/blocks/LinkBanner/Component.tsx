'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Media } from '@/components/Media'
import type { LinkBanner as LinkBannerBlock } from '@/payload-types'

const LinkBanner: React.FC<LinkBannerBlock> = ({ title, ctas, linkBgColor, rightImage, paragraph }) => {
  // linkGroup rows look like: [{ link, id? }]
  const link = ctas?.[0]?.link
  const bg = (linkBgColor && linkBgColor.trim()) || '#8B9B5C'

  const hasWebUrl = typeof link?.url === 'string' && link.url.trim().length > 0

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-10">
      <div className="flex flex-col  md:flex-row justify-between items-start md:items-start gap-6 md:gap-8  lg:gap-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl md:text-3xl lg:text-4xl">{title}</h3>
          <p className='text-base w-full lg:w-[60%] '>{paragraph}</p>
        </div>

        <div className="flex items-center justify-start md:justify-end gap-6">
    

          {link?.label && hasWebUrl && (
            <Link
              href={link.url!}
              target='_blank' 
              rel={link.newTab ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
              className="flex gap-4 items-center px-6 py-3 text-white"
              style={{ backgroundColor: bg }}
              
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl">{link.label}</h3>
              <ArrowUpRight className="h-[29px] w-[35px]" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default LinkBanner
