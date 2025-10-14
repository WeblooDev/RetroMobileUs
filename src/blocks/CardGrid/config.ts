import type { Block } from 'payload'

export const CardGrid: Block = {
  slug: 'cardGrid',
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
      type: 'array',
      label: 'Cards',
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        // reuse the same fields as Card (copy here to avoid nested blocks UI)
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Image' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'button',
          type: 'group',
          label: 'Button',
          fields: [
            { name: 'label', type: 'text', required: true, defaultValue: 'READ MORE' },
            { name: 'url', type: 'text', required: true, defaultValue: '#' },
          ],
        },
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
