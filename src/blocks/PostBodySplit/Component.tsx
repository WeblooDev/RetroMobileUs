"use client"
import { Media } from "@/components/Media"
import PostCard from "@/blocks/PostCard/Component"
import type { Post } from "@/payload-types"

export default function PostBodySplit({ post }: { post: Post }) {
  const left = post.bodyLeft ?? []
  const related = (post.relatedPosts as Post[] | undefined) ?? []

  return (
    <section className="container py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-10">
        {/* Left column – text / image+caption sequence */}
        <div className="space-y-8 md:space-y-10">
          {left.map((s, i) =>
            s.kind === "text" ? (
              <p key={i} className="text-base md:text-lg leading-relaxed text-black/85 whitespace-pre-line">
                {s.text}
              </p>
            ) : (
              <figure key={i} className="space-y-2">
                {s.img && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
                    <Media resource={s.img} fill imgClassName="object-cover" />
                  </div>
                )}
                {s.caption && <figcaption className="text-sm text-black/60">{s.caption}</figcaption>}
              </figure>
            )
          )}
        </div>

        {/* Right column – up to 3 related posts */}
        <aside className="space-y-4">
          <h3 className="text-lg md:text-xl font-medium">Related posts</h3>
          <div className="space-y-4">
            {related.slice(0, 3).map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
