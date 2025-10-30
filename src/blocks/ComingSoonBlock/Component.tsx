import type { ComingSoonBlock as ComingSoonBlockType, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { CountdownTimer } from './countdown-timer'

function daysInMonth(year: number, month1to12: number) {
  return new Date(year, month1to12, 0).getDate()
}

function nextOccurrence(month1to12: number, day: number) {
  const now = new Date()
  const y = now.getFullYear()
  const safeDay = Math.min(day, daysInMonth(y, month1to12))
  let target = new Date(y, month1to12 - 1, safeDay, 23, 59, 59)
  if (target.getTime() <= now.getTime()) {
    const y2 = y + 1
    const safeDay2 = Math.min(day, daysInMonth(y2, month1to12))
    target = new Date(y2, month1to12 - 1, safeDay2, 23, 59, 59)
  }
  return target
}

export const ComingSoonBlock: React.FC<ComingSoonBlockType> = ({
  backgroundImage,
  title,
  primaryButton,
  secondaryButton,
  countdownMonth = 12,
  countdownDay = 31,
}) => {
  const bg = backgroundImage as Media | null
  const bgUrl = (bg as any)?.url as string | undefined
  const targetDate = nextOccurrence(Number(countdownMonth), Number(countdownDay))

  return (
    <main className="relative min-h-screen overflow-hidden">
      {bgUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgUrl})` }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-background/80 grid-pattern" />
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-12 lg:gap-0 mt-[40px] lg:mt-0 justify-center min-h-screen px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl flex flex-col items-start">
          <h2 className="text-white text-4xl md:text-6xl lg:text-[84px] mb-6">{title}</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            {primaryButton?.url && primaryButton?.label && (
              <CMSLink
                type="custom"
                url={primaryButton.url}
                label={primaryButton.label}
                appearance="olive"  
                size="ctaBig"     
                ariaLabel={primaryButton.label}
                className="inline-flex"
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
                className="inline-flex"
              />
            )}
          </div>
        </div>

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
