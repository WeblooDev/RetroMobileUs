import type { CenteredHero as CenteredHeroFields } from '@/payload-types'

export default function CenteredHero({
  backgroundImage,
  title,
  description,
}: CenteredHeroFields) {
  const bg = typeof backgroundImage === 'string' ? '' : (backgroundImage?.url ?? '')

  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-start text-start mt-[50px]">
      {bg && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10  container mx-auto">
        <h1 className="text-4xl md:text-6xl leading-[4rem] md:leading-[6rem] text-white mb-6">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-white/90">{description}</p>
        )}
      </div>
    </section>
  )
}
