import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getBrandsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = 'https://leasing.dupontregistry.com'

    const results = await payload.find({
      collection: 'brands',
      overrideAccess: true,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
        name: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((brand) => Boolean(brand?.slug))
          .map((brand) => ({
            loc: `${SITE_URL}/inventory/${brand.slug}`,
            lastmod: brand.updatedAt || dateFallback,
            changefreq: 'daily' as const,
            priority: 0.7,
          }))
      : []

    return sitemap
  },
  ['brands-sitemap'],
  {
    tags: ['brands-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getBrandsSitemap()

  return getServerSideSitemap(sitemap)
}
