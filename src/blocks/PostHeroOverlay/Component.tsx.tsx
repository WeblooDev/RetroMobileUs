"use client"
import { Media } from "@/components/Media"
import type { Post } from "@/payload-types"

export default function PostHeroOverlay({ post }: { post: Post }) {
  const hero = post.hero
  if (!hero) return null
  return (
    <section className="container py-8 md:py-12">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
        {hero.image && <Media resource={hero.image} fill imgClassName="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-10 max-w-2xl text-white">
            <h1 className="text-3xl md:text-6xl leading-tight">{hero.heroTitle}</h1>
            {hero.heroDescription && (
              <p className="mt-3 text-sm md:text-base text-white/90">{hero.heroDescription}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
