'use client'

type Partner = { heading: string; description: string }
type CharityPartnersProps = {
  title: string
  backgroundImage?: { url?: string }
  partners?: Partner[]
}

export default function CharityPartners({
  title,
  backgroundImage,
  partners = [],
}: CharityPartnersProps) {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-14">
      {/* Title */}
      <h2 className="font-ivar text-3xl md:text-5xl text-foreground mb-6 md:mb-8">{title}</h2>

      {/* Image with overlays */}
      <div className="relative w-full overflow-hidden rounded-none">
        {/* Background image */}
        <div
          className="h-[260px] md:h-[340px] lg:h-[380px] w-full bg-cover bg-center"
          style={{
            backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
          }}
        >
          {/* Darkening overlay for readability */}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Cards overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl px-4">
            {(partners?.length ? partners : Array(3).fill(null)).map((p, i) => (
              <div
                key={i}
                className="pointer-events-auto bg-white/10 backdrop-blur-sm border border-white/50 text-white px-6 py-5 md:px-8 md:py-6"
              >
                <h3 className="font-ivar text-xl md:text-2xl mb-2">{p?.heading || 'Partner'}</h3>
                <p className="text-sm md:text-base leading-relaxed text-white/90">
                  {p?.description || 'Description goes here.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
