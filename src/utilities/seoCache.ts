/**
 * SEO Cache Utility
 *
 * Provides in-memory caching for brand and model lookups to improve performance
 * and reduce database load. Cache expires after 5 minutes to keep data fresh.
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
}

interface CacheStore {
  brands: Map<string, CacheEntry<string>>
  models: Map<string, CacheEntry<string>>
}

// Cache duration: 5 minutes (300,000ms)
const CACHE_DURATION = 5 * 60 * 1000

// In-memory cache store
const cache: CacheStore = {
  brands: new Map(),
  models: new Map(),
}

// Check if cache entry is still valid (not expired)

function isValidCacheEntry<T>(entry: CacheEntry<T>): boolean {
  return Date.now() - entry.timestamp < CACHE_DURATION
}

// Get cached brand name by slug
export function getCachedBrand(slug: string): string | null {
  const entry = cache.brands.get(slug)
  if (entry && isValidCacheEntry(entry)) {
    return entry.data
  }
  return null
}

// Cache brand name by slug
export function setCachedBrand(slug: string, name: string): void {
  cache.brands.set(slug, {
    data: name,
    timestamp: Date.now(),
  })
}

// Get cached model name by slug
export function getCachedModel(slug: string): string | null {
  const entry = cache.models.get(slug)
  if (entry && isValidCacheEntry(entry)) {
    return entry.data
  }
  return null
}

// Cache model name by slug
export function setCachedModel(slug: string, name: string): void {
  cache.models.set(slug, {
    data: name,
    timestamp: Date.now(),
  })
}
