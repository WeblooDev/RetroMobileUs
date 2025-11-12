import type { TextVideoRight as TextVideoRightBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

const TextMediaRight: React.FC<TextVideoRightBlock> = ({
  title,
  description,
  smallText1,
  smallText2,
  video,
  button,
}) => {

  const cta = button 


  return (
    <section className="w-[90%] ml-auto py-12 md:py-20">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 md:gap-12">
        <div className="w-full lg:w-[50%]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl leading-[1.9rem] md:leading-[2.2rem]">{title}</h2>

          <p className="mt-6 text-sm md:text-base text-black/80 max-w-prose">{description}</p>
          <p className="mt-6 text-sm md:text-base text-black/90 max-w-prose">{smallText1}</p>
          <p className="mt-4 text-sm md:text-base text-black/90 max-w-prose">{smallText2}</p>

              {cta && (
            <div className="mt-2">
              <CMSLink
                {...cta}
                appearance="olive"
                size="ctaBig"
                className="inline-flex"
              />
            </div>
          )}
            </div>

        <div
          className="relative w-full lg:w-[50%] overflow-hidden"
   
        >
          <div className="relative w-full aspect-[674/414]" >
            <Media resource={video} className="absolute inset-0 h-full w-full object-cover" />
          </div>

          
        </div>
      </div>
    </section>
  )
}

export default TextMediaRight
