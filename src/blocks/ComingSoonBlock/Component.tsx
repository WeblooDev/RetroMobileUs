'use client'

import React from 'react'
import { Media } from '@/components/Media'
import type { ComingSoonBlock as ComingSoonBlockType, Media as MediaType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { CountdownTimer } from '@/blocks/ComingSoonBlock/countdown-timer'

function daysInMonth(year: number, month1to12: number) {
  return new Date(year, month1to12, 0).getDate()
}

function targetInNextYear(month1to12: number, day: number) {
  const now = new Date()
  const y = now.getFullYear() + 1
  const safeDay = Math.min(day, daysInMonth(y, month1to12))
  return new Date(y, month1to12 - 1, safeDay, 23, 59, 59)
}

const norm = (s?: string | null) => (typeof s === 'string' && s.trim() ? s : undefined)

function MediaBackdrop({ bg }: { bg: MediaType }) {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Media
        resource={bg}
        htmlElement="div"
        className="h-full w-full"
        imgClassName="h-full w-full object-cover"
        videoClassName="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 grid-pattern" />
    </div>
  )
}

/* ---------- block ---------- */

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
  const bg = (backgroundImage as MediaType) || null
  const targetDate = targetInNextYear(Number(countdownMonth), Number(countdownDay))

  return (
    <main className="relative min-h-screen overflow-hidden">
      {bg && <MediaBackdrop bg={bg} />}

      <div className="container relative z-10 mx-auto mt-[80px] flex min-h-screen flex-col justify-center gap-12 lg:gap-0 lg:mt-0">
        <div className="flex max-w-3xl flex-col items-start">
          <h2 className="mt-[80px] mb-6 text-4xl text-white md:text-6xl">{title}</h2>

          <div className="flex flex-col gap-4 sm:flex-row">
            {primaryButton?.url && primaryButton?.label && (
  <CMSLink
    {...primaryButton }
    appearance="olive"
    size="ctaBig"
 
  />
)}

{secondaryButton?.url && secondaryButton?.label && (
  <CMSLink
    {...secondaryButton}
    appearance="outlineWhite"
    size="ctaBig"
  />
)}

          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden md:block">
          <CountdownTimer
            targetDate={targetDate}
            topText={norm(countdownTopText)}
            displayDayOverride={norm(displayDayOverride)}
            displayMonthYearOverride={norm(displayMonthYearOverride)}
          />
        </div>

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