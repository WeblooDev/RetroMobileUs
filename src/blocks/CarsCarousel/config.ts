import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const CarsCarousel: Block = {
  slug: 'carsCarousel',
  interfaceName: 'CarsCarousel',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Ultimate Cars Gallery',
      label: 'Cars Carousel Title (Left Side above Carousel)',
    },
    {
      name: 'subTitle',
      type: 'text',
      required: true,
      defaultValue:
        'Discover a fleet of world-class vehicles handpicked for those who need the best.',
      label: 'Cars Carousel Sub Title (right Side above Carousel)',
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 1,
        label: 'Button (Right Side above Carousel)',
        defaultValue: [
          {
            label: 'Discover Our Fleet',
            link: '/fleet',
            type: 'internal',
            appearance: 'default',
            newTab: false,
          },
        ],
      },
    }),
  ],
  labels: {
    plural: 'Cars Carousel',
    singular: 'Cars Carousel',
  },
}
