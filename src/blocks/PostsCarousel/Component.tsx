import { getPayload } from 'payload'
import config from '@/payload.config'
import type { PostsCarousel as PostsCarouselBlock, Post, Media as MediaType } from '@/payload-types'
import PostsCarouselClient from './PostsCarouselClient'

export type LitePost = Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'publishedAt'> & {
  thumbnail?: MediaType | null
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
    },
    where: { _status: { equals: 'published' } },
  })

  return <PostsCarouselClient title={title} viewAll={viewAll} posts={docs as LitePost[]} />
}
