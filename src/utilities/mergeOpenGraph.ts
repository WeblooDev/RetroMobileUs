import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Elevating luxury vehicle transactions through trust, convenience, and expertise with duPont REGISTRY standards.',
  images: [
    {
      url: `${getServerSideURL()}/mercedes-benz.webp`,
    },
  ],
  siteName: 'Retromobile',
  title: 'Retromobile',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
