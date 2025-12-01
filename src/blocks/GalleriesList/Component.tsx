import { getPayload } from 'payload'
import config from '@/payload.config'
import type { GalleriesList as GalleriesListBlock, Gallery } from '@/payload-types'
import { AnimatedGalleriesList } from './AnimatedGalleriesList'

export default async function GalleriesList({
  title,
  description,
  limit,
  backgroundColor,
}: GalleriesListBlock) {
  const safeLimit: number = typeof limit === 'number' ? limit : 12
  const bg: React.CSSProperties['backgroundColor'] = (backgroundColor ??
    '#7A8E57') as React.CSSProperties['backgroundColor']

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
    <AnimatedGalleriesList title={title} description={description} galleries={docs as Gallery[]} />
  )
}
