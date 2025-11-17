import type { Block } from 'payload'

const GalleriesList: Block = {
  slug: 'galleriesList',
  interfaceName: 'GalleriesList',
  labels: { singular: 'Galleries List', plural: 'Galleries List' },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { rows: 3 },
    },
    {
      name: 'limit',
      type: 'number',
      required: true,
      defaultValue: 12,
      min: 1,
      max: 48,
    },
    {
      name: 'backgroundColor',
      type: 'text',
      required: true,
      admin: { description: 'e.g. #7A8E57 (olive)' },
      defaultValue: '#7A8E57',
    },
  ],
}

export default GalleriesList
