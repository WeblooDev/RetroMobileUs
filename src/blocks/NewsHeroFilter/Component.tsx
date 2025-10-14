'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import Skeleton from 'react-loading-skeleton'
import type { NewsHeroFilter as NewsHeroFilterBlock, Tag, Post } from '@/payload-types'
import Image from 'next/image'

type Paginated<T> = {
  docs: T[]
  page: number
  limit: number
  totalDocs: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage?: number | null
  prevPage?: number | null
}

const firstTagDoc = (tags: (string | Tag)[] | null | undefined) =>
  tags?.find((t): t is Tag => !!t && typeof t !== 'string')

async function fetchTagsPage(page = 1, limit = 9): Promise<Paginated<Tag>> {
  const res = await fetch(`/api/cms/tags?page=${page}&limit=${limit}`, { cache: 'no-store' })
  const json = (await res.json().catch(() => null as any)) as Paginated<Tag> | null
  return (
    json ?? {
      docs: [],
      page,
      limit,
      totalDocs: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    }
  )
}

async function fetchAllTags(limitPerPage = 9): Promise<Tag[]> {
  let page = 1
  const acc: Tag[] = []
  while (true) {
    const data = await fetchTagsPage(page, limitPerPage)
    acc.push(...(data.docs ?? []))
    if (!data.hasNextPage || !data.nextPage) break
    page = data.nextPage
  }
  return acc
}

async function fetchPostsByTagPage(
  tagId: string | undefined,
  page: number,
  limit: number,
  depth = 1,
): Promise<Paginated<Post>> {
  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('limit', String(limit))
  params.set('depth', String(depth))
  params.set('sort', '-publishedAt')
  if (tagId) params.set('tagId', tagId)

  const res = await fetch(`/api/cms/posts?${params.toString()}`, { cache: 'no-store' })
  const json = (await res.json().catch(() => null as any)) as Paginated<Post> | null
  return (
    json ?? {
      docs: [],
      page,
      limit,
      totalDocs: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    }
  )
}

const TagBadge: React.FC<{ post: Post }> = ({ post }) => {
  const t = firstTagDoc(post.tags)
  const badgeText = t?.name ?? post.thumbnailBadge
  const badgeColor = t?.color
  if (!badgeText) return null
  return (
    <span
      className="absolute left-3 bottom-3 rounded-full px-4 py-2 text-xl"
      style={{ background: badgeColor || 'white', color: badgeColor ? 'white' : 'black' }}
    >
      {badgeText}
    </span>
  )
}

const PostCard: React.FC<{ post: Post; showExcerpt: boolean }> = ({ post, showExcerpt }) => (
  <Link href={`/news/${post.slug}`} className="group block overflow-hidden">
    <div className="relative aspect-[429/237]">
      {post.thumbnail && <Media resource={post.thumbnail} fill imgClassName="object-cover" />}
      <TagBadge post={post} />
    </div>
    <div className="relative p-4 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
      <h3 className="relative z-10 text-[22px] font-semibold transition-colors duration-300 group-hover:text-white">
        {post.title}
      </h3>
      {showExcerpt && post.excerpt && (
        <p className="relative z-10 mt-4 line-clamp-3 text-sm transition-colors duration-300 group-hover:text-white">
          {post.excerpt}
        </p>
      )}
    </div>
  </Link>
)

const SkeletonCard: React.FC = () => (
  <div className="overflow-hidden rounded-xl">
    <Skeleton height={Math.round((9 / 16) * 600)} />
    <div className="p-4 space-y-3">
      <Skeleton height={22} width="75%" />
      <Skeleton height={14} width="100%" />
      <Skeleton height={14} width="65%" />
    </div>
  </div>
)

const chunk = <T,>(arr: T[], n: number): T[][] =>
  arr.reduce<T[][]>((rows, item, idx) => {
    if (idx % n === 0) rows.push([item])
    else rows[rows.length - 1]!.push(item)
    return rows
  }, [])

const NewsHeroFilter: React.FC<NewsHeroFilterBlock> = ({
  background,
  title,
  showExcerpt = true,
  limit = 24,
}) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [selected, setSelected] = useState<string>('all')

  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  useEffect(() => {
    fetchAllTags(50).then(setTags)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setPage(1)
    fetchPostsByTagPage(selected === 'all' ? undefined : selected, 1, limit ?? 24, 1).then(
      (res) => {
        if (cancelled) return
        setPosts(res.docs ?? [])
        setHasNextPage(!!res.hasNextPage)
        setPage(res.page ?? 1)
        setLoading(false)
      },
    )
    return () => {
      cancelled = true
    }
  }, [selected, limit])

  const onLoadMore = async () => {
    if (!hasNextPage || loadingMore) return
    setLoadingMore(true)
    const nextPage = (page ?? 1) + 1
    const res = await fetchPostsByTagPage(
      selected === 'all' ? undefined : selected,
      nextPage,
      limit ?? 24,
      1,
    )
    setPosts((prev) => [...prev, ...(res.docs ?? [])])
    setHasNextPage(!!res.hasNextPage)
    setPage(res.page ?? nextPage)
    setLoadingMore(false)
  }

  const rows = useMemo(() => chunk(posts, 3), [posts])

  return (
    <>
      <section className="relative h-[80vh] w-full overflow-hidden">
        {background && <Media resource={background} fill imgClassName="object-cover" />}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-12 text-center text-white">
          <h1 className="text-3xl md:text-6xl">{title}</h1>
          <div className="pointer-events-auto absolute bottom-6 w-[25%] max-w-[420px]">
            <div className="relative">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full appearance-none rounded-full bg-white/95 px-5 py-3 pr-12 text-left text-2xl text-black shadow focus:outline-none !font-ivar"
              >
                <option value="all" className="!font-ivar">
                  Types
                </option>
                {tags.map((t) => (
                  <option key={t.id} value={t.id} className="!font-ivar">
                    {t.name}
                  </option>
                ))}
              </select>

              <Image
                src="/arrowdown.svg"
                alt=""
                width={20}
                height={20}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        {loading ? (
          (() => {
            const skeletonCount = limit ?? 6
            const skRows = chunk(Array.from({ length: skeletonCount }), 3)
            return skRows.map((row, rIdx) => (
              <div key={`sk-row-${rIdx}`} className="mb-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {row.map((_, i) => (
                    <SkeletonCard key={`sk-${rIdx}-${i}`} />
                  ))}
                </div>
                {rIdx < skRows.length - 1 && <hr className="mt-8 border-t" />}
              </div>
            ))
          })()
        ) : rows.length === 0 ? (
          <div className="mt-8 rounded-lg border p-6 text-sm opacity-80">
            No posts for this tag yet.
          </div>
        ) : (
          <>
            {rows.map((row, rIdx) => (
              <div key={`row-${rIdx}`} className="mb-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {row.map((p) => (
                    <PostCard key={p.id} post={p} showExcerpt={!!showExcerpt} />
                  ))}
                </div>
                {rIdx < rows.length - 1 && <hr className="mt-8 border-t" />}
              </div>
            ))}

            {hasNextPage && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={onLoadMore}
                  disabled={loadingMore}
                  className="rounded-full bg-black px-6 py-3 text-white disabled:opacity-60"
                >
                  {loadingMore ? 'Loading…' : 'Load more'}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}

export default NewsHeroFilter
