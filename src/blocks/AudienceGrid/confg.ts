import type { Block } from 'payload'

export const AudienceGrid: Block = {
  slug: 'audienceGrid',
  interfaceName: 'AudienceGrid',
  labels: { singular: 'Audience Grid', plural: 'Audience Grids' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Our Audience',
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 4,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Big Number / Heading',
          defaultValue: '1',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Description',
          admin: { rows: 2 },
          defaultValue: '50,000+ attendees expected',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Background Image',
        },
      ],
    },
  ],
}

export default AudienceGrid
