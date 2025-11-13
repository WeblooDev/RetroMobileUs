// src/app/(frontend)/galleries/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Gallery, Media as MediaType } from '@/payload-types'
import GalleryLightbox from './lightbox'

function asMedia(obj: unknown): MediaType | null {
  return obj && typeof obj === 'object' && 'mimeType' in (obj as any)
    ? (obj as MediaType)
    : null
}

export default async function GalleryPage({ params }: any) {
  const { slug } = await params

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'galleries',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const gallery = docs?.[0] as Gallery | undefined
  if (!gallery) notFound()

  const images = (gallery.images ?? []).map((r) => ({
    id: String(r?.id ?? ''),
    media: asMedia((r as any)?.image),
  }))

  return (
    <div className="container py-10 md:py-16 mt-[80px]">
      <header className="max-w-3xl">
        <h1 className="text-3xl md:text-5xl">{gallery.title}</h1>
        {gallery.intro && <p className="mt-3 text-black/70">{gallery.intro}</p>}
      </header>

      <GalleryLightbox images={images} />
    </div>
  )
}
