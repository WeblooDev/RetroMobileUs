'use server'

import FilteredInventoryBlock from '@/components/CurrentSpecials/FilteredInventoryBlock'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'
import { lookupBrandBySlug, lookupModelBySlug } from '@/utilities/inventoryLookup'
import { generateInventoryMetadata } from '@/utilities/generateInventorySEO'

interface FilterParams {
  slug?: string[]
}

interface PageProps {
  params: Promise<FilterParams>
}

interface ParsedFilters {
  brand?: string
  model?: string
  price?: string
}

// Parse URL segments into structured data without database lookups

function parseUrlSegments(slug: string[] = []): {
  brandSlug?: string
  modelSlug?: string
  priceFilter?: string
} {
  const result: { brandSlug?: string; modelSlug?: string; priceFilter?: string } = {}

  for (let i = 0; i < slug.length; i++) {
    const segment = slug[i]
    if (!segment) continue

    const decodedSegment = decodeURIComponent(segment)

    // Check if it's a filter segment (starts with "filter:")
    if (decodedSegment.startsWith('filter:')) {
      const filterString = decodedSegment.replace('filter:', '')

      // Parse the filter string: minPrice='value'&maxPrice='value'
      const parts = filterString.split('&')
      let minPrice = ''
      let maxPrice = ''

      for (const part of parts) {
        if (part.startsWith('minPrice=')) {
          minPrice = part.replace('minPrice=', '').replace(/'/g, '')
        } else if (part.startsWith('maxPrice=')) {
          maxPrice = part.replace('maxPrice=', '').replace(/'/g, '')
        }
      }

      if (minPrice && maxPrice) {
        result.priceFilter = `${minPrice}-${maxPrice}`
      } else if (minPrice) {
        result.priceFilter = `${minPrice}+`
      } else if (maxPrice) {
        result.priceFilter = `-${maxPrice}`
      }
    } else if (i === 0) {
      result.brandSlug = decodedSegment
    } else if (i === 1) {
      result.modelSlug = decodedSegment
    }
  }

  return result
}

// Parse URL filters and resolve brand/model names from database with caching

async function parseFilters(slug: string[] = []): Promise<ParsedFilters> {
  const urlData = parseUrlSegments(slug)
  const parsed: ParsedFilters = {}

  if (urlData.priceFilter) {
    parsed.price = urlData.priceFilter
  }

  const lookupPromises: Promise<void>[] = []

  if (urlData.brandSlug) {
    lookupPromises.push(
      lookupBrandBySlug(urlData.brandSlug).then((brandName) => {
        parsed.brand = brandName
      }),
    )
  }

  if (urlData.modelSlug) {
    lookupPromises.push(
      lookupModelBySlug(urlData.modelSlug).then((modelName) => {
        parsed.model = modelName
      }),
    )
  }

  await Promise.all(lookupPromises)

  return parsed
}

// Generate metadata for inventory filter pages with caching and error handling
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug || []

  try {
    const filters = await parseFilters(slug)
    return generateInventoryMetadata(filters, slug)
  } catch (error) {
    console.error('Error generating inventory metadata:', error)
    return generateInventoryMetadata({}, slug)
  }
}

// Main inventory filter page with robust error handling
export default async function FilteredPage({ params }: PageProps) {
  const resolvedParams = await params
  let filters: ParsedFilters = {}

  try {
    filters = await parseFilters(resolvedParams.slug)
  } catch (error) {
    console.error('Error parsing inventory filters:', error)
  }

  // Fetch feature highlight and feature section data from Payload
  let featureHighlightData = null
  let featureSectionData = null

  try {
    const payload = await getPayload({ config: configPromise })

    // Try to get from Pages collection where current specials page might be
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'current-specials',
        },
      },
      limit: 1,
    })

    if (pages.docs.length > 0) {
      const page = pages.docs[0]
      // Look for featureHighlight block in the page's layout
      if (page && page.layout) {
        const featureBlock = page.layout.find((block) => block.blockType === 'featureHighlight')
        if (featureBlock && featureBlock.blockType === 'featureHighlight') {
          // Transform the Payload data to match the component interface
          const imageData = featureBlock.image as Media

          if (imageData && typeof imageData === 'object' && 'url' in imageData) {
            featureHighlightData = {
              heading: featureBlock.heading,
              image: {
                url: imageData.url || '',
                alt: imageData.alt || '',
                width: imageData.width || 800,
                height: imageData.height || 600,
              },
              features:
                featureBlock.features?.map((feature) => ({
                  title: feature.title,
                  description: feature.description,
                })) || [],
              button:
                featureBlock.button?.label && featureBlock.button?.href
                  ? {
                      label: featureBlock.button.label,
                      href: featureBlock.button.href,
                    }
                  : undefined,
              imagePosition: featureBlock.imagePosition,
            }
          }
        }

        // Feature Section
        const featureSectionBlock = page.layout.find(
          (block) => block.blockType === 'featureSection',
        )
        if (featureSectionBlock && featureSectionBlock.blockType === 'featureSection') {
          featureSectionData = {
            backgroundImage: featureSectionBlock.backgroundImage as Media,
            heading: featureSectionBlock.heading,
            description: featureSectionBlock.description,
            features:
              featureSectionBlock.features?.map((feature) => ({
                icon: feature.icon as Media,
                title: feature.title,
              })) || [],
            buttonText: featureSectionBlock.buttonText || undefined,
            link: featureSectionBlock.link || undefined,
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching feature highlight data:', error)
  }

  return (
    <FilteredInventoryBlock
      initialFilters={filters}
      featureHighlight={featureHighlightData || undefined}
      featureSection={featureSectionData || undefined}
    />
  )
}
