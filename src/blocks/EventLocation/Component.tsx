import Link from 'next/link'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { EventLocation as EventLocationBlock } from '@/payload-types'

const isWebLink = (l: unknown): l is { url: string; label: string } =>
  !!l &&
  typeof (l as any).label === 'string' &&
  typeof (l as any).url === 'string' &&
  (l as any).url.trim().length > 0

const EventLocation: React.FC<EventLocationBlock> = ({
  backgroundImage,
  ribbonText,
  title,
  secondtitle,
  ctas,
}) => {
  const rows = ctas ?? []
  const primary = rows[0]?.link
  const secondary = rows[1]?.link

  return (
<section
  id="eventLocation"
  className="scroll-mt-[30vh] md:scroll-mt-[35vh] relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center my-16"
>

        <div className="absolute inset-0">
        <Media resource={backgroundImage} fill priority imgClassName="object-cover" />
      </div>

      <div className="absolute -top-10 left-0 px-10 py-8 bg-[#8B9B5C] text-white font-ivar text-3xl md:text-6xl">
        {ribbonText}
      </div>

      <div className="relative z-10 text-white px-6 flex flex-col items-center gap-6">
        <h2 className="font-ivar text-4xl md:text-6xl text-center max-w-3xl">{title}</h2>
        <h2 className="font-ivar text-4xl md:text-6xl text-center max-w-3xl">{secondtitle}</h2>


        <div className="flex gap-3">
          {isWebLink(primary) && (
            <Link href={primary.url} aria-label={primary.label}>
              <CTAButton variant="olive" size="big">
                {primary.label}
              </CTAButton>
            </Link>
          )}

          {isWebLink(secondary) && (
            <Link href={secondary.url} aria-label={secondary.label}>
              <CTAButton
                variant="outlineWhite"
                size="big"
                className="border-[#8B9B5C] text-[#8B9B5C] hover:bg-[#8B9B5C] hover:text-white"
              >
                {secondary.label}
              </CTAButton>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default EventLocation
