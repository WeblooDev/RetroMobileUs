// src/blocks/CardGrid/config.ts
import type { Block } from 'payload'
import { link } from '@/fields/link'

export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGrid',
  labels: { singular: 'Card Grid', plural: 'Card Grids' },
  fields: [
    {
      name: 'columnsDesktop',
      type: 'select',
      label: 'Columns (desktop)',
      required: true,
      defaultValue: '2',
      options: [
        { label: '1 column', value: '1' },
        { label: '2 columns', value: '2' },
      ],
      admin: { description: 'How many columns on md+ screens.' },
    },
    {
      name: 'cards',
      required: true,
      type: 'array',
      label: 'Cards',
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },

        link({
          overrides: {
            name: 'button',
            label: 'Button',
            required: false, // optional button
          },
        }),

        {
          name: 'spanFullOnDesktop',
          type: 'checkbox',
          label: 'Span full width on desktop',
          defaultValue: false,
        },
      ],
    },
  ],
}

export default CardGrid
