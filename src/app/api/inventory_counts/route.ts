// app/api/inventory_counts/route.ts
import { NextResponse } from 'next/server'
import { getPayload, Where } from 'payload'
import config from '@payload-config'
import type { Car } from '@/payload-types'

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)

    // Get brand ID if we want model counts for a specific brand
    const brandId = searchParams.get('brandId')

    // Base filters for available inventory
    const baseFilters: Where[] = [
      { availability: { not_equals: 'sold' } },
      { hidden: { not_equals: true } },
    ]

    if (brandId) {
      // Get model counts for a specific brand
      const modelCounts = await payload.find({
        collection: 'cars',
        depth: 1,
        where: {
          and: [...baseFilters, { brand: { equals: brandId } }],
        },
        limit: 1000, // Get all cars for the brand
        sort: 'model',
      })

      // Count occurrences of each model
      const counts: Record<string, { count: number; name: string; slug?: string }> = {}

      modelCounts.docs.forEach((car: Car) => {
        if (car.model) {
          const modelKey = car.id
          if (!counts[modelKey]) {
            counts[modelKey] = {
              count: 0,
              name: car.model,
              slug: car.slug, // Include the slug from the car document
            }
          }
          counts[modelKey].count++
        }
      })

      // Convert to array and sort by count desc, then alphabetically
      const sortedModels = Object.entries(counts)
        .map(([id, data]) => ({
          id,
          name: data.name,
          slug: data.slug, // Include slug in the response
          count: data.count,
        }))
        .sort((a, b) => {
          if (b.count !== a.count) {
            return b.count - a.count
          }
          return a.name.localeCompare(b.name)
        })

      return NextResponse.json({ models: sortedModels })
    } else {
      // Get brand counts
      const allCars = await payload.find({
        collection: 'cars',
        depth: 1,
        where: {
          and: baseFilters,
        },
        limit: 1000, // Get all available cars
      })

      // Count occurrences of each brand
      const brandCounts: Record<string, { count: number; name: string }> = {}

      allCars.docs.forEach((car: Car) => {
        if (car.brand && typeof car.brand === 'object' && car.brand.id) {
          const brandId = car.brand.id
          if (!brandCounts[brandId]) {
            brandCounts[brandId] = { count: 0, name: car.brand.name }
          }
          brandCounts[brandId].count++
        }
      })

      // Convert to array and sort by count desc, then alphabetically
      const sortedBrands = Object.entries(brandCounts)
        .map(([id, data]) => ({
          id,
          name: data.name,
          count: data.count,
        }))
        .sort((a, b) => {
          if (b.count !== a.count) {
            return b.count - a.count
          }
          return a.name.localeCompare(b.name)
        })

      return NextResponse.json({ brands: sortedBrands })
    }
  } catch (error) {
    console.error('Error fetching inventory counts:', error)
    return NextResponse.json({ error: 'Failed to fetch inventory counts' }, { status: 500 })
  }
}
