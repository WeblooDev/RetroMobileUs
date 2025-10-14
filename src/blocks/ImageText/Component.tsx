'use client'

type ImageTextProps = {
  image?: { url?: string }
  imageAlt?: string
  title: string
  text: string
  reverse?: boolean // flips columns on md+
  textAlign?: 'left' | 'center'
}

export default function ImageText({
  image,
  imageAlt,
  title,
  text,
  reverse = false,
  textAlign = 'left',
}: ImageTextProps) {
  const dir = reverse ? 'md:flex-row-reverse' : 'md:flex-row'
  const align = textAlign === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <section className="container px-6 md:px-12 lg:px-24 py-14">
      <div className={`flex flex-col ${dir} gap-10 md:gap-16`}>
        {/* Image */}
        <div className="md:w-1/2">
          {image?.url && (
            <div className="w-full overflow-hidden">
              <img
                src={image.url}
                alt={imageAlt || title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Text */}
        <div className={`md:w-1/2 flex flex-col ${align} gap-5 justify-center`}>
          <h2 className="font-ivar text-3xl md:text-6xl ">{title}</h2>
          <p className="text-base max-w-prose">{text}</p>
        </div>
      </div>
    </section>
  )
}
