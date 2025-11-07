import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { VideoCta as VideoCtaFields } from '@/payload-types'

export default function VideoCtaBlock({
  image,
  title,
  paragraph,
  link,
}: VideoCtaFields) {
  return (
    <section className="container py-16">
      <div className="flex flex-col lg:flex-row gap-10 items-center w-full">
        <div className="w-full lg:w-[50%] relative overflow-hidden">
          <div className="w-full max-h-[634px]">
            <Media
              resource={image}
              className="w-full h-auto block object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full lg:w-[50%]px-0 lg:px-10">
          {title && <h2 className="text-3xl md:text-4xl lg:text-4xl">{title}</h2>}
          {paragraph && <p className="text-base md:text-sm w-[80%]">{paragraph}</p>}

            <div>
              <CMSLink
                {...(link)}
                appearance="black"
                size="ctaBig"
                className="inline-flex"
              />
            </div>
 
        </div>
      </div>
    </section>
  )
}
