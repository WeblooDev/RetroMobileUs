import type { Block } from 'payload'

export const SponsorsFilterGrid: Block = {
  slug: 'sponsorsFilterGrid',
  interfaceName: 'SponsorsFilterGrid',
  labels: { singular: 'Sponsors Filter Grid', plural: 'Sponsors Filter Grids' },
  fields: [
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'partnerCategories', 
      hasMany: true,
      required: false, 
      admin: {
        description:
          'Optional: pick a subset to highlight elsewhere. Tabs here will still show all categories.',
      },
    },
    { name: 'showDescriptions', type: 'checkbox', required: true, defaultValue: true },
  ],
}

export default SponsorsFilterGrid
