import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Gallery, Media as MediaType } from '@/payload-types'
import GalleryLightbox from './lightbox'

type GalleryPageParams = {
  slug: string
}

type GalleryPageProps = {
  params: Promise<GalleryPageParams>
}

type GalleryImageRow = NonNullable<Gallery['images']>[number]

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { slug: rawSlug } = await params
  const slug = rawSlug.trim()

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'galleries',
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    sort: '-createdAt',
    depth: 2,
    limit: 1,
  })

  const gallery = docs[0] as Gallery | undefined
  if (!gallery || !gallery.images || gallery.images.length === 0) {
    notFound()
  }

  const sortedRows = [...(gallery.images as GalleryImageRow[])].sort((a, b) => {
    const ma = (a.image as MediaType | null)?.createdAt ?? ''
    const mb = (b.image as MediaType | null)?.createdAt ?? ''

    if (!ma || !mb) return 0

    return ma < mb ? 1 : ma > mb ? -1 : 0
  })

  const images = sortedRows.map((row) => {
    const media = row.image as MediaType

    return {
      id: String(row.id ?? media.id ?? ''),
      media,
    }
  })

  return (
    <div className="container py-10 md:py-16 mt-[80px]">
      <header className="max-w-3xl">
        <h1 className="text-2xl md:text-3xl lg:text-5xl">{gallery.title}</h1>
        {gallery.intro && <p className="mt-3 text-black/70">{gallery.intro}</p>}
      </header>

      <GalleryLightbox images={images} />
    </div>
  )
}
