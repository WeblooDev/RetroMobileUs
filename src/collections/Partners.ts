import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Partner', plural: 'Partners' },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'partnerCategories',
      hasMany: true,
      required: true,
    },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'description', type: 'textarea', required: true, admin: { rows: 3 } },
  ],
  timestamps: true,
}

export default Partners
