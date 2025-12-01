'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import Skeleton from 'react-loading-skeleton'
import type { NewsHeroFilter as NewsHeroFilterBlock, Tag, Post } from '@/payload-types'
import Image from 'next/image'
import StyledSelect from '@/components/StyledSelect'
import { fadeIn, fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

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
const PostCard: React.FC<{ post: Post; showExcerpt: boolean }> = ({ post, showExcerpt }) => {
  const overrideUrl = post.readMore?.url?.trim()
  const isExternal = !!overrideUrl && /^https?:\/\//i.test(overrideUrl)
  const href = overrideUrl || `/news/${post.slug}`

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    isExternal ? (
      <a
        href={href}
        target={post.readMore?.newTab ? '_blank' : undefined}
        rel={post.readMore?.newTab ? 'noopener noreferrer' : undefined}
        className="group block overflow-hidden"
        aria-label={`${post.title}${isExternal ? ' — external' : ''}`}
      >
        {children}
      </a>
    ) : (
      <Link href={href} className="group block overflow-hidden" aria-label={post.title}>
        {children}
      </Link>
    )

  return (
    <Wrapper>
      <div className="relative aspect-[429/237]">
        {post.thumbnail && <Media resource={post.thumbnail} fill imgClassName="object-cover" />}
        <TagBadge post={post} />
      </div>
      <div className="relative p-4 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
        <h3 className="relative z-10 text-xl font-semibold transition-colors duration-300 group-hover:text-white">
          {post.title}
        </h3>
        {showExcerpt && post.excerpt && (
          <p className="relative z-10 mt-4 line-clamp-3 text-sm transition-colors duration-300 group-hover:text-white">
            {post.excerpt}
          </p>
        )}
      </div>
    </Wrapper>
  )
}

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
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          {background && <Media resource={background} fill imgClassName="object-cover" />}
        </motion.div>
        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12 text-center text-white">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-6xl"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {title}
          </motion.h1>
          <motion.div
            className="pointer-events-auto absolute bottom-6 w-[25%] min-w-[200px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StyledSelect
              value={selected}
              onChange={setSelected}
              options={[
                { value: 'all', label: 'All Types' },
                ...tags.map((t) => ({ value: t.id as string, label: t.name as string })),
              ]}
            />
          </motion.div>
        </div>
      </section>

      <motion.section
        className="container mx-auto px-4 py-14"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
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
      </motion.section>
    </>
  )
}

export default NewsHeroFilter
