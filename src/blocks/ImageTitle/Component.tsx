import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { ImageTitle as ImageTitleFields } from '@/payload-types'

export default function ImageTitle({
  eyebrow,
  title,
  description,
  image,
  button,
}: ImageTitleFields) {
  const cta = button as any

  return (
    <section className="container py-10 md:py-12">
      <div className="flex justify-center items-center gap-2 ">
        {eyebrow && (
          <p className="text-xs md:text-base italic">{eyebrow}</p>
        )}
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12">
        <div className="flex flex-col text-start items-start gap-6 w-full lg:w-[50%]">
          <h2 className="text-2xl md:text-4xl lg:text-4xl leading-tight">{title}</h2>

          {description && (
            <p className="mt-2 text-sm md:text-base max-w-prose">
              {description}
            </p>
          )}

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

        <div className="relative w-full lg:w-[50%] aspect-[692/446] overflow-hidden">
          {image && <Media resource={image} fill imgClassName="object-cover" />}
        </div>
      </div>
    </section>
  )
}
