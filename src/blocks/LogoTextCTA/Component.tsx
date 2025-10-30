'use client'

import Link from 'next/link'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { LogoTextCTA as LogoTextCTABlock } from '@/payload-types'

const LogoTextCTA: React.FC<LogoTextCTABlock> = ({ image, title, description, ctas, reverse }) => {
  const primary = ctas?.[0]?.link
  const primaryUrl =
    typeof primary?.url === 'string' && primary.url.trim() ? primary.url : undefined

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
          {description && (
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose">
              {description}
            </p>
          )}
          {primary?.label && primaryUrl && (
            <div className="pt-2">
              <Link href={primaryUrl} aria-label={primary.label}>
                <CTAButton variant="black" size="big">
                  {primary.label}
                </CTAButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LogoTextCTA
