import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getCarsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = 'https://leasing.dupontregistry.com'

    const results = await payload.find({
      collection: 'cars',
      overrideAccess: true,
      draft: false,
      depth: 1,
      limit: 1000,
      pagination: false,
      where: {
        hidden: {
          not_equals: true,
        },
      },
      select: {
        slug: true,
        updatedAt: true,
        brand: true,
        model: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const carPages = results.docs
      ? results.docs
          .filter((car) => Boolean(car?.slug))
          .map((car) => ({
            loc: `${SITE_URL}/inventory/car/${car.slug}`,
            lastmod: car.updatedAt || dateFallback,
            changefreq: 'weekly' as const,
            priority: 0.8,
          }))
      : []

    // Get unique brand-model combinations for inventory filter pages
    const brandModelCombos = new Set<string>()
    const brandPages = new Set<string>()

    results.docs?.forEach((car) => {
      if (car.brand && typeof car.brand === 'object' && car.brand.slug) {
        const brandSlug = car.brand.slug
        brandPages.add(brandSlug)

        if (car.slug) {
          brandModelCombos.add(`${brandSlug}/${car.slug}`)
        }
      }
    })

    // Brand inventory pages
    const brandSitemapEntries = Array.from(brandPages).map((brandSlug) => ({
      loc: `${SITE_URL}/inventory/${brandSlug}`,
      lastmod: dateFallback,
      changefreq: 'daily' as const,
      priority: 0.7,
    }))

    // Brand-model combination pages
    const brandModelSitemapEntries = Array.from(brandModelCombos).map((combo) => ({
      loc: `${SITE_URL}/inventory/${combo}`,
      lastmod: dateFallback,
      changefreq: 'weekly' as const,
      priority: 0.6,
    }))

    return [...carPages, ...brandSitemapEntries, ...brandModelSitemapEntries]
  },
  ['cars-sitemap'],
  {
    tags: ['cars-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getCarsSitemap()

  return getServerSideSitemap(sitemap)
}
