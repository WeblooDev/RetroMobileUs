'use client'

import { useState, useMemo } from 'react'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import type { LogoTextCTA as LogoTextCTABlock } from '@/payload-types'

const MAX_PREVIEW_CHARS = 260

const LogoTextCTA: React.FC<LogoTextCTABlock> = ({
  image,
  title,
  description,
  cta,         
  reverse,
}) => {
  const [expanded, setExpanded] = useState(false)

  const { preview, isLong } = useMemo(() => {
    const text = description ?? ''
    if (!text) return { preview: '', isLong: false }
    if (text.length <= MAX_PREVIEW_CHARS) return { preview: text, isLong: false }
    return { preview: text.slice(0, MAX_PREVIEW_CHARS), isLong: true }
  }, [description])

  return (
    <section className="container py-12">
      <div
        className={`flex flex-col lg:flex-row gap-4 lg:gap-10 items-center justify-between ${reverse ? 'flex-row-reverse' : ''}`}
      >
        <div className="w-full lg:w-[45%]">
          <div className="relative w-full max-w-[420px] aspect-[4/3]">
            <Media resource={image} fill imgClassName="object-contain" />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 w-full lg:w-[55%]">
          <h2 className="font-ivar text-3xl md:text-5xl text-foreground">{title}</h2>

       
            <div className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose whitespace-pre-line">
              {expanded ? description : preview}
              {isLong && !expanded && '…'}
              {isLong && (
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="ml-2 inline-flex items-center font-bold underline underline-offset-4 hover:no-underline"
                  aria-expanded={expanded}
                >
                  {expanded ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
    
            <div className="pt-2">
              <CMSLink
                {...(cta)}
                appearance="black"
                size="ctaBig"
                className="inline-flex"
              />
            </div>
   
        </div>
      </div>
    </section>
  )
}

export default LogoTextCTA
