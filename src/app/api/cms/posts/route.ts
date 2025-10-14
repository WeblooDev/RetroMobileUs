import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const tagId = url.searchParams.get('tagId') || undefined
  const limit = Number(url.searchParams.get('limit') || 24)
  const depth = Number(url.searchParams.get('depth') || 1)
  const page = Number(url.searchParams.get('page') || 1)

  const payload = await getPayload({ config: configPromise })

  const where = tagId ? { tags: { in: [tagId] } } : undefined

  const result = await payload.find({
    collection: 'posts',
    depth,
    sort: '-publishedAt,-createdAt',
    limit,
    page,
    where,
  })

  return NextResponse.json(
    {
      docs: result.docs,
      page: result.page,
      limit: result.limit,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      nextPage: result.nextPage,
      prevPage: result.prevPage,
    },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
  )
}
