import Link from 'next/link'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
import type { EventLocation as EventLocationBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'

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
  description,
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

      <div className="absolute -top-10 left-0 px-10 py-8 bg-[#8B9B5C] text-white font-ivar text-3xl md:text-4xl lg:text-5xl">
        {ribbonText}
      </div>

      <div className="relative z-10 text-white px-6 flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-center ">{title}</h2>
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-center">{secondtitle}</h2>
        <p className="text-base lg:text-lg text-center w-[80%]">{description}</p>


        <div className="flex gap-3">
          {isWebLink(primary) && (
            <CMSLink url={primary.url} label={primary.label} appearance="olive" size="ctaBig" newTab/>
          )}

          {isWebLink(secondary) && (
            <CMSLink url={secondary.url} label={secondary.label} appearance="outlineWhite" size="ctaBig" newTab/>
          )}
        </div>
      </div>
    </section>
  )
}



export default EventLocation
