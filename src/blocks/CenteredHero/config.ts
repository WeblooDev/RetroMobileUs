import type { Block } from 'payload'

export const CenteredHero: Block = {
  slug: 'centeredHero',
  interfaceName: 'CenteredHero', 
  labels: { singular: 'Centered Hero', plural: 'Centered Heroes' },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
    { name: 'title', type: 'text', label: 'Title', required: true },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
    },
  ],
}
