import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config })
  try {
    const brands = await payload.find({
      collection: 'brands',
      limit: 100,
      depth: 0,
      sort: '-updatedAt',
    })
    return NextResponse.json(brands)
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 })
  }
}
