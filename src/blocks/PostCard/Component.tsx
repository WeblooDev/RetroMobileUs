"use client"
import Link from "next/link"
import { Media } from "@/components/Media"
import type { Post } from "@/payload-types"

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
        {post.cardThumbnail && <Media resource={post.cardThumbnail} fill imgClassName="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end p-4 text-white">
          <div>
            <h3 className="text-xl md:text-2xl leading-snug group-hover:underline">{post.title}</h3>
            {post.cardExcerpt && (
              <p className="mt-1 text-xs md:text-sm text-white/90 line-clamp-2">{post.cardExcerpt}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
