import { notFound } from 'next/navigation'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type {
  Post,
  BlogHero as BlogHeroBlock,
  BlogTwoColumn as BlogTwoColumnBlock,
  TextSlice as TextSliceBlock,
  ImageSlice as ImageSliceBlock,
  Tag,
} from '@/payload-types'
import { Media } from '@/components/Media'
import { RichText } from '@payloadcms/richtext-lexical/react'

async function getPost(slug: string): Promise<Post | undefined> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  })

  return (result.docs?.[0] as Post | undefined) ?? undefined
}

const firstTagDoc = (tags?: (string | Tag)[]) =>
  tags?.find((t): t is Tag => !!t && typeof t !== 'string')

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return notFound()

  return (
    <article>
      {post.layout?.map((block, i) => {
        switch (block.blockType) {
          case 'blogHero': {
            const hero = block as BlogHeroBlock
            return (
              <section
                key={i}
                className="relative mb-10 h-[80vh] min-h-[320px] w-full overflow-hidden"
              >
                {hero.background && (
                  <Media resource={hero.background} fill imgClassName="object-cover" />
                )}
                <div className="absolute inset-0 flex items-center w-full">
                  <div className="container mx-auto text-white">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl w-full lg:w-[75%]">{hero.title}</h1>
                    
                    {hero.description && ( 
                      <p className="mt-3 max-w-2xl text-white text-sm">{hero.description}</p>
                    )}
                  </div>
                </div>
              </section>
            )
          }

          case 'blogTwoColumn': {
            const twoCol = block as BlogTwoColumnBlock
            const left = twoCol.left ?? []
            const related = (twoCol.right?.relatedPosts ?? [])
              .map((r) => (typeof r === 'string' ? undefined : (r as Post)))
              .filter(Boolean) as Post[]

            return (
              <section key={i} className="container mx-auto flex flex-col lg:flex-row justify-between gap-10">
                <div className="prose prose-neutral w-full lg:w-[60%] max-w-none">
                  {left.map((slice, idx) => {
                    if (slice.blockType === 'textSlice') {
                      const s = slice as TextSliceBlock
                      return (
                        <div key={idx} className="prose prose-neutral max-w-none">
                          <RichText data={s.text} />
                        </div>
                      )
                    }
                    if (slice.blockType === 'imageSlice') {
                      const s = slice as ImageSliceBlock
                      return (
                        <figure key={idx} className="my-14">
                          {s.image && (
                            <Media
                              resource={s.image}
                              className="w-full h-auto rounded-none !m-0"
                              imgClassName="object-cover w-full !m-0"
                            />
                          )}
                          {(s.caption || s.description) && (
                            <p className="mt-2 text-sm ">
                              {s.caption && <strong>{s.caption}</strong>}
                              {s.description && <p>{s.description}</p>}
                            </p>
                          )}
                        </figure>
                      )
                    }
                    return null
                  })}
                </div>

                <aside className="w-full lg:w-[30%]">
                  <div className="grid gap-6">
                    {related.slice(0, 3).map((p) => {
                      const t = firstTagDoc(p.tags ?? undefined)
                      const badgeText = t?.name ?? p.thumbnailBadge
                      const badgeColor = t?.color

                      return (
                        <Link
                          key={p.id}
                          href={`/news/${p.slug}`}
                          className="group block overflow-hidden"
                        >
                          <div className="relative aspect-[429/237]">
                            {p.thumbnail && (
                              <Media resource={p.thumbnail} fill imgClassName="object-cover" />
                            )}
                            {badgeText && (
                              <span
                                className="absolute left-3 bottom-3 rounded-full px-4 py-2 text-xl"
                                style={{
                                  background: badgeColor || 'white',
                                  color: badgeColor ? 'white' : 'black',
                                }}
                              >
                                {badgeText}
                              </span>
                            )}
                          </div>

                          <div className="p-4">
                            <h4 className="text-2xl font-semibold group-hover:underline">
                              {p.title}
                            </h4>
                            {p.excerpt && (
                              <p className="mt-2 line-clamp-3 text-sm opacity-80">{p.excerpt}</p>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </aside>
              </section>
            )
          }

          default:
            return null
        }
      })}
    </article>
  )
}
