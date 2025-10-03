"use client"

type MediaItem = { url?: string }

type MissionGalleryProps = {
  title: string
  description?: string
  image1?: MediaItem
  image2?: MediaItem
  image3?: MediaItem
  alt1?: string
  alt2?: string
  alt3?: string
}

export default function MissionGallery({
  title,
  description,
  image1,
  image2,
  image3,
  alt1,
  alt2,
  alt3,
}: MissionGalleryProps) {
  const items = [
    { url: image1?.url, alt: alt1 || title },
    { url: image2?.url, alt: alt2 || title },
    { url: image3?.url, alt: alt3 || title },
  ]

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <h2 className="text-4xl md:text-6xl">{title}</h2>
        {description && (
          <p className="mt-4 text-sm md:text-base w-full md:w-1/2 mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Images: stack on mobile, 35% / 30% / 35% on md+ */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {items.map((it, idx) => (
          <div
            key={idx}
            className={
              idx === 1
                ? "w-full md:basis-[22%]"
                : "w-full md:basis-[39%]"
            }
          >
            {it.url ? (
              <img
                src={it.url}
                alt={it.alt}
                className="w-full h-[220px] md:h-[250px] object-cover rounded-lg"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[220px] md:h-[250px] rounded-lg bg-muted" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
