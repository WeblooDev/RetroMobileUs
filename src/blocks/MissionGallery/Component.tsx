"use client"

type MissionGalleryProps = {
  title: string
  description?: string
  images?: { image?: { url?: string }; alt?: string }[]
}

export default function MissionGallery({ title, description, images = [] }: MissionGalleryProps) {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <h2 className=" text-4xl md:text-6xl ">{title}</h2>
        {description && (
          <p className="mt-4 text-sm md:text-base w-[50%] mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Image row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {images?.map((item, i) => (
          <div key={i} className="w-full overflow-hidden">
            {item?.image?.url ? (
              <img
                src={item.image.url}
                alt={item.alt || title}
                className="w-full h-[220px] md:h-[250px] object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[220px] md:h-[250px] bg-muted" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
