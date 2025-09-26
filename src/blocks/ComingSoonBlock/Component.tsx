"use client"

import { CountdownTimer } from "./countdown-timer"
import { CTAButton } from "@/components/CTAButton"

type ComingSoonBlockProps = {
  backgroundImage?: { url: string }
  title: string
  primaryButton?: { label: string; url: string }
  secondaryButton?: { label: string; url: string }
  countdownMonth?: number // 1-12
  countdownDay?: number   // 1-31
}

function daysInMonth(year: number, month1to12: number) {
  return new Date(year, month1to12, 0).getDate()
}

function nextOccurrence(month1to12: number, day: number) {
  const now = new Date()
  const y = now.getFullYear()

  // Clamp day to valid range for this month/year
  const safeDay = Math.min(day, daysInMonth(y, month1to12))
  let target = new Date(y, month1to12 - 1, safeDay, 23, 59, 59)

  if (target.getTime() <= now.getTime()) {
    const y2 = y + 1
    const safeDay2 = Math.min(day, daysInMonth(y2, month1to12))
    target = new Date(y2, month1to12 - 1, safeDay2, 23, 59, 59)
  }
  return target
}

export const ComingSoonBlock: React.FC<ComingSoonBlockProps> = ({
  backgroundImage,
  title,
  primaryButton,
  secondaryButton,
  countdownMonth = 12,
  countdownDay = 31,
}) => {
  const targetDate = nextOccurrence(countdownMonth, countdownDay)

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      {backgroundImage?.url && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage.url})` }}
        >
          <div className="absolute inset-0 bg-background/80 grid-pattern" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl">
          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl mb-6">
            {title}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {primaryButton && (
              <CTAButton href={primaryButton.url} variant="olive" aria-label={primaryButton.label} size="big">
                {primaryButton.label}
              </CTAButton>
            )}
            {secondaryButton && (
              <CTAButton
                href={secondaryButton.url}
                variant="outlineWhite"
                aria-label={secondaryButton.label}
                size="big"
              >
                {secondaryButton.label}
              </CTAButton>
            )}
          </div>
        </div>

        {/* Countdown */}
        <div className="absolute bottom-8 right-8 hidden md:block">
          <CountdownTimer targetDate={targetDate} />
        </div>
        <div className="mt-12 md:hidden">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
    </main>
  )
}
