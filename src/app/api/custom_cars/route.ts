import { NextResponse } from 'next/server'
import { getPayload, Where } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)

    const brandId = searchParams.get('brandId')
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '12', 10)

    const filters: Where[] = []

    if (brandId) filters.push({ brand: { equals: brandId } })

    if (category) filters.push({ category: { equals: category } })

    if (searchParams.get('modelId')) filters.push({ id: { equals: searchParams.get('modelId') } })

    const priceMin = searchParams.get('priceMin')
    const priceMax = searchParams.get('priceMax')

    if (priceMin || priceMax) {
      const priceConditions: any = {}
      if (priceMin) priceConditions.greater_than_equal = Number(priceMin)
      if (priceMax) priceConditions.less_than_equal = Number(priceMax)

      filters.push({ price: priceConditions })
    }

    const isOpenToDemo = searchParams.get('isOpenToDemo') === 'true'
    const isOpenToPreowned = searchParams.get('isOpenToPreowned') === 'true'
    if (isOpenToDemo || isOpenToPreowned) {
      const conditionOptions: Where[] = []
      if (isOpenToDemo) conditionOptions.push({ condition: { equals: 'demo' } })
      if (isOpenToPreowned) conditionOptions.push({ condition: { equals: 'preowned' } })
      filters.push({ or: conditionOptions })
    }

    const availability = searchParams.get('availability')
    if (availability === 'not-sold') {
      filters.push({
        availability: { not_equals: 'sold' },
      })
    } else if (availability) {
      filters.push({
        availability: { equals: availability },
      })
    }

    // Add filter to exclude hidden cars
    const hidden = searchParams.get('hidden')
    if (hidden === 'false') {
      filters.push({ hidden: { not_equals: true } })
    }

    const where: Where = filters.length > 0 ? { and: filters } : {}

    const cars = await payload.find({
      collection: 'cars',
      depth: 1,
      where,
      limit,
      page,
      sort: '-updatedAt',
      select: {
        price: true,
        brand: true,
        model: true,
        trim: true,
        slug: true,
        year: true,
        description: true,
        mileage: true,
        condition: true,
        images: true,
        msrp: true,
        annualMileage: true,
        term: true,
        downPayment: true,
        leaseType: true,
        onePayAmount: true,
        ttlAmount: true,
        image: true,
        availability: true,
        lease_term: true,
        hidePrice: true,
        hidden: true,
        notes: true,
      },
    })

    return NextResponse.json(cars)
  } catch (error) {
    console.error('Error fetching cars:', error)
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}
