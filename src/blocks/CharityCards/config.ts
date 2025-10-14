// src/payload/blocks/CharityCards.ts
import type { Block } from 'payload'

export const CharityCards: Block = {
  slug: 'charityCards',
  interfaceName: 'CharityCards',
  labels: {
    singular: 'Charity Cards',
    plural: 'Charity Cards Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Charity Partners',
      label: 'Section Title',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Card Title' },
        { name: 'description', type: 'textarea', required: true, label: 'Card Description' },
      ],
    },
  ],
}
