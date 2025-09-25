// Generates dynamic SEO titles, meta descriptions, and H1 tags for make and make+model
import type { Metadata } from 'next'
import { generateCanonical, constructPathname } from './generateCanonical'

interface SEOFilters {
  brand?: string
  model?: string
  price?: string
}

interface SEOContent {
  title: string
  description: string
  h1Title: string
  h1Description: string
}

// Capitalizes a slug string (e.g., "bmw-x5" -> "BMW X5")
export function capitalizeSlug(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Generate SEO content for inventory pages based on filters
export function generateInventorySEOContent(filters: SEOFilters): SEOContent {
  if (filters.brand && filters.model) {
    // Make + Model Page Formula
    return {
      title: `${filters.brand} ${filters.model} Lease - Best Car Lease Deals | duPont REGISTRY Leasing`,
      description: `Lease the ${filters.brand} ${filters.model} with exclusive deals at duPont REGISTRY Leasing. Find the best car lease offers, compare prices, and drive your ${filters.brand} today.`,
      h1Title: `${filters.brand} ${filters.model} Lease Offers`,
      h1Description: `Discover exclusive ${filters.brand} ${filters.model} lease deals with flexible terms and competitive pricing. Drive your dream ${filters.brand} today.`,
    }
  } else if (filters.brand) {
    // Make Page Formula
    return {
      title: `${filters.brand} Lease Deals - Best Car Lease Offers | duPont REGISTRY Leasing`,
      description: `Discover ${filters.brand} lease deals with flexible terms at duPont REGISTRY Leasing. Compare the best car lease offers and drive your ${filters.brand} for less today.`,
      h1Title: `${filters.brand} Lease Deals`,
      h1Description: `Explore ${filters.brand} lease offers with competitive rates and flexible terms. Find the best ${filters.brand} lease deals available.`,
    }
  } else if (filters.price) {
    // Price-based pages
    return {
      title: `Luxury Cars in ${filters.price} Price Range | duPont REGISTRY Leasing`,
      description: 'Find luxury vehicles in your price range at duPont REGISTRY Leasing.',
      h1Title: `Luxury Cars in ${filters.price} Price Range`,
      h1Description: 'Find luxury vehicles in your price range at duPont REGISTRY Leasing.',
    }
  } else {
    // Default inventory page
    return {
      title: 'Luxury Car Inventory | duPont REGISTRY Leasing',
      description: 'Browse our exclusive selection of luxury vehicles available for lease.',
      h1Title: 'Exclusive NEW CAR Inventory, curated for you',
      h1Description:
        'Discover a fleet of world-class new vehicles designed for those who demand the best. From premium sedans to high-performance supercars, each ride delivers an exhilarating experience.',
    }
  }
}

// Generate complete Next.js metadata for inventory pages

export function generateInventoryMetadata(filters: SEOFilters, slug: string[]): Metadata {
  const seoContent = generateInventorySEOContent(filters)
  const pathname = slug.length > 0 ? constructPathname(['inventory', ...slug]) : '/inventory'
  // Ensure canonical URLs don't include price filters like /filter:minPrice='11'&maxPrice='9000'
  const canonicalPath = stripPriceFiltersFromPathname(pathname)
  const canonicalUrl = generateCanonical(canonicalPath)

  return {
    title: seoContent.title,
    description: seoContent.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoContent.title,
      description: seoContent.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoContent.title,
      description: seoContent.description,
    },
  }
}

// For canonical URLs, remove everything starting from the first occurrence of "filter".
// Assumption (per request): the price filter is always last and formatted like
// /filter:minPrice='11'&maxPrice='9000'. We simply truncate at "filter".
function stripPriceFiltersFromPathname(pathname: string): string {
  if (!pathname) return pathname

  // Prefer cutting at the path segment "/filter" if present
  const lower = pathname.toLowerCase()
  let cutIdx = lower.indexOf('/filter')
  if (cutIdx === -1) {
    // Fallback: cut at any occurrence of the word "filter"
    cutIdx = lower.indexOf('filter')
  }

  if (cutIdx !== -1) {
    return pathname.slice(0, cutIdx)
  }

  return pathname
}
