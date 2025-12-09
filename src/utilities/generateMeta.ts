import type { Metadata } from 'next'

import type { Media, Page, Post, Gallery, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { generateCanonical } from './generateCanonical'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/mercedes-benz.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Gallery> | null
  collectionSlug?: string
}): Promise<Metadata> => {
  const { doc, collectionSlug } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? doc?.meta?.title + ' | Retromobile' : 'Retromobile'

  // Generate canonical URL from slug
  let pathname = doc?.slug === 'home' ? '/' : `/${doc?.slug || ''}`
  if (collectionSlug === 'galleries') {
    pathname = `/galleries/${doc?.slug || ''}`
  }
  const canonicalUrl = generateCanonical(pathname)

  return {
    description: doc?.meta?.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
