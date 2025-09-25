import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { capitalizeSlug } from './generateInventorySEO'
import { getCachedBrand, setCachedBrand, getCachedModel, setCachedModel } from './seoCache'

/**
 * Lookup brand name by slug with caching
 * Checks cache first, then database, with fallback to capitalized slug
 */
export async function lookupBrandBySlug(slug: string): Promise<string> {
  const cachedBrand = getCachedBrand(slug)
  if (cachedBrand) {
    return cachedBrand
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const brands = await payload.find({
      collection: 'brands',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      select: {
        name: true,
      },
    })

    if (brands.docs.length > 0 && brands.docs[0]?.name) {
      const brandName = brands.docs[0].name
      setCachedBrand(slug, brandName)
      return brandName
    }
  } catch (error) {
    console.error('Error looking up brand by slug:', error)
  }

  const fallbackName = capitalizeSlug(slug)
  setCachedBrand(slug, fallbackName)
  return fallbackName
}

// Lookup model name by slug with caching

export async function lookupModelBySlug(slug: string): Promise<string> {
  const cachedModel = getCachedModel(slug)
  if (cachedModel) {
    return cachedModel
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const cars = await payload.find({
      collection: 'cars',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      select: {
        model: true,
      },
    })

    if (cars.docs.length > 0 && cars.docs[0]?.model) {
      const modelName = cars.docs[0].model
      setCachedModel(slug, modelName)
      return modelName
    }
  } catch (error) {
    console.error('Error looking up model by slug:', error)
  }

  const fallbackName = capitalizeSlug(slug)
  setCachedModel(slug, fallbackName)
  return fallbackName
}
