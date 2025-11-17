import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { GalleriesList as GalleriesListBlock, Gallery } from '@/payload-types'

export default async function GalleriesList({
  title,
  description,
  limit,
  backgroundColor,
}: GalleriesListBlock) {
  const safeLimit: number = typeof limit === 'number' ? limit : 12
  const bg: React.CSSProperties['backgroundColor'] =
    (backgroundColor ?? '#7A8E57') as React.CSSProperties['backgroundColor']

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'galleries',
    sort: '-publishedAt',
    depth: 1,
    limit: safeLimit,
    where: { _status: { equals: 'published' } },
    select: {
      id: true,
      title: true,
      intro: true,
      slug: true,
      thumbnail: true,
      readMore: { url: true, newTab: true },
    },
  })

  return (
    <section className="container py-10 md:py-16">
      {title && <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">{title}</h2>}
      {description && <p className="text-black mb-6 md:mb-10">{description}</p>}

      <div className="space-y-4">
        {(docs as Gallery[]).map((g) => {
          const href = g.readMore?.url?.trim() || `/galleries/${g.slug}`
          const external = /^https?:\/\//i.test(href)

          const Card = (
            <div
              className="group grid grid-cols-1 md:grid-cols-[420px_1fr_auto] items-center gap-6 md:gap-10 p-8  bg-white hover:bg-[#8B9B5C] transition-colors"
            >
              <div className="relative aspect-[429/237] w-full overflow-hidden">
                {g.thumbnail && <Media resource={g.thumbnail} fill imgClassName="object-cover" />}
              </div>

              <div className="text-black transition-colors group-hover:text-white">
                <h3 className="text-xl md:text-2xl transition-colors group-hover:text-white">{g.title}</h3>
                {g.intro && (
                  <p className="mt-2 text-sm md:text-base opacity-90 transition-colors group-hover:text-white">
                    {g.intro}
                  </p>
                )}
              </div>

              <div className="md:justify-self-end !font-inter">
                <p className="text-xl inline-flex items-center gap-2 hover:underline underline-offset-6 text-black transition-colors group-hover:text-white">
                  VIEW GALLERY
                </p>
              </div>
            </div>
          )

          return external ? (
            <a
              key={g.id}
              href={href}
              target={g.readMore?.newTab ? '_blank' : undefined}
              rel={g.readMore?.newTab ? 'noopener noreferrer' : undefined}
              aria-label={`View gallery: ${g.title}`}
              className="block"
            >
              {Card}
            </a>
          ) : (
            <Link key={g.id} href={href} aria-label={`View gallery: ${g.title}`} className="block">
              {Card}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
