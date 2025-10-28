// src/blocks/SponsorsFilterGrid/Component.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import type {
  SponsorsFilterGrid as SponsorsFilterGridBlock, 
  Media,
} from '@/payload-types'
import SponsorsFilterClient from './SponsorsFilterClient'

export default async function SponsorsFilterGrid(props: SponsorsFilterGridBlock) {
  const payload = await getPayload({ config })

  const { docs: allCats } = await payload.find({
    collection: 'partnerCategories', 
    limit: 1000,
    depth: 0,
  })

  const categories = allCats.map((c) => ({
    id: String(c.id),
    name: c.name,
    slug: (c as any).slug,
  }))

  const { docs: partners } = await payload.find({
    collection: 'partners', 
    limit: 1000,
    depth: 1,
  })

  const items = partners.map((p) => ({
    id: String(p.id),
    name: p.name,
    description: p.description,
    categories: (p.categories || []).map((c: any) => ({
      id: String(c.id),
      name: c.name,
      slug: c.slug,
    })),
    logo: p.logo as Media,
    backgroundImage: p.backgroundImage as Media,
  }))

  return (
    <SponsorsFilterClient
      categories={categories}
      items={items}
      showDescriptions={props.showDescriptions ?? true}
    />
  )
}
