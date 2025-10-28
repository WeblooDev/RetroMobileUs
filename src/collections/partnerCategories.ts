import type { CollectionConfig } from 'payload'

export const PartnerCategories: CollectionConfig = {
  slug: 'partnerCategories',
  labels: { singular: 'Partner Category', plural: 'Partner Categories' },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true }, 
  ],
  timestamps: true,
}

export default PartnerCategories
