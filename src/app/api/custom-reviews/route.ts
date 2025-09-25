import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })

    // const { searchParams } = new URL(request.url)
    // const brandId = searchParams.get('brandId')

    // Build query
    const query: any = {
      collection: 'reviews',
      limit: 100,
      depth: 1, // To populate brand relationship
    }

    // Add brand filter if provided
    // if (brandId) {
    //   query.where = {
    //     brand: {
    //       equals: brandId,
    //     },
    //   }
    // }

    // Fetch cars from Payload CMS
    const reviews = await payload.find(query)

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching cars:', error)
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}
