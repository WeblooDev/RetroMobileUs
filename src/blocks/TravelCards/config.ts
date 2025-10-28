import type { Block } from 'payload'

export const TravelCards: Block = {
  slug: 'travelCards',
  interfaceName: 'TravelCards',
  labels: { singular: 'Travel Cards', plural: 'Travel Cards' },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
      defaultValue: 'Travel Made Simple',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 3,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          label: 'Card Title',
          required: true,
          defaultValue: 'By Car',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: { rows: 3 },
          required: true,
          defaultValue:
            'Easy access from I-10 and US-101.\nPaid parking available nearby.',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          required: true,
        },
      ],
      defaultValue: [
        {
          subtitle: 'By Car',
          description: 'Easy access from I-10 and US-101.\nPaid parking available nearby.',
        },
        {
          subtitle: 'By Metro',
          description: 'Pico Station (Blue & Expo Lines) is 2 blocks from the venue.',
        },
        {
          subtitle: 'From LAX',
          description: '~30-minute drive or direct shuttle options available.',
        },
      ],
    },
  ],
}
