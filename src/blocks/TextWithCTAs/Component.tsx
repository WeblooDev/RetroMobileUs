'use client'

import { CTAButton } from '@/components/CTAButton'
import type { TextWithCTAs as TextWithCTAsBlock } from '@/payload-types'

const TextWithCTAs: React.FC<TextWithCTAsBlock> = ({ title, links }) => {
  const normalized = (links ?? [])
    .map((row: any) => row?.link)
    .filter((l: any) => l && l.label && l.url && l.url.trim())

  const [primary, secondary] = normalized

  return (
    <section className="container py-12">
      <div className="flex items-center gap-6">
        {/* Left: text */}
        <h2 className="text-2xl md:text-6xl w-[50%]">{title}</h2>

        <div className="flex md:justify-end gap-3 w-[50%]">
          {primary && (
            <CTAButton href={primary.url!} variant="olive" aria-label={primary.label} size="big">
              {primary.label}
            </CTAButton>
          )}

          {secondary && (
            <CTAButton
              href={secondary.url!}
              variant="outlineWhite"
              aria-label={secondary.label}
              size="big"
            >
              {secondary.label}
            </CTAButton>
          )}
        </div>
      </div>
    </section>
  )
}

export default TextWithCTAs
