import type { Block } from 'payload'

export const HeroCarsCarousel: Block = {
  slug: 'heroCarsCarousel',
  interfaceName: 'HeroCarsCarousel',
  fields: [
    {
      type: 'collapsible',
      label: 'Last card',
      required: false,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'header',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          type: 'collapsible',
          label: 'Inner Card',
          fields: [
            {
              name: 'innerTitle',
              label: 'Card Title',
              type: 'text',
            },
            {
              name: 'text',
              type: 'text',
            },
          ],
        },
        {
          name: 'inventoryStyle',
          label: 'Use Inventory Style',
          type: 'checkbox',
        },
      ],
    },
  ],
  labels: {
    singular: 'Hero Car Carousel',
    plural: 'Hero Car Carousels',
  },
}
