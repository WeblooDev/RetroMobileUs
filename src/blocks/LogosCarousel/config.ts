import type { Block } from 'payload'

export const LogosCarousel: Block = {
  slug: 'logosCarousel',
  interfaceName: 'LogosCarousel',
  labels: { singular: 'Logos Carousel', plural: 'Logos Carousels' },
  fields: [
    {
      name: 'items',
      label: 'Logos',
      type: 'array',
      required: true,
      minRows: 1,
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo Image',
        },
      ],
    },
  ],
}

export default LogosCarousel
