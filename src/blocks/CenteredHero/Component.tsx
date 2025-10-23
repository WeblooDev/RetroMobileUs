'use client'

type CenteredHeroProps = {
  backgroundImage?: { url?: string }
  title: string
  description?: string
}

export default function CenteredHero({ backgroundImage, title, description }: CenteredHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-start text-start">
      {/* Background image */}
      {backgroundImage?.url && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage.url})` }}
        >
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-10">
        <h1 className="text-4xl md:text-[84px] leading-[4rem] md:leading-[6rem] text-white mb-6">{title}</h1>
        {description && <p className="text-lg md:text-xl text-white/90">{description}</p>}
      </div>
    </section>
  )
}
