import Link from 'next/link'
import { Media } from '@/components/Media'
import type { BlogTwoColumn as BlogTwoColumnBlock } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

const RelatedCard: React.FC<{ p: any }> = ({ p }) => (
  <Link href={`/news/${p?.slug}`} className="group block overflow-hidden rounded-xl border">
    <div className="relative aspect-[16/9]">
      {p?.thumbnail && <Media resource={p.thumbnail} fill imgClassName="object-cover" />}
      {(p?.tags?.[0]?.name || p?.thumbnailBadge) && (
        <span className="absolute left-3 bottom-3 rounded-full px-4 py-2 text-xl bg-white text-black">
          {p?.tags?.[0]?.name ?? p?.thumbnailBadge}
        </span>
      )}
    </div>
    <div className="p-4">
      <h4 className="text-base font-semibold group-hover:underline">{p?.title}</h4>
      {p?.excerpt && <p className="mt-2 line-clamp-3 text-sm opacity-80">{p.excerpt}</p>}
    </div>
  </Link>
)

const BlogTwoColumn: React.FC<BlogTwoColumnBlock> = ({ left, right }) => {
  const related = right?.relatedPosts ?? []

  return (
    <section className="container mx-auto flex gap-10">
      <div className="prose prose-neutral max-w-none w-[60%]">
        {left?.map((slice: any, idx: any) => {
          if (slice.blockType === 'textSlice') {
            return (
              <div key={idx} className="mb-6">
                <RichText data={(slice as any).text} />
              </div>
            )
          }
          if (slice.blockType === 'imageSlice') {
            const s = slice as any
            return (
              <figure key={idx} className="my-8">
                {s.image && (
                  <Media
                    resource={s.image}
                    className="w-full h-auto rounded-xl"
                    imgClassName="object-cover"
                  />
                )}
                {(s.caption || s.description) && (
                  <figcaption className="mt-2 text-sm opacity-80">
                    {s.caption && <strong>{s.caption}</strong>}
                    {s.description && (
                      <span className={s.caption ? 'ml-2' : ''}>{s.description}</span>
                    )}
                  </figcaption>
                )}
              </figure>
            )
          }
          return null
        })}
      </div>

      <aside className="space-y-4 w-[40%]">
        <h3 className="mb-4 text-lg font-semibold">Related</h3>
        <div className="grid gap-6">
          {related.slice(0, 3).map((p: any) => (
            <RelatedCard key={p?.id ?? p?.slug} p={p} />
          ))}
        </div>
      </aside>
    </section>
  )
}

export default BlogTwoColumn
