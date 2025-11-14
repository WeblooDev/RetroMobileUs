'use client'

import React from 'react'
import type { ComingSoonBlock as ComingSoonBlockType, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { CountdownTimer } from './countdown-timer'

function daysInMonth(year: number, month1to12: number) {
  return new Date(year, month1to12, 0).getDate()
}

/** Always build target date in NEXT calendar year (e.g., 2026 right now). */
function targetInNextYear(month1to12: number, day: number) {
  const now = new Date()
  const y = now.getFullYear() + 1
  const safeDay = Math.min(day, daysInMonth(y, month1to12))
  return new Date(y, month1to12 - 1, safeDay, 23, 59, 59)
}

const norm = (s?: string | null) => (typeof s === 'string' && s.trim() ? s : undefined)

export const ComingSoonBlock: React.FC<ComingSoonBlockType> = ({
  backgroundImage,
  title,
  primaryButton,
  secondaryButton,
  countdownMonth = 12,
  countdownDay = 31,
  countdownTopText,
  displayDayOverride,
  displayMonthYearOverride,
}) => {
  const bg = (backgroundImage as Media) || null
  const bgUrl = (bg as any)?.url as string | undefined

  const targetDate = targetInNextYear(Number(countdownMonth), Number(countdownDay))

  return (
    <main className="relative min-h-screen overflow-hidden">
      {bgUrl && (
        <div className="absolute inset-0" aria-hidden>
          <video
            src={bgUrl}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 grid-pattern" />
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-12 lg:gap-0 mt-[80px] lg:mt-0 justify-center min-h-screen container mx-auto">
        <div className="max-w-3xl flex flex-col items-start">
          <h2 className="text-white text-4xl md:text-6xl mb-6 mt-[80px]">{title}</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {primaryButton?.url && primaryButton?.label && (
              <CMSLink
                type="custom"
                url={primaryButton.url}
                appearance="olive"
                size="ctaBig"
                label={primaryButton.label}
                ariaLabel={primaryButton.label}
              />
            )}
            {secondaryButton?.url && secondaryButton?.label && (
              <CMSLink
                type="custom"
                url={secondaryButton.url}
                label={secondaryButton.label}
                appearance="outlineWhite"
                size="ctaBig"
                ariaLabel={secondaryButton.label}
              />
            )}
          </div>
        </div>

        {/* Desktop timer */}
        <div className="absolute bottom-8 right-8 hidden md:block">
          <CountdownTimer
            targetDate={targetDate}
            topText={norm(countdownTopText)}
            displayDayOverride={norm(displayDayOverride)}
            displayMonthYearOverride={norm(displayMonthYearOverride)}
          />
        </div>

        {/* Mobile timer */}
        <div className="mt-12 md:hidden">
          <CountdownTimer
            targetDate={targetDate}
            topText={norm(countdownTopText)}
            displayDayOverride={norm(displayDayOverride)}
            displayMonthYearOverride={norm(displayMonthYearOverride)}
          />
        </div>
      </div>
    </main>
  )
}

export default ComingSoonBlock
