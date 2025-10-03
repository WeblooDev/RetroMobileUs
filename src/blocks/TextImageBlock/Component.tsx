"use client"

type TextImageBlockProps = {
  title: string
  description?: string
  image?: { url?: string }
  reverse?: boolean
}

export default function TextImageBlock({ title, description, image, reverse }: TextImageBlockProps) {
  return (
    <section className="w-full bg-[#8B9B5C] text-white px-6 md:px-12 lg:px-24 py-16">
      <div
        className={`container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Text side */}
        <div className="flex flex-col gap-4">
          <h2 className="font-ivar text-xl md:text-3xl lg:text-6xl">{title}</h2>
          {description && <p className="text-base  ">{description}</p>}
        </div>

        {/* Image side */}
        {image?.url && (
          <div>
            <img
              src={image.url}
              alt={title}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </section>
  )
}
