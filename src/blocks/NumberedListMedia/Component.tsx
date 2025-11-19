import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { NumberedListMedia as NumberedListMediaBlock } from '@/payload-types'

const NumberedListMedia: React.FC<NumberedListMediaBlock> = ({
  title,
  subtext,
  bullets,
  image,
  link,
}) => {
  return (
    <section className="py-12 md:py-16 md:py-24 bg-[#7b8d53] text-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch h-full">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight mb-4">
              {title}
            </h2>

            <p className="font-ivar text-base md:text-lg ">
              {subtext}
            </p>

            <ul className="space-y-4">
              {bullets.map((b, i) => {
                const num = String(i + 1).padStart(2, '0')
                return (
                  <li key={b.id ?? i} className="flex items-center gap-4">
                    <span className="w-[1px] h-4 bg-white/50" aria-hidden />
                    <span className="w-8 tabular-nums text-white">{num}</span>
                    <span className="text-sm md:text-base">
                      {b.text}
                    </span>
                  </li>
                )
              })}
            </ul>

            <CMSLink {...link} type="custom" appearance="black" size="ctaBig"/>

            
           
      
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[576/385] overflow-hidden">
              <Media resource={image as any} fill imgClassName="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NumberedListMedia
