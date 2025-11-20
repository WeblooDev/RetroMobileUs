
import Image from 'next/image'
import type { ImageText as ImageTextBlock, Media } from '@/payload-types'

export default function ImageText(props: ImageTextBlock) {
  const {
    image,
    imageAlt,
    title,
    text,
    reverse = false,
    textAlign = 'left',
  } = props

  const dir = reverse ? 'md:flex-row-reverse' : 'md:flex-row'
  const align = textAlign === 'center' ? 'text-center items-center' : 'text-left items-start'

  const media = image as Media | null
  const src = (media as any)?.url as string | undefined
  const alt = imageAlt || title

  return (
    <section className="container px-6 md:px-12 lg:px-24 py-14">
      <div className={`flex flex-col ${dir} gap-10 md:gap-16`}>
        <div className="md:w-1/2">
          {src && (
            <div className="w-full overflow-hidden">
              <div className="relative w-full h-auto aspect-[695/503]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>


       <div className={`md:w-1/2 flex flex-col ${align} gap-5 justify-center items-center`}>
          <h2 className="font-ivar text-2xl lg:text-3xl xl:text-4xl text-center ">{title}</h2>
          <p className="text-base max-w-prose text-center">{text}</p>
        </div>
      </div>
    </section>
  )
}
