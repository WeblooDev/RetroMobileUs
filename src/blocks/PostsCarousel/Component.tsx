// blocks/PostsCarousel/Component.tsx (server component)
import { getPayload } from 'payload'
import config from '@/payload.config'
import type {
  PostsCarousel as PostsCarouselBlock,
  Post,
  Media as MediaType,
  Tag,
} from '@/payload-types'
import PostsCarouselClient from './PostsCarouselClient'

export type LitePost = Pick<
  Post,
  'id' | 'title' | 'slug' | 'excerpt' | 'publishedAt'
> & {
  thumbnail?: MediaType | null
  readMore?: { url?: string | null; newTab?: boolean | null }
  // 👇 make sure tags are included (string ids OR populated Tag objects)
  tags?: (string | Tag)[] | null
}

export default async function PostsCarousel({ title, viewAll }: PostsCarouselBlock) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 6,
    depth: 1,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      thumbnail: true,
      readMore: { url: true, newTab: true },
      tags: true,
    },
    where: { _status: { equals: 'published' } },
  })

  return (
    <PostsCarouselClient
      title={title}
      viewAll={viewAll}
      posts={docs as unknown as LitePost[]}
    />
  )
}
